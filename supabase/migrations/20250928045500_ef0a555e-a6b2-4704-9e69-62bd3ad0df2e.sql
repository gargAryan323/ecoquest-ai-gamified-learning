-- Create quizzes table to store quiz questions and answers
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  questions JSONB NOT NULL, -- Array of question objects with options and correct answers
  time_limit INTEGER DEFAULT 300, -- Time limit in seconds
  points_reward INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create quiz attempts table to track user quiz performances
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  answers JSONB NOT NULL, -- User's answers
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER, -- Time taken in seconds
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  points_earned INTEGER NOT NULL DEFAULT 0
);

-- Create challenges table for environmental quests
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'energy',
  difficulty TEXT NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points_reward INTEGER NOT NULL DEFAULT 20,
  carbon_impact NUMERIC(10,2) DEFAULT 0.0, -- Carbon saved in kg
  duration_days INTEGER DEFAULT 7, -- How many days to complete
  requirements JSONB, -- Requirements to complete the challenge
  badge_reward TEXT, -- Badge awarded upon completion
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create user challenge progress table
CREATE TABLE public.user_challenge_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed', 'paused')),
  progress JSONB DEFAULT '{}', -- Track progress data
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  points_earned INTEGER DEFAULT 0,
  carbon_saved NUMERIC(10,2) DEFAULT 0.0,
  UNIQUE(user_id, challenge_id)
);

-- Create activities table for different eco-friendly activities
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  points_per_action INTEGER NOT NULL DEFAULT 5,
  carbon_impact_per_action NUMERIC(10,2) DEFAULT 0.0, -- Carbon saved per action in kg
  unit TEXT DEFAULT 'action', -- e.g., 'km', 'hours', 'items'
  icon TEXT, -- Icon name for the activity
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create user activities log
CREATE TABLE public.user_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  points_earned INTEGER NOT NULL DEFAULT 0,
  carbon_saved NUMERIC(10,2) DEFAULT 0.0,
  notes TEXT,
  logged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID -- For peer verification if needed
);

-- Create badges table to define available badges
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT,
  category TEXT NOT NULL DEFAULT 'achievement',
  requirements JSONB NOT NULL, -- Conditions to earn the badge
  rarity TEXT NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  points_required INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create user badge awards table
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create leaderboard view for ranking users
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT 
  p.user_id,
  p.display_name,
  p.username,
  p.avatar_url,
  p.eco_points,
  p.level,
  p.total_quests_completed,
  p.streak_days,
  p.carbon_footprint_saved,
  ARRAY_AGG(b.name) FILTER (WHERE b.name IS NOT NULL) as badge_names,
  ROW_NUMBER() OVER (ORDER BY p.eco_points DESC, p.carbon_footprint_saved DESC) as rank
FROM public.profiles p
LEFT JOIN public.user_badges ub ON p.user_id = ub.user_id
LEFT JOIN public.badges b ON ub.badge_id = b.id
GROUP BY p.user_id, p.display_name, p.username, p.avatar_url, p.eco_points, p.level, p.total_quests_completed, p.streak_days, p.carbon_footprint_saved;

-- Enable RLS on all tables
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quizzes (readable by everyone, manageable by admins)
CREATE POLICY "Quizzes are viewable by everyone" ON public.quizzes FOR SELECT USING (is_active = true);

-- RLS Policies for quiz_attempts (users can view their own attempts)
CREATE POLICY "Users can view their own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for challenges (readable by everyone, manageable by admins)
CREATE POLICY "Challenges are viewable by everyone" ON public.challenges FOR SELECT USING (is_active = true);

-- RLS Policies for user_challenge_progress (users can manage their own progress)
CREATE POLICY "Users can view their own challenge progress" ON public.user_challenge_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own challenge progress" ON public.user_challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own challenge progress" ON public.user_challenge_progress FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for activities (readable by everyone)
CREATE POLICY "Activities are viewable by everyone" ON public.activities FOR SELECT USING (is_active = true);

