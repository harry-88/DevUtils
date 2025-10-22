import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Copy, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { SEO, SEOConfigs } from './SEO';

export function TimeConverter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');

  const timezones = [
    { value: 'UTC', label: 'UTC', offset: 0 },
    { value: 'America/New_York', label: 'Eastern Time (ET)', offset: -5 },
    { value: 'America/Chicago', label: 'Central Time (CT)', offset: -6 },
    { value: 'America/Denver', label: 'Mountain Time (MT)', offset: -7 },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: -8 },
    { value: 'Europe/London', label: 'London (GMT)', offset: 0 },
    { value: 'Europe/Paris', label: 'Paris (CET)', offset: 1 },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 9 },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: 8 },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: 11 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeForTimezone = (date: Date, timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date);
    } catch (e) {
      return 'Invalid timezone';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const dateToUse = customDate && customTime 
    ? new Date(`${customDate}T${customTime}`) 
    : currentTime;

  return (
    <>
      <SEO {...SEOConfigs.timeConverter} />
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* SEO: Structured data for Time Converter tool */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Time Converter",
          "description": "Convert between time zones and formats with real-time updates",
          "url": "https://devutils.app/time-converter",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Real-time clock display",
            "Multiple timezone support", 
            "Custom date/time input",
            "ISO format conversion"
          ]
        })}
      </script>
      <div>
        <h1 className="mb-2 flex items-center gap-2">
          <Clock className="h-8 w-8" />
          Time Converter
        </h1>
        <p className="text-muted-foreground">
          Convert between time zones and view time in different formats
        </p>
      </div>

      {/* Current Time Display */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Current Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-mono">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <div className="text-muted-foreground">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Custom Date/Time Input */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Date/Time (Optional)</CardTitle>
          <CardDescription>Set a specific date and time to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="custom-date">Date</Label>
              <Input
                id="custom-date"
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-time">Time</Label>
              <Input
                id="custom-time"
                type="time"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                step="1"
              />
            </div>
          </div>
          {customDate && customTime && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCustomDate('');
                setCustomTime('');
              }}
            >
              Clear Custom Time
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Timezone Conversions */}
      <Card>
        <CardHeader>
          <CardTitle>Time in Different Zones</CardTitle>
          <CardDescription>See how the time appears across the world</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {timezones.map((tz) => {
            const formattedTime = formatTimeForTimezone(dateToUse, tz.value);
            return (
              <div
                key={tz.value}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div>
                  <div>{tz.label}</div>
                  <div className="text-muted-foreground">{formattedTime}</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(formattedTime)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Format Conversions */}
      <Card>
        <CardHeader>
          <CardTitle>Common Formats</CardTitle>
          <CardDescription>Different time format representations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'ISO 8601', value: dateToUse.toISOString() },
            { label: 'Unix Timestamp', value: Math.floor(dateToUse.getTime() / 1000).toString() },
            { label: 'Unix Timestamp (ms)', value: dateToUse.getTime().toString() },
            { label: 'UTC String', value: dateToUse.toUTCString() },
            { label: 'Local String', value: dateToUse.toString() },
          ].map((format) => (
            <div
              key={format.label}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div>{format.label}</div>
                <div className="text-muted-foreground font-mono text-sm truncate">
                  {format.value}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(format.value)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
    </>
  );
}
