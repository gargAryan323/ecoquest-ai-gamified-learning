import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Edit3, 
  Trophy, 
  Zap, 
  Target, 
  Calendar,
  MapPin,
  School,
  Award,
  TrendingUp,
  Camera,
  Save,
  Settings,
  Bell,
  Shield,
  Leaf,
  Star,
  Crown,
  Flame
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const achievements = [
  { id: 1, name: 'First Steps', description: 'Completed your first quest', icon: Target, color: 'text-eco-nature', earned: true },
  { id: 2, name: 'Eco Warrior', description: 'Earned 1000+ eco points', icon: Zap, color: 'text-primary', earned: true },
  { id: 3, name: 'Knowledge Seeker', description: 'Completed 10 quizzes', icon: Trophy, color: 'text-eco-earth', earned: true },
  { id: 4, name: 'Community Leader', description: 'Helped 5 other students', icon: Crown, color: 'text-eco-secondary', earned: false },
  { id: 5, name: 'Streak Master', description: '30-day learning streak', icon: Flame, color: 'text-destructive', earned: false },
  { id: 6, name: 'Photo Expert', description: 'Submitted 50 verified photos', icon: Camera, color: 'text-accent', earned: false }
];

const activityData = [
  { date: '2024-01-15', activity: 'Completed Climate Change Quiz', points: 150, type: 'quiz' },
  { date: '2024-01-14', activity: 'Finished Urban Air Quality Challenge', points: 250, type: 'quest' },
  { date: '2024-01-13', activity: 'Uploaded waste segregation photos', points: 100, type: 'photo' },
  { date: '2024-01-12', activity: 'Joined EcoQuest Community', points: 50, type: 'social' }
];

const ProfileStats = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-eco-nature/10 border-0">
      <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
      <div className="text-2xl font-bold text-gradient-eco">2,450</div>
      <div className="text-sm text-muted-foreground">Eco Points</div>
    </Card>
    
    <Card className="p-4 text-center bg-gradient-to-br from-eco-earth/10 to-accent/10 border-0">
      <Trophy className="w-8 h-8 text-eco-earth mx-auto mb-2" />
      <div className="text-2xl font-bold text-gradient-eco">15</div>
      <div className="text-sm text-muted-foreground">Quests Done</div>
    </Card>
    
    <Card className="p-4 text-center bg-gradient-to-br from-eco-secondary/10 to-primary/10 border-0">
      <Award className="w-8 h-8 text-eco-secondary mx-auto mb-2" />
      <div className="text-2xl font-bold text-gradient-eco">8</div>
      <div className="text-sm text-muted-foreground">Badges</div>
    </Card>
    
    <Card className="p-4 text-center bg-gradient-to-br from-eco-nature/10 to-eco-leaf/10 border-0">
      <TrendingUp className="w-8 h-8 text-eco-nature mx-auto mb-2" />
      <div className="text-2xl font-bold text-gradient-eco">Level 12</div>
      <div className="text-sm text-muted-foreground">Current</div>
    </Card>
  </div>
);

const ProfileHeader = ({ isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: (value: boolean) => void }) => {
  const { user } = useAuth();
  
  return (
    <Card className="p-8 mb-8 bg-gradient-to-r from-card to-muted border-0 shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="relative">
          <Avatar className="w-24 h-24 ring-4 ring-primary/20">
            <div className="w-full h-full bg-eco-gradient flex items-center justify-center text-white text-2xl font-bold">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </Avatar>
          <Button
            size="sm"
            variant="outline"
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient-eco mb-2">EcoWarrior123</h1>
              <p className="text-muted-foreground mb-2">{user?.email}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <School className="w-4 h-4" />
                  <span>Green Valley School</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 md:mt-0"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress to Level 13</span>
              <span className="font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-eco-nature text-eco-nature">
              <Leaf className="w-3 h-3 mr-1" />
              Climate Expert
            </Badge>
            <Badge variant="outline" className="border-primary text-primary">
              <Star className="w-3 h-3 mr-1" />
              Top Contributor
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

const EditProfile = () => (
  <Card className="p-6 mb-8">
    <h3 className="text-xl font-bold text-gradient-eco mb-6">Edit Profile</h3>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" defaultValue="EcoWarrior123" />
        </div>
        
        <div>
          <Label htmlFor="school">School Name</Label>
          <Input id="school" defaultValue="Green Valley School" />
        </div>
        
        <div>
          <Label htmlFor="grade">Grade Level</Label>
          <Input id="grade" defaultValue="Grade 10" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue="Mumbai, India" />
        </div>
        
        <div>
          <Label htmlFor="interests">Interests</Label>
          <Input id="interests" placeholder="Climate change, renewable energy..." />
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Tell us about yourself and your environmental interests..."
            className="resize-none"
            rows={3}
          />
        </div>
      </div>
    </div>
    
    <div className="flex justify-end mt-6">
      <Button className="bg-eco-gradient hover:opacity-90 text-white">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  </Card>
);

const AchievementCard = ({ achievement }: { achievement: any }) => (
  <Card className={`p-4 transition-all duration-300 ${
    achievement.earned 
      ? 'bg-gradient-to-br from-primary/10 to-eco-nature/10 border-primary/20' 
      : 'bg-muted/50 opacity-60'
  }`}>
    <div className="flex items-center space-x-3">
      <div className={`w-12 h-12 rounded-full ${
        achievement.earned ? 'bg-primary/20' : 'bg-muted'
      } flex items-center justify-center`}>
        <achievement.icon className={`w-6 h-6 ${
          achievement.earned ? achievement.color : 'text-muted-foreground'
        }`} />
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{achievement.name}</h4>
        <p className="text-sm text-muted-foreground">{achievement.description}</p>
      </div>
      
      {achievement.earned && (
        <Badge className="bg-eco-nature text-white">
          Earned
        </Badge>
      )}
    </div>
  </Card>
);

const ActivityItem = ({ item }: { item: any }) => (
  <Card className="p-4 mb-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-2 h-2 rounded-full ${
          item.type === 'quiz' ? 'bg-primary' :
          item.type === 'quest' ? 'bg-eco-earth' :
          item.type === 'photo' ? 'bg-accent' : 'bg-eco-secondary'
        }`} />
        <div>
          <p className="font-medium text-foreground">{item.activity}</p>
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 text-primary font-bold">
        <Zap className="w-4 h-4" />
        <span>+{item.points}</span>
      </div>
    </div>
  </Card>
);

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />
        
        {isEditing && <EditProfile />}
        
        <ProfileStats />
        
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gradient-eco mb-6">Your Achievements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: achievement.id * 0.1 }}
                  >
                    <AchievementCard achievement={achievement} />
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gradient-eco mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {activityData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ActivityItem item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gradient-eco mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified about new quests and achievements</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Privacy Settings</p>
                      <p className="text-sm text-muted-foreground">Control who can see your profile and activities</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Learning Preferences</p>
                      <p className="text-sm text-muted-foreground">Customize your learning experience</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}