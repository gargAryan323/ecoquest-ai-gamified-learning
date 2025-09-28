import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CompleteQuizRequest {
  quizId: string;
  answers: number[];
  timeTaken?: number;
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

    const { quizId, answers, timeTaken }: CompleteQuizRequest = await req.json();

    if (!quizId || !answers || !Array.isArray(answers)) {
      throw new Error('Missing required fields: quizId and answers');
    }

    console.log('Processing quiz completion for user:', user.id, 'quiz:', quizId);

    // Get quiz details
    const { data: quiz, error: quizError } = await supabaseClient
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();

    if (quizError || !quiz) {
      throw new Error('Quiz not found');
    }

    // Calculate score
    const questions = quiz.questions as any[];
    let correctAnswers = 0;
    
    answers.forEach((answer, index) => {
      if (questions[index] && questions[index].correct === answer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    const pointsEarned = Math.round((score / 100) * quiz.points_reward);

    // Record quiz attempt
    const { error: attemptError } = await supabaseClient
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        quiz_id: quizId,
        answers: answers,
        score: score,
        total_questions: questions.length,
        time_taken: timeTaken,
        points_earned: pointsEarned
      });

    if (attemptError) {
      console.error('Error recording quiz attempt:', attemptError);
      throw new Error('Failed to record quiz attempt');
    }

    // Update user stats using the database function
    const { error: statsError } = await supabaseClient.rpc('update_user_stats', {
      p_user_id: user.id,
      p_points_to_add: pointsEarned,
      p_carbon_saved: 0,
      p_quest_completed: false
    });

    if (statsError) {
      console.error('Error updating user stats:', statsError);
      // Don't throw error here as quiz attempt was already recorded
    }

    console.log('Quiz completed successfully:', {
      score,
      pointsEarned,
      correctAnswers,
      totalQuestions: questions.length
    });

    return new Response(
      JSON.stringify({
        success: true,
        score,
        correctAnswers,
        totalQuestions: questions.length,
        pointsEarned,
        message: `Great job! You scored ${score}% and earned ${pointsEarned} eco points!`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in complete-quiz function:', error);
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