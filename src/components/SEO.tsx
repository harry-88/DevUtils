import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

export function SEO({
  title = 'DevUtils - Free Developer Tools Platform',
  description = 'Free developer tools platform with JSON, Time, Unit Converters, Password Generator, XML Tools, and Image Utilities. All processing happens locally for privacy.',
  keywords = 'developer tools, JSON formatter, JSON validator, time converter, timezone converter, unit converter, password generator, XML tools, image utilities, free tools, online tools, developer utilities',
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/logo.png',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage = '/logo.png',
  structuredData,
}: SEOProps) {
  const siteUrl = 'https://dev-utils-nine.vercel.app/';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined;
  const fullOgUrl = ogUrl ? `${siteUrl}${ogUrl}` : undefined;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
  const fullTwitterImage = twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="DevUtils" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={ogTitle || title} />
      <meta property="og:site_name" content="DevUtils" />
      {fullOgUrl && <meta property="og:url" content={fullOgUrl} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={fullTwitterImage} />
      <meta name="twitter:image:alt" content={twitterTitle || ogTitle || title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="DevUtils" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Predefined SEO configurations for common pages
export const SEOConfigs = {
  home: {
    title: 'DevUtils - Free Developer Tools Platform',
    description: 'Free developer tools platform with JSON, Time, Unit Converters, Password Generator, XML Tools, and Image Utilities. All processing happens locally for privacy.',
    keywords: 'developer tools, JSON formatter, JSON validator, time converter, timezone converter, unit converter, password generator, XML tools, image utilities, free tools, online tools, developer utilities',
    canonical: '/',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "DevUtils",
      "description": "Free developer tools platform with JSON, Time, Unit Converters, Password Generator, XML Tools, and Image Utilities",
      "url": "https://devutils.com",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "JSON Formatter and Validator",
        "Time Zone Converter",
        "Unit Converter",
        "Password Generator",
        "XML Tools",
        "Image Utilities"
      ]
    }
  },
  
  timeConverter: {
    title: 'Time Converter - Convert Time Zones | DevUtils',
    description: 'Convert between different time zones and time formats instantly. Free online time converter with real-time updates and multiple timezone support.',
    keywords: 'time converter, timezone converter, time zone, UTC, GMT, PST, EST, time format, online time converter',
    canonical: '/time-converter',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Time Converter",
      "description": "Convert between different time zones and time formats instantly",
      "url": "https://devutils.com/time-converter",
      "applicationCategory": "UtilityApplication"
    }
  },
  
  unitConverter: {
    title: 'Unit Converter - Convert Length, Weight, Volume | DevUtils',
    description: 'Convert between different units of length, weight, volume, temperature, and data. Free online unit converter with instant calculations.',
    keywords: 'unit converter, length converter, weight converter, volume converter, temperature converter, data converter, metric, imperial',
    canonical: '/unit-converter',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Unit Converter",
      "description": "Convert between different units of length, weight, volume, temperature, and data",
      "url": "https://devutils.com/unit-converter",
      "applicationCategory": "UtilityApplication"
    }
  },
  
  jsonTools: {
    title: 'JSON Tools - Formatter, Validator, Beautifier | DevUtils',
    description: 'Format, validate, and beautify JSON data with our free online JSON tools. Includes JSON formatter, validator, minifier, and interactive tree view.',
    keywords: 'JSON formatter, JSON validator, JSON beautifier, JSON minifier, JSON tree view, JSON tools, online JSON editor',
    canonical: '/json-tools',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JSON Tools",
      "description": "Format, validate, and beautify JSON data with interactive tree view",
      "url": "https://devutils.com/json-tools",
      "applicationCategory": "DeveloperApplication"
    }
  },
  
  xmlTools: {
    title: 'XML Tools - Formatter, Validator, Beautifier | DevUtils',
    description: 'Format, validate, and beautify XML documents with our free online XML tools. Includes XML formatter, validator, and beautifier.',
    keywords: 'XML formatter, XML validator, XML beautifier, XML tools, online XML editor, XML minifier',
    canonical: '/xml-tools',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "XML Tools",
      "description": "Format, validate, and beautify XML documents",
      "url": "https://devutils.com/xml-tools",
      "applicationCategory": "DeveloperApplication"
    }
  },
  
  passwordGenerator: {
    title: 'Password Generator - Create Strong Passwords | DevUtils',
    description: 'Generate strong, secure passwords with customizable options. Free online password generator with length, character type, and complexity controls.',
    keywords: 'password generator, strong password, secure password, random password, password creator, online password generator',
    canonical: '/password-generator',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Password Generator",
      "description": "Generate strong, secure passwords with customizable options",
      "url": "https://devutils.com/password-generator",
      "applicationCategory": "SecurityApplication"
    }
  },
  
  imageTools: {
    title: 'Image Tools - Resize, Compress Images | DevUtils',
    description: 'Resize and compress images for optimal web performance. Free online image tools with batch processing and format conversion.',
    keywords: 'image resizer, image compressor, image optimizer, resize image, compress image, image converter, online image tools',
    canonical: '/image-tools',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Image Tools",
      "description": "Resize and compress images for optimal web performance",
      "url": "https://devutils.com/image-tools",
      "applicationCategory": "MultimediaApplication"
    }
  }
};
