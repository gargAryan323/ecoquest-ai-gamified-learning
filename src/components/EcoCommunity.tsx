import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Trophy, 
  Crown, 
  Medal,
  Star,
  Leaf,
  MapPin,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react';

const leaderboardData = [
  {
    rank: 1,
    name: "Arjun Patel",
    school: "Delhi Public School",
    points: 2450,
    badge: "Eco Champion",
    icon: Crown,
    color: "text-yellow-500"
  },
  {
    rank: 2,
    name: "Priya Sharma",
    school: "Kendriya Vidyalaya",
    points: 2380,
    badge: "Green Guardian",
    icon: Trophy,
    color: "text-gray-400"
  },
  {
    rank: 3,
    name: "Ravi Kumar",
    school: "Ryan International",
    points: 2250,
    badge: "Nature Hero",
    icon: Medal,
    color: "text-amber-600"
  },
  {
    rank: 4,
    name: "Sneha Reddy",
    school: "CBSE Model School",
    points: 2100,
    badge: "Eco Warrior",
    icon: Star,
    color: "text-primary"
  }
];

const communityPosts = [
  {
    author: "Arjun Patel",
    school: "Delhi Public School",
    time: "2 hours ago",
    content: "Just completed the Urban Air Quality Challenge! The AI analysis showed our school area has moderate pollution levels. We're planning a tree plantation drive next week! 🌱",
    likes: 24,
    comments: 8,
    shares: 5,
    image: true,
    achievement: "Air Quality Expert"
  },
  {
    author: "Priya Sharma",
    school: "Kendriya Vidyalaya",
    time: "5 hours ago",
    content: "Amazing AR experience with the Virtual Forest quest! Planted 50 virtual trees and learned about different species. Who wants to join our eco-club meeting tomorrow?",
    likes: 18,
    comments: 12,
    shares: 3,
    achievement: "AR Explorer"
  },
  {
    author: "EcoQuest Team",
    school: "Official",
    time: "1 day ago",
    content: "🎉 Congratulations to all participants in this week's Waste Segregation Challenge! Over 1,000 photos submitted and our AI model improved by 15%. Keep up the great work!",
    likes: 156,
    comments: 45,
    shares: 28,
    verified: true
  }
];

const achievements = [
  { icon: Leaf, title: "Tree Planter", count: "127 trees planted" },
  { icon: TrendingUp, title: "Progress Master", count: "95% completion rate" },
  { icon: Users, title: "Community Builder", count: "50+ students inspired" },
  { icon: Award, title: "Quest Completionist", count: "42 quests finished" }
];

const LeaderboardCard = ({ data, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-center justify-between p-4 bg-card rounded-xl hover:bg-muted/50 transition-colors group"
  >
    <div className="flex items-center space-x-4">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
        data.rank === 1 ? 'bg-yellow-100' : 
        data.rank === 2 ? 'bg-gray-100' : 
        data.rank === 3 ? 'bg-amber-100' : 'bg-primary/10'
      }`}>
        <data.icon className={`w-5 h-5 ${data.color}`} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-foreground group-hover:text-primary transition-colors">
            {data.name}
          </span>
          <Badge variant="secondary" className="text-xs">{data.badge}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">{data.school}</div>
      </div>
    </div>
    
    <div className="text-right">
      <div className="font-bold text-primary">{data.points}</div>
      <div className="text-xs text-muted-foreground">eco points</div>
    </div>
  </motion.div>
);

const CommunityPost = ({ post, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4 mb-4">
        <Avatar className="w-10 h-10 bg-primary/10">
          <div className="w-full h-full flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-foreground">{post.author}</span>
            {post.verified && <Badge variant="default" className="text-xs">Official</Badge>}
            {post.achievement && <Badge variant="outline" className="text-xs">{post.achievement}</Badge>}
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{post.school}</span>
            <span>•</span>
            <span>{post.time}</span>
          </div>
        </div>
      </div>
      
      <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
      
      {post.image && (
        <div className="w-full h-32 bg-eco-gradient rounded-lg mb-4 flex items-center justify-center">
          <span className="text-white text-sm">📸 Photo attached</span>
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>{post.shares}</span>
          </button>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default function EcoCommunity() {
  return (
    <section id="community" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-eco-nature/10 rounded-full px-4 py-2 text-eco-nature text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Building a Sustainable Future Together
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-eco mb-6">
            Join Our Eco Community
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with thousands of eco-warriors across India. Share your journey, 
            celebrate achievements, and inspire others to take environmental action.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Community Feed */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-6"
            >
              <h3 className="text-2xl font-bold text-gradient-eco">Community Feed</h3>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Share Update
              </Button>
            </motion.div>
            
            {communityPosts.map((post, index) => (
              <CommunityPost key={index} post={post} index={index} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 bg-gradient-to-br from-card to-muted border-0">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gradient-eco">Leaderboard</h3>
                  <Button variant="ghost" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    This Week
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {leaderboardData.map((data, index) => (
                    <LeaderboardCard key={index} data={data} index={index} />
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Full Leaderboard
                </Button>
              </Card>
            </motion.div>

            {/* Your Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 bg-eco-gradient text-white border-0">
                <h3 className="text-xl font-bold mb-6">Your Achievements</h3>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <achievement.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{achievement.title}</div>
                        <div className="text-sm opacity-90">{achievement.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="secondary" className="w-full mt-6">
                  <Award className="w-4 h-4 mr-2" />
                  View All Badges
                </Button>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 border-0 bg-gradient-to-br from-eco-nature/10 to-eco-leaf/10">
                <h3 className="text-lg font-bold mb-4">Community Impact</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2.5M</div>
                    <div className="text-xs text-muted-foreground">Trees Planted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-eco-nature">15K</div>
                    <div className="text-xs text-muted-foreground">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-eco-earth">850</div>
                    <div className="text-xs text-muted-foreground">Schools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-eco-secondary">50K</div>
                    <div className="text-xs text-muted-foreground">Quests Done</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}