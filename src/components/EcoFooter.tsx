import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Github,
  ExternalLink,
  Heart
} from 'lucide-react';

const footerLinks = {
  Platform: [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Quests', href: '#quests' },
    { name: 'Learning Paths', href: '#learning' },
    { name: 'Community', href: '#community' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Teacher Guides', href: '#' },
    { name: 'Student Resources', href: '#' },
  ],
  Support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Bug Reports', href: '#' },
    { name: 'Feature Requests', href: '#' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press Kit', href: '#' },
    { name: 'Blog', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
  { icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  { icon: Github, href: '#', color: 'hover:text-gray-900' },
];

export default function EcoFooter() {
  return (
    <footer className="bg-gradient-to-br from-background to-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Leaf className="w-8 h-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-eco-nature rounded-full animate-pulse-eco" />
              </div>
              <span className="text-2xl font-bold text-gradient-eco">EcoQuest AI</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Transforming environmental education through AI-powered learning experiences. 
              Join thousands of students across India making real environmental impact.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Smart Education Initiative for SIH 2024</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>connect@ecoquest.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 43210</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground ${social.color} transition-colors duration-200`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-eco-gradient rounded-2xl p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated with EcoQuest
              </h3>
              <p className="text-white/90">
                Get the latest updates on new features, quests, and environmental initiatives.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="card-eco-glass p-6 text-center">
            <div className="w-12 h-12 bg-eco-nature/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-eco-nature" />
            </div>
            <h4 className="font-semibold mb-2">NEP 2020 Aligned</h4>
            <p className="text-sm text-muted-foreground">
              Fully compliant with National Education Policy guidelines
            </p>
          </div>

          <div className="card-eco-glass p-6 text-center">
            <div className="w-12 h-12 bg-eco-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-eco-secondary" />
            </div>
            <h4 className="font-semibold mb-2">SDG Focused</h4>
            <p className="text-sm text-muted-foreground">
              Supporting UN Sustainable Development Goals through education
            </p>
          </div>

          <div className="card-eco-glass p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">SIH 2024</h4>
            <p className="text-sm text-muted-foreground">
              Smart India Hackathon innovation for environmental education
            </p>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-border pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 EcoQuest AI Platform. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse-eco" />
              <span>for Indian Education System</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}