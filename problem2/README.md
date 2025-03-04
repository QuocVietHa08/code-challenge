# Cryptocurrency Swap Interface

![Crypto Swap Interface](https://github.com/Switcheo/token-icons/raw/main/tokens/ETH.svg) ![Crypto Swap Interface](https://github.com/Switcheo/token-icons/raw/main/tokens/USDC.svg)

A modern, animated cryptocurrency token swap interface built with React, TypeScript, and advanced CSS animations. This project demonstrates a fluid, interactive UI for swapping between different cryptocurrency tokens with real-time price calculations and smooth transitions.

## 🚀 Features

- **Token Selection**: Modal-based token selection with dynamic token list
- **Real-time Exchange Rate**: Automatic calculation of exchange rates between tokens
- **Smooth Animations**: Advanced view transitions and interactive animations
- **Responsive Design**: Mobile-friendly interface with clean, modern styling
- **Error Handling**: Graceful fallbacks for browsers without View Transitions API support
- **Token Icons**: Integration with Switcheo token icon repository

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - Custom CSS animations and transitions
- **Build Tool**: Vite for fast development and optimized production builds
- **Animation Technologies**:
  - View Transitions API for page state transitions
  - CSS keyframe animations for interactive elements
  - Staggered animations for list items
- **Icons**: Lucide React for modern, customizable icons

## 🔧 Installation & Usage

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd problem2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Available scripts:

   ```bash
   # Start the development server with hot module replacement
   npm run dev
   
   # Build the project for production
   npm run build
   
   # Run ESLint to check code quality
   npm run lint
   
   # Preview the production build locally
   npm run preview
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Global styles and animations
├── utlis/           # Utility functions and constants
│   └── constants.ts # Token data and configuration
└── assets/          # Static assets
```

## 🎨 Animation Techniques

This project showcases several modern web animation techniques:

- **View Transitions API**: For smooth state transitions between UI states
- **CSS Keyframe Animations**: For entrance, hover, and interactive animations
- **Staggered Animations**: For creating cascading effects in lists
- **Transform Transitions**: For subtle interactive feedback
- **Fallback Animations**: For browsers without View Transitions API support

## 📱 Browser Compatibility

The application uses the View Transitions API which is supported in modern browsers. For browsers without support, the application gracefully falls back to standard React state transitions.

## 🔄 Token Data

Token data is sourced from the Switcheo API and includes:
- Currency code
- Current price
- Date of price update
- Token icon URL

## 🧩 Future Enhancements

- Add wallet connection functionality
- Implement actual token swap execution
- Add transaction history
- Implement dark mode
- Add more detailed token information

## 📄 License

MIT

