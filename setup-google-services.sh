#!/bin/bash

# Google Search Console & Analytics Setup Script for DevUtils
# This script helps you configure Google Search Console and Analytics

echo "🔍 Google Search Console & Analytics Setup for DevUtils"
echo "========================================================"
echo ""

# Check if required files exist
echo "📋 Checking required files..."
if [ -f "index.html" ]; then
    echo "✅ index.html found"
else
    echo "❌ index.html not found"
    exit 1
fi

if [ -f "public/sitemap.xml" ]; then
    echo "✅ sitemap.xml found"
else
    echo "❌ sitemap.xml not found"
    exit 1
fi

if [ -f "public/robots.txt" ]; then
    echo "✅ robots.txt found"
else
    echo "❌ robots.txt not found"
    exit 1
fi

echo ""
echo "🚀 Next Steps:"
echo "=============="
echo ""
echo "1. 📊 Google Search Console Setup:"
echo "   - Go to: https://search.google.com/search-console"
echo "   - Add your domain property"
echo "   - Choose 'HTML meta tag' verification method"
echo "   - Copy the verification code"
echo "   - Replace 'your-verification-code' in index.html"
echo ""
echo "2. 📈 Google Analytics Setup:"
echo "   - Go to: https://analytics.google.com"
echo "   - Create a GA4 property"
echo "   - Copy your Measurement ID (G-XXXXXXXXXX)"
echo "   - Replace 'G-XXXXXXXXXX' in index.html"
echo ""
echo "3. 🗺️ Submit Sitemap:"
echo "   - In Google Search Console, go to 'Sitemaps'"
echo "   - Add sitemap: sitemap.xml"
echo "   - Click 'Submit'"
echo ""
echo "4. 🚀 Deploy Your Application:"
echo "   - Deploy to Vercel or your hosting platform"
echo "   - Verify Google Search Console ownership"
echo "   - Monitor analytics data"
echo ""
echo "📚 For detailed instructions, see: GOOGLE_SEARCH_CONSOLE_SETUP.md"
echo ""
echo "🎯 Expected Timeline:"
echo "   - Verification: Immediate"
echo "   - Initial data: 24-48 hours"
echo "   - Search visibility: 2-4 weeks"
echo ""
echo "✨ Your DevUtils app is ready for Google Search Console integration!"
