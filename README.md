<div align="center">

# 🎵 CodeBeats

**Hear What Your Code Sounds Like / 听听你的代码什么声音**

[![GitHub Stars](https://img.shields.io/github/stars/43984927/CodeBeats?style=social)](https://github.com/43984927/CodeBeats)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![GitHub Pages](https://img.shields.io/badge/Demo-Live%20Online-success.svg)](https://43984927.github.io/CodeBeats/)

🚀 **[Try it online → https://43984927.github.io/CodeBeats/](https://43984927.github.io/CodeBeats/)**

Transform your source code into music. Every function becomes a melody, every loop creates a rhythm, and every conditional triggers a chord change. Who knew that `for` loop could drop such a sick beat? 🤯

将你的源代码转化为音乐。每个函数变成一段旋律，每个循环创造一种节奏，每个条件判断触发一次和弦变化。谁说程序员只会敲代码？一起来听听程序猿的music吧 🐒🎸

[English](#english) | [中文](#中文)

---

<img src="public/banner.svg" alt="CodeBeats Banner" width="800"/>

</div>

---

<a id="english"></a>

## 🇺🇸 English

### ✨ Features

#### 🎹 Code → Music Mapping Engine
The core engine parses your source code into an AST (Abstract Syntax Tree), extracts structural elements, and maps each code construct to a unique musical element. Every piece of code generates a completely unique composition — no two codebases sound the same.

- **Function → Melody**: Each function generates a distinct melody theme. The function name is hashed into a melody seed, so `calculateTotal()` and `sendEmail()` will produce completely different tunes. Async functions add a spatial delay effect, and exported functions play with higher velocity.
- **Loop → Rhythm**: `for` and `while` loops create rhythmic drum patterns. Nested loops produce denser, more complex rhythms. The deeper the nesting, the more intense the beat.
- **Conditional → Harmony**: `if` statements trigger bright major chords, while `else` branches shift to melancholic minor chords. `switch/case` statements create chord progressions that flow through different harmonic territories.
- **Variable → Bass Line**: Variable assignments anchor the composition with a low bass foundation. The variable name determines the pitch — short names produce punchy bass, longer names create flowing bass lines.
- **Import → Intro**: Import statements generate ascending arpeggios with lush reverb, creating an atmospheric opening — like the overture of your code's symphony.
- **Comment → Ambient Pad**: Comments produce soft, sustained pad sounds with long reverb tails, adding atmospheric depth — the "breathing room" in your code's music.
- **Return → Outro**: Return statements create descending note sequences with gradual fade-out, providing a natural musical conclusion to each function's melody.
- **Try/Catch → Dissonance**: Error handling produces intentionally dissonant, distorted sounds — `catch` blocks create harsh, attention-grabbing textures that musically represent the "something went wrong" nature of exceptions.
- **Class → Grand Chord**: Class definitions produce full, rich chords with pad instruments, representing the structural foundation of your code architecture.

#### 🌈 6 Music Styles
Each style completely changes the instrumentation, tempo, and feel of the generated music:

| Style | BPM | Instruments | Vibe |
|-------|-----|-------------|------|
| 🎹 **Electronic** | 128 | Sawtooth synth, synth bass, electronic drums | Energetic, pulsing, club-ready |
| 🎻 **Classical** | 90 | Piano, cello, timpani, strings | Elegant, refined, orchestral |
| 🎷 **Jazz** | 110 | Piano, upright bass, brushes, vibraphone | Smooth, swinging, sophisticated |
| 🌊 **Ambient** | 70 | Pad, sub-bass, percussion, atmosphere | Dreamy, spacious, meditative |
| 👾 **Chiptune** | 140 | Square wave, triangle wave, noise | Retro 8-bit, nostalgic, playful |
| ☕ **Lo-Fi** | 85 | Electric piano, bass, lo-fi drums, vinyl pad | Chill, warm, study-friendly |

#### 📊 Real-time Visualization
- **Spectrum Bars**: 64-bar frequency visualizer with gradient colors (indigo → pink for active sections)
- **Particle Effects**: Musical notes float upward as particles during playback, with physics-based motion
- **Waveform Animation**: Sine wave overlay that pulses with the music
- **Section Highlighting**: Active code section is highlighted in the visualizer with glow effects
- **Section Timeline**: Color-coded timeline showing the musical structure of your code

#### 🔍 Code Analysis Dashboard
The analysis panel provides real-time statistics about your code:
- 🎵 **Functions** — Number of function definitions detected
- 🏛️ **Classes** — Class/struct/interface definitions
- 🔄 **Loops** — For/while loop constructs
- 🔀 **Conditions** — If/else/switch conditionals
- 📦 **Variables** — Variable declarations
- 💬 **Comments** — Comment lines
- 📏 **Depth** — Maximum nesting depth
- 🔥 **Complexity** — Overall code complexity score

The complexity score influences the musical key and scale selection — more complex code tends toward blues and dorian scales, while simpler code uses major and pentatonic scales.

#### 🌐 Multi-Language Support
Supports 5 programming languages with language-specific parsing rules:
- **Python**: Detects `def`, `class`, `for...in`, `while`, `if/elif/else`, decorators, `try/except`
- **JavaScript**: Detects `function`, arrow functions, `for/while`, `if/else`, `try/catch`, array methods
- **TypeScript**: Same as JavaScript plus `interface`, `type`, and type annotations
- **Rust**: Detects `fn`, `struct`, `enum`, `trait`, `impl`, `match`, `for/while loop`
- **Go**: Detects `func`, `struct`, `interface`, `for`, `if/else`, `switch`, `defer`

Each language also influences the musical key — Python defaults to D, JavaScript to E, Rust to C, Go to G.

#### 🎵 Musical Intelligence
- **Auto Key Selection**: The key is automatically chosen based on the programming language and code characteristics
- **Auto Scale Selection**: Simple code → major/pentatonic, complex code → blues/dorian, many conditionals → minor
- **Adaptive BPM**: Tempo adjusts based on code density and nesting depth — denser code plays faster
- **Harmonic Constraints**: All notes are constrained to the selected scale, ensuring the music always sounds pleasant
- **7 Scale Types**: Major, Minor, Pentatonic, Blues, Dorian, Mixolydian, Japanese

#### 📤 One-click Share
- **Web Share API**: On supported browsers, share directly to Twitter, Facebook, etc.
- **Clipboard Copy**: Copy a formatted share text with your code's musical stats
- **Share Card**: Includes the key, scale, BPM, and style of your code's music

#### 🎯 Zero Backend Required
The entire application runs in your browser — no server, no API keys, no data uploads. Your code never leaves your machine. Built with:
- **Tone.js** for Web Audio API synthesis
- **Canvas 2D** for real-time visualization
- **Custom parser** for code analysis (no heavy AST dependencies)

### 🎵 Complete Mapping Rules

| Code Element | Music Element | Instrument | Detail |
|-------------|---------------|------------|--------|
| `function` | 🎵 Melody | Style-dependent | Name → melody seed (hash), async → delay, exported → louder, params → chord complexity |
| `class` | 🏛️ Grand Chord | Pad + Lead | 4-note chord (7th) + high melody accent |
| `for/while` | 🔄 Rhythm | Drums/Percussion | 4-beat pattern, kick + hi-hat, nested → extra accent on beat 3 |
| `if/else` | 🔀 Harmony | Pad | if → major triad (I-III-V), else → minor triad (i-iii-v) |
| `variable` | 📦 Bass | Bass instrument | Name hash → scale degree, depth → octave |
| `import` | 📥 Intro Arpeggio | Pad + Reverb | 3-note ascending arpeggio, heavy reverb |
| `comment` | 💬 Ambient Pad | Pad + Reverb | Sustained note, very soft, long reverb tail |
| `return` | ↩️ Fade-out | Lead instrument | 3-note descending sequence, decreasing velocity |
| `decorator` | ✨ Accent | Pad + Reverb | Same as import — arpeggiated accent |
| `try/catch` | 🛡️ Dissonance | Lead + Distortion | try → stable note, catch → dissonant + distorted |
| `assignment` | 📝 Note | Style-dependent | Generic note at current depth's octave |
| `string/number` | 🔤🔢 Note | Style-dependent | Literal values mapped to scale degrees |

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
5. **Click 🔍 Analyze** — See detailed code statistics
6. **Click 📤 Share** — Share your code music with the world

### 🏗️ Architecture

```
CodeBeats/
├── src/
│   ├── core/                    # Core Engine
│   │   ├── parser/index.ts      # Code Parser (5 languages, regex-based AST)
│   │   ├── mapper/index.ts      # Code → Music Mapper (7 scales, 6 styles)
│   │   └── audio/index.ts       # Tone.js Synthesizer (10+ instruments)
│   ├── components/
│   │   └── Visualizer.tsx       # Canvas Audio Visualization (spectrum + particles)
│   ├── pages/
│   │   └── Home.tsx             # Main Page (editor + controls + info panels)
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

### 👤 Author

**chanzs** - [GitHub](https://github.com/chanzs)

---

<a id="中文"></a>

## 🇨🇳 中文

### ✨ 功能特性

#### 🎹 代码→音乐映射引擎
核心引擎将你的源代码解析为AST（抽象语法树），提取结构元素，并将每个代码构造映射为独特的音乐元素。每段代码都会生成完全独特的音乐作品——没有两段代码听起来是一样的。

- **函数 → 旋律**：每个函数生成独特的旋律主题。函数名通过哈希算法转化为旋律种子，所以 `calculateTotal()` 和 `sendEmail()` 会产生完全不同的曲调。异步函数会增加空间延迟效果，导出函数以更高音量播放。
- **循环 → 节奏**：`for` 和 `while` 循环创建有节奏的鼓点模式。嵌套循环产生更密集、更复杂的节奏。嵌套越深，节拍越强烈。
- **条件 → 和声**：`if` 语句触发明亮的大调和弦，而 `else` 分支切换到忧郁的小调和弦。`switch/case` 语句创建在不同和声领域流动的和弦进行。
- **变量 → 低音线**：变量赋值用低音贝斯为作品奠定基础。变量名决定音高——短名称产生有力的低音，长名称创造流动的贝斯线。
- **Import → 前奏**：导入语句生成带有丰富混响的上行琶音，营造氛围感——就像你代码交响乐的序曲。
- **注释 → 氛围铺底**：注释产生柔和、持续的铺底音色，带有长混响尾音，增加氛围深度——你代码音乐中的"呼吸空间"。
- **Return → 尾声**：Return 语句创建下行音符序列，带有渐弱效果，为每个函数的旋律提供自然的音乐结尾。
- **Try/Catch → 不和谐音**：错误处理产生故意的不和谐、失真声音——`catch` 块创造刺耳的、引人注目的音色，在音乐上表现异常的"出错了"本质。
- **类 → 宏大和弦**：类定义产生完整、丰富的和弦，使用铺底乐器，代表代码架构的结构基础。

#### 🌈 6种音乐风格
每种风格完全改变生成音乐的乐器、速度和感觉：

| 风格 | BPM | 乐器 | 氛围 |
|------|-----|------|------|
| 🎹 **电子（Electronic）** | 128 | 锯齿波合成器、合成贝斯、电子鼓 | 充满活力、脉动、适合俱乐部 |
| 🎻 **古典（Classical）** | 90 | 钢琴、大提琴、定音鼓、弦乐 | 优雅、精致、管弦乐 |
| 🎷 **爵士（Jazz）** | 110 | 钢琴、立式贝斯、鼓刷、颤音琴 | 流畅、摇摆、精致 |
| 🌊 **氛围（Ambient）** | 70 | 铺底、超低音、打击乐、大气音 | 梦幻、空灵、冥想 |
| 👾 **芯片音乐（Chiptune）** | 140 | 方波、三角波、噪声 | 复古8位、怀旧、俏皮 |
| ☕ **Lo-Fi** | 85 | 电钢琴、贝斯、Lo-Fi鼓、黑胶铺底 | 轻松、温暖、适合学习 |

#### 📊 实时可视化
- **频谱柱状图**：64段频率可视化器，渐变色彩（靛蓝→粉色表示活跃段落）
- **粒子特效**：播放时音符以粒子形式向上飘浮，基于物理的运动效果
- **波形动画**：正弦波叠加层随音乐脉动
- **段落高亮**：当前播放的代码段在可视化器中高亮显示，带发光效果
- **段落时间线**：颜色编码的时间线，展示代码的音乐结构

#### 🔍 代码分析面板
分析面板提供代码的实时统计数据：
- 🎵 **函数** — 检测到的函数定义数量
- 🏛️ **类** — 类/结构体/接口定义
- 🔄 **循环** — For/While循环结构
- 🔀 **条件** — If/else/switch条件语句
- 📦 **变量** — 变量声明
- 💬 **注释** — 注释行
- 📏 **深度** — 最大嵌套深度
- 🔥 **复杂度** — 整体代码复杂度评分

复杂度评分会影响调性和音阶选择——更复杂的代码倾向于蓝调和多利亚调式，而更简单的代码使用大调和五声音阶。

#### 🌐 多语言支持
支持5种编程语言，带有语言特定的解析规则：
- **Python**：检测 `def`、`class`、`for...in`、`while`、`if/elif/else`、装饰器、`try/except`
- **JavaScript**：检测 `function`、箭头函数、`for/while`、`if/else`、`try/catch`、数组方法
- **TypeScript**：同JavaScript，加上 `interface`、`type` 和类型注解
- **Rust**：检测 `fn`、`struct`、`enum`、`trait`、`impl`、`match`、`for/while loop`
- **Go**：检测 `func`、`struct`、`interface`、`for`、`if/else`、`switch`、`defer`

每种语言还会影响音乐调性——Python默认D调，JavaScript默认E调，Rust默认C调，Go默认G调。

#### 🎵 音乐智能
- **自动选调**：根据编程语言和代码特征自动选择调性
- **自动选音阶**：简单代码→大调/五声，复杂代码→蓝调/多利亚，多条件→小调
- **自适应BPM**：速度根据代码密度和嵌套深度调整——越密集的代码播放越快
- **和声约束**：所有音符限制在选定音阶内，确保音乐始终悦耳
- **7种音阶类型**：大调、小调、五声、蓝调、多利亚、混合利底亚、日本音阶

#### 📤 一键分享
- **Web Share API**：在支持的浏览器上，直接分享到Twitter、Facebook等
- **剪贴板复制**：复制格式化的分享文本，包含代码音乐的统计信息
- **分享卡片**：包含代码音乐的调性、音阶、BPM和风格

#### 🎯 零后端依赖
整个应用在浏览器中运行——无需服务器、无需API密钥、无需上传数据。你的代码永远不会离开你的设备。构建技术：
- **Tone.js** 用于Web Audio API音频合成
- **Canvas 2D** 用于实时可视化
- **自定义解析器** 用于代码分析（无重量级AST依赖）

### 🎵 完整映射规则

| 代码元素 | 音乐元素 | 乐器 | 详细说明 |
|----------|----------|------|----------|
| `function` | 🎵 旋律 | 随风格变化 | 函数名→旋律种子（哈希），async→延迟，exported→更高音量，参数→和弦复杂度 |
| `class` | 🏛️ 宏大和弦 | 铺底+主奏 | 4音和弦（七和弦）+ 高音旋律点缀 |
| `for/while` | 🔄 节奏 | 鼓/打击乐 | 4拍模式，底鼓+踩镲，嵌套→第3拍加重音 |
| `if/else` | 🔀 和声 | 铺底 | if→大三和弦（I-III-V），else→小三和弦（i-iii-v） |
| `variable` | 📦 低音 | 贝斯乐器 | 名称哈希→音阶度数，深度→八度 |
| `import` | 📥 前奏琶音 | 铺底+混响 | 3音上行琶音，重度混响 |
| `comment` | 💬 氛围铺底 | 铺底+混响 | 持续音，非常柔和，长混响尾音 |
| `return` | ↩️ 渐弱尾声 | 主奏乐器 | 3音下行序列，递减音量 |
| `decorator` | ✨ 装饰音 | 铺底+混响 | 同import——琶音装饰 |
| `try/catch` | 🛡️ 不和谐音 | 主奏+失真 | try→稳定音，catch→不和谐+失真 |
| `assignment` | 📝 音符 | 随风格变化 | 当前深度八度的通用音符 |
| `string/number` | 🔤🔢 音符 | 随风格变化 | 字面值映射到音阶度数 |

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
5. **点击 🔍 Analyze** — 查看详细的代码统计
6. **点击 📤 Share** — 把你的代码音乐分享给全世界

### 🏗️ 项目架构

```
CodeBeats/
├── src/
│   ├── core/                    # 核心引擎
│   │   ├── parser/index.ts      # 代码解析器（5种语言，正则表达式AST）
│   │   ├── mapper/index.ts      # 代码→音乐映射器（7种音阶，6种风格）
│   │   └── audio/index.ts       # Tone.js 音频合成器（10+乐器）
│   ├── components/
│   │   └── Visualizer.tsx       # Canvas 音频可视化（频谱+粒子）
│   ├── pages/
│   │   └── Home.tsx             # 主页面（编辑器+控制+信息面板）
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

### 👤 作者

**chanzs** - [GitHub](https://github.com/chanzs)

---

<div align="center">

**Made with 🎵 and ❤️**

[⭐ Star us on GitHub](https://github.com/43984927/CodeBeats) · [🐛 Report Bug](https://github.com/43984927/CodeBeats/issues) · [💡 Request Feature](https://github.com/43984927/CodeBeats/issues)

</div>
