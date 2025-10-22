import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowRightLeft, Scale } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { SEO, SEOConfigs } from './SEO';

export function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState('1');
  const [result, setResult] = useState('3.28084');

  const unitCategories = {
    length: {
      label: 'Length',
      units: {
        meters: { label: 'Meters', toBase: 1 },
        kilometers: { label: 'Kilometers', toBase: 1000 },
        centimeters: { label: 'Centimeters', toBase: 0.01 },
        millimeters: { label: 'Millimeters', toBase: 0.001 },
        miles: { label: 'Miles', toBase: 1609.34 },
        yards: { label: 'Yards', toBase: 0.9144 },
        feet: { label: 'Feet', toBase: 0.3048 },
        inches: { label: 'Inches', toBase: 0.0254 },
      },
    },
    weight: {
      label: 'Weight',
      units: {
        kilograms: { label: 'Kilograms', toBase: 1 },
        grams: { label: 'Grams', toBase: 0.001 },
        milligrams: { label: 'Milligrams', toBase: 0.000001 },
        pounds: { label: 'Pounds', toBase: 0.453592 },
        ounces: { label: 'Ounces', toBase: 0.0283495 },
        tons: { label: 'Metric Tons', toBase: 1000 },
      },
    },
    temperature: {
      label: 'Temperature',
      units: {
        celsius: { label: 'Celsius (°C)', toBase: null },
        fahrenheit: { label: 'Fahrenheit (°F)', toBase: null },
        kelvin: { label: 'Kelvin (K)', toBase: null },
      },
    },
    volume: {
      label: 'Volume',
      units: {
        liters: { label: 'Liters', toBase: 1 },
        milliliters: { label: 'Milliliters', toBase: 0.001 },
        gallons: { label: 'Gallons (US)', toBase: 3.78541 },
        quarts: { label: 'Quarts', toBase: 0.946353 },
        pints: { label: 'Pints', toBase: 0.473176 },
        cups: { label: 'Cups', toBase: 0.236588 },
        cubicMeters: { label: 'Cubic Meters', toBase: 1000 },
      },
    },
    data: {
      label: 'Data',
      units: {
        bytes: { label: 'Bytes', toBase: 1 },
        kilobytes: { label: 'Kilobytes (KB)', toBase: 1024 },
        megabytes: { label: 'Megabytes (MB)', toBase: 1024 * 1024 },
        gigabytes: { label: 'Gigabytes (GB)', toBase: 1024 * 1024 * 1024 },
        terabytes: { label: 'Terabytes (TB)', toBase: 1024 * 1024 * 1024 * 1024 },
        bits: { label: 'Bits', toBase: 0.125 },
      },
    },
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;
    
    // Convert to Celsius first
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
    else if (from === 'kelvin') celsius = value - 273.15;
    else celsius = value;

    // Convert from Celsius to target
    if (to === 'celsius') return celsius;
    if (to === 'fahrenheit') return celsius * 9 / 5 + 32;
    if (to === 'kelvin') return celsius + 273.15;
    return celsius;
  };

  const convert = (value: string, from: string, to: string, cat: string): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '0';

    if (cat === 'temperature') {
      return convertTemperature(numValue, from, to).toFixed(4);
    }

    const categoryData = unitCategories[cat as keyof typeof unitCategories];
    const fromFactor = categoryData.units[from as keyof typeof categoryData.units]?.toBase || 1;
    const toFactor = categoryData.units[to as keyof typeof categoryData.units]?.toBase || 1;

    const baseValue = numValue * fromFactor;
    const result = baseValue / toFactor;

    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const handleConvert = () => {
    const newResult = convert(inputValue, fromUnit, toUnit, category);
    setResult(newResult);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const categoryData = unitCategories[newCategory as keyof typeof unitCategories];
    const units = Object.keys(categoryData.units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue('1');
    const newResult = convert('1', units[0], units[1] || units[0], newCategory);
    setResult(newResult);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    const newResult = convert(inputValue, toUnit, temp, category);
    setResult(newResult);
  };

  return (
    <>
      <SEO {...SEOConfigs.unitConverter} />
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="mb-2 flex items-center gap-2">
          <Scale className="h-8 w-8" />
          Unit Converter
        </h1>
        <p className="text-muted-foreground">
          Convert between different units of measurement
        </p>
      </div>

      <Tabs value={category} onValueChange={handleCategoryChange}>
        <TabsList className="grid w-full grid-cols-5">
          {Object.entries(unitCategories).map(([key, data]) => (
            <TabsTrigger key={key} value={key}>
              {data.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(unitCategories).map(([key, categoryData]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Convert {categoryData.label}</CardTitle>
                <CardDescription>Enter a value and select units to convert</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* From Unit */}
                <div className="space-y-2">
                  <Label htmlFor="from-value">From</Label>
                  <div className="flex gap-2">
                    <Input
                      id="from-value"
                      type="number"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        handleConvert();
                      }}
                      placeholder="Enter value"
                      className="flex-1"
                    />
                    <Select value={fromUnit} onValueChange={(value) => {
                      setFromUnit(value);
                      const newResult = convert(inputValue, value, toUnit, key);
                      setResult(newResult);
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryData.units).map(([unitKey, unitData]) => (
                          <SelectItem key={unitKey} value={unitKey}>
                            {unitData.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>

                {/* To Unit */}
                <div className="space-y-2">
                  <Label htmlFor="to-value">To</Label>
                  <div className="flex gap-2">
                    <Input
                      id="to-value"
                      type="text"
                      value={result}
                      readOnly
                      className="flex-1 bg-muted"
                    />
                    <Select value={toUnit} onValueChange={(value) => {
                      setToUnit(value);
                      const newResult = convert(inputValue, fromUnit, value, key);
                      setResult(newResult);
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryData.units).map(([unitKey, unitData]) => (
                          <SelectItem key={unitKey} value={unitKey}>
                            {unitData.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle>Common Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm">
                  {Object.entries(categoryData.units).slice(0, 4).map(([unitKey, unitData]) => {
                    const conversion = convert('1', unitKey, Object.keys(categoryData.units)[0], key);
                    return (
                      <div key={unitKey} className="flex justify-between p-2 rounded hover:bg-accent">
                        <span>1 {unitData.label}</span>
                        <span className="text-muted-foreground">
                          = {conversion} {categoryData.units[Object.keys(categoryData.units)[0] as keyof typeof categoryData.units].label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
    </>
  );
}
