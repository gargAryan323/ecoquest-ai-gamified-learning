import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Zap, 
  Trophy, 
  Leaf, 
  Users, 
  Target,
  Camera,
  Play,
  Star,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import indiaEcoMap from '@/assets/india-eco-map.jpg';
import questCardBg from '@/assets/quest-card-bg.jpg';

// Quest Card Component
const QuestCard = ({ title, description, points, difficulty, timeEstimate, type, progress, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="card-eco-quest group cursor-pointer"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          difficulty === 'Easy' ? 'bg-eco-nature' : 
          difficulty === 'Medium' ? 'bg-eco-earth' : 'bg-eco-secondary'
        } animate-pulse-eco`} />
        <span className="text-sm font-medium text-muted-foreground">{type}</span>
      </div>
      <div className="flex items-center space-x-1 text-primary font-bold">
        <Zap className="w-4 h-4" />
        <span>{points}</span>
      </div>
    </div>

    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
      {description}
    </p>

    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{timeEstimate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-eco-earth" />
            <span className="text-muted-foreground">{difficulty}</span>
          </div>
        </div>
      </div>

      {progress && (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <Button variant="quest" size="sm" className="w-full group-hover:shadow-lg">
        {progress ? 'Continue Quest' : 'Start Quest'}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  </motion.div>
);

// Stats Widget Component
const StatsWidget = ({ icon: Icon, title, value, change, color }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="card-eco-glass p-6"
  >
    <div className="flex items-center justify-between mb-3">
      <Icon className={`w-8 h-8 ${color}`} />
      <div className="flex items-center space-x-1 text-eco-nature text-sm font-medium">
        <TrendingUp className="w-4 h-4" />
        <span>+{change}%</span>
      </div>
    </div>
    <h3 className="text-2xl font-bold text-gradient-eco mb-1">{value}</h3>
    <p className="text-muted-foreground text-sm">{title}</p>
  </motion.div>
);

export default function EcoDashboard() {
  const activeQuests = [
    {
      title: "Urban Air Quality Challenge",
      description: "Monitor and analyze air pollution levels in your city using our AI-powered sensors.",
      points: 250,
      difficulty: "Medium",
      timeEstimate: "3 days",
      type: "Research Quest",
      progress: 65
    },
    {
      title: "Waste Segregation Photo Mission",
      description: "Take photos of proper waste segregation practices and help train our AI model.",
      points: 150,
      difficulty: "Easy",
      timeEstimate: "30 mins",
      type: "Photo Quest",
      progress: null
    },
    {
      title: "Virtual Forest AR Experience",
      description: "Plant virtual trees using AR technology and learn about forest ecosystems.",
      points: 300,
      difficulty: "Hard",
      timeEstimate: "1 hour",
      type: "AR Quest",
      progress: 20
    }
  ];

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient-eco mb-4">
            Your EcoQuest Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your environmental learning journey with AI-powered insights and gamified challenges
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsWidget
            icon={Zap}
            title="Eco Points Earned"
            value="1,250"
            change="23"
            color="text-primary"
          />
          <StatsWidget
            icon={Trophy}
            title="Quests Completed"
            value="42"
            change="15"
            color="text-eco-earth"
          />
          <StatsWidget
            icon={Leaf}
            title="Trees Planted"
            value="127"
            change="31"
            color="text-eco-nature"
          />
          <StatsWidget
            icon={Users}
            title="Community Rank"
            value="#8"
            change="5"
            color="text-eco-secondary"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Interactive India Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 h-full bg-gradient-to-br from-card to-muted border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gradient-eco">Environmental Challenges Map</h3>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Delhi, India
                </Button>
              </div>
              
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img 
                  src={indiaEcoMap} 
                  alt="Interactive India environmental map"
                  className="w-full h-full object-cover"
                />
                
                {/* Interactive Hotspots */}
                <div className="absolute inset-0">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/4 left-1/3 w-4 h-4 bg-eco-secondary rounded-full shadow-lg cursor-pointer"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-2/3 left-1/2 w-4 h-4 bg-eco-earth rounded-full shadow-lg cursor-pointer"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="absolute top-1/2 right-1/3 w-4 h-4 bg-eco-nature rounded-full shadow-lg cursor-pointer"
                  />
                </div>

                {/* Info Cards */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium text-foreground">Air Quality Index</div>
                  <div className="text-lg font-bold text-eco-secondary">Moderate (156)</div>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="text-sm font-medium text-foreground">Active Quests</div>
                  <div className="text-lg font-bold text-primary">12 Available</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-eco-gradient text-white border-0">
              <h3 className="text-xl font-bold mb-4">Today's Challenge</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Capture 3 eco-friendly practices</span>
                </div>
                <Progress value={66} className="bg-white/20" />
                <div className="text-sm opacity-90">2 of 3 completed</div>
                <Button variant="secondary" size="sm" className="w-full">
                  Continue Challenge
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-eco-nature to-eco-leaf text-white border-0">
              <h3 className="text-xl font-bold mb-4">Learning Path</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Climate Change Basics</span>
                </div>
                <div className="text-sm opacity-90">Module 3 of 8</div>
                <Progress value={37} className="bg-white/20" />
                <Button variant="secondary" size="sm" className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Resume Learning
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Active Quests */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-gradient-eco mb-8 text-center">
            Active Quests
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeQuests.map((quest, index) => (
              <QuestCard
                key={index}
                {...quest}
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}