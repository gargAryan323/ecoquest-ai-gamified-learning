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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          carbon_impact_per_action: number | null
          category: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean
          name: string
          points_per_action: number
          unit: string | null
        }
        Insert: {
          carbon_impact_per_action?: number | null
          category?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          points_per_action?: number
          unit?: string | null
        }
        Update: {
          carbon_impact_per_action?: number | null
          category?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          points_per_action?: number
          unit?: string | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string | null
          id: string
          is_active: boolean
          name: string
          points_required: number | null
          rarity: string
          requirements: Json
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          points_required?: number | null
          rarity?: string
          requirements: Json
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          points_required?: number | null
          rarity?: string
          requirements?: Json
        }
        Relationships: []
      }
      challenges: {
        Row: {
          badge_reward: string | null
          carbon_impact: number | null
          category: string
          created_at: string
          description: string
          difficulty: string
          duration_days: number | null
          id: string
          is_active: boolean
          points_reward: number
          requirements: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          badge_reward?: string | null
          carbon_impact?: number | null
          category?: string
          created_at?: string
          description: string
          difficulty?: string
          duration_days?: number | null
          id?: string
          is_active?: boolean
          points_reward?: number
          requirements?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          badge_reward?: string | null
          carbon_impact?: number | null
          category?: string
          created_at?: string
          description?: string
          difficulty?: string
          duration_days?: number | null
          id?: string
          is_active?: boolean
          points_reward?: number
          requirements?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          badges_earned: string[] | null
          bio: string | null
          carbon_footprint_saved: number
          created_at: string
          display_name: string | null
          eco_points: number
          grade_level: string | null
          id: string
          level: number
          location: string | null
          school_name: string | null
          streak_days: number
          total_quests_completed: number
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          badges_earned?: string[] | null
          bio?: string | null
          carbon_footprint_saved?: number
          created_at?: string
          display_name?: string | null
          eco_points?: number
          grade_level?: string | null
          id?: string
          level?: number
          location?: string | null
          school_name?: string | null
          streak_days?: number
          total_quests_completed?: number
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          badges_earned?: string[] | null
          bio?: string | null
          carbon_footprint_saved?: number
          created_at?: string
          display_name?: string | null
          eco_points?: number
          grade_level?: string | null
          id?: string
          level?: number
          location?: string | null
          school_name?: string | null
          streak_days?: number
          total_quests_completed?: number
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          answers: Json
          completed_at: string
          id: string
          points_earned: number
          quiz_id: string
          score: number
          time_taken: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          answers: Json
          completed_at?: string
          id?: string
          points_earned?: number
          quiz_id: string
          score?: number
          time_taken?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          id?: string
          points_earned?: number
          quiz_id?: string
          score?: number
          time_taken?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          category: string
          created_at: string
          description: string | null
          difficulty: string
          id: string
          is_active: boolean
          points_reward: number
          questions: Json
          time_limit: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          is_active?: boolean
          points_reward?: number
          questions: Json
          time_limit?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          is_active?: boolean
          points_reward?: number
          questions?: Json
          time_limit?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_id: string
          carbon_saved: number | null
          id: string
          logged_at: string
          notes: string | null
          points_earned: number
          quantity: number
          user_id: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          activity_id: string
          carbon_saved?: number | null
          id?: string
          logged_at?: string
          notes?: string | null
          points_earned?: number
          quantity?: number
          user_id: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          activity_id?: string
          carbon_saved?: number | null
          id?: string
          logged_at?: string
          notes?: string | null
          points_earned?: number
          quantity?: number
          user_id?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenge_progress: {
        Row: {
          carbon_saved: number | null
          challenge_id: string
          completed_at: string | null
          id: string
          points_earned: number | null
          progress: Json | null
          started_at: string
          status: string
          user_id: string
        }
        Insert: {
          carbon_saved?: number | null
          challenge_id: string
          completed_at?: string | null
          id?: string
          points_earned?: number | null
          progress?: Json | null
          started_at?: string
          status?: string
          user_id: string
        }
        Update: {
          carbon_saved?: number | null
          challenge_id?: string
          completed_at?: string | null
          id?: string
          points_earned?: number | null
          progress?: Json | null
          started_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leaderboard: {
        Row: {
          avatar_url: string | null
          badge_names: string[] | null
          carbon_footprint_saved: number | null
          display_name: string | null
          eco_points: number | null
          level: number | null
          rank: number | null
          streak_days: number | null
          total_quests_completed: number | null
          user_id: string | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      award_badge_to_user: {
        Args: { p_badge_name: string; p_user_id: string }
        Returns: boolean
      }
      calculate_user_level: {
        Args: { points: number }
        Returns: number
      }
      update_user_stats: {
        Args: {
          p_carbon_saved?: number
          p_points_to_add?: number
          p_quest_completed?: boolean
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
