import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Copy, FileText, BarChart3, Type, Hash, AlignLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { SEO, SEOConfigs } from './SEO';

interface CountStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
}

export function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<CountStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  });

  const countStats = (inputText: string): CountStats => {
    // Handle empty or whitespace-only text
    if (!inputText || inputText.trim().length === 0) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 1, // At least one line even if empty
      };
    }

    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Count words - split by whitespace and filter out empty strings
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Count sentences - split by sentence-ending punctuation, but handle edge cases
    const sentenceEndings = inputText.match(/[.!?]+/g) || [];
    const sentences = sentenceEndings.length > 0 ? sentenceEndings.length : (words > 0 ? 1 : 0);
    
    // Count paragraphs - split by double newlines or empty lines
    const paragraphs = inputText.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length || 1;
    
    // Count lines - split by newlines
    const lines = inputText.split('\n').length;

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
    };
  };

  useEffect(() => {
    const newStats = countStats(text);
    console.log('Text:', text);
    console.log('Stats:', newStats);
    setStats(newStats);
  }, [text]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success('Text copied to clipboard!');
  };

  const clearText = () => {
    setText('');
    toast.success('Text cleared!');
  };

  const sampleTexts = [
    {
      title: 'Lorem Ipsum',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Technical Documentation',
      content: 'This is a sample technical documentation. It contains multiple sentences and paragraphs. Each paragraph demonstrates different aspects of text analysis. The word counter tool can analyze various types of content effectively.',
    },
    {
      title: 'Creative Writing',
      content: 'The sun was setting behind the mountains, casting long shadows across the valley. Birds were returning to their nests, and the evening breeze carried the scent of wildflowers. It was a perfect moment of tranquility.',
    },
  ];

  const loadSampleText = (sample: string) => {
    setText(sample);
    toast.success('Sample text loaded!');
  };

  const statCards = [
    {
      icon: Type,
      label: 'Characters',
      value: stats.characters,
      description: 'Total characters including spaces',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Hash,
      label: 'Characters (no spaces)',
      value: stats.charactersNoSpaces,
      description: 'Characters excluding spaces',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FileText,
      label: 'Words',
      value: stats.words,
      description: 'Total word count',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: AlignLeft,
      label: 'Sentences',
      value: stats.sentences,
      description: 'Number of sentences',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: BarChart3,
      label: 'Paragraphs',
      value: stats.paragraphs,
      description: 'Number of paragraphs',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Type,
      label: 'Lines',
      value: stats.lines,
      description: 'Number of lines',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <>
      <SEO {...SEOConfigs.wordCounter} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="mb-2 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Word Counter
          </h1>
          <p className="text-muted-foreground">
            Count words, characters, sentences, and paragraphs in your text
          </p>
        </div>

        {/* Text Input */}
        <Card>
          <CardHeader>
            <CardTitle>Text Input</CardTitle>
            <CardDescription>Paste or type your text below to analyze it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here to start counting..."
                className="min-h-[200px] resize-none"
                rows={8}
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{stats.characters} characters</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!text}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearText}
                    disabled={!text}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 pl-8">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <Badge variant="secondary" className="text-xs px-2">
                        {stat.label}
                      </Badge>
                    </div>
                    <div className="space-y-2 px-2">
                      <motion.div
                        key={stat.value}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl font-bold text-primary"
                        style={{ color: 'var(--primary)' }}
                      >
                        {stat.value.toLocaleString()}
                      </motion.div>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Sample Texts */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Texts</CardTitle>
            <CardDescription>Try these sample texts to see the word counter in action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {sampleTexts.map((sample, index) => (
                <motion.div
                  key={sample.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/50"
                    onClick={() => loadSampleText(sample.content)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{sample.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {sample.content}
                      </p>
                      <div className="mt-3 flex items-center text-xs text-primary">
                        <span>Click to load</span>
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Word Counter Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Characters include all letters, numbers, symbols, and spaces</p>
            <p>• Words are counted by splitting on whitespace characters</p>
            <p>• Sentences are detected by periods, exclamation marks, and question marks</p>
            <p>• Paragraphs are separated by double line breaks or empty lines</p>
            <p>• All counting happens locally in your browser for privacy</p>
            <p>• Perfect for writers, students, and content creators</p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
