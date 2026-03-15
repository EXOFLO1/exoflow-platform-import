-- ============================================================
-- STEP 2: Enable RLS on all tables created in step 1 + Functions
-- ============================================================
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.super_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_command_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_prompt_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_provider_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_response_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connectors ENABLE ROW LEVEL SECURITY;

-- Helper Functions
CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id UUID DEFAULT auth.uid())
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ SELECT company_id FROM public.company_users WHERE user_id = _user_id AND is_active = true LIMIT 1 $$;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ SELECT EXISTS (SELECT 1 FROM public.super_admins WHERE user_id = _user_id AND is_active = true) $$;

CREATE OR REPLACE FUNCTION public.has_company_role(_user_id UUID, _role TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$ SELECT EXISTS (SELECT 1 FROM public.company_users WHERE user_id = _user_id AND role = _role AND is_active = true) $$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path TO 'public'
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE new_company_id UUID; company_slug TEXT; user_industry_type TEXT;
BEGIN
  company_slug := 'company-' || substr(gen_random_uuid()::text, 1, 8);
  user_industry_type := COALESCE(NEW.raw_user_meta_data->>'industry_type', 'general');
  INSERT INTO public.companies (name, name_ar, slug, created_by, industry_type, onboarding_completed, onboarding_step)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'company_name', ''), COALESCE(NEW.raw_user_meta_data->>'company_name_ar', ''), company_slug, NEW.id, user_industry_type, false, 0)
  RETURNING id INTO new_company_id;
  INSERT INTO public.company_users (company_id, user_id, role, full_name, email)
  VALUES (new_company_id, NEW.id, 'owner', COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END; $$;

CREATE OR REPLACE FUNCTION public.generate_ticket_number(prefix TEXT DEFAULT 'TKT')
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$ BEGIN RETURN prefix || '-' || to_char(now(), 'YYYYMMDD') || '-' || substr(gen_random_uuid()::text, 1, 6); END; $$;

CREATE OR REPLACE FUNCTION public.calculate_sla_deadline(priority TEXT DEFAULT 'medium')
RETURNS TIMESTAMPTZ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$ BEGIN CASE priority WHEN 'urgent' THEN RETURN now() + interval '1 hour'; WHEN 'high' THEN RETURN now() + interval '4 hours'; WHEN 'medium' THEN RETURN now() + interval '24 hours'; WHEN 'low' THEN RETURN now() + interval '72 hours'; ELSE RETURN now() + interval '24 hours'; END CASE; END; $$;

CREATE OR REPLACE FUNCTION public.reset_daily_ai_quotas() RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$ BEGIN UPDATE public.ai_usage_quotas SET daily_used = 0, last_reset_daily = CURRENT_DATE WHERE last_reset_daily < CURRENT_DATE; END; $$;

CREATE OR REPLACE FUNCTION public.reset_monthly_ai_quotas() RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$ BEGIN UPDATE public.ai_usage_quotas SET monthly_used = 0, last_reset_monthly = date_trunc('month', CURRENT_DATE)::date WHERE last_reset_monthly < date_trunc('month', CURRENT_DATE)::date; END; $$;

CREATE OR REPLACE FUNCTION public.check_and_increment_ai_usage(p_company_id UUID) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$ DECLARE quota_record RECORD; effective_daily_limit INTEGER; effective_monthly_limit INTEGER;
BEGIN
  PERFORM reset_daily_ai_quotas(); PERFORM reset_monthly_ai_quotas();
  SELECT * INTO quota_record FROM public.ai_usage_quotas WHERE company_id = p_company_id;
  IF quota_record IS NULL THEN INSERT INTO public.ai_usage_quotas (company_id) VALUES (p_company_id) RETURNING * INTO quota_record; END IF;
  effective_daily_limit := quota_record.daily_message_limit;
  effective_monthly_limit := quota_record.monthly_message_limit + quota_record.extra_credits;
  IF quota_record.plan_type = 'full' THEN
    UPDATE public.ai_usage_quotas SET daily_used = daily_used + 1, monthly_used = monthly_used + 1 WHERE company_id = p_company_id;
    RETURN jsonb_build_object('allowed', true, 'plan_type', quota_record.plan_type);
  END IF;
  IF quota_record.daily_used >= effective_daily_limit THEN RETURN jsonb_build_object('allowed', false, 'reason', 'daily_limit_exceeded'); END IF;
  IF quota_record.monthly_used >= effective_monthly_limit THEN RETURN jsonb_build_object('allowed', false, 'reason', 'monthly_limit_exceeded'); END IF;
  UPDATE public.ai_usage_quotas SET daily_used = daily_used + 1, monthly_used = monthly_used + 1 WHERE company_id = p_company_id;
  RETURN jsonb_build_object('allowed', true);
END; $$;

CREATE OR REPLACE FUNCTION public.check_user_limit(p_company_id UUID) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$ DECLARE plan_record RECORD; current_count INTEGER; pending_invites INTEGER; max_allowed INTEGER;
BEGIN
  SELECT sp.* INTO plan_record FROM companies c LEFT JOIN subscription_plans sp ON c.subscription_plan_id = sp.id WHERE c.id = p_company_id;
  max_allowed := COALESCE(plan_record.max_users, 3);
  SELECT COUNT(*) INTO current_count FROM company_users WHERE company_id = p_company_id AND is_active = true;
  SELECT COUNT(*) INTO pending_invites FROM team_invitations WHERE company_id = p_company_id AND status = 'pending';
  RETURN jsonb_build_object('can_add', (current_count + pending_invites) < max_allowed, 'current_users', current_count, 'max_users', max_allowed);
END; $$;

CREATE OR REPLACE FUNCTION public.ensure_single_default_whatsapp() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$ BEGIN IF NEW.is_default = true THEN UPDATE public.whatsapp_settings SET is_default = false WHERE id != NEW.id AND company_id = NEW.company_id AND is_default = true; END IF; RETURN NEW; END; $$;

-- Trigger for signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS ensure_single_default ON public.whatsapp_settings;
CREATE TRIGGER ensure_single_default BEFORE INSERT OR UPDATE ON public.whatsapp_settings FOR EACH ROW EXECUTE FUNCTION public.ensure_single_default_whatsapp();

-- Core RLS Policies
DO $$ BEGIN CREATE POLICY "Users can view their company" ON public.companies FOR SELECT USING (id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can create companies on signup" ON public.companies FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Owners can update their company" ON public.companies FOR UPDATE USING (id = get_user_company_id() AND has_company_role(auth.uid(), 'owner')); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Super admins can manage all companies" ON public.companies FOR ALL USING (is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view company members" ON public.company_users FOR SELECT USING (company_id = get_user_company_id() OR user_id = auth.uid() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert company users" ON public.company_users FOR INSERT WITH CHECK (company_id = get_user_company_id() OR user_id = auth.uid()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Admins can update company users" ON public.company_users FOR UPDATE USING (company_id = get_user_company_id() AND (has_company_role(auth.uid(), 'owner') OR has_company_role(auth.uid(), 'admin'))); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Super admins can manage all company users" ON public.company_users FOR ALL USING (is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company customers" ON public.customers FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert customers" ON public.customers FOR INSERT WITH CHECK (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can update customers" ON public.customers FOR UPDATE USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can delete customers" ON public.customers FOR DELETE USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company conversations" ON public.conversations FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert conversations" ON public.conversations FOR INSERT WITH CHECK (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can update conversations" ON public.conversations FOR UPDATE USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company messages" ON public.messages FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert messages" ON public.messages FOR INSERT WITH CHECK (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Anyone can view active plans" ON public.subscription_plans FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Super admins can manage plans" ON public.subscription_plans FOR ALL USING (is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Super admins can view themselves" ON public.super_admins FOR SELECT USING (user_id = auth.uid() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Super admins can manage" ON public.super_admins FOR ALL USING (is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company departments" ON public.departments FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL USING (company_id = get_user_company_id() AND (has_company_role(auth.uid(), 'owner') OR has_company_role(auth.uid(), 'admin'))); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- AI Policies
DO $$ BEGIN CREATE POLICY "Users can view their company AI settings" ON public.ai_settings FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Admins can insert AI settings" ON public.ai_settings FOR INSERT WITH CHECK (company_id = get_user_company_id() AND (has_company_role(auth.uid(), 'owner') OR has_company_role(auth.uid(), 'admin'))); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Admins can update AI settings" ON public.ai_settings FOR UPDATE USING (company_id = get_user_company_id() AND (has_company_role(auth.uid(), 'owner') OR has_company_role(auth.uid(), 'admin'))); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company knowledge base" ON public.ai_knowledge_base FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Admins can insert knowledge base" ON public.ai_knowledge_base FOR INSERT WITH CHECK (company_id = get_user_company_id() AND (has_company_role(auth.uid(), 'owner') OR has_company_role(auth.uid(), 'admin'))); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Admins can update knowledge base" ON public.ai_knowledge_base FOR UPDATE USING (company_id = get_user_company_id() AND (has_company_role(auth.uid(), 'owner') OR has_company_role(auth.uid(), 'admin'))); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company ai_responses" ON public.ai_responses FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert ai_responses" ON public.ai_responses FOR INSERT WITH CHECK (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company AI logs" ON public.ai_chat_logs FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert AI logs" ON public.ai_chat_logs FOR INSERT WITH CHECK (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company AI command logs" ON public.ai_command_logs FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert AI command logs" ON public.ai_command_logs FOR INSERT WITH CHECK (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company AI prompts" ON public.ai_prompt_sections FOR SELECT USING (company_id = get_user_company_id(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can manage their company AI prompts" ON public.ai_prompt_sections FOR ALL USING (company_id = get_user_company_id(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Company users can view their AI settings" ON public.ai_provider_settings FOR SELECT USING (company_id = get_user_company_id(auth.uid()) OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company ai_response_usage" ON public.ai_response_usage FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can insert ai_response_usage" ON public.ai_response_usage FOR INSERT WITH CHECK (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Users can view their company AI quotas" ON public.ai_usage_quotas FOR SELECT USING (company_id = get_user_company_id()); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "ai_runs_select" ON public.ai_runs FOR SELECT USING (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "ai_runs_insert" ON public.ai_runs FOR INSERT WITH CHECK (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Other table policies
DO $$ BEGIN CREATE POLICY "tenant_policies_select" ON public.tenant_policies FOR SELECT USING (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "tenant_policies_insert" ON public.tenant_policies FOR INSERT WITH CHECK (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "tasks_select" ON public.tasks FOR SELECT USING (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "tasks_insert" ON public.tasks FOR INSERT WITH CHECK (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "tasks_update" ON public.tasks FOR UPDATE USING (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "events_select" ON public.events FOR SELECT USING (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "events_insert" ON public.events FOR INSERT WITH CHECK (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "workflows_select" ON public.industry_workflows FOR SELECT USING (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "workflows_insert" ON public.industry_workflows FOR INSERT WITH CHECK (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "prompts_select" ON public.industry_prompts FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "connectors_select" ON public.connectors FOR SELECT USING (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "connectors_insert" ON public.connectors FOR INSERT WITH CHECK (company_id = get_user_company_id() OR is_super_admin(auth.uid())); EXCEPTION WHEN duplicate_object THEN NULL; END $$;