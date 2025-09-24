import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Text3D } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Leaf, Zap, Users, Target } from 'lucide-react';
import ecoHeroImage from '@/assets/eco-hero-image.jpg';

// Animated 3D Earth Component
function AnimatedEarth() {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#22c55e" 
          roughness={0.3}
          metalness={0.1}
        />
      </Sphere>
      {/* Floating elements around Earth */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[0.1, 16, 16]} position={[2.5, 1, 0]}>
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.8}>
        <Sphere args={[0.08, 16, 16]} position={[-2.2, 0.5, 1]}>
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.2}>
        <Sphere args={[0.12, 16, 16]} position={[1.8, -1.5, 0.5]}>
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
    </Float>
  );
}

// Stats Component
const StatCard = ({ icon: Icon, number, label, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
    className="card-eco-glass p-6 text-center"
  >
    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
    <div className="text-3xl font-bold text-gradient-eco mb-1">{number}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </motion.div>
);

export default function EcoHero() {
  return (
    <section className="relative min-h-screen bg-eco-gradient overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-eco-pattern opacity-50" />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Smart Environmental Education Platform
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                EcoQuest
                <span className="block text-gradient-hero">AI Platform</span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Transform environmental learning into engaging AI-powered quests. 
                Personalized education paths for Indian schools with gamified challenges, 
                AR experiences, and real-world impact tracking.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="lg" className="rounded-xl">
                <Zap className="w-5 h-5 mr-2" />
                Start Your EcoQuest
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl border-white/30 text-white hover:bg-white/10">
                <Users className="w-5 h-5 mr-2" />
                For Educators
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              <StatCard icon={Users} number="10K+" label="Students" delay={0.9} />
              <StatCard icon={Target} number="500+" label="Quests" delay={1.0} />
              <StatCard icon={Leaf} number="95%" label="Success Rate" delay={1.1} />
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="relative h-[600px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl" />
            
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
              
              <Suspense fallback={null}>
                <AnimatedEarth />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>

            {/* Floating UI Elements */}
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm animate-pulse-eco">
              🌱 AI Learning Active
            </div>
            <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm animate-float-eco">
              🌍 Global Impact: 2.5M Trees
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto">
          <path 
            d="M0,120L40,110C80,100,160,80,240,70C320,60,400,60,480,65C560,70,640,80,720,75C800,70,880,50,960,45C1040,40,1120,50,1160,55L1200,60L1200,120L1160,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z" 
            fill="hsl(var(--background))" 
          />
        </svg>
      </div>
    </section>
  );
}