import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StartChallengeRequest {
  challengeId: string;
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

    const { challengeId }: StartChallengeRequest = await req.json();

    if (!challengeId) {
      throw new Error('Missing required field: challengeId');
    }

    console.log('Starting challenge for user:', user.id, 'challenge:', challengeId);

    // Get challenge details
    const { data: challenge, error: challengeError } = await supabaseClient
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single();

    if (challengeError || !challenge) {
      throw new Error('Challenge not found');
    }

    // Check if user already has this challenge active
    const { data: existingProgress } = await supabaseClient
      .from('user_challenge_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('challenge_id', challengeId)
      .eq('status', 'active')
      .maybeSingle();

    if (existingProgress) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You already have this challenge active!',
          existing: true
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Start the challenge
    const { error: progressError } = await supabaseClient
      .from('user_challenge_progress')
      .insert({
        user_id: user.id,
        challenge_id: challengeId,
        status: 'active',
        progress: {}
      });

    if (progressError) {
      console.error('Error starting challenge:', progressError);
      throw new Error('Failed to start challenge');
    }

    console.log('Challenge started successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: `Challenge "${challenge.title}" started! You have ${challenge.duration_days} days to complete it.`,
        challenge: {
          title: challenge.title,
          description: challenge.description,
          duration_days: challenge.duration_days,
          points_reward: challenge.points_reward,
          carbon_impact: challenge.carbon_impact
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in start-challenge function:', error);
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