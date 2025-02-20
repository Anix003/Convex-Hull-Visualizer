# 🌟 Interactive Convex Hull Visualizer 🌟

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Powered by JavaScript](https://img.shields.io/badge/Powered%20by-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind-38B2AC.svg)](https://tailwindcss.com/)

## 🎯 Overview

Welcome to the most awesome Convex Hull Visualizer ever! This interactive tool helps you understand and visualize the convex hull algorithm in action. Watch in real-time as the algorithm finds the smallest convex polygon that contains all your points! 

![Convex Hull Demo](/public/Preview.png)

## ✨ Features

- 🖱️ Interactive point placement
- 🎲 Random point generation
- ⏯️ Play/Pause animation controls
- 🎚️ Adjustable animation speed
- 🔊 Sound effects for hull connections
- 🎨 Beautiful color-coded visualization
- 📱 Responsive design
- ⚡ Real-time updates

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- 📦 Node.js (v14 or higher)
- 📦 npm or yarn

### 🛠️ Installation

1. Clone this repository:
```bash
git clone https://github.com/Anix003/Convex-Hull-Visualizer.git
cd convex-hull-visualizer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 🎨 Color Guide

Our visualizer uses an intuitive color scheme to help you understand the algorithm:

- 🔵 Blue: Unanalyzed points
- ⚪ Gray: Analyzed points
- 🟢 Green: Current base point
- 💛 Yellow: Line being analyzed
- ❤️ Red: Final convex hull edges

## 🎮 How to Use

1. 📍 Click anywhere on the canvas to add points
2. 🎲 Use the "Random Points" button to add random points
3. ▶️ Click "Start" to begin the visualization
4. ⏯️ Use Pause/Resume to control the animation
5. 🎚️ Adjust the speed slider to control animation speed
6. 🔄 Click "Clear" to reset everything

## 🧮 The Algorithm

The visualizer implements the Gift Wrapping algorithm (also known as Jarvis March) to find the convex hull. Here's how it works:

1. 🔍 Find the leftmost point
2. 🔄 For each point, find the most counterclockwise point
3. 📐 Repeat until we reach the starting point
4. ✨ Magic! We have our convex hull!

## 🛠️ Tech Stack

- ⚛️ React
- 🎨 Tailwind CSS
- 🎵 Web Audio API
- 📦 React Icons

## 💡 Tips and Tricks

- 🎯 Add at least 3 points to start the visualization
- 🔄 Points can't be too close to each other
- ⚡ Speed can be adjusted during animation
- 🎵 Make sure your sound is on for the cool effects!

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🔄 Create your feature branch
3. 💾 Commit your changes
4. 📤 Push to the branch
5. 🎯 Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📬 Contact

Questions? Comments? Suggestions? We'd love to hear from you!

- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourusername](https://twitter.com/yourusername)
- 💻 GitHub: [yourusername](https://github.com/yourusername)

---

Made with ❤️ and a lot of ☕ by [Your Name]

Remember to ⭐ this repo if you found it helpful!

<p align="right"> <img src="https://visitcount.itsvg.in/api?id=Anix003&icon=3&color=cyan)(https://visitcount.itsvg.in)" alt="anix003" /> </p>
