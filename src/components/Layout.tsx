import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Zap, Braces } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { useAnalytics } from '../hooks/useAnalytics';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { trackToolUsage } = useAnalytics();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const tools = [
    { id: '/', label: '🏠 Home', path: '/' },
    { id: '/time-converter', label: '⏰ Time', path: '/time-converter' },
    { id: '/unit-converter', label: '⚖️ Units', path: '/unit-converter' },
    { id: '/json-tools', label: '📋 JSON', path: '/json-tools' },
    { id: '/xml-tools', label: '📄 XML', path: '/xml-tools' },
    { id: '/password-generator', label: '🔐 Password', path: '/password-generator' },
    { id: '/image-tools', label: '🖼️ Image', path: '/image-tools' },
    { id: '/word-counter', label: '📝 Words', path: '/word-counter' },
  ];

  const currentTool = location.pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* SEO: Skip to main content link for accessibility */}
      {/* <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a> */}
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative h-15 w-15 s flex items-center justify-center">
                  <img src="/logo.png" alt="DevUtils" className="h-10 w-10" />
                </div>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  DevUtils
                </div>
                <div className="text-xs text-muted-foreground -mt-1">Power Tools</div>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant={currentTool === tool.path ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      navigate(tool.path);
                      trackToolUsage(tool.path.replace('/', ''), 'navigation_click');
                    }}
                    className={currentTool === tool.path ? 'shadow-lg' : ''}
                  >
                    {tool.label}
                  </Button>
                </motion.div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="rounded-full"
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden border-t border-border/50"
              >
                <div className="py-4 space-y-1">
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={currentTool === tool.path ? 'secondary' : 'ghost'}
                      className="justify-start w-full"
                      onClick={() => {
                        navigate(tool.path);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {tool.label}
                    </Button>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main id="main-content" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" role="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/50 mt-20 bg-background/50 backdrop-blur-sm" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-muted-foreground">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base font-medium"
            >
              &copy; 2025 DevUtils. Free developer tools platform.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-sm flex items-center justify-center gap-2 flex-wrap"
            >

              <span className="flex items-center gap-1">
                Tool built by <a href="https://binarybursts.com/" className="text-blue-500 hover:text-blue-600">BinaryBursts</a>
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1">
                Privacy-focused - all processing happens locally
              </span>
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}
