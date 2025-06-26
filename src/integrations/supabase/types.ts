export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      itunes_programs: {
        Row: {
          artist_name: string | null
          artwork_url_100: string | null
          artwork_url_30: string | null
          artwork_url_60: string | null
          collection_artist_id: number | null
          collection_artist_view_url: string | null
          collection_censored_name: string | null
          collection_explicitness: string | null
          collection_hd_price: number | null
          collection_id: number | null
          collection_name: string | null
          collection_price: number | null
          collection_view_url: string | null
          content_advisory_rating: string | null
          country: string | null
          created_at: string
          currency: string | null
          disc_count: number | null
          disc_number: number | null
          has_itunes_extras: boolean | null
          id: string
          kind: string | null
          long_description: string | null
          preview_url: string | null
          primary_genre_name: string | null
          release_date: string | null
          search_term: string
          short_description: string | null
          track_censored_name: string | null
          track_count: number | null
          track_explicitness: string | null
          track_hd_price: number | null
          track_hd_rental_price: number | null
          track_id: number | null
          track_name: string
          track_number: number | null
          track_price: number | null
          track_rental_price: number | null
          track_time_millis: number | null
          track_view_url: string | null
          updated_at: string
          wrapper_type: string | null
        }
        Insert: {
          artist_name?: string | null
          artwork_url_100?: string | null
          artwork_url_30?: string | null
          artwork_url_60?: string | null
          collection_artist_id?: number | null
          collection_artist_view_url?: string | null
          collection_censored_name?: string | null
          collection_explicitness?: string | null
          collection_hd_price?: number | null
          collection_id?: number | null
          collection_name?: string | null
          collection_price?: number | null
          collection_view_url?: string | null
          content_advisory_rating?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          disc_count?: number | null
          disc_number?: number | null
          has_itunes_extras?: boolean | null
          id?: string
          kind?: string | null
          long_description?: string | null
          preview_url?: string | null
          primary_genre_name?: string | null
          release_date?: string | null
          search_term: string
          short_description?: string | null
          track_censored_name?: string | null
          track_count?: number | null
          track_explicitness?: string | null
          track_hd_price?: number | null
          track_hd_rental_price?: number | null
          track_id?: number | null
          track_name: string
          track_number?: number | null
          track_price?: number | null
          track_rental_price?: number | null
          track_time_millis?: number | null
          track_view_url?: string | null
          updated_at?: string
          wrapper_type?: string | null
        }
        Update: {
          artist_name?: string | null
          artwork_url_100?: string | null
          artwork_url_30?: string | null
          artwork_url_60?: string | null
          collection_artist_id?: number | null
          collection_artist_view_url?: string | null
          collection_censored_name?: string | null
          collection_explicitness?: string | null
          collection_hd_price?: number | null
          collection_id?: number | null
          collection_name?: string | null
          collection_price?: number | null
          collection_view_url?: string | null
          content_advisory_rating?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          disc_count?: number | null
          disc_number?: number | null
          has_itunes_extras?: boolean | null
          id?: string
          kind?: string | null
          long_description?: string | null
          preview_url?: string | null
          primary_genre_name?: string | null
          release_date?: string | null
          search_term?: string
          short_description?: string | null
          track_censored_name?: string | null
          track_count?: number | null
          track_explicitness?: string | null
          track_hd_price?: number | null
          track_hd_rental_price?: number | null
          track_id?: number | null
          track_name?: string
          track_number?: number | null
          track_price?: number | null
          track_rental_price?: number | null
          track_time_millis?: number | null
          track_view_url?: string | null
          updated_at?: string
          wrapper_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
