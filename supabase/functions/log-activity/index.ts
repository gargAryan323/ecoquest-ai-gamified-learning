import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LogActivityRequest {
  activityId: string;
  quantity?: number;
  notes?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Get user from JWT
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { activityId, quantity = 1, notes }: LogActivityRequest = await req.json();

    if (!activityId) {
      throw new Error('Missing required field: activityId');
    }

    console.log('Logging activity for user:', user.id, 'activity:', activityId);

    // Get activity details
    const { data: activity, error: activityError } = await supabaseClient
      .from('activities')
      .select('*')
      .eq('id', activityId)
      .single();

    if (activityError || !activity) {
      throw new Error('Activity not found');
    }

    // Calculate points and carbon saved based on quantity
    const pointsEarned = activity.points_per_action * quantity;
    const carbonSaved = activity.carbon_impact_per_action * quantity;

    // Log the activity
    const { error: logError } = await supabaseClient
      .from('user_activities')
      .insert({
        user_id: user.id,
        activity_id: activityId,
        quantity: quantity,
        points_earned: pointsEarned,
        carbon_saved: carbonSaved,
        notes: notes
      });

    if (logError) {
      console.error('Error logging activity:', logError);
      throw new Error('Failed to log activity');
    }

    // Update user stats using the database function
    const { error: statsError } = await supabaseClient.rpc('update_user_stats', {
      p_user_id: user.id,
      p_points_to_add: pointsEarned,
      p_carbon_saved: carbonSaved,
      p_quest_completed: false
    });

    if (statsError) {
      console.error('Error updating user stats:', statsError);
      // Don't throw error here as activity was already logged
    }

    console.log('Activity logged successfully:', {
      pointsEarned,
      carbonSaved,
      quantity
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Great job! You earned ${pointsEarned} eco points and saved ${carbonSaved}kg of CO2!`,
        pointsEarned,
        carbonSaved,
        activity: {
          name: activity.name,
          description: activity.description,
          quantity: quantity,
          unit: activity.unit
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in log-activity function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});