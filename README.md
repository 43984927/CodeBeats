<div align="center">

# 🎵 CodeBeats

**Hear What Your Code Sounds Like**

[![GitHub Stars](https://img.shields.io/github/stars/43984927/CodeBeats?style=social)](https://github.com/43984927/CodeBeats)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)

Transform your source code into music. Every function becomes a melody, every loop creates a rhythm, and every conditional triggers a chord change.

[English](#english) | [中文](#中文)

---

<img src="https://via.placeholder.com/800x450?text=CodeBeats+Demo+Screenshot" alt="CodeBeats Demo" width="800"/>

</div>

---

<a id="english"></a>

## 🇺🇸 English

### ✨ Features

- 🎹 **Code → Music Mapping** — Functions become melodies, loops become rhythms, conditionals become chord changes
- 🌈 **6 Music Styles** — Electronic, Classical, Jazz, Ambient, Chiptune, Lo-Fi
- 📊 **Real-time Visualization** — Spectrum bars, particle effects, and waveform animation
- 🔍 **Code Analysis** — Parse functions, classes, loops, conditionals, variables, and more
- 🌐 **5 Languages Supported** — Python, JavaScript, TypeScript, Rust, Go
- 📤 **One-click Share** — Share your code music on social media
- 🔊 **Volume Control** — Adjust playback volume in real-time
- 🎯 **Zero Dependencies** — Runs entirely in the browser, no backend needed

### 🎵 Mapping Rules

| Code Element | Music Element | Description |
|-------------|---------------|-------------|
| `function` | 🎵 Melody | Function name → melody seed, async → delay effect |
| `class` | 🏛️ Chord | Full chord with pad instrument |
| `for/while` | 🔄 Rhythm | Drum pattern, nested loops → denser rhythm |
| `if/else` | 🔀 Harmony | if → major chord, else → minor chord |
| `variable` | 📦 Bass | Low bass line, name → pitch seed |
| `import` | 📥 Intro | Ascending arpeggio with reverb |
| `comment` | 💬 Ambient | Soft pad with long reverb |
| `return` | ↩️ Outro | Descending notes with fade-out |
| `try/catch` | 🛡️ Dissonance | Catch → distorted, harsh sound |

### 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/43984927/CodeBeats.git
cd CodeBeats

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🎮 How to Use

1. **Paste your code** in the editor (or click language buttons for sample code)
2. **Choose a music style** — Electronic, Classical, Jazz, Ambient, Chiptune, or Lo-Fi
3. **Click ▶ Play** — Hear your code transform into music
4. **Watch the visualizer** — Spectrum bars and particles dance with the music
5. **Click 📤 Share** — Share your code music with the world

### 🏗️ Architecture

```
CodeBeats/
├── src/
│   ├── core/                    # Core Engine
│   │   ├── parser/index.ts      # Code Parser (5 languages)
│   │   ├── mapper/index.ts      # Code → Music Mapper
│   │   └── audio/index.ts       # Tone.js Synthesizer
│   ├── components/
│   │   └── Visualizer.tsx       # Canvas Audio Visualization
│   ├── pages/
│   │   └── Home.tsx             # Main Page
│   └── App.tsx                  # Root Component
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Audio**: Tone.js (Web Audio API)
- **Visualization**: Canvas 2D
- **Code Parsing**: Custom regex-based AST analyzer
- **Deployment**: Vercel / GitHub Pages

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<a id="中文"></a>

## 🇨🇳 中文

### ✨ 功能特性

- 🎹 **代码转音乐** — 函数变旋律，循环变节奏，条件变和弦
- 🌈 **6种音乐风格** — 电子、古典、爵士、氛围、芯片音乐、Lo-Fi
- 📊 **实时可视化** — 频谱柱状图、粒子特效、波形动画
- 🔍 **代码分析** — 解析函数、类、循环、条件、变量等结构
- 🌐 **支持5种语言** — Python、JavaScript、TypeScript、Rust、Go
- 📤 **一键分享** — 将你的代码音乐分享到社交媒体
- 🔊 **音量控制** — 实时调节播放音量
- 🎯 **零依赖** — 完全在浏览器中运行，无需后端

### 🎵 映射规则

| 代码元素 | 音乐元素 | 说明 |
|----------|----------|------|
| `function` | 🎵 旋律 | 函数名→旋律种子，async→延迟效果 |
| `class` | 🏛️ 和弦 | 完整和弦+铺底音色 |
| `for/while` | 🔄 节奏 | 鼓点模式，嵌套循环→更密集的节奏 |
| `if/else` | 🔀 和声 | if→大调和弦，else→小调和弦 |
| `variable` | 📦 低音 | 低音贝斯线，变量名→音高种子 |
| `import` | 📥 前奏 | 上行琶音+混响 |
| `comment` | 💬 氛围 | 柔和铺底+长混响 |
| `return` | ↩️ 尾声 | 下行音符+渐弱 |
| `try/catch` | 🛡️ 不和谐 | catch→失真、刺耳的音效 |

### 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/43984927/CodeBeats.git
cd CodeBeats

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### 🎮 使用方法

1. **粘贴代码** — 在编辑器中粘贴你的代码（或点击语言按钮加载示例）
2. **选择音乐风格** — 电子、古典、爵士、氛围、芯片音乐或Lo-Fi
3. **点击 ▶ Play** — 听你的代码变成音乐
4. **观看可视化** — 频谱柱状图和粒子随音乐舞动
5. **点击 📤 Share** — 把你的代码音乐分享给全世界

### 🏗️ 项目架构

```
CodeBeats/
├── src/
│   ├── core/                    # 核心引擎
│   │   ├── parser/index.ts      # 代码解析器（5种语言）
│   │   ├── mapper/index.ts      # 代码→音乐映射器
│   │   └── audio/index.ts       # Tone.js 音频合成器
│   ├── components/
│   │   └── Visualizer.tsx       # Canvas 音频可视化
│   ├── pages/
│   │   └── Home.tsx             # 主页面
│   └── App.tsx                  # 根组件
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 🛠️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **音频**: Tone.js (Web Audio API)
- **可视化**: Canvas 2D
- **代码解析**: 自定义正则表达式AST分析器
- **部署**: Vercel / GitHub Pages

### 🤝 参与贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

### 📄 许可证

本项目基于 MIT 许可证开源 — 详见 [LICENSE](LICENSE) 文件。

---

<div align="center">

**Made with 🎵 and ❤️**

[⭐ Star us on GitHub](https://github.com/43984927/CodeBeats) · [🐛 Report Bug](https://github.com/43984927/CodeBeats/issues) · [💡 Request Feature](https://github.com/43984927/CodeBeats/issues)

</div>