-- RLS Policies for user_activities (users can manage their own activities)
CREATE POLICY "Users can view their own activities" ON public.user_activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own activities" ON public.user_activities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own activities" ON public.user_activities FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for badges (readable by everyone)
CREATE POLICY "Badges are viewable by everyone" ON public.badges FOR SELECT USING (is_active = true);

-- RLS Policies for user_badges (users can view their own badges)
CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view all user badges for leaderboard" ON public.user_badges FOR SELECT USING (true);

-- Create function to calculate user level based on points
CREATE OR REPLACE FUNCTION public.calculate_user_level(points INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  -- Level calculation: every 100 points = 1 level, with diminishing returns
  RETURN GREATEST(1, FLOOR(SQRT(points / 50.0))::INTEGER);
END;
$$;

-- Create function to award badge to user
CREATE OR REPLACE FUNCTION public.award_badge_to_user(p_user_id UUID, p_badge_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  badge_id UUID;
BEGIN
  -- Get badge ID
  SELECT id INTO badge_id FROM public.badges WHERE name = p_badge_name AND is_active = true;
  
  IF badge_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Insert badge award (ignore if already exists)
  INSERT INTO public.user_badges (user_id, badge_id)
  VALUES (p_user_id, badge_id)
  ON CONFLICT (user_id, badge_id) DO NOTHING;
  
  -- Update user's badges_earned array in profiles
  UPDATE public.profiles 
  SET badges_earned = array_append(
    COALESCE(badges_earned, '{}'), 
    p_badge_name
  )
  WHERE user_id = p_user_id 
  AND NOT (p_badge_name = ANY(COALESCE(badges_earned, '{}')));
  
  RETURN TRUE;
END;
$$;

-- Create function to update user stats
CREATE OR REPLACE FUNCTION public.update_user_stats(
  p_user_id UUID,
  p_points_to_add INTEGER DEFAULT 0,
  p_carbon_saved NUMERIC DEFAULT 0.0,
  p_quest_completed BOOLEAN DEFAULT FALSE
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_points INTEGER;
  new_points INTEGER;
  new_level INTEGER;
  current_quests INTEGER;
BEGIN
  -- Get current stats
  SELECT eco_points, total_quests_completed 
  INTO current_points, current_quests
  FROM public.profiles 
  WHERE user_id = p_user_id;
  
  -- Calculate new values
  new_points := current_points + p_points_to_add;
  new_level := public.calculate_user_level(new_points);
  
  -- Update profile
  UPDATE public.profiles SET
    eco_points = new_points,
    level = new_level,
    carbon_footprint_saved = carbon_footprint_saved + p_carbon_saved,
    total_quests_completed = CASE WHEN p_quest_completed THEN current_quests + 1 ELSE current_quests END,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Award badges based on achievements
  IF new_points >= 100 AND current_points < 100 THEN
    PERFORM public.award_badge_to_user(p_user_id, 'First Century');
  END IF;
  
  IF new_points >= 500 AND current_points < 500 THEN
    PERFORM public.award_badge_to_user(p_user_id, 'Eco Warrior');
  END IF;
  
  IF p_quest_completed AND (current_quests + 1) >= 10 THEN
    PERFORM public.award_badge_to_user(p_user_id, 'Quest Master');
  END IF;
END;
$$;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_quizzes_updated_at BEFORE UPDATE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON public.challenges FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for quizzes
INSERT INTO public.quizzes (title, description, category, difficulty, questions, points_reward) VALUES
(
  'Climate Change Basics',
  'Test your knowledge about climate change fundamentals',
  'climate',
  'beginner',
  '[
    {
      "question": "What is the main cause of climate change?",
      "options": ["Solar radiation", "Greenhouse gases", "Ocean currents", "Volcanic activity"],
      "correct": 1,
      "explanation": "Greenhouse gases trap heat in the atmosphere, causing global warming."
    },
    {
      "question": "Which gas contributes most to greenhouse effect?",
      "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      "correct": 2,
      "explanation": "CO2 is the primary greenhouse gas from human activities."
    },
    {
      "question": "What can individuals do to reduce carbon footprint?",
      "options": ["Use more electricity", "Drive more often", "Use renewable energy", "Burn more fossil fuels"],
      "correct": 2,
      "explanation": "Renewable energy sources produce little to no greenhouse gases."
    }
  ]'::jsonb,
  30
),
(
  'Renewable Energy Quiz',
  'Learn about different types of renewable energy sources',
  'energy',
  'intermediate',
  '[
    {
      "question": "Which is NOT a renewable energy source?",
      "options": ["Solar", "Wind", "Coal", "Hydroelectric"],
      "correct": 2,
      "explanation": "Coal is a fossil fuel and not renewable."
    },
    {
      "question": "What percentage of global energy comes from renewables?",
      "options": ["10%", "30%", "50%", "70%"],
      "correct": 1,
      "explanation": "Approximately 30% of global energy comes from renewable sources."
    }
  ]'::jsonb,
  40
);

-- Insert sample challenges
INSERT INTO public.challenges (title, description, category, difficulty, points_reward, carbon_impact, duration_days, badge_reward) VALUES
(
  'Plastic-Free Week',
  'Avoid single-use plastics for one week',
  'waste',
  'easy',
  50,
  2.5,
  7,
  'Plastic Fighter'
),
(
  'Bike to Work Challenge',
  'Use a bicycle for commuting for 2 weeks',
  'transport',
  'medium',
  100,
  15.0,
  14,
  'Green Commuter'
),
(
  'Energy Saver Month',
  'Reduce household energy consumption by 20%',
  'energy',
  'hard',
  200,
  25.0,
  30,
  'Energy Master'
);

-- Insert sample activities
INSERT INTO public.activities (name, description, category, points_per_action, carbon_impact_per_action, unit, icon) VALUES
('Recycle Plastic', 'Recycle plastic bottles and containers', 'waste', 5, 0.5, 'kg', 'recycle'),
('Use Public Transport', 'Take bus, train, or metro instead of car', 'transport', 10, 2.0, 'trip', 'bus'),
('Plant a Tree', 'Plant trees in your community', 'nature', 25, 10.0, 'tree', 'tree'),
('LED Bulb Switch', 'Replace incandescent bulbs with LED', 'energy', 15, 5.0, 'bulb', 'lightbulb'),
('Composting', 'Compost organic waste at home', 'waste', 8, 1.5, 'kg', 'compost'),
('Water Conservation', 'Implement water-saving measures', 'water', 12, 3.0, 'action', 'droplet');

-- Insert sample badges
INSERT INTO public.badges (name, description, category, requirements, rarity, points_required) VALUES
(
  'First Century',
  'Earned your first 100 eco points',
  'milestone',
  '{"points": 100}'::jsonb,
  'common',
  100
),
(
  'Eco Warrior',
  'Reached 500 eco points',
  'milestone',
  '{"points": 500}'::jsonb,
  'rare',
  500
),
(
  'Quest Master',
  'Completed 10 environmental challenges',
  'achievement',
  '{"quests_completed": 10}'::jsonb,
  'epic',
  0
),
(
  'Plastic Fighter',
  'Completed the Plastic-Free Week challenge',
  'challenge',
  '{"challenge": "Plastic-Free Week"}'::jsonb,
  'common',
  0
),
(
  'Green Commuter',
  'Completed the Bike to Work challenge',
  'challenge',
  '{"challenge": "Bike to Work Challenge"}'::jsonb,
  'rare',
  0
),
(
  'Energy Master',
  'Completed the Energy Saver Month challenge',
  'challenge',
  '{"challenge": "Energy Saver Month"}'::jsonb,
  'legendary',
  0
);