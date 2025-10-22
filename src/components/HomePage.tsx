import React from 'react';
import { 
  Clock, Scale, FileJson, FileCode, Shield, Image as ImageIcon, 
  Sparkles, TrendingUp, Zap, Star,
  Braces
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { SEO, SEOConfigs } from './SEO';

export function HomePage() {
  const navigate = useNavigate();
  const tools = [
    {
      id: '/time-converter',
      icon: Clock,
      title: 'Time Converter',
      description: 'Convert between time zones and formats with real-time updates',
      color: 'from-blue-500 to-cyan-500',
      tags: ['Popular', 'Utility'],
      gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    },
    {
      id: '/unit-converter',
      icon: Scale,
      title: 'Unit Converter',
      description: 'Convert length, weight, volume, temperature, and data units',
      color: 'from-green-500 to-emerald-500',
      tags: ['Essential'],
      gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    },
    {
      id: '/json-tools',
      icon: FileJson,
      title: 'JSON Tools',
      description: 'Format, validate, and explore JSON with interactive tree view',
      color: 'from-purple-500 to-pink-500',
      tags: ['Popular', 'Developer'],
      gradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    },
    {
      id: '/xml-tools',
      icon: FileCode,
      title: 'XML Tools',
      description: 'Format, validate, and beautify XML documents instantly',
      color: 'from-orange-500 to-red-500',
      tags: ['Developer'],
      gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    },
    {
      id: '/password-generator',
      icon: Shield,
      title: 'Password Generator',
      description: 'Create strong, secure passwords with customizable options',
      color: 'from-emerald-500 to-teal-500',
      tags: ['Security', 'Essential'],
      gradient: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    },
    {
      id: '/image-tools',
      icon: ImageIcon,
      title: 'Image Tools',
      description: 'Resize and compress images for optimal web performance',
      color: 'from-pink-500 to-rose-500',
      tags: ['Media'],
      gradient: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10',
    },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Instant operations with no delays' },
    { icon: Shield, title: 'Privacy First', desc: 'All processing happens locally' },
    { icon: TrendingUp, title: 'Always Improving', desc: 'Regularly updated with new features' },
  ];

  return (
    <>
      <SEO {...SEOConfigs.home} />
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12 relative" aria-labelledby="hero-heading">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-3xl flex items-center justify-center shadow-2xl">
              <img src="/logo.png" alt="DevUtils"   className="h-20 w-20 sm:h-32 sm:w-32" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 id="hero-heading" className="text-5xl sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Developer Tools
            </span>
            <br />
            <span className="text-foreground/80">Made Simple</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of powerful, fast, and beautiful utilities designed for developers. 
            Everything you need, nothing you don't.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-8 flex-wrap"
        >
          {[
            { number: '6+', label: 'Tools' },
            { number: '100%', label: 'Free' },
            { number: '0ms', label: 'Latency' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section className="space-y-6" aria-labelledby="tools-heading">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <h2 id="tools-heading" className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" aria-hidden="true" />
            Available Tools
          </h2>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card
                  className={`cursor-pointer group overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-2xl h-full ${tool.gradient}`}
                  onClick={() => navigate(tool.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(tool.id);
                    }
                  }}
                  aria-label={`Open ${tool.title} tool`}
                >
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                      </motion.div>
                    </div>
                    <CardTitle className="group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/60 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Open tool</span>
                      <motion.span
                        className="ml-1"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="border-t border-border/50 pt-16"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">Key Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-4 p-8 rounded-2xl hover:bg-accent/50 transition-all"
              >
                <motion.div 
                  className="flex justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                </motion.div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>
    </motion.div>

    </>
  );
}
