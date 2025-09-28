import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CompleteChallengeRequest {
  challengeId: string;
  completionData?: any;
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

    const { challengeId, completionData }: CompleteChallengeRequest = await req.json();

    if (!challengeId) {
      throw new Error('Missing required field: challengeId');
    }

    console.log('Completing challenge for user:', user.id, 'challenge:', challengeId);

    // Get challenge details
    const { data: challenge, error: challengeError } = await supabaseClient
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single();

    if (challengeError || !challenge) {
      throw new Error('Challenge not found');
    }

    // Get user's active challenge progress
    const { data: progress, error: progressError } = await supabaseClient
      .from('user_challenge_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('challenge_id', challengeId)
      .eq('status', 'active')
      .maybeSingle();

    if (progressError || !progress) {
      throw new Error('Active challenge not found');
    }

    // Complete the challenge
    const { error: updateError } = await supabaseClient
      .from('user_challenge_progress')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        points_earned: challenge.points_reward,
        carbon_saved: challenge.carbon_impact,
        progress: { ...progress.progress, completion_data: completionData }
      })
      .eq('id', progress.id);

    if (updateError) {
      console.error('Error completing challenge:', updateError);
      throw new Error('Failed to complete challenge');
    }

    // Update user stats using the database function
    const { error: statsError } = await supabaseClient.rpc('update_user_stats', {
      p_user_id: user.id,
      p_points_to_add: challenge.points_reward,
      p_carbon_saved: challenge.carbon_impact,
      p_quest_completed: true
    });

    if (statsError) {
      console.error('Error updating user stats:', statsError);
    }

    // Award badge if specified
    if (challenge.badge_reward) {
      const { error: badgeError } = await supabaseClient.rpc('award_badge_to_user', {
        p_user_id: user.id,
        p_badge_name: challenge.badge_reward
      });

      if (badgeError) {
        console.error('Error awarding badge:', badgeError);
      }
    }

    console.log('Challenge completed successfully:', {
      pointsEarned: challenge.points_reward,
      carbonSaved: challenge.carbon_impact,
      badgeAwarded: challenge.badge_reward
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Congratulations! You completed "${challenge.title}"!`,
        pointsEarned: challenge.points_reward,
        carbonSaved: challenge.carbon_impact,
        badgeAwarded: challenge.badge_reward,
        challenge: {
          title: challenge.title,
          description: challenge.description
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in complete-challenge function:', error);
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