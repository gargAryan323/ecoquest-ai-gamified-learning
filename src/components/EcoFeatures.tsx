import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain,
  Gamepad2,
  Camera,
  Globe,
  Trophy,
  Smartphone,
  BarChart3,
  Wifi,
  Users,
  Shield,
  Zap,
  Target
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI Learning Paths",
    description: "Personalized curriculum adapts to your location, interests, and learning pace using advanced AI algorithms.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    gradient: "from-primary/20 to-accent/20"
  },
  {
    icon: Gamepad2,
    title: "Gamified Challenges",
    description: "Earn eco-points, unlock badges, and compete on leaderboards while making real environmental impact.",
    color: "text-eco-earth",
    bgColor: "bg-eco-earth/10",
    gradient: "from-eco-earth/20 to-eco-nature/20"
  },
  {
    icon: Camera,
    title: "Photo Verification",
    description: "Verify real-world actions with AI-powered photo recognition for waste segregation and conservation activities.",
    color: "text-eco-secondary",
    bgColor: "bg-eco-secondary/10",
    gradient: "from-eco-secondary/20 to-primary/20"
  },
  {
    icon: Globe,
    title: "Web AR Experience",
    description: "Plant virtual trees, explore ecosystems, and visualize environmental data through immersive AR in your browser.",
    color: "text-eco-nature",
    bgColor: "bg-eco-nature/10",
    gradient: "from-eco-nature/20 to-eco-leaf/20"
  },
  {
    icon: BarChart3,
    title: "Teacher Analytics",
    description: "Comprehensive dashboards for educators to track student progress and customize learning experiences.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Wifi,
    title: "Offline Access",
    description: "Download content for offline learning, ensuring accessibility in rural areas with limited internet connectivity.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    gradient: "from-blue-500/20 to-cyan-500/20"
  }
];

const stats = [
  { icon: Users, value: "10,000+", label: "Active Students" },
  { icon: Trophy, value: "50,000+", label: "Quests Completed" },
  { icon: Target, value: "95%", label: "Engagement Rate" },
  { icon: Zap, value: "2.5M", label: "Eco Points Earned" }
];

const FeatureCard = ({ feature, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    whileHover={{ scale: 1.05, y: -10 }}
    className="group"
  >
    <Card className={`p-6 h-full bg-gradient-to-br ${feature.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <feature.icon className={`w-6 h-6 ${feature.color}`} />
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
        {feature.title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </Card>
  </motion.div>
);

const StatCard = ({ stat, index }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="text-center"
  >
    <div className="card-eco-glass p-6 mb-4">
      <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
      <div className="text-3xl font-bold text-gradient-eco mb-1">{stat.value}</div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </div>
  </motion.div>
);

export default function EcoFeatures() {
  return (
    <section id="learning" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Advanced AI Technology
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-eco mb-6">
            Revolutionary Learning Features
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of environmental education with our comprehensive platform 
            designed specifically for Indian schools and aligned with NEP 2020 guidelines.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-eco-gradient rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Making Real Impact Across India
            </h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Join thousands of students and educators who are already transforming 
              environmental learning through our AI-powered platform.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
              <Shield className="w-5 h-5 mr-2" />
              Join the EcoQuest Community
            </Button>
          </motion.div>
        </motion.div>

        {/* Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gradient-eco mb-4">
              Cutting-Edge Technology Stack
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built with modern web technologies for seamless performance and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Progressive Web App</h4>
              <p className="text-muted-foreground">
                Install like a native app, works offline, and delivers app-like performance on any device.
              </p>
            </Card>

            <Card className="p-8 text-center border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">AI-Powered Learning</h4>
              <p className="text-muted-foreground">
                TensorFlow.js and ML5.js provide real-time personalization and intelligent content curation.
              </p>
            </Card>

            <Card className="p-8 text-center border-0 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Web AR Integration</h4>
              <p className="text-muted-foreground">
                AR.js enables immersive experiences directly in the browser without app installation.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}