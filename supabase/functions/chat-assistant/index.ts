import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
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
          ...messages,
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
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
