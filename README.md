
# 🚀 DevUtils - Developer Tools Platform

A modern, fast, and beautiful collection of essential developer utilities built with React, TypeScript, and Tailwind CSS. All tools run locally in your browser with zero latency and complete privacy.

![DevUtils Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)

## ✨ Features

- **⚡ Lightning Fast** - Instant operations with no delays
- **🔒 Privacy First** - All processing happens locally in your browser
- **🎨 Beautiful UI** - Modern design with smooth animations
- **📱 Responsive** - Works perfectly on desktop and mobile
- **🆓 100% Free** - No subscriptions, no limits, no tracking

## 🛠️ Available Tools

### 🕐 Time Converter
Convert between time zones and formats with real-time updates
- Real-time clock display
- Multiple timezone support
- Custom date/time input
- ISO format conversion

### ⚖️ Unit Converter
Convert length, weight, volume, temperature, and data units
- Length: meters, feet, inches, miles, kilometers
- Weight: grams, pounds, ounces, kilograms
- Volume: liters, gallons, cups, milliliters
- Temperature: Celsius, Fahrenheit, Kelvin
- Data: bytes, KB, MB, GB, TB

### 📄 JSON Tools
Format, validate, and explore JSON with interactive tree view
- JSON validation and formatting
- Minify/beautify JSON
- Interactive tree view
- Copy to clipboard functionality

### 📝 XML Tools
Format, validate, and beautify XML documents instantly
- XML validation and formatting
- Pretty print XML
- Error highlighting
- Syntax validation

### 🔐 Password Generator
Create strong, secure passwords with customizable options
- Customizable length (4-128 characters)
- Character type selection (uppercase, lowercase, numbers, symbols)
- Password strength indicator
- Copy to clipboard

### 🖼️ Image Tools
Resize and compress images for optimal web performance
- Image resizing
- Format conversion
- Compression optimization
- Batch processing support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DevUtils
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment

### Vercel (Recommended)
This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

The `vercel.json` file includes optimized settings for:
- Static asset caching
- SPA routing
- Build optimization

### Other Platforms
The project can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🏗️ Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Notifications**: Sonner
- **Forms**: React Hook Form

## 📁 Project Structure

```
DevUtils/
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── HomePage.tsx        # Landing page
│   │   ├── TimeConverter.tsx   # Time conversion tool
│   │   ├── UnitConverter.tsx   # Unit conversion tool
│   │   ├── JSONTools.tsx       # JSON utilities
│   │   ├── XMLTools.tsx        # XML utilities
│   │   ├── PasswordGenerator.tsx # Password generation
│   │   ├── ImageTools.tsx      # Image processing
│   │   └── Layout.tsx          # Main layout component
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # App entry point
│   └── styles/                # Global styles
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## 🎨 Design System

The project uses a comprehensive design system with:
- **Color Palette**: Modern gradients and semantic colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Accessible, reusable UI components
- **Animations**: Smooth, purposeful micro-interactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original design inspiration from [Figma Design](https://www.figma.com/design/1z0hmbNffugiQQKCLWesYL/Utilities-Platform-Overview)
- UI components built with [Radix UI](https://www.radix-ui.com/)
- Icons provided by [Lucide](https://lucide.dev/)
- Animations powered by [Motion](https://motion.dev/)

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---
