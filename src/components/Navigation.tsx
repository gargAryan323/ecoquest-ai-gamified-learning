import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Leaf, 
  Home, 
  Map, 
  Trophy, 
  BookOpen, 
  Users, 
  Settings,
  User,
  LogOut
} from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', view: 'dashboard' },
  { icon: Trophy, label: 'Quizzes', view: 'quizzes' },
  { icon: Map, label: 'Quests', href: '#quests' },
  { icon: BookOpen, label: 'Learning', href: '#learning' },
  { icon: Users, label: 'Community', href: '#community' },
];

interface NavigationProps {
  currentView?: string;
  setCurrentView?: (view: string) => void;
}

export default function Navigation({ currentView = 'dashboard', setCurrentView }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <Leaf className="w-8 h-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-eco-nature rounded-full animate-pulse-eco" />
              </div>
              <span className="text-xl font-bold text-gradient-eco">EcoQuest</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => item.view ? setCurrentView?.(item.view) : document.querySelector(item.href!)?.scrollIntoView({ behavior: 'smooth' })}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentView === item.view 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <div className="hidden sm:flex items-center space-x-2 bg-eco-gradient rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-eco-nature rounded-full animate-pulse-eco" />
                    <span className="text-white text-sm font-medium">1,250 Eco Points</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => setCurrentView?.('profile')}
                  >
                    <User className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSignOut}>
                    <LogOut className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-eco-gradient hover:opacity-90 text-white"
                >
                  Join EcoQuest
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-16 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-lg border-l border-white/20 z-40 md:hidden"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    if (item.view) {
                      setCurrentView?.(item.view);
                    } else {
                      document.querySelector(item.href!)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsOpen(false);
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                    currentView === item.view 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
              
              <div className="pt-4 border-t border-border">
                <div className="bg-eco-gradient rounded-xl p-4 text-center">
                  <div className="text-white text-sm opacity-90 mb-1">Your Progress</div>
                  <div className="text-white text-lg font-bold">Level 12</div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-white h-2 rounded-full w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}