import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, Check, ChevronRight, ChevronDown, FileJson } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

export function JSONTools() {
  const [input, setInput] = useState('');
  const [parsedJSON, setParsedJSON] = useState<any>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(input);
      setParsedJSON(parsed);
      setError('');
      toast.success('JSON is valid!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setParsedJSON(null);
      toast.error('Invalid JSON');
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setInput(formatted);
      setParsedJSON(parsed);
      setError('');
      toast.success('JSON formatted!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      toast.error('Invalid JSON - cannot format');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setParsedJSON(parsed);
      setError('');
      toast.success('JSON minified!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      toast.error('Invalid JSON - cannot minify');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    const sample = {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
      },
      hobbies: ['reading', 'coding', 'gaming'],
      isActive: true,
    };
    const formatted = JSON.stringify(sample, null, 2);
    setInput(formatted);
    setParsedJSON(sample);
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
          <FileJson className="h-8 w-8" />
          JSON Tools
        </h1>
        <p className="text-muted-foreground">
          Format, validate, and explore JSON data
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Input JSON</CardTitle>
          <CardDescription>Paste your JSON data here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "example", "value": 123}'
            className="font-mono min-h-[200px]"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleParse}>Validate</Button>
            <Button onClick={handleFormat} variant="secondary">
              Format (Pretty)
            </Button>
            <Button onClick={handleMinify} variant="secondary">
              Minify
            </Button>
            <Button onClick={loadSample} variant="outline">
              Load Sample
            </Button>
            <Button
              onClick={() => {
                setInput('');
                setParsedJSON(null);
                setError('');
              }}
              variant="outline"
            >
              Clear
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
          {parsedJSON && !error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
            >
              <p>✓ Valid JSON</p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {parsedJSON && (
        <Tabs defaultValue="tree" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tree">Tree View</TabsTrigger>
            <TabsTrigger value="formatted">Formatted</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>

          <TabsContent value="tree">
            <Card>
              <CardHeader>
                <CardTitle>Tree View</CardTitle>
                <CardDescription>Explore your JSON structure</CardDescription>
              </CardHeader>
              <CardContent>
                <JSONTreeNode data={parsedJSON} name="root" level={0} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formatted">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Formatted JSON</CardTitle>
                  <CardDescription>Pretty-printed with indentation</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(parsedJSON, null, 2))}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm">
                  <code>{JSON.stringify(parsedJSON, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raw">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Raw JSON</CardTitle>
                  <CardDescription>Minified single-line output</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(parsedJSON))}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm break-all whitespace-pre-wrap">
                  <code>{JSON.stringify(parsedJSON)}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </motion.div>
  );
}

// Tree Node Component for JSON visualization
function JSONTreeNode({ data, name, level }: { data: any; name: string; level: number }) {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const isObject = typeof data === 'object' && data !== null && !Array.isArray(data);
  const isArray = Array.isArray(data);
  const isPrimitive = !isObject && !isArray;

  const getValueColor = (value: any) => {
    if (typeof value === 'string') return 'text-green-600 dark:text-green-400';
    if (typeof value === 'number') return 'text-blue-600 dark:text-blue-400';
    if (typeof value === 'boolean') return 'text-purple-600 dark:text-purple-400';
    if (value === null) return 'text-muted-foreground';
    return '';
  };

  const renderValue = (value: any) => {
    if (typeof value === 'string') return `"${value}"`;
    if (value === null) return 'null';
    return String(value);
  };

  if (isPrimitive) {
    return (
      <div className="flex gap-2 py-1 font-mono text-sm" style={{ paddingLeft: `${level * 20}px` }}>
        <span className="text-muted-foreground">{name}:</span>
        <span className={getValueColor(data)}>{renderValue(data)}</span>
      </div>
    );
  }

  const items = isArray ? data : Object.entries(data);
  const label = isArray ? `Array[${data.length}]` : `Object{${Object.keys(data).length}}`;

  return (
    <div style={{ paddingLeft: `${level * 20}px` }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 py-1 hover:bg-accent rounded px-1 -ml-1 font-mono text-sm w-full text-left"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        )}
        <span className="text-muted-foreground">{name}:</span>
        <span className="text-foreground">{label}</span>
      </button>
      {isExpanded && (
        <div>
          {isArray
            ? items.map((item: any, index: number) => (
                <JSONTreeNode key={index} data={item} name={`[${index}]`} level={level + 1} />
              ))
            : items.map(([key, value]: [string, any]) => (
                <JSONTreeNode key={key} data={value} name={key} level={level + 1} />
              ))}
        </div>
      )}
    </div>
  );
}
