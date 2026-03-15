export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      ai_chat_logs: {
        Row: {
          ai_response: string | null
          company_id: string
          conversation_id: string | null
          created_at: string
          id: string
          model_used: string | null
          response_time_ms: number | null
          sentiment: string | null
          tokens_used: number | null
          user_message: string
          was_modified: boolean | null
          was_used: boolean | null
        }
        Insert: {
          ai_response?: string | null
          company_id: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          model_used?: string | null
          response_time_ms?: number | null
          sentiment?: string | null
          tokens_used?: number | null
          user_message: string
          was_modified?: boolean | null
          was_used?: boolean | null
        }
        Update: {
          ai_response?: string | null
          company_id?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          model_used?: string | null
          response_time_ms?: number | null
          sentiment?: string | null
          tokens_used?: number | null
          user_message?: string
          was_modified?: boolean | null
          was_used?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_chat_logs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_command_logs: {
        Row: {
          command_input: string | null
          command_name: string
          command_output: string | null
          company_id: string
          created_at: string
          error_message: string | null
          execution_time_ms: number | null
          id: string
          user_id: string | null
          was_successful: boolean | null
        }
        Insert: {
          command_input?: string | null
          command_name: string
          command_output?: string | null
          company_id: string
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          user_id?: string | null
          was_successful?: boolean | null
        }
        Update: {
          command_input?: string | null
          command_name?: string
          command_output?: string | null
          company_id?: string
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          user_id?: string | null
          was_successful?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_command_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_knowledge_base: {
        Row: {
          answer: string
          category: string
          company_id: string
          created_at: string
          id: string
          is_active: boolean | null
          keywords: string[] | null
          priority: number | null
          question: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          answer: string
          category: string
          company_id: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          priority?: number | null
          question: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          answer?: string
          category?: string
          company_id?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          priority?: number | null
          question?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_knowledge_base_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_prompt_sections: {
        Row: {
          company_id: string
          created_at: string | null
          goals: string | null
          guidelines: string | null
          id: string
          personality: string | null
          restrictions: string | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          goals?: string | null
          guidelines?: string | null
          id?: string
          personality?: string | null
          restrictions?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          goals?: string | null
          guidelines?: string | null
          id?: string
          personality?: string | null
          restrictions?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_prompt_sections_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_provider_settings: {
        Row: {
          company_id: string | null
          consecutive_failures: number | null
          created_at: string | null
          fallback_enabled: boolean | null
          fallback_model: string | null
          fallback_provider: string | null
          id: string
          is_primary_healthy: boolean | null
          last_failure_at: string | null
          max_retries: number | null
          primary_model: string | null
          primary_provider: string | null
          timeout_ms: number | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          consecutive_failures?: number | null
          created_at?: string | null
          fallback_enabled?: boolean | null
          fallback_model?: string | null
          fallback_provider?: string | null
          id?: string
          is_primary_healthy?: boolean | null
          last_failure_at?: string | null
          max_retries?: number | null
          primary_model?: string | null
          primary_provider?: string | null
          timeout_ms?: number | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          consecutive_failures?: number | null
          created_at?: string | null
          fallback_enabled?: boolean | null
          fallback_model?: string | null
          fallback_provider?: string | null
          id?: string
          is_primary_healthy?: boolean | null
          last_failure_at?: string | null
          max_retries?: number | null
          primary_model?: string | null
          primary_provider?: string | null
          timeout_ms?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_provider_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_response_usage: {
        Row: {
          ai_response_id: string | null
          company_id: string
          conversation_id: string
          created_at: string
          id: string
          knowledge_entry_id: string | null
          usage_type: string
          used_by: string | null
        }
        Insert: {
          ai_response_id?: string | null
          company_id: string
          conversation_id: string
          created_at?: string
          id?: string
          knowledge_entry_id?: string | null
          usage_type?: string
          used_by?: string | null
        }
        Update: {
          ai_response_id?: string | null
          company_id?: string
          conversation_id?: string
          created_at?: string
          id?: string
          knowledge_entry_id?: string | null
          usage_type?: string
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_response_usage_ai_response_id_fkey"
            columns: ["ai_response_id"]
            isOneToOne: false
            referencedRelation: "ai_responses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_response_usage_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_response_usage_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_response_usage_knowledge_entry_id_fkey"
            columns: ["knowledge_entry_id"]
            isOneToOne: false
            referencedRelation: "ai_knowledge_base"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_responses: {
        Row: {
          company_id: string
          confidence: number | null
          created_at: string
          id: string
          intent: string | null
          message_id: string | null
          suggested_response: string
          was_used: boolean
        }
        Insert: {
          company_id: string
          confidence?: number | null
          created_at?: string
          id?: string
          intent?: string | null
          message_id?: string | null
          suggested_response: string
          was_used?: boolean
        }
        Update: {
          company_id?: string
          confidence?: number | null
          created_at?: string
          id?: string
          intent?: string | null
          message_id?: string | null
          suggested_response?: string
          was_used?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "ai_responses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_responses_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_runs: {
        Row: {
          actions: Json | null
          company_id: string
          confidence: number | null
          conversation_id: string | null
          created_at: string | null
          customer_stage: string | null
          decision: string | null
          entities: Json | null
          executed_at: string | null
          execution_error: string | null
          execution_status: string | null
          id: string
          intent: string | null
          intent_ar: string | null
          message_id: string | null
          model_used: string | null
          reasoning_summary: string | null
          response_time_ms: number | null
          risk_flags: string[] | null
          sentiment: string | null
          suggested_response: string | null
          tokens_used: number | null
        }
        Insert: {
          actions?: Json | null
          company_id: string
          confidence?: number | null
          conversation_id?: string | null
          created_at?: string | null
          customer_stage?: string | null
          decision?: string | null
          entities?: Json | null
          executed_at?: string | null
          execution_error?: string | null
          execution_status?: string | null
          id?: string
          intent?: string | null
          intent_ar?: string | null
          message_id?: string | null
          model_used?: string | null
          reasoning_summary?: string | null
          response_time_ms?: number | null
          risk_flags?: string[] | null
          sentiment?: string | null
          suggested_response?: string | null
          tokens_used?: number | null
        }
        Update: {
          actions?: Json | null
          company_id?: string
          confidence?: number | null
          conversation_id?: string | null
          created_at?: string | null
          customer_stage?: string | null
          decision?: string | null
          entities?: Json | null
          executed_at?: string | null
          execution_error?: string | null
          execution_status?: string | null
          id?: string
          intent?: string | null
          intent_ar?: string | null
          message_id?: string | null
          model_used?: string | null
          reasoning_summary?: string | null
          response_time_ms?: number | null
          risk_flags?: string[] | null
          sentiment?: string | null
          suggested_response?: string | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_runs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_runs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_runs_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_settings: {
        Row: {
          auto_reply: boolean
          company_id: string
          created_at: string
          creativity_level: number
          id: string
          is_enabled: boolean
          max_messages_per_conversation: number | null
          max_tokens: number | null
          model_preference: string | null
          on_limit_reached: string | null
          review_before_send: boolean
          system_prompt: string | null
          updated_at: string
          use_emoji: boolean
        }
        Insert: {
          auto_reply?: boolean
          company_id: string
          created_at?: string
          creativity_level?: number
          id?: string
          is_enabled?: boolean
          max_messages_per_conversation?: number | null
          max_tokens?: number | null
          model_preference?: string | null
          on_limit_reached?: string | null
          review_before_send?: boolean
          system_prompt?: string | null
          updated_at?: string
          use_emoji?: boolean
        }
        Update: {
          auto_reply?: boolean
          company_id?: string
          created_at?: string
          creativity_level?: number
          id?: string
          is_enabled?: boolean
          max_messages_per_conversation?: number | null
          max_tokens?: number | null
          model_preference?: string | null
          on_limit_reached?: string | null
          review_before_send?: boolean
          system_prompt?: string | null
          updated_at?: string
          use_emoji?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "ai_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_quotas: {
        Row: {
          company_id: string
          created_at: string
          daily_message_limit: number
          daily_used: number
          extra_credits: number
          id: string
          last_reset_daily: string
          last_reset_monthly: string
          monthly_message_limit: number
          monthly_used: number
          plan_type: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          daily_message_limit?: number
          daily_used?: number
          extra_credits?: number
          id?: string
          last_reset_daily?: string
          last_reset_monthly?: string
          monthly_message_limit?: number
          monthly_used?: number
          plan_type?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          daily_message_limit?: number
          daily_used?: number
          extra_credits?: number
          id?: string
          last_reset_daily?: string
          last_reset_monthly?: string
          monthly_message_limit?: number
          monthly_used?: number
          plan_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_usage_quotas_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_notifications: {
        Row: {
          acknowledged: boolean | null
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          company_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          message: string
          sent_via: string[] | null
          severity: string
        }
        Insert: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          company_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          message: string
          sent_via?: string[] | null
          severity: string
        }
        Update: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          company_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          message?: string
          sent_via?: string[] | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_settings: {
        Row: {
          alert_type: string
          company_id: string | null
          created_at: string | null
          id: string
          is_enabled: boolean | null
          notification_channels: Json | null
          notification_emails: string[] | null
          notification_phones: string[] | null
          threshold_period_minutes: number | null
          threshold_value: number | null
          updated_at: string | null
        }
        Insert: {
          alert_type: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          notification_channels?: Json | null
          notification_emails?: string[] | null
          notification_phones?: string[] | null
          threshold_period_minutes?: number | null
          threshold_value?: number | null
          updated_at?: string | null
        }
        Update: {
          alert_type?: string
          company_id?: string | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          notification_channels?: Json | null
          notification_emails?: string[] | null
          notification_phones?: string[] | null
          threshold_period_minutes?: number | null
          threshold_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      automated_message_logs: {
        Row: {
          automated_message_id: string | null
          company_id: string
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          error_message: string | null
          id: string
          message_text: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          automated_message_id?: string | null
          company_id: string
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          error_message?: string | null
          id?: string
          message_text?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          automated_message_id?: string | null
          company_id?: string
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          error_message?: string | null
          id?: string
          message_text?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automated_message_logs_automated_message_id_fkey"
            columns: ["automated_message_id"]
            isOneToOne: false
            referencedRelation: "automated_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automated_message_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automated_message_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      automated_messages: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          message_text: string
          name: string
          sent_count: number | null
          target_audience: string | null
          target_filter: Json | null
          template_id: string | null
          trigger_event: string | null
          trigger_type: string
          trigger_value: number | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message_text: string
          name: string
          sent_count?: number | null
          target_audience?: string | null
          target_filter?: Json | null
          template_id?: string | null
          trigger_event?: string | null
          trigger_type?: string
          trigger_value?: number | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message_text?: string
          name?: string
          sent_count?: number | null
          target_audience?: string | null
          target_filter?: Json | null
          template_id?: string | null
          trigger_event?: string | null
          trigger_type?: string
          trigger_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automated_messages_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automated_messages_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_analytics: {
        Row: {
          campaign_id: string
          clicks: number | null
          company_id: string
          conversions: number | null
          cost_spent: number | null
          created_at: string
          date: string
          id: string
          impressions: number | null
          leads_generated: number | null
          messages_opened: number | null
          messages_sent: number | null
          revenue_generated: number | null
        }
        Insert: {
          campaign_id: string
          clicks?: number | null
          company_id: string
          conversions?: number | null
          cost_spent?: number | null
          created_at?: string
          date?: string
          id?: string
          impressions?: number | null
          leads_generated?: number | null
          messages_opened?: number | null
          messages_sent?: number | null
          revenue_generated?: number | null
        }
        Update: {
          campaign_id?: string
          clicks?: number | null
          company_id?: string
          conversions?: number | null
          cost_spent?: number | null
          created_at?: string
          date?: string
          id?: string
          impressions?: number | null
          leads_generated?: number | null
          messages_opened?: number | null
          messages_sent?: number | null
          revenue_generated?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_analytics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_recipients: {
        Row: {
          campaign_id: string
          created_at: string
          customer_id: string | null
          customer_name: string | null
          delivered_at: string | null
          error_message: string | null
          id: string
          phone: string
          read_at: string | null
          sent_at: string | null
          status: string
          whatsapp_message_id: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string
          customer_id?: string | null
          customer_name?: string | null
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          phone: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          whatsapp_message_id?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string
          customer_id?: string | null
          customer_name?: string | null
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          phone?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_recipients_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          activation_paid: boolean | null
          activation_paid_at: string | null
          created_at: string | null
          created_by: string | null
          enabled_features: string[] | null
          id: string
          industry_type: string | null
          is_active: boolean | null
          is_trial: boolean | null
          logo_url: string | null
          name: string
          name_ar: string | null
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
          onboarding_step: number | null
          primary_color: string | null
          secondary_color: string | null
          settings: Json | null
          slug: string
          subscription_end: string | null
          subscription_plan_id: string | null
          subscription_start: string | null
          trial_ends_at: string | null
          updated_at: string | null
          whatsapp_phone_id: string | null
          whatsapp_token: string | null
        }
        Insert: {
          activation_paid?: boolean | null
          activation_paid_at?: string | null
          created_at?: string | null
          created_by?: string | null
          enabled_features?: string[] | null
          id?: string
          industry_type?: string | null
          is_active?: boolean | null
          is_trial?: boolean | null
          logo_url?: string | null
          name: string
          name_ar?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          onboarding_step?: number | null
          primary_color?: string | null
          secondary_color?: string | null
          settings?: Json | null
          slug: string
          subscription_end?: string | null
          subscription_plan_id?: string | null
          subscription_start?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          whatsapp_phone_id?: string | null
          whatsapp_token?: string | null
        }
        Update: {
          activation_paid?: boolean | null
          activation_paid_at?: string | null
          created_at?: string | null
          created_by?: string | null
          enabled_features?: string[] | null
          id?: string
          industry_type?: string | null
          is_active?: boolean | null
          is_trial?: boolean | null
          logo_url?: string | null
          name?: string
          name_ar?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
          onboarding_step?: number | null
          primary_color?: string | null
          secondary_color?: string | null
          settings?: Json | null
          slug?: string
          subscription_end?: string | null
          subscription_plan_id?: string | null
          subscription_start?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          whatsapp_phone_id?: string | null
          whatsapp_token?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_subscription_plan_id_fkey"
            columns: ["subscription_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      company_info: {
        Row: {
          address: string | null
          address_ar: string | null
          company_id: string
          created_at: string
          custom_fields: Json | null
          description: string | null
          description_ar: string | null
          email: string | null
          id: string
          locations: Json | null
          phone: string | null
          policies: Json | null
          prices: Json | null
          services: Json | null
          team_members: Json | null
          updated_at: string
          website: string | null
          working_hours: Json | null
        }
        Insert: {
          address?: string | null
          address_ar?: string | null
          company_id: string
          created_at?: string
          custom_fields?: Json | null
          description?: string | null
          description_ar?: string | null
          email?: string | null
          id?: string
          locations?: Json | null
          phone?: string | null
          policies?: Json | null
          prices?: Json | null
          services?: Json | null
          team_members?: Json | null
          updated_at?: string
          website?: string | null
          working_hours?: Json | null
        }
        Update: {
          address?: string | null
          address_ar?: string | null
          company_id?: string
          created_at?: string
          custom_fields?: Json | null
          description?: string | null
          description_ar?: string | null
          email?: string | null
          id?: string
          locations?: Json | null
          phone?: string | null
          policies?: Json | null
          prices?: Json | null
          services?: Json | null
          team_members?: Json | null
          updated_at?: string
          website?: string | null
          working_hours?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "company_info_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_marketing_settings: {
        Row: {
          company_id: string
          created_at: string
          id: string
          industry_type: string
          quick_descriptions: Json
          targeting_categories: Json
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          industry_type?: string
          quick_descriptions?: Json
          targeting_categories?: Json
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          industry_type?: string
          quick_descriptions?: Json
          targeting_categories?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_marketing_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_pattern_contributions: {
        Row: {
          company_id: string | null
          contribution_weight: number | null
          created_at: string | null
          id: string
          last_synced_at: string | null
          local_success_rate: number | null
          local_usage_count: number | null
          pattern_id: string | null
        }
        Insert: {
          company_id?: string | null
          contribution_weight?: number | null
          created_at?: string | null
          id?: string
          last_synced_at?: string | null
          local_success_rate?: number | null
          local_usage_count?: number | null
          pattern_id?: string | null
        }
        Update: {
          company_id?: string | null
          contribution_weight?: number | null
          created_at?: string | null
          id?: string
          last_synced_at?: string | null
          local_success_rate?: number | null
          local_usage_count?: number | null
          pattern_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_pattern_contributions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_pattern_contributions_pattern_id_fkey"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "global_learned_patterns"
            referencedColumns: ["id"]
          },
        ]
      }
      company_twilio_accounts: {
        Row: {
          card_linked_at: string | null
          company_id: string
          created_at: string | null
          id: string
          phone_number_sid: string | null
          status: string | null
          twilio_account_sid: string
          twilio_auth_token: string
          updated_at: string | null
          whatsapp_number: string | null
        }
        Insert: {
          card_linked_at?: string | null
          company_id: string
          created_at?: string | null
          id?: string
          phone_number_sid?: string | null
          status?: string | null
          twilio_account_sid: string
          twilio_auth_token: string
          updated_at?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          card_linked_at?: string | null
          company_id?: string
          created_at?: string | null
          id?: string
          phone_number_sid?: string | null
          status?: string | null
          twilio_account_sid?: string
          twilio_auth_token?: string
          updated_at?: string | null
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_twilio_accounts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_ui_settings: {
        Row: {
          company_id: string
          created_at: string
          custom_labels: Json | null
          hidden_ai_hub_tabs: string[] | null
          hidden_sections: string[] | null
          hidden_settings_tabs: string[] | null
          id: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          custom_labels?: Json | null
          hidden_ai_hub_tabs?: string[] | null
          hidden_sections?: string[] | null
          hidden_settings_tabs?: string[] | null
          id?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          custom_labels?: Json | null
          hidden_ai_hub_tabs?: string[] | null
          hidden_sections?: string[] | null
          hidden_settings_tabs?: string[] | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_ui_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_usage: {
        Row: {
          company_id: string
          created_at: string
          current_storage_bytes: number
          current_users: number
          id: string
          last_conversation_reset: string | null
          monthly_conversations: number
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          current_storage_bytes?: number
          current_users?: number
          id?: string
          last_conversation_reset?: string | null
          monthly_conversations?: number
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          current_storage_bytes?: number
          current_users?: number
          id?: string
          last_conversation_reset?: string | null
          monthly_conversations?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_usage_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_users: {
        Row: {
          avatar_url: string | null
          company_id: string
          department: string | null
          department_id: string | null
          email: string | null
          full_name: string | null
          id: string
          invited_by: string | null
          is_active: boolean | null
          joined_at: string | null
          phone: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          company_id: string
          department?: string | null
          department_id?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          company_id?: string
          department?: string | null
          department_id?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_users_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      connectors: {
        Row: {
          company_id: string
          config: Json | null
          connector_name: string
          connector_type: string
          created_at: string | null
          credentials: Json | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          sync_error: string | null
          sync_status: string | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          config?: Json | null
          connector_name: string
          connector_type: string
          created_at?: string | null
          credentials?: Json | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          sync_error?: string | null
          sync_status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          config?: Json | null
          connector_name?: string
          connector_type?: string
          created_at?: string | null
          credentials?: Json | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          sync_error?: string | null
          sync_status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connectors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_sentiment_history: {
        Row: {
          company_id: string
          conversation_id: string
          created_at: string
          detected_issues: string[] | null
          escalation_reason: string | null
          id: string
          keywords: string[] | null
          message_id: string | null
          requires_escalation: boolean | null
          sentiment: string
          sentiment_score: number | null
        }
        Insert: {
          company_id: string
          conversation_id: string
          created_at?: string
          detected_issues?: string[] | null
          escalation_reason?: string | null
          id?: string
          keywords?: string[] | null
          message_id?: string | null
          requires_escalation?: boolean | null
          sentiment: string
          sentiment_score?: number | null
        }
        Update: {
          company_id?: string
          conversation_id?: string
          created_at?: string
          detected_issues?: string[] | null
          escalation_reason?: string | null
          id?: string
          keywords?: string[] | null
          message_id?: string | null
          requires_escalation?: boolean | null
          sentiment?: string
          sentiment_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_sentiment_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_sentiment_history_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_sentiment_history_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_settings: {
        Row: {
          auto_close_enabled: boolean | null
          auto_close_hours: number | null
          company_id: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          auto_close_enabled?: boolean | null
          auto_close_hours?: number | null
          company_id: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          auto_close_enabled?: boolean | null
          auto_close_hours?: number | null
          company_id?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_tag_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          company_id: string
          conversation_id: string
          id: string
          tag_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          company_id: string
          conversation_id: string
          id?: string
          tag_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          company_id?: string
          conversation_id?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_tag_assignments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_tag_assignments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_tag_assignments_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "conversation_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_tags: {
        Row: {
          color: string
          company_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          name_ar: string | null
          updated_at: string
        }
        Insert: {
          color?: string
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          name_ar?: string | null
          updated_at?: string
        }
        Update: {
          color?: string
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          name_ar?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_tags_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          ai_enabled: boolean | null
          archived: boolean | null
          archived_at: string | null
          assigned_department_id: string | null
          assigned_to: string | null
          auto_close_at: string | null
          company_id: string
          created_at: string | null
          customer_id: string
          id: string
          last_customer_message_at: string | null
          last_message_at: string | null
          status: string | null
          unread_count: number | null
          updated_at: string | null
        }
        Insert: {
          ai_enabled?: boolean | null
          archived?: boolean | null
          archived_at?: string | null
          assigned_department_id?: string | null
          assigned_to?: string | null
          auto_close_at?: string | null
          company_id: string
          created_at?: string | null
          customer_id: string
          id?: string
          last_customer_message_at?: string | null
          last_message_at?: string | null
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
        }
        Update: {
          ai_enabled?: boolean | null
          archived?: boolean | null
          archived_at?: string | null
          assigned_department_id?: string | null
          assigned_to?: string | null
          auto_close_at?: string | null
          company_id?: string
          created_at?: string | null
          customer_id?: string
          id?: string
          last_customer_message_at?: string | null
          last_message_at?: string | null
          status?: string | null
          unread_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_assigned_department_id_fkey"
            columns: ["assigned_department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_ui_sections: {
        Row: {
          company_id: string
          config: Json | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          parent_section: string | null
          section_id: string
          section_name: string
          section_name_ar: string
          section_type: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          company_id: string
          config?: Json | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          parent_section?: string | null
          section_id: string
          section_name: string
          section_name_ar: string
          section_type?: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          config?: Json | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          parent_section?: string | null
          section_id?: string
          section_name?: string
          section_name_ar?: string
          section_type?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_ui_sections_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_analysis_history: {
        Row: {
          analysis_context: Json | null
          company_id: string
          conversation_id: string | null
          created_at: string
          customer_profile_id: string
          detected_emotion: string | null
          detected_intent: string | null
          id: string
          persuasion_attempt: string | null
          persuasion_success: boolean | null
          sentiment_score: number | null
        }
        Insert: {
          analysis_context?: Json | null
          company_id: string
          conversation_id?: string | null
          created_at?: string
          customer_profile_id: string
          detected_emotion?: string | null
          detected_intent?: string | null
          id?: string
          persuasion_attempt?: string | null
          persuasion_success?: boolean | null
          sentiment_score?: number | null
        }
        Update: {
          analysis_context?: Json | null
          company_id?: string
          conversation_id?: string | null
          created_at?: string
          customer_profile_id?: string
          detected_emotion?: string | null
          detected_intent?: string | null
          id?: string
          persuasion_attempt?: string | null
          persuasion_success?: boolean | null
          sentiment_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_analysis_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_analysis_history_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_analysis_history_customer_profile_id_fkey"
            columns: ["customer_profile_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_appointments: {
        Row: {
          company_id: string
          conversation_id: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string
          description: string | null
          duration_minutes: number | null
          id: string
          location: string | null
          reminder_sent: boolean | null
          reminder_sent_at: string | null
          reminder_type: string | null
          scheduled_at: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          conversation_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          reminder_type?: string | null
          scheduled_at: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          conversation_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          reminder_type?: string | null
          scheduled_at?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_appointments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_appointments_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_internal_notes: {
        Row: {
          company_id: string
          content: string
          created_at: string | null
          created_by: string | null
          customer_id: string
          id: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          content: string
          created_at?: string | null
          created_by?: string | null
          customer_id: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          content?: string
          created_at?: string | null
          created_by?: string | null
          customer_id?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_internal_notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_internal_notes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_profiles: {
        Row: {
          ai_summary: string | null
          average_order_value: number | null
          behavioral_type: string | null
          best_persuasion_strategy: string | null
          churn_risk: number | null
          company_id: string
          created_at: string
          current_emotion: string | null
          customer_id: string
          detected_interests: string[] | null
          detected_pain_points: string[] | null
          id: string
          journey_stage: string | null
          last_analysis_at: string | null
          last_negative_interaction: string | null
          last_positive_interaction: string | null
          lifetime_value: number | null
          personality_type: string | null
          preferred_communication_style: string | null
          preferred_language: string | null
          purchase_probability: number | null
          total_complaints: number | null
          total_orders: number | null
          total_returns: number | null
          trust_level: number | null
          updated_at: string
        }
        Insert: {
          ai_summary?: string | null
          average_order_value?: number | null
          behavioral_type?: string | null
          best_persuasion_strategy?: string | null
          churn_risk?: number | null
          company_id: string
          created_at?: string
          current_emotion?: string | null
          customer_id: string
          detected_interests?: string[] | null
          detected_pain_points?: string[] | null
          id?: string
          journey_stage?: string | null
          last_analysis_at?: string | null
          last_negative_interaction?: string | null
          last_positive_interaction?: string | null
          lifetime_value?: number | null
          personality_type?: string | null
          preferred_communication_style?: string | null
          preferred_language?: string | null
          purchase_probability?: number | null
          total_complaints?: number | null
          total_orders?: number | null
          total_returns?: number | null
          trust_level?: number | null
          updated_at?: string
        }
        Update: {
          ai_summary?: string | null
          average_order_value?: number | null
          behavioral_type?: string | null
          best_persuasion_strategy?: string | null
          churn_risk?: number | null
          company_id?: string
          created_at?: string
          current_emotion?: string | null
          customer_id?: string
          detected_interests?: string[] | null
          detected_pain_points?: string[] | null
          id?: string
          journey_stage?: string | null
          last_analysis_at?: string | null
          last_negative_interaction?: string | null
          last_positive_interaction?: string | null
          lifetime_value?: number | null
          personality_type?: string | null
          preferred_communication_style?: string | null
          preferred_language?: string | null
          purchase_probability?: number | null
          total_complaints?: number | null
          total_orders?: number | null
          total_returns?: number | null
          trust_level?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_profiles_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          company_id: string
          created_at: string | null
          email: string | null
          id: string
          last_message_at: string | null
          name: string | null
          notes: string | null
          phone: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          email?: string | null
          id?: string
          last_message_at?: string | null
          name?: string | null
          notes?: string | null
          phone: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          email?: string | null
          id?: string
          last_message_at?: string | null
          name?: string | null
          notes?: string | null
          phone?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_settings: {
        Row: {
          background_color: string | null
          background_image_url: string | null
          background_type: string | null
          company_id: string
          created_at: string
          id: string
          overlay_opacity: number | null
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          background_image_url?: string | null
          background_type?: string | null
          company_id: string
          created_at?: string
          id?: string
          overlay_opacity?: number | null
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          background_image_url?: string | null
          background_type?: string | null
          company_id?: string
          created_at?: string
          id?: string
          overlay_opacity?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_requests: {
        Row: {
          company: string | null
          company_size: string | null
          created_at: string
          email: string
          id: string
          industry: string | null
          message: string | null
          name: string
          notes: string | null
          package: string | null
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          company_size?: string | null
          created_at?: string
          email: string
          id?: string
          industry?: string | null
          message?: string | null
          name: string
          notes?: string | null
          package?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          company_size?: string | null
          created_at?: string
          email?: string
          id?: string
          industry?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          package?: string | null
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          color: string | null
          company_id: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          manager_id: string | null
          name: string
          name_ar: string | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          company_id: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          manager_id?: string | null
          name: string
          name_ar?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          company_id?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          manager_id?: string | null
          name?: string
          name_ar?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "departments_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "company_users"
            referencedColumns: ["id"]
          },
        ]
      }
      discovered_faqs: {
        Row: {
          answer_variations: Json | null
          auto_added_to_kb: boolean | null
          best_answer: string | null
          contributing_companies: number | null
          created_at: string | null
          frequency_score: number | null
          id: string
          is_verified: boolean | null
          quality_score: number | null
          question_pattern: string
          question_variations: Json | null
          sector: string
          updated_at: string | null
        }
        Insert: {
          answer_variations?: Json | null
          auto_added_to_kb?: boolean | null
          best_answer?: string | null
          contributing_companies?: number | null
          created_at?: string | null
          frequency_score?: number | null
          id?: string
          is_verified?: boolean | null
          quality_score?: number | null
          question_pattern: string
          question_variations?: Json | null
          sector: string
          updated_at?: string | null
        }
        Update: {
          answer_variations?: Json | null
          auto_added_to_kb?: boolean | null
          best_answer?: string | null
          contributing_companies?: number | null
          created_at?: string | null
          frequency_score?: number | null
          id?: string
          is_verified?: boolean | null
          quality_score?: number | null
          question_pattern?: string
          question_variations?: Json | null
          sector?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ecommerce_integrations: {
        Row: {
          api_endpoint: string
          api_key: string
          company_id: string
          created_at: string
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          platform_name: string
          products_count: number | null
          store_url: string | null
          sync_error: string | null
          sync_status: string | null
          updated_at: string
        }
        Insert: {
          api_endpoint: string
          api_key: string
          company_id: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          platform_name: string
          products_count?: number | null
          store_url?: string | null
          sync_error?: string | null
          sync_status?: string | null
          updated_at?: string
        }
        Update: {
          api_endpoint?: string
          api_key?: string
          company_id?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          platform_name?: string
          products_count?: number | null
          store_url?: string | null
          sync_error?: string | null
          sync_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ecommerce_integrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ecommerce_orders: {
        Row: {
          billing_address: Json | null
          carrier: string | null
          company_id: string
          created_at: string | null
          currency: string | null
          customer_id: string | null
          delivered_at: string | null
          estimated_delivery: string | null
          external_order_id: string | null
          external_source: string | null
          id: string
          items: Json | null
          notes: string | null
          payment_method: string | null
          payment_status: string | null
          shipping_address: Json | null
          status: string | null
          total_amount: number | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          billing_address?: Json | null
          carrier?: string | null
          company_id: string
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          estimated_delivery?: string | null
          external_order_id?: string | null
          external_source?: string | null
          id?: string
          items?: Json | null
          notes?: string | null
          payment_method?: string | null
          payment_status?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount?: number | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_address?: Json | null
          carrier?: string | null
          company_id?: string
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          estimated_delivery?: string | null
          external_order_id?: string | null
          external_source?: string | null
          id?: string
          items?: Json | null
          notes?: string | null
          payment_method?: string | null
          payment_status?: string | null
          shipping_address?: Json | null
          status?: string | null
          total_amount?: number | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecommerce_orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecommerce_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      ecommerce_products: {
        Row: {
          barcode: string | null
          brand: string | null
          category: string | null
          category_ar: string | null
          company_id: string
          compare_at_price: number | null
          created_at: string
          currency: string | null
          description: string | null
          description_ar: string | null
          external_id: string
          id: string
          images: string[] | null
          integration_id: string
          is_available: boolean | null
          metadata: Json | null
          name: string
          name_ar: string | null
          options: Json | null
          price: number | null
          product_url: string | null
          quantity: number | null
          sku: string | null
          synced_at: string | null
          tags: string[] | null
          updated_at: string
          variants: Json | null
          vendor: string | null
          weight: number | null
          weight_unit: string | null
        }
        Insert: {
          barcode?: string | null
          brand?: string | null
          category?: string | null
          category_ar?: string | null
          company_id: string
          compare_at_price?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          description_ar?: string | null
          external_id: string
          id?: string
          images?: string[] | null
          integration_id: string
          is_available?: boolean | null
          metadata?: Json | null
          name: string
          name_ar?: string | null
          options?: Json | null
          price?: number | null
          product_url?: string | null
          quantity?: number | null
          sku?: string | null
          synced_at?: string | null
          tags?: string[] | null
          updated_at?: string
          variants?: Json | null
          vendor?: string | null
          weight?: number | null
          weight_unit?: string | null
        }
        Update: {
          barcode?: string | null
          brand?: string | null
          category?: string | null
          category_ar?: string | null
          company_id?: string
          compare_at_price?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          description_ar?: string | null
          external_id?: string
          id?: string
          images?: string[] | null
          integration_id?: string
          is_available?: boolean | null
          metadata?: Json | null
          name?: string
          name_ar?: string | null
          options?: Json | null
          price?: number | null
          product_url?: string | null
          quantity?: number | null
          sku?: string | null
          synced_at?: string | null
          tags?: string[] | null
          updated_at?: string
          variants?: Json | null
          vendor?: string | null
          weight?: number | null
          weight_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecommerce_products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecommerce_products_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "ecommerce_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      ecommerce_returns: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          company_id: string
          created_at: string | null
          customer_id: string | null
          description: string | null
          id: string
          order_id: string | null
          photos: string[] | null
          reason: string | null
          reason_category: string | null
          refund_amount: number | null
          refund_status: string | null
          refunded_at: string | null
          return_number: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          company_id: string
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          order_id?: string | null
          photos?: string[] | null
          reason?: string | null
          reason_category?: string | null
          refund_amount?: number | null
          refund_status?: string | null
          refunded_at?: string | null
          return_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          company_id?: string
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          order_id?: string | null
          photos?: string[] | null
          reason?: string | null
          reason_category?: string | null
          refund_amount?: number | null
          refund_status?: string | null
          refunded_at?: string | null
          return_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ecommerce_returns_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecommerce_returns_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecommerce_returns_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "ecommerce_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      education_courses: {
        Row: {
          company_id: string
          course_code: string | null
          created_at: string | null
          currency: string | null
          current_participants: number | null
          description: string | null
          description_ar: string | null
          duration_hours: number | null
          end_date: string | null
          id: string
          instructor_name: string | null
          instructor_name_ar: string | null
          is_online: boolean | null
          location: string | null
          max_participants: number | null
          meeting_link: string | null
          price: number | null
          schedule: Json | null
          start_date: string | null
          status: string | null
          title: string
          title_ar: string | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          course_code?: string | null
          created_at?: string | null
          currency?: string | null
          current_participants?: number | null
          description?: string | null
          description_ar?: string | null
          duration_hours?: number | null
          end_date?: string | null
          id?: string
          instructor_name?: string | null
          instructor_name_ar?: string | null
          is_online?: boolean | null
          location?: string | null
          max_participants?: number | null
          meeting_link?: string | null
          price?: number | null
          schedule?: Json | null
          start_date?: string | null
          status?: string | null
          title: string
          title_ar?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          course_code?: string | null
          created_at?: string | null
          currency?: string | null
          current_participants?: number | null
          description?: string | null
          description_ar?: string | null
          duration_hours?: number | null
          end_date?: string | null
          id?: string
          instructor_name?: string | null
          instructor_name_ar?: string | null
          is_online?: boolean | null
          location?: string | null
          max_participants?: number | null
          meeting_link?: string | null
          price?: number | null
          schedule?: Json | null
          start_date?: string | null
          status?: string | null
          title?: string
          title_ar?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_courses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      education_enrollments: {
        Row: {
          certificate_issued: boolean | null
          certificate_url: string | null
          company_id: string
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          customer_id: string | null
          enrolled_at: string | null
          enrollment_number: string | null
          id: string
          notes: string | null
          payment_amount: number | null
          payment_status: string | null
          progress_percentage: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          certificate_issued?: boolean | null
          certificate_url?: string | null
          company_id: string
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          enrolled_at?: string | null
          enrollment_number?: string | null
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          progress_percentage?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          certificate_issued?: boolean | null
          certificate_url?: string | null
          company_id?: string
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          enrolled_at?: string | null
          enrollment_number?: string | null
          id?: string
          notes?: string | null
          payment_amount?: number | null
          payment_status?: string | null
          progress_percentage?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_enrollments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "education_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_enrollments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_integrations: {
        Row: {
          api_endpoint: string
          api_key: string
          company_id: string
          created_at: string
          id: string
          integration_name: string
          is_active: boolean | null
          last_sync_at: string | null
          updated_at: string
        }
        Insert: {
          api_endpoint: string
          api_key: string
          company_id: string
          created_at?: string
          id?: string
          integration_name: string
          is_active?: boolean | null
          last_sync_at?: string | null
          updated_at?: string
        }
        Update: {
          api_endpoint?: string
          api_key?: string
          company_id?: string
          created_at?: string
          id?: string
          integration_name?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "erp_integrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          actor_id: string | null
          actor_type: string | null
          ai_run_id: string | null
          company_id: string
          conversation_id: string | null
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          task_id: string | null
        }
        Insert: {
          actor_id?: string | null
          actor_type?: string | null
          ai_run_id?: string | null
          company_id: string
          conversation_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          task_id?: string | null
        }
        Update: {
          actor_id?: string | null
          actor_type?: string | null
          ai_run_id?: string | null
          company_id?: string
          conversation_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_ai_run_id_fkey"
            columns: ["ai_run_id"]
            isOneToOne: false
            referencedRelation: "ai_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_consultations: {
        Row: {
          advisor_id: string | null
          advisor_name: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          company_id: string
          completed_at: string | null
          consultation_number: string | null
          consultation_type: string
          created_at: string | null
          customer_feedback: string | null
          customer_id: string | null
          customer_rating: number | null
          duration_minutes: number | null
          id: string
          meeting_link: string | null
          notes: string | null
          scheduled_at: string | null
          status: string | null
          topic: string | null
          updated_at: string | null
        }
        Insert: {
          advisor_id?: string | null
          advisor_name?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id: string
          completed_at?: string | null
          consultation_number?: string | null
          consultation_type: string
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_rating?: number | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_at?: string | null
          status?: string | null
          topic?: string | null
          updated_at?: string | null
        }
        Update: {
          advisor_id?: string | null
          advisor_name?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id?: string
          completed_at?: string | null
          consultation_number?: string | null
          consultation_type?: string
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_rating?: number | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_at?: string | null
          status?: string | null
          topic?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_consultations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_consultations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_requests: {
        Row: {
          amount: number | null
          approved_at: string | null
          approved_by: string | null
          assigned_to: string | null
          company_id: string
          completed_at: string | null
          created_at: string | null
          currency: string | null
          customer_id: string | null
          description: string | null
          documents: Json | null
          id: string
          notes: string | null
          rejected_at: string | null
          rejection_reason: string | null
          request_number: string | null
          request_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          company_id: string
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          description?: string | null
          documents?: Json | null
          id?: string
          notes?: string | null
          rejected_at?: string | null
          rejection_reason?: string | null
          request_number?: string | null
          request_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          approved_at?: string | null
          approved_by?: string | null
          assigned_to?: string | null
          company_id?: string
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          description?: string | null
          documents?: Json | null
          id?: string
          notes?: string | null
          rejected_at?: string | null
          rejection_reason?: string | null
          request_number?: string | null
          request_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      global_learned_patterns: {
        Row: {
          contributing_companies: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          pattern_data: Json | null
          pattern_key: string
          pattern_type: string
          quality_score: number | null
          sector: string
          success_rate: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          contributing_companies?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pattern_data?: Json | null
          pattern_key: string
          pattern_type: string
          quality_score?: number | null
          sector: string
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          contributing_companies?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          pattern_data?: Json | null
          pattern_key?: string
          pattern_type?: string
          quality_score?: number | null
          sector?: string
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      healthcare_appointments: {
        Row: {
          appointment_type: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          company_id: string
          completed_at: string | null
          confirmed_at: string | null
          created_at: string | null
          customer_id: string | null
          department: string | null
          diagnosis: string | null
          doctor_name: string | null
          doctor_name_ar: string | null
          duration_minutes: number | null
          follow_up_date: string | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          is_urgent: boolean | null
          notes: string | null
          prescription: string | null
          scheduled_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_type?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          department?: string | null
          diagnosis?: string | null
          doctor_name?: string | null
          doctor_name_ar?: string | null
          duration_minutes?: number | null
          follow_up_date?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          is_urgent?: boolean | null
          notes?: string | null
          prescription?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_type?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id?: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          department?: string | null
          diagnosis?: string | null
          doctor_name?: string | null
          doctor_name_ar?: string | null
          duration_minutes?: number | null
          follow_up_date?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          is_urgent?: boolean | null
          notes?: string | null
          prescription?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "healthcare_appointments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "healthcare_appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_prompts: {
        Row: {
          created_at: string | null
          entities: Json | null
          guidelines: string | null
          id: string
          industry_type: string
          intents: Json | null
          personality: string | null
          restrictions: string | null
          sample_conversations: Json | null
          system_prompt: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          entities?: Json | null
          guidelines?: string | null
          id?: string
          industry_type: string
          intents?: Json | null
          personality?: string | null
          restrictions?: string | null
          sample_conversations?: Json | null
          system_prompt: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          entities?: Json | null
          guidelines?: string | null
          id?: string
          industry_type?: string
          intents?: Json | null
          personality?: string | null
          restrictions?: string | null
          sample_conversations?: Json | null
          system_prompt?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      industry_workflows: {
        Row: {
          company_id: string
          created_at: string | null
          fail_count: number | null
          id: string
          industry_type: string
          is_active: boolean | null
          priority: number | null
          steps: Json | null
          success_count: number | null
          trigger_intent: string | null
          updated_at: string | null
          workflow_name: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          fail_count?: number | null
          id?: string
          industry_type: string
          is_active?: boolean | null
          priority?: number | null
          steps?: Json | null
          success_count?: number | null
          trigger_intent?: string | null
          updated_at?: string | null
          workflow_name: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          fail_count?: number | null
          id?: string
          industry_type?: string
          is_active?: boolean | null
          priority?: number | null
          steps?: Json | null
          success_count?: number | null
          trigger_intent?: string | null
          updated_at?: string | null
          workflow_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "industry_workflows_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_leads: {
        Row: {
          assigned_to: string | null
          company_name: string | null
          company_size: string | null
          converted_at: string | null
          created_at: string | null
          email: string
          id: string
          industry: string | null
          landing_page_id: string | null
          message: string | null
          name: string
          notes: string | null
          package_interest: string | null
          phone: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          assigned_to?: string | null
          company_name?: string | null
          company_size?: string | null
          converted_at?: string | null
          created_at?: string | null
          email: string
          id?: string
          industry?: string | null
          landing_page_id?: string | null
          message?: string | null
          name: string
          notes?: string | null
          package_interest?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          assigned_to?: string | null
          company_name?: string | null
          company_size?: string | null
          converted_at?: string | null
          created_at?: string | null
          email?: string
          id?: string
          industry?: string | null
          landing_page_id?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          package_interest?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "landing_page_leads_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_pages: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          meta_tags: Json | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          meta_tags?: Json | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          meta_tags?: Json | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lead_activities: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string | null
          id: string
          lead_id: string
          notes: string | null
          outcome: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          lead_id: string
          notes?: string | null
          outcome?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          lead_id?: string
          notes?: string | null
          outcome?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "landing_page_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_analytics: {
        Row: {
          avg_response_quality: number | null
          company_id: string | null
          created_at: string | null
          id: string
          improvement_vs_previous: number | null
          modified_responses: number | null
          patterns_benefited_from: number | null
          patterns_contributed: number | null
          period_end: string
          period_start: string
          rejected_responses: number | null
          successful_responses: number | null
          total_interactions: number | null
        }
        Insert: {
          avg_response_quality?: number | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          improvement_vs_previous?: number | null
          modified_responses?: number | null
          patterns_benefited_from?: number | null
          patterns_contributed?: number | null
          period_end: string
          period_start: string
          rejected_responses?: number | null
          successful_responses?: number | null
          total_interactions?: number | null
        }
        Update: {
          avg_response_quality?: number | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          improvement_vs_previous?: number | null
          modified_responses?: number | null
          patterns_benefited_from?: number | null
          patterns_contributed?: number | null
          period_end?: string
          period_start?: string
          rejected_responses?: number | null
          successful_responses?: number | null
          total_interactions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_analytics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_tickets: {
        Row: {
          actual_cost: number | null
          approved_at: string | null
          approved_by: string | null
          approved_cost: number | null
          assigned_at: string | null
          assigned_to: string | null
          category: string | null
          company_id: string
          completed_at: string | null
          created_at: string | null
          customer_feedback: string | null
          customer_id: string | null
          customer_rating: number | null
          description: string | null
          estimated_cost: number | null
          id: string
          photos: string[] | null
          priority: string | null
          property_id: string | null
          requires_approval: boolean | null
          resolution: string | null
          scheduled_at: string | null
          started_at: string | null
          status: string | null
          subcategory: string | null
          ticket_number: string | null
          title: string | null
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          actual_cost?: number | null
          approved_at?: string | null
          approved_by?: string | null
          approved_cost?: number | null
          assigned_at?: string | null
          assigned_to?: string | null
          category?: string | null
          company_id: string
          completed_at?: string | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_rating?: number | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          photos?: string[] | null
          priority?: string | null
          property_id?: string | null
          requires_approval?: boolean | null
          resolution?: string | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: string | null
          subcategory?: string | null
          ticket_number?: string | null
          title?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          actual_cost?: number | null
          approved_at?: string | null
          approved_by?: string | null
          approved_cost?: number | null
          assigned_at?: string | null
          assigned_to?: string | null
          category?: string | null
          company_id?: string
          completed_at?: string | null
          created_at?: string | null
          customer_feedback?: string | null
          customer_id?: string | null
          customer_rating?: number | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          photos?: string[] | null
          priority?: string | null
          property_id?: string | null
          requires_approval?: boolean | null
          resolution?: string | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: string | null
          subcategory?: string | null
          ticket_number?: string | null
          title?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_tickets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_tickets_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_campaigns: {
        Row: {
          budget: number | null
          campaign_type: string
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string
          target_audience: Json | null
          target_regions: string[] | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          campaign_type?: string
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string
          target_audience?: Json | null
          target_regions?: string[] | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          campaign_type?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string
          target_audience?: Json | null
          target_regions?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_campaigns_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_decision_events: {
        Row: {
          ai_run_id: string | null
          applied_at: string | null
          company_id: string
          conversation_id: string | null
          conversion_value: number | null
          converted: boolean | null
          converted_at: string | null
          customer_id: string | null
          customer_response: string | null
          decision_id: string | null
          decision_type: string | null
          guidance_level: string | null
          id: string
          message_sent: string | null
          notes: string | null
        }
        Insert: {
          ai_run_id?: string | null
          applied_at?: string | null
          company_id: string
          conversation_id?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          converted_at?: string | null
          customer_id?: string | null
          customer_response?: string | null
          decision_id?: string | null
          decision_type?: string | null
          guidance_level?: string | null
          id?: string
          message_sent?: string | null
          notes?: string | null
        }
        Update: {
          ai_run_id?: string | null
          applied_at?: string | null
          company_id?: string
          conversation_id?: string | null
          conversion_value?: number | null
          converted?: boolean | null
          converted_at?: string | null
          customer_id?: string | null
          customer_response?: string | null
          decision_id?: string | null
          decision_type?: string | null
          guidance_level?: string | null
          id?: string
          message_sent?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_decision_events_ai_run_id_fkey"
            columns: ["ai_run_id"]
            isOneToOne: false
            referencedRelation: "ai_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_decision_events_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_decision_events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_decision_events_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_decision_events_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "marketing_decisions"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_decisions: {
        Row: {
          actual_results: Json | null
          ai_reasoning: string | null
          approved_at: string | null
          approved_by: string | null
          campaign_id: string | null
          company_id: string
          confidence_score: number | null
          conversions_count: number | null
          created_at: string
          custom_message: string | null
          decision_type: string
          description: string | null
          end_date: string | null
          expected_impact: Json | null
          guidance_level: string | null
          id: string
          impressions_count: number | null
          is_active: boolean | null
          name: string | null
          priority: string | null
          start_date: string | null
          status: string
          target_regions: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          actual_results?: Json | null
          ai_reasoning?: string | null
          approved_at?: string | null
          approved_by?: string | null
          campaign_id?: string | null
          company_id: string
          confidence_score?: number | null
          conversions_count?: number | null
          created_at?: string
          custom_message?: string | null
          decision_type: string
          description?: string | null
          end_date?: string | null
          expected_impact?: Json | null
          guidance_level?: string | null
          id?: string
          impressions_count?: number | null
          is_active?: boolean | null
          name?: string | null
          priority?: string | null
          start_date?: string | null
          status?: string
          target_regions?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          actual_results?: Json | null
          ai_reasoning?: string | null
          approved_at?: string | null
          approved_by?: string | null
          campaign_id?: string | null
          company_id?: string
          confidence_score?: number | null
          conversions_count?: number | null
          created_at?: string
          custom_message?: string | null
          decision_type?: string
          description?: string | null
          end_date?: string | null
          expected_impact?: Json | null
          guidance_level?: string | null
          id?: string
          impressions_count?: number | null
          is_active?: boolean | null
          name?: string | null
          priority?: string | null
          start_date?: string | null
          status?: string
          target_regions?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_decisions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_decisions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_template_usage: {
        Row: {
          company_id: string
          conversation_id: string | null
          conversion_status: string | null
          conversion_value: number | null
          converted_at: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          message_sent: string | null
          sent_at: string | null
          template_key: string
          template_type: string | null
        }
        Insert: {
          company_id: string
          conversation_id?: string | null
          conversion_status?: string | null
          conversion_value?: number | null
          converted_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          message_sent?: string | null
          sent_at?: string | null
          template_key: string
          template_type?: string | null
        }
        Update: {
          company_id?: string
          conversation_id?: string | null
          conversion_status?: string | null
          conversion_value?: number | null
          converted_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          message_sent?: string | null
          sent_at?: string | null
          template_key?: string
          template_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_template_usage_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_template_usage_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketing_template_usage_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      media_ai_settings: {
        Row: {
          auto_alt_text: boolean | null
          auto_categorize: boolean | null
          auto_tag: boolean | null
          company_id: string
          created_at: string | null
          id: string
          preferred_model: string | null
          updated_at: string | null
        }
        Insert: {
          auto_alt_text?: boolean | null
          auto_categorize?: boolean | null
          auto_tag?: boolean | null
          company_id: string
          created_at?: string | null
          id?: string
          preferred_model?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_alt_text?: boolean | null
          auto_categorize?: boolean | null
          auto_tag?: boolean | null
          company_id?: string
          created_at?: string | null
          id?: string
          preferred_model?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_ai_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      media_files: {
        Row: {
          alt_text: string | null
          company_id: string
          created_at: string | null
          file_size: number | null
          file_type: string
          file_url: string
          folder_id: string | null
          id: string
          metadata: Json | null
          mime_type: string | null
          name: string
          tags: string[] | null
          thumbnail_url: string | null
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          company_id: string
          created_at?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          folder_id?: string | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          name: string
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          company_id?: string
          created_at?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          folder_id?: string | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          name?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_files_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_files_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "media_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      media_folders: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          parent_id: string | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_folders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "media_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      media_usage_log: {
        Row: {
          company_id: string
          context: string | null
          created_at: string | null
          id: string
          media_file_id: string | null
          used_by: string | null
          used_in: string | null
        }
        Insert: {
          company_id: string
          context?: string | null
          created_at?: string | null
          id?: string
          media_file_id?: string | null
          used_by?: string | null
          used_in?: string | null
        }
        Update: {
          company_id?: string
          context?: string | null
          created_at?: string | null
          id?: string
          media_file_id?: string | null
          used_by?: string | null
          used_in?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_usage_log_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_usage_log_media_file_id_fkey"
            columns: ["media_file_id"]
            isOneToOne: false
            referencedRelation: "media_files"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          ai_suggested: boolean | null
          company_id: string
          content: string | null
          conversation_id: string
          created_at: string | null
          id: string
          media_url: string | null
          message_type: string | null
          sender_id: string | null
          sender_type: string
          status: string | null
          whatsapp_message_id: string | null
        }
        Insert: {
          ai_suggested?: boolean | null
          company_id: string
          content?: string | null
          conversation_id: string
          created_at?: string | null
          id?: string
          media_url?: string | null
          message_type?: string | null
          sender_id?: string | null
          sender_type: string
          status?: string | null
          whatsapp_message_id?: string | null
        }
        Update: {
          ai_suggested?: boolean | null
          company_id?: string
          content?: string | null
          conversation_id?: string
          created_at?: string | null
          id?: string
          media_url?: string | null
          message_type?: string | null
          sender_id?: string | null
          sender_type?: string
          status?: string | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      page_events: {
        Row: {
          created_at: string | null
          element_id: string | null
          element_text: string | null
          event_name: string | null
          event_type: string
          id: string
          metadata: Json | null
          page_url: string | null
          scroll_depth: number | null
          session_id: string | null
        }
        Insert: {
          created_at?: string | null
          element_id?: string | null
          element_text?: string | null
          event_name?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          scroll_depth?: number | null
          session_id?: string | null
        }
        Update: {
          created_at?: string | null
          element_id?: string | null
          element_text?: string | null
          event_name?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          page_url?: string | null
          scroll_depth?: number | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      persuasion_tracking: {
        Row: {
          company_id: string
          conversation_id: string | null
          conversion_value: number | null
          created_at: string | null
          customer_id: string | null
          customer_response: string | null
          emotion_after: string | null
          emotion_before: string | null
          id: string
          message_sent: string | null
          notes: string | null
          strategy_used: string | null
          was_successful: boolean | null
        }
        Insert: {
          company_id: string
          conversation_id?: string | null
          conversion_value?: number | null
          created_at?: string | null
          customer_id?: string | null
          customer_response?: string | null
          emotion_after?: string | null
          emotion_before?: string | null
          id?: string
          message_sent?: string | null
          notes?: string | null
          strategy_used?: string | null
          was_successful?: boolean | null
        }
        Update: {
          company_id?: string
          conversation_id?: string | null
          conversion_value?: number | null
          created_at?: string | null
          customer_id?: string | null
          customer_response?: string | null
          emotion_after?: string | null
          emotion_before?: string | null
          id?: string
          message_sent?: string | null
          notes?: string | null
          strategy_used?: string | null
          was_successful?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "persuasion_tracking_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persuasion_tracking_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persuasion_tracking_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_optimizations: {
        Row: {
          created_at: string | null
          id: string
          improvement_metric: number | null
          is_active: boolean | null
          optimization_type: string
          optimized_prompt: string | null
          original_prompt: string | null
          sector: string
          test_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          improvement_metric?: number | null
          is_active?: boolean | null
          optimization_type: string
          optimized_prompt?: string | null
          original_prompt?: string | null
          sector: string
          test_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          improvement_metric?: number | null
          is_active?: boolean | null
          optimization_type?: string
          optimized_prompt?: string | null
          original_prompt?: string | null
          sector?: string
          test_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          amenities: string[] | null
          area_sqm: number | null
          bathrooms: number | null
          bedrooms: number | null
          city: string | null
          company_id: string
          created_at: string | null
          currency: string | null
          description: string | null
          district: string | null
          external_id: string | null
          id: string
          images: string[] | null
          location: Json | null
          manager_id: string | null
          owner_id: string | null
          price: number | null
          price_type: string | null
          property_type: string | null
          status: string | null
          title: string
          title_en: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string | null
          company_id: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          district?: string | null
          external_id?: string | null
          id?: string
          images?: string[] | null
          location?: Json | null
          manager_id?: string | null
          owner_id?: string | null
          price?: number | null
          price_type?: string | null
          property_type?: string | null
          status?: string | null
          title: string
          title_en?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string | null
          company_id?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          district?: string | null
          external_id?: string | null
          id?: string
          images?: string[] | null
          location?: Json | null
          manager_id?: string | null
          owner_id?: string | null
          price?: number | null
          price_type?: string | null
          property_type?: string | null
          status?: string | null
          title?: string
          title_en?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      property_viewings: {
        Row: {
          assigned_to: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          company_id: string
          completed_at: string | null
          confirmed_at: string | null
          created_at: string | null
          customer_id: string | null
          duration_minutes: number | null
          feedback: string | null
          id: string
          notes: string | null
          property_id: string | null
          rating: number | null
          scheduled_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          rating?: number | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id?: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          rating?: number | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_viewings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_viewings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_viewings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      quick_replies: {
        Row: {
          category: string | null
          company_id: string
          content: string
          created_at: string
          created_by: string | null
          id: string
          shortcut: string | null
          title: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          company_id: string
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          shortcut?: string | null
          title: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          company_id?: string
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          shortcut?: string | null
          title?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quick_replies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_orders: {
        Row: {
          company_id: string
          created_at: string | null
          currency: string | null
          customer_id: string | null
          delivered_at: string | null
          delivery_address: Json | null
          delivery_fee: number | null
          delivery_instructions: string | null
          discount: number | null
          driver_id: string | null
          driver_name: string | null
          driver_phone: string | null
          estimated_delivery: string | null
          estimated_ready: string | null
          feedback: string | null
          id: string
          items: Json | null
          order_number: string | null
          order_type: string | null
          payment_method: string | null
          payment_status: string | null
          picked_up_at: string | null
          prepared_at: string | null
          rating: number | null
          reservation_id: string | null
          status: string | null
          subtotal: number | null
          tax: number | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          delivery_address?: Json | null
          delivery_fee?: number | null
          delivery_instructions?: string | null
          discount?: number | null
          driver_id?: string | null
          driver_name?: string | null
          driver_phone?: string | null
          estimated_delivery?: string | null
          estimated_ready?: string | null
          feedback?: string | null
          id?: string
          items?: Json | null
          order_number?: string | null
          order_type?: string | null
          payment_method?: string | null
          payment_status?: string | null
          picked_up_at?: string | null
          prepared_at?: string | null
          rating?: number | null
          reservation_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          delivery_address?: Json | null
          delivery_fee?: number | null
          delivery_instructions?: string | null
          discount?: number | null
          driver_id?: string | null
          driver_name?: string | null
          driver_phone?: string | null
          estimated_delivery?: string | null
          estimated_ready?: string | null
          feedback?: string | null
          id?: string
          items?: Json | null
          order_number?: string | null
          order_type?: string | null
          payment_method?: string | null
          payment_status?: string | null
          picked_up_at?: string | null
          prepared_at?: string | null
          rating?: number | null
          reservation_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_orders_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "restaurant_reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_reservations: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          company_id: string
          completed_at: string | null
          confirmed_at: string | null
          created_at: string | null
          customer_id: string | null
          dietary_restrictions: string[] | null
          duration_minutes: number | null
          id: string
          no_show: boolean | null
          occasion: string | null
          party_size: number
          reminder_sent: boolean | null
          reservation_number: string | null
          scheduled_at: string
          seated_at: string | null
          special_requests: string | null
          status: string | null
          table_number: string | null
          updated_at: string | null
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          dietary_restrictions?: string[] | null
          duration_minutes?: number | null
          id?: string
          no_show?: boolean | null
          occasion?: string | null
          party_size: number
          reminder_sent?: boolean | null
          reservation_number?: string | null
          scheduled_at: string
          seated_at?: string | null
          special_requests?: string | null
          status?: string | null
          table_number?: string | null
          updated_at?: string | null
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          company_id?: string
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          dietary_restrictions?: string[] | null
          duration_minutes?: number | null
          id?: string
          no_show?: boolean | null
          occasion?: string | null
          party_size?: number
          reminder_sent?: boolean | null
          reservation_number?: string | null
          scheduled_at?: string
          seated_at?: string | null
          special_requests?: string | null
          status?: string | null
          table_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_reservations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurant_reservations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_scenario_tracking: {
        Row: {
          company_id: string
          conversation_id: string | null
          customer_id: string | null
          discount_offered: number | null
          id: string
          message_sent: string | null
          notes: string | null
          outcome: string | null
          outcome_at: string | null
          products_offered: string[] | null
          revenue_generated: number | null
          scenario_key: string | null
          scenario_type: string
          trigger_condition: string | null
          triggered_at: string | null
        }
        Insert: {
          company_id: string
          conversation_id?: string | null
          customer_id?: string | null
          discount_offered?: number | null
          id?: string
          message_sent?: string | null
          notes?: string | null
          outcome?: string | null
          outcome_at?: string | null
          products_offered?: string[] | null
          revenue_generated?: number | null
          scenario_key?: string | null
          scenario_type: string
          trigger_condition?: string | null
          triggered_at?: string | null
        }
        Update: {
          company_id?: string
          conversation_id?: string | null
          customer_id?: string | null
          discount_offered?: number | null
          id?: string
          message_sent?: string | null
          notes?: string | null
          outcome?: string | null
          outcome_at?: string | null
          products_offered?: string[] | null
          revenue_generated?: number | null
          scenario_key?: string | null
          scenario_type?: string
          trigger_condition?: string | null
          triggered_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_scenario_tracking_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_scenario_tracking_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_scenario_tracking_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_posts: {
        Row: {
          ai_generated: boolean | null
          channel_id: string | null
          company_id: string
          content: string
          created_at: string | null
          created_by: string | null
          error_message: string | null
          id: string
          media_urls: string[] | null
          published_at: string | null
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          channel_id?: string | null
          company_id: string
          content: string
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          media_urls?: string[] | null
          published_at?: string | null
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          channel_id?: string | null
          company_id?: string
          content?: string
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          media_urls?: string[] | null
          published_at?: string | null
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "social_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_posts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      section_engagement: {
        Row: {
          created_at: string
          first_seen_at: string | null
          id: string
          interactions_count: number | null
          is_visible: boolean | null
          last_seen_at: string | null
          scroll_in_percent: number | null
          scroll_out_percent: number | null
          section_name: string
          session_id: string | null
          time_spent_seconds: number | null
        }
        Insert: {
          created_at?: string
          first_seen_at?: string | null
          id?: string
          interactions_count?: number | null
          is_visible?: boolean | null
          last_seen_at?: string | null
          scroll_in_percent?: number | null
          scroll_out_percent?: number | null
          section_name: string
          session_id?: string | null
          time_spent_seconds?: number | null
        }
        Update: {
          created_at?: string
          first_seen_at?: string | null
          id?: string
          interactions_count?: number | null
          is_visible?: boolean | null
          last_seen_at?: string | null
          scroll_in_percent?: number | null
          scroll_out_percent?: number | null
          section_name?: string
          session_id?: string | null
          time_spent_seconds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "section_engagement_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sector_marketing_templates: {
        Row: {
          company_id: string | null
          content: string
          content_ar: string | null
          created_at: string | null
          id: string
          industry_type: string
          is_active: boolean | null
          template_key: string
          template_type: string
          title: string
          title_ar: string | null
          updated_at: string | null
          usage_count: number | null
          variables: Json | null
        }
        Insert: {
          company_id?: string | null
          content: string
          content_ar?: string | null
          created_at?: string | null
          id?: string
          industry_type: string
          is_active?: boolean | null
          template_key: string
          template_type: string
          title: string
          title_ar?: string | null
          updated_at?: string | null
          usage_count?: number | null
          variables?: Json | null
        }
        Update: {
          company_id?: string | null
          content?: string
          content_ar?: string | null
          created_at?: string | null
          id?: string
          industry_type?: string
          is_active?: boolean | null
          template_key?: string
          template_type?: string
          title?: string
          title_ar?: string | null
          updated_at?: string | null
          usage_count?: number | null
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "sector_marketing_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      sector_quick_replies: {
        Row: {
          category: string
          company_id: string | null
          content: string
          content_ar: string | null
          created_at: string | null
          id: string
          industry_type: string
          is_active: boolean | null
          shortcut: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category: string
          company_id?: string | null
          content: string
          content_ar?: string | null
          created_at?: string | null
          id?: string
          industry_type: string
          is_active?: boolean | null
          shortcut: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          company_id?: string | null
          content?: string
          content_ar?: string | null
          created_at?: string | null
          id?: string
          industry_type?: string
          is_active?: boolean | null
          shortcut?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sector_quick_replies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      sector_sales_scenarios: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          industry_type: string
          is_active: boolean | null
          response_template: string
          response_template_ar: string | null
          scenario_key: string
          scenario_type: string
          success_indicators: Json | null
          title: string
          title_ar: string | null
          trigger_condition: string | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          industry_type: string
          is_active?: boolean | null
          response_template: string
          response_template_ar?: string | null
          scenario_key: string
          scenario_type: string
          success_indicators?: Json | null
          title: string
          title_ar?: string | null
          trigger_condition?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          industry_type?: string
          is_active?: boolean | null
          response_template?: string
          response_template_ar?: string | null
          scenario_key?: string
          scenario_type?: string
          success_indicators?: Json | null
          title?: string
          title_ar?: string | null
          trigger_condition?: string | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sector_sales_scenarios_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      social_channel_messages: {
        Row: {
          channel_id: string
          company_id: string
          content: string | null
          conversation_id: string | null
          created_at: string | null
          direction: string
          external_message_id: string | null
          id: string
          media_url: string | null
          message_type: string | null
          metadata: Json | null
          sender_id: string | null
          sender_name: string | null
          status: string | null
        }
        Insert: {
          channel_id: string
          company_id: string
          content?: string | null
          conversation_id?: string | null
          created_at?: string | null
          direction: string
          external_message_id?: string | null
          id?: string
          media_url?: string | null
          message_type?: string | null
          metadata?: Json | null
          sender_id?: string | null
          sender_name?: string | null
          status?: string | null
        }
        Update: {
          channel_id?: string
          company_id?: string
          content?: string | null
          conversation_id?: string | null
          created_at?: string | null
          direction?: string
          external_message_id?: string | null
          id?: string
          media_url?: string | null
          message_type?: string | null
          metadata?: Json | null
          sender_id?: string | null
          sender_name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_channel_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "social_channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_channel_messages_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_channel_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      social_channels: {
        Row: {
          access_token: string | null
          account_id: string | null
          channel_name: string
          channel_type: string
          company_id: string
          config: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          page_id: string | null
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          account_id?: string | null
          channel_name: string
          channel_type: string
          company_id: string
          config?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          page_id?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          account_id?: string | null
          channel_name?: string
          channel_type?: string
          company_id?: string
          config?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          page_id?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_channels_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_history: {
        Row: {
          action: string
          amount: number | null
          company_id: string
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          plan_id: string | null
        }
        Insert: {
          action: string
          amount?: number | null
          company_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          plan_id?: string | null
        }
        Update: {
          action?: string
          amount?: number | null
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          plan_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_history_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          activation_fee: number | null
          created_at: string | null
          description: string | null
          description_ar: string | null
          features: Json
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          max_conversations: number | null
          max_storage_gb: number | null
          max_users: number
          name: string
          name_ar: string
          price_monthly: number
          price_yearly: number
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          activation_fee?: number | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_conversations?: number | null
          max_storage_gb?: number | null
          max_users?: number
          name: string
          name_ar: string
          price_monthly?: number
          price_yearly?: number
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          activation_fee?: number | null
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_conversations?: number | null
          max_storage_gb?: number | null
          max_users?: number
          name?: string
          name_ar?: string
          price_monthly?: number
          price_yearly?: number
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      successful_persuasion_strategies: {
        Row: {
          avg_conversion_rate: number | null
          contributing_companies: number | null
          created_at: string | null
          customer_emotion: string | null
          customer_stage: string | null
          example_messages: Json | null
          id: string
          is_active: boolean | null
          sector: string
          strategy_description: string | null
          strategy_name: string
          total_attempts: number | null
          total_successes: number | null
          updated_at: string | null
        }
        Insert: {
          avg_conversion_rate?: number | null
          contributing_companies?: number | null
          created_at?: string | null
          customer_emotion?: string | null
          customer_stage?: string | null
          example_messages?: Json | null
          id?: string
          is_active?: boolean | null
          sector: string
          strategy_description?: string | null
          strategy_name: string
          total_attempts?: number | null
          total_successes?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_conversion_rate?: number | null
          contributing_companies?: number | null
          created_at?: string | null
          customer_emotion?: string | null
          customer_stage?: string | null
          example_messages?: Json | null
          id?: string
          is_active?: boolean | null
          sector?: string
          strategy_description?: string | null
          strategy_name?: string
          total_attempts?: number | null
          total_successes?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      successful_responses_pool: {
        Row: {
          contributing_companies: number | null
          created_at: string | null
          customer_emotion: string | null
          customer_stage: string | null
          id: string
          intent: string | null
          is_active: boolean | null
          original_message: string | null
          quality_score: number | null
          sector: string
          success_indicator: string | null
          successful_response: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          contributing_companies?: number | null
          created_at?: string | null
          customer_emotion?: string | null
          customer_stage?: string | null
          id?: string
          intent?: string | null
          is_active?: boolean | null
          original_message?: string | null
          quality_score?: number | null
          sector: string
          success_indicator?: string | null
          successful_response: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          contributing_companies?: number | null
          created_at?: string | null
          customer_emotion?: string | null
          customer_stage?: string | null
          id?: string
          intent?: string | null
          is_active?: boolean | null
          original_message?: string | null
          quality_score?: number | null
          sector?: string
          success_indicator?: string | null
          successful_response?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      super_admins: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          closed_at: string | null
          company_id: string
          created_at: string | null
          customer_id: string | null
          description: string | null
          first_response_at: string | null
          id: string
          metadata: Json | null
          priority: string | null
          resolved_at: string | null
          satisfaction_comment: string | null
          satisfaction_rating: number | null
          sla_deadline: string | null
          status: string | null
          subject: string
          tags: string[] | null
          ticket_number: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          closed_at?: string | null
          company_id: string
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          first_response_at?: string | null
          id?: string
          metadata?: Json | null
          priority?: string | null
          resolved_at?: string | null
          satisfaction_comment?: string | null
          satisfaction_rating?: number | null
          sla_deadline?: string | null
          status?: string | null
          subject: string
          tags?: string[] | null
          ticket_number?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          closed_at?: string | null
          company_id?: string
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          first_response_at?: string | null
          id?: string
          metadata?: Json | null
          priority?: string | null
          resolved_at?: string | null
          satisfaction_comment?: string | null
          satisfaction_rating?: number | null
          sla_deadline?: string | null
          status?: string | null
          subject?: string
          tags?: string[] | null
          ticket_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          company_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          log_type: string
          message: string
          response_time_ms: number | null
          severity: string
          source: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          log_type: string
          message: string
          response_time_ms?: number | null
          severity?: string
          source: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          log_type?: string
          message?: string
          response_time_ms?: number | null
          severity?: string
          source?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_logs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          ai_run_id: string | null
          assigned_to: string | null
          company_id: string
          completed_at: string | null
          completed_by: string | null
          conversation_id: string | null
          created_at: string | null
          description: string | null
          due_at: string | null
          id: string
          metadata: Json | null
          priority: string | null
          status: string | null
          task_type: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          ai_run_id?: string | null
          assigned_to?: string | null
          company_id: string
          completed_at?: string | null
          completed_by?: string | null
          conversation_id?: string | null
          created_at?: string | null
          description?: string | null
          due_at?: string | null
          id?: string
          metadata?: Json | null
          priority?: string | null
          status?: string | null
          task_type: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_run_id?: string | null
          assigned_to?: string | null
          company_id?: string
          completed_at?: string | null
          completed_by?: string | null
          conversation_id?: string | null
          created_at?: string | null
          description?: string | null
          due_at?: string | null
          id?: string
          metadata?: Json | null
          priority?: string | null
          status?: string | null
          task_type?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_ai_run_id_fkey"
            columns: ["ai_run_id"]
            isOneToOne: false
            referencedRelation: "ai_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invitations: {
        Row: {
          accepted_at: string | null
          company_id: string
          created_at: string | null
          department_id: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string
          role: string
          status: string
          token: string
        }
        Insert: {
          accepted_at?: string | null
          company_id: string
          created_at?: string | null
          department_id?: string | null
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          role?: string
          status?: string
          token?: string
        }
        Update: {
          accepted_at?: string | null
          company_id?: string
          created_at?: string | null
          department_id?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          role?: string
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_invitations_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_policies: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          policy_data: Json | null
          policy_type: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          policy_data?: Json | null
          policy_type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          policy_data?: Json | null
          policy_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_policies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_ai_analysis: {
        Row: {
          auto_categorized: boolean | null
          company_id: string
          created_at: string | null
          detected_category: string | null
          detected_priority: string | null
          id: string
          keywords: string[] | null
          sentiment: string | null
          sentiment_score: number | null
          similar_tickets: Json | null
          suggested_assignee: string | null
          suggested_response: string | null
          ticket_id: string
          updated_at: string | null
        }
        Insert: {
          auto_categorized?: boolean | null
          company_id: string
          created_at?: string | null
          detected_category?: string | null
          detected_priority?: string | null
          id?: string
          keywords?: string[] | null
          sentiment?: string | null
          sentiment_score?: number | null
          similar_tickets?: Json | null
          suggested_assignee?: string | null
          suggested_response?: string | null
          ticket_id: string
          updated_at?: string | null
        }
        Update: {
          auto_categorized?: boolean | null
          company_id?: string
          created_at?: string | null
          detected_category?: string | null
          detected_priority?: string | null
          id?: string
          keywords?: string[] | null
          sentiment?: string | null
          sentiment_score?: number | null
          similar_tickets?: Json | null
          suggested_assignee?: string | null
          suggested_response?: string | null
          ticket_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_ai_analysis_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_ai_analysis_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: true
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_responses: {
        Row: {
          attachments: Json | null
          company_id: string
          content: string
          created_at: string | null
          id: string
          is_internal: boolean | null
          responder_id: string | null
          responder_name: string | null
          response_type: string | null
          ticket_id: string
        }
        Insert: {
          attachments?: Json | null
          company_id: string
          content: string
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          responder_id?: string | null
          responder_name?: string | null
          response_type?: string | null
          ticket_id: string
        }
        Update: {
          attachments?: Json | null
          company_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          responder_id?: string | null
          responder_name?: string | null
          response_type?: string | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_responses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_responses_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      unanswered_questions: {
        Row: {
          added_to_kb: boolean | null
          company_id: string
          conversation_id: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          question: string
          status: string | null
          suggested_answer: string | null
          times_asked: number | null
          updated_at: string | null
        }
        Insert: {
          added_to_kb?: boolean | null
          company_id: string
          conversation_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          question: string
          status?: string | null
          suggested_answer?: string | null
          times_asked?: number | null
          updated_at?: string | null
        }
        Update: {
          added_to_kb?: boolean | null
          company_id?: string
          conversation_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          question?: string
          status?: string | null
          suggested_answer?: string | null
          times_asked?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unanswered_questions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unanswered_questions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unanswered_questions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      visitor_sessions: {
        Row: {
          bounce: boolean | null
          browser: string | null
          city: string | null
          conversion_type: string | null
          converted: boolean | null
          country: string | null
          created_at: string | null
          device_type: string | null
          ended_at: string | null
          id: string
          ip_address: string | null
          os: string | null
          page_url: string | null
          pages_viewed: number | null
          referrer: string | null
          session_duration: number | null
          started_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string | null
        }
        Insert: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          conversion_type?: string | null
          converted?: boolean | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_url?: string | null
          pages_viewed?: number | null
          referrer?: string | null
          session_duration?: number | null
          started_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Update: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          conversion_type?: string | null
          converted?: boolean | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_url?: string | null
          pages_viewed?: number | null
          referrer?: string | null
          session_duration?: number | null
          started_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      whatsapp_campaigns: {
        Row: {
          company_id: string
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          delivered_count: number | null
          description: string | null
          failed_count: number | null
          id: string
          media_url: string | null
          message_text: string | null
          name: string
          read_count: number | null
          scheduled_at: string | null
          sent_count: number | null
          started_at: string | null
          status: string
          target_filter: Json | null
          template_id: string | null
          template_language: string | null
          template_name: string | null
          total_recipients: number | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          id?: string
          media_url?: string | null
          message_text?: string | null
          name: string
          read_count?: number | null
          scheduled_at?: string | null
          sent_count?: number | null
          started_at?: string | null
          status?: string
          target_filter?: Json | null
          template_id?: string | null
          template_language?: string | null
          template_name?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          id?: string
          media_url?: string | null
          message_text?: string | null
          name?: string
          read_count?: number | null
          scheduled_at?: string | null
          sent_count?: number | null
          started_at?: string | null
          status?: string
          target_filter?: Json | null
          template_id?: string | null
          template_language?: string | null
          template_name?: string | null
          total_recipients?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_campaigns_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_settings: {
        Row: {
          access_token: string | null
          company_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          phone_number_id: string | null
          updated_at: string | null
          verify_token: string | null
          webhook_url: string | null
        }
        Insert: {
          access_token?: string | null
          company_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          phone_number_id?: string | null
          updated_at?: string | null
          verify_token?: string | null
          webhook_url?: string | null
        }
        Update: {
          access_token?: string | null
          company_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          phone_number_id?: string | null
          updated_at?: string | null
          verify_token?: string | null
          webhook_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_templates: {
        Row: {
          approved_at: string | null
          body_text: string
          buttons: Json | null
          category: string | null
          company_id: string
          created_at: string | null
          footer_text: string | null
          header_content: string | null
          header_type: string | null
          id: string
          language: string | null
          name: string
          rejected_at: string | null
          rejection_reason: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          variables: Json | null
          whatsapp_template_id: string | null
        }
        Insert: {
          approved_at?: string | null
          body_text: string
          buttons?: Json | null
          category?: string | null
          company_id: string
          created_at?: string | null
          footer_text?: string | null
          header_content?: string | null
          header_type?: string | null
          id?: string
          language?: string | null
          name: string
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          variables?: Json | null
          whatsapp_template_id?: string | null
        }
        Update: {
          approved_at?: string | null
          body_text?: string
          buttons?: Json | null
          category?: string | null
          company_id?: string
          created_at?: string | null
          footer_text?: string | null
          header_content?: string | null
          header_type?: string | null
          id?: string
          language?: string | null
          name?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          variables?: Json | null
          whatsapp_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_sla_deadline: { Args: { priority?: string }; Returns: string }
      check_and_increment_ai_usage: {
        Args: { p_company_id: string }
        Returns: Json
      }
      check_user_limit: { Args: { p_company_id: string }; Returns: Json }
      generate_ticket_number: { Args: { prefix?: string }; Returns: string }
      get_user_company_id: { Args: { _user_id?: string }; Returns: string }
      has_company_role: {
        Args: { _role: string; _user_id: string }
        Returns: boolean
      }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
      reset_daily_ai_quotas: { Args: never; Returns: undefined }
      reset_monthly_ai_quotas: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "owner" | "admin" | "agent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["owner", "admin", "agent"],
    },
  },
} as const
