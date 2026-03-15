-- ============================================================
-- STEP 1: Create all tables first (no functions yet)
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'agent');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, name_ar TEXT NOT NULL,
  description TEXT, description_ar TEXT,
  price_monthly NUMERIC NOT NULL DEFAULT 0, price_yearly NUMERIC NOT NULL DEFAULT 0,
  max_users INTEGER NOT NULL DEFAULT 3, max_conversations INTEGER, max_storage_gb INTEGER,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true, is_popular BOOLEAN DEFAULT false,
  activation_fee NUMERIC, sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, name_ar TEXT, slug TEXT UNIQUE NOT NULL,
  logo_url TEXT, primary_color TEXT, secondary_color TEXT,
  industry_type TEXT DEFAULT 'general', settings JSONB,
  is_active BOOLEAN DEFAULT true, is_trial BOOLEAN DEFAULT true, trial_ends_at TIMESTAMPTZ,
  subscription_plan_id UUID REFERENCES public.subscription_plans(id),
  subscription_start TIMESTAMPTZ, subscription_end TIMESTAMPTZ, enabled_features TEXT[],
  onboarding_completed BOOLEAN DEFAULT false, onboarding_completed_at TIMESTAMPTZ, onboarding_step INTEGER DEFAULT 0,
  activation_paid BOOLEAN DEFAULT false, activation_paid_at TIMESTAMPTZ,
  whatsapp_phone_id TEXT, whatsapp_token TEXT, created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL, name_ar TEXT, description TEXT, icon TEXT, color TEXT,
  manager_id UUID, is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.company_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL, role TEXT NOT NULL DEFAULT 'agent',
  full_name TEXT, email TEXT, phone TEXT, avatar_url TEXT,
  department TEXT, department_id UUID REFERENCES public.departments(id),
  is_active BOOLEAN DEFAULT true, invited_by UUID,
  joined_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(company_id, user_id)
);

DO $$ BEGIN
  ALTER TABLE public.departments ADD CONSTRAINT departments_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES public.company_users(id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.super_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE, full_name TEXT, email TEXT,
  is_active BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  phone TEXT NOT NULL, name TEXT, email TEXT, notes TEXT, tags TEXT[],
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.whatsapp_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL, phone_number_id TEXT, access_token TEXT, verify_token TEXT,
  webhook_url TEXT, is_active BOOLEAN DEFAULT true, is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(company_id, phone_number_id)
);

CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active', assigned_to UUID,
  assigned_department_id UUID REFERENCES public.departments(id),
  ai_enabled BOOLEAN DEFAULT true, archived BOOLEAN DEFAULT false, archived_at TIMESTAMPTZ,
  unread_count INTEGER DEFAULT 0, last_message_at TIMESTAMPTZ DEFAULT now(),
  last_customer_message_at TIMESTAMPTZ, auto_close_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL, sender_id UUID, content TEXT,
  message_type TEXT DEFAULT 'text', media_url TEXT, status TEXT DEFAULT 'sent',
  whatsapp_message_id TEXT, ai_suggested BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL UNIQUE REFERENCES public.companies(id) ON DELETE CASCADE,
  is_enabled BOOLEAN NOT NULL DEFAULT true, creativity_level INTEGER NOT NULL DEFAULT 50,
  auto_reply BOOLEAN NOT NULL DEFAULT true, review_before_send BOOLEAN NOT NULL DEFAULT false,
  use_emoji BOOLEAN NOT NULL DEFAULT true,
  system_prompt TEXT DEFAULT 'أنت مساعد ذكي لخدمة العملاء.',
  model_preference TEXT DEFAULT 'google/gemini-3-flash-preview',
  max_tokens INTEGER DEFAULT 1000, max_messages_per_conversation INTEGER DEFAULT 15,
  on_limit_reached TEXT DEFAULT 'handoff',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  category TEXT NOT NULL, question TEXT NOT NULL, answer TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}', is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0, usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.messages(id),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  suggested_response TEXT NOT NULL, intent TEXT, confidence NUMERIC,
  was_used BOOLEAN NOT NULL DEFAULT false, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.conversations(id),
  user_message TEXT NOT NULL, ai_response TEXT, model_used TEXT,
  tokens_used INTEGER, response_time_ms INTEGER,
  was_used BOOLEAN DEFAULT false, was_modified BOOLEAN DEFAULT false, sentiment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_command_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID, command_name TEXT NOT NULL, command_input TEXT, command_output TEXT,
  execution_time_ms INTEGER, was_successful BOOLEAN DEFAULT true, error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_prompt_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL UNIQUE REFERENCES public.companies(id) ON DELETE CASCADE,
  goals TEXT DEFAULT '', personality TEXT DEFAULT '',
  guidelines TEXT DEFAULT '', restrictions TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_provider_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID UNIQUE REFERENCES public.companies(id) ON DELETE CASCADE,
  primary_provider TEXT DEFAULT 'lovable', primary_model TEXT DEFAULT 'google/gemini-2.5-flash',
  fallback_provider TEXT DEFAULT 'lovable', fallback_model TEXT DEFAULT 'google/gemini-3-flash-preview',
  fallback_enabled BOOLEAN DEFAULT true, max_retries INTEGER DEFAULT 2, timeout_ms INTEGER DEFAULT 30000,
  consecutive_failures INTEGER DEFAULT 0, last_failure_at TIMESTAMPTZ, is_primary_healthy BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_response_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_response_id UUID REFERENCES public.ai_responses(id),
  knowledge_entry_id UUID REFERENCES public.ai_knowledge_base(id),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  usage_type TEXT NOT NULL DEFAULT 'used', used_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_usage_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL UNIQUE REFERENCES public.companies(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL DEFAULT 'basic',
  daily_message_limit INTEGER NOT NULL DEFAULT 50, monthly_message_limit INTEGER NOT NULL DEFAULT 500,
  daily_used INTEGER NOT NULL DEFAULT 0, monthly_used INTEGER NOT NULL DEFAULT 0,
  last_reset_daily DATE NOT NULL DEFAULT CURRENT_DATE,
  last_reset_monthly DATE NOT NULL DEFAULT (date_trunc('month', CURRENT_DATE))::date,
  extra_credits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.conversations(id),
  message_id UUID REFERENCES public.messages(id),
  intent TEXT, intent_ar TEXT, confidence NUMERIC,
  entities JSONB DEFAULT '{}', actions JSONB DEFAULT '[]',
  customer_stage TEXT, sentiment TEXT, risk_flags TEXT[] DEFAULT '{}',
  reasoning_summary TEXT, suggested_response TEXT, decision TEXT,
  executed_at TIMESTAMPTZ, execution_status TEXT, execution_error TEXT,
  model_used TEXT, tokens_used INTEGER, response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tenant_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  policy_type TEXT NOT NULL, policy_data JSONB DEFAULT '{}', is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(company_id, policy_type)
);

CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  ai_run_id UUID REFERENCES public.ai_runs(id),
  conversation_id UUID REFERENCES public.conversations(id),
  task_type TEXT NOT NULL, title TEXT, description TEXT,
  status TEXT DEFAULT 'pending', priority TEXT DEFAULT 'medium',
  assigned_to UUID, due_at TIMESTAMPTZ, completed_at TIMESTAMPTZ, completed_by UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.conversations(id),
  ai_run_id UUID REFERENCES public.ai_runs(id),
  task_id UUID REFERENCES public.tasks(id),
  event_type TEXT NOT NULL, actor_id UUID, actor_type TEXT, event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.industry_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  industry_type TEXT NOT NULL, workflow_name TEXT NOT NULL, trigger_intent TEXT,
  steps JSONB DEFAULT '[]', is_active BOOLEAN DEFAULT true, priority INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0, fail_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.industry_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_type TEXT UNIQUE NOT NULL, system_prompt TEXT NOT NULL,
  personality TEXT, guidelines TEXT, restrictions TEXT,
  intents JSONB DEFAULT '[]', entities JSONB DEFAULT '[]', sample_conversations JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.connectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  connector_type TEXT NOT NULL, connector_name TEXT NOT NULL,
  config JSONB, credentials JSONB, is_active BOOLEAN DEFAULT true,
  sync_status TEXT, sync_error TEXT, last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);