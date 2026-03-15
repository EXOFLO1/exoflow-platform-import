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
