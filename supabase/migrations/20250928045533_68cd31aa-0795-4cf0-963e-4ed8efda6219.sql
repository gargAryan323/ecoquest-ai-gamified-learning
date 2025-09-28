-- Fix security issues from the linter

-- Drop the view that had security definer issue and recreate without security definer
DROP VIEW IF EXISTS public.leaderboard;

-- Create leaderboard view without security definer
CREATE VIEW public.leaderboard AS
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

-- Fix function search paths - update existing functions
CREATE OR REPLACE FUNCTION public.calculate_user_level(points INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Level calculation: every 100 points = 1 level, with diminishing returns
  RETURN GREATEST(1, FLOOR(SQRT(points / 50.0))::INTEGER);
END;
$$;