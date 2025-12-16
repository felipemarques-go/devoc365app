-- Create rate_limits table for chat assistant
CREATE TABLE public.chat_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  chat_count INTEGER NOT NULL DEFAULT 0,
  reset_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '1 hour'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- RLS policies - users can only access their own rate limits
CREATE POLICY "Users can read own rate limits" 
ON public.chat_rate_limits 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rate limits" 
ON public.chat_rate_limits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rate limits" 
ON public.chat_rate_limits 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_chat_rate_limits_updated_at
BEFORE UPDATE ON public.chat_rate_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();