import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres la Asistente Devoc365, una guía virtual para los usuarios del Devoc365 App. Respondes siempre en español sencillo y amable.

Tu objetivo es ayudar a las personas a:
1. Entender cómo usar la app (devocional de hoy, historial, rutas temáticas, configuración)
2. Mantener una vida devocional diaria con Dios, dando consejos prácticos y espirituales, pero sin reemplazar orientación pastoral, psicológica o médica
3. Explicar de forma clara la diferencia entre el acceso gratuito y Devoc365 Premium

Información sobre la app:
- El devocional de hoy se muestra en la pantalla principal. Incluye un versículo, reflexión y oración.
- Puedes marcar el devocional como completado para mantener tu racha de días seguidos.
- El historial muestra los devocionales de días anteriores. Los usuarios gratuitos solo ven los últimos 3 días.
- Las rutas temáticas son planes especiales como "30 días de esperanza" o "21 días de sanidad interior". Algunas son exclusivas para usuarios Premium.
- En Configuración puedes cambiar el horario del recordatorio diario.

Sobre Premium:
- Devoc365 Premium cuesta solo 4,99 dólares al mes
- Incluye acceso completo al historial de devocionales
- Incluye todas las rutas temáticas sin restricciones
- El pago se realiza en un enlace externo seguro (Hotmart)

Cuando el usuario pregunte por precio, pago o cómo acceder a todo el contenido, responde mencionando el precio y que pueden hacer clic en cualquier botón "Mejorar a Premium" en la app.

Mantén un tono respetuoso, cristiano, sin debates teológicos ni temas polémicos. Sé breve y directo, con mucha empatía. Limita tus respuestas a 2-3 párrafos máximo.`;

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 20;
const RATE_LIMIT_PER_HOUR = 50;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid authorization header");
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client with user's JWT
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(JSON.stringify({ error: "No autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("User authenticated:", user.id);

    // Check rate limit
    const { data: rateData, error: rateError } = await supabaseClient
      .from("chat_rate_limits")
      .select("chat_count, reset_at")
      .eq("user_id", user.id)
      .maybeSingle();

    if (rateError) {
      console.error("Rate limit check error:", rateError.message);
    }

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 3600000);

    if (rateData) {
      const resetAt = new Date(rateData.reset_at);
      
      if (now > resetAt) {
        // Reset the counter
        const { error: updateError } = await supabaseClient
          .from("chat_rate_limits")
          .update({ 
            chat_count: 1, 
            reset_at: oneHourFromNow.toISOString() 
          })
          .eq("user_id", user.id);
        
        if (updateError) {
          console.error("Rate limit reset error:", updateError.message);
        }
      } else if (rateData.chat_count >= RATE_LIMIT_PER_HOUR) {
        console.log("Rate limit exceeded for user:", user.id);
        return new Response(JSON.stringify({ 
          error: "Límite de mensajes alcanzado. Intenta de nuevo en una hora." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        // Increment counter
        const { error: updateError } = await supabaseClient
          .from("chat_rate_limits")
          .update({ chat_count: rateData.chat_count + 1 })
          .eq("user_id", user.id);
        
        if (updateError) {
          console.error("Rate limit increment error:", updateError.message);
        }
      }
    } else {
      // Create new rate limit record
      const { error: insertError } = await supabaseClient
        .from("chat_rate_limits")
        .insert({ 
          user_id: user.id, 
          chat_count: 1,
          reset_at: oneHourFromNow.toISOString()
        });
      
      if (insertError) {
        console.error("Rate limit insert error:", insertError.message);
      }
    }

    const body = await req.json();
    const { messages } = body;

    // Validate messages array exists and is an array
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid request: messages must be an array");
      return new Response(JSON.stringify({ error: "Formato de solicitud inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate message count
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "No se proporcionaron mensajes" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate and sanitize each message
    const validatedMessages = [];
    for (const msg of messages.slice(-MAX_MESSAGES)) {
      if (!msg || typeof msg !== 'object') {
        console.error("Invalid message format:", msg);
        return new Response(JSON.stringify({ error: "Formato de mensaje inválido" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!msg.role || !['user', 'assistant', 'system'].includes(msg.role)) {
        console.error("Invalid message role:", msg.role);
        return new Response(JSON.stringify({ error: "Rol de mensaje inválido" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (typeof msg.content !== 'string') {
        console.error("Invalid message content type:", typeof msg.content);
        return new Response(JSON.stringify({ error: "Contenido de mensaje inválido" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        console.error("Message too long:", msg.content.length);
        return new Response(JSON.stringify({ error: `Mensaje demasiado largo. Máximo ${MAX_MESSAGE_LENGTH} caracteres.` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      validatedMessages.push({
        role: msg.role,
        content: msg.content.trim()
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...validatedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Por favor, espera un momento e intenta de nuevo." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Servicio temporalmente no disponible. Por favor, intenta más tarde." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error al conectar con el asistente" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return new Response(JSON.stringify({ error: "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
