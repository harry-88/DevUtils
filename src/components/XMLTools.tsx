import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, Check, FileCode } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

export function XMLTools() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const parseXML = (xmlString: string) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error(parserError.textContent || 'Invalid XML');
    }
    return xmlDoc;
  };

  const formatXML = (xml: string): string => {
    const PADDING = ' '.repeat(2);
    const reg = /(>)(<)(\/*)/g;
    let formatted = xml.replace(reg, '$1\n$2$3');
    let pad = 0;

    return formatted.split('\n').map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/) && pad > 0) {
        pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      pad += indent;
      return PADDING.repeat(pad - indent) + node;
    }).join('\n');
  };

  const handleFormat = () => {
    try {
      parseXML(input);
      const formatted = formatXML(input);
      setInput(formatted);
      setError('');
      toast.success('XML formatted successfully!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid XML');
      toast.error('Invalid XML - cannot format');
    }
  };

  const handleValidate = () => {
    try {
      parseXML(input);
      setError('');
      toast.success('XML is valid!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid XML');
      toast.error('Invalid XML');
    }
  };

  const handleMinify = () => {
    try {
      parseXML(input);
      const minified = input.replace(/>\s+</g, '><').trim();
      setInput(minified);
      setError('');
      toast.success('XML minified!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid XML');
      toast.error('Invalid XML - cannot minify');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    const sample = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="web">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
  <book category="programming">
    <title lang="en">JavaScript: The Good Parts</title>
    <author>Douglas Crockford</author>
    <year>2008</year>
    <price>29.99</price>
  </book>
</bookstore>`;
    setInput(sample);
    setError('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="mb-2 flex items-center gap-2">
          <FileCode className="h-8 w-8" />
          XML Formatter & Validator
        </h1>
        <p className="text-muted-foreground">
          Format, validate, and minify XML documents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>XML Input</CardTitle>
          <CardDescription>Paste your XML document here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='<?xml version="1.0"?><root>...</root>'
            className="font-mono min-h-[300px]"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleValidate}>Validate</Button>
            <Button onClick={handleFormat} variant="secondary">
              Format (Pretty)
            </Button>
            <Button onClick={handleMinify} variant="secondary">
              Minify
            </Button>
            <Button onClick={loadSample} variant="outline">
              Load Sample
            </Button>
            <Button onClick={copyToClipboard} variant="outline">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Copy
            </Button>
          </div>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20"
            >
              <p>Error: {error}</p>
            </motion.div>
          )}
          {!error && input && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
            >
              <p>✓ Valid XML</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
