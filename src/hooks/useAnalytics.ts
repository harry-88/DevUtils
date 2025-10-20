import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking hook
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location]);

  // Track custom events
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'DevUtils',
        event_label: parameters?.tool || 'unknown',
        ...parameters,
      });
    }
  };

  // Track tool usage
  const trackToolUsage = (toolName: string, action: string) => {
    trackEvent('tool_usage', {
      tool_name: toolName,
      action: action,
      timestamp: new Date().toISOString(),
    });
  };

  // Track conversion events
  const trackConversion = (conversionType: string, value?: number) => {
    trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
    });
  };

  return {
    trackEvent,
    trackToolUsage,
    trackConversion,
  };
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
