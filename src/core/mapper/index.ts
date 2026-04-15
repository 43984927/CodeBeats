import type { CodeElement, CodeElementType, CodeStats, ParseResult } from '../parser/index'

export type MusicalScale =
  | 'major'
  | 'minor'
  | 'pentatonic'
  | 'blues'
  | 'dorian'
  | 'mixolydian'
  | 'japanese'

export type MusicStyle =
  | 'piano'
  | 'electronic'
  | 'classical'
  | 'jazz'
  | 'ambient'
  | 'chiptune'
  | 'lofi'

export interface MusicalNote {
  pitch: number
  duration: string
  velocity: number
  time: number
  instrument: string
  effect?: string
}

export interface MusicalSection {
  element: CodeElement
  notes: MusicalNote[]
  label: string
}

export interface MusicResult {
  sections: MusicalSection[]
  bpm: number
  key: string
  scale: MusicalScale
  style: MusicStyle
  totalDuration: number
  notes: MusicalNote[]
}

const SCALES: Record<MusicalScale, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  japanese: [0, 1, 5, 7, 8],
}

const KEY_MAP: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3,
  E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8,
  Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
}

const STYLE_CONFIG: Record<MusicStyle, {
  bpm: number
  defaultInstrument: string
  bassInstrument: string
  drumInstrument: string
  padInstrument: string
  swingFactor: number
  reverbMix: number
}> = {
  piano: { bpm: 72, defaultInstrument: 'GrandPiano', bassInstrument: 'GrandPianoBass', drumInstrument: 'SoftMallet', padInstrument: 'GrandPianoPad', swingFactor: 0, reverbMix: 0.7 },
  electronic: { bpm: 128, defaultInstrument: 'Synth', bassInstrument: 'SynthBass', drumInstrument: 'Drums', padInstrument: 'Pad', swingFactor: 0, reverbMix: 0.3 },
  classical: { bpm: 90, defaultInstrument: 'Piano', bassInstrument: 'Cello', drumInstrument: 'Timpani', padInstrument: 'Strings', swingFactor: 0, reverbMix: 0.5 },
  jazz: { bpm: 110, defaultInstrument: 'Piano', bassInstrument: 'Bass', drumInstrument: 'Brushes', padInstrument: 'Vibraphone', swingFactor: 0.3, reverbMix: 0.4 },
  ambient: { bpm: 70, defaultInstrument: 'Pad', bassInstrument: 'SubBass', drumInstrument: 'Percussion', padInstrument: 'Atmosphere', swingFactor: 0, reverbMix: 0.8 },
  chiptune: { bpm: 140, defaultInstrument: 'Square', bassInstrument: 'SquareBass', drumInstrument: 'Noise', padInstrument: 'Triangle', swingFactor: 0, reverbMix: 0.1 },
  lofi: { bpm: 85, defaultInstrument: 'EPiano', bassInstrument: 'Bass', drumInstrument: 'LoFiDrums', padInstrument: 'VinylPad', swingFactor: 0.15, reverbMix: 0.6 },
}

interface ChordDef {
  root: number
  type: 'major' | 'minor' | 'dim' | 'dom7' | 'min7' | 'maj7'
}

const CHORD_PROGRESSIONS: Record<string, ChordDef[][]> = {
  major: [
    [{ root: 0, type: 'maj7' }, { root: 3, type: 'min7' }, { root: 4, type: 'dom7' }, { root: 0, type: 'maj7' }],
    [{ root: 0, type: 'major' }, { root: 5, type: 'major' }, { root: 3, type: 'minor' }, { root: 4, type: 'major' }],
    [{ root: 0, type: 'maj7' }, { root: 4, type: 'dom7' }, { root: 5, type: 'dom7' }, { root: 0, type: 'maj7' }],
    [{ root: 0, type: 'major' }, { root: 3, type: 'minor' }, { root: 4, type: 'major' }, { root: 5, type: 'major' }],
  ],
  minor: [
    [{ root: 0, type: 'min7' }, { root: 3, type: 'maj7' }, { root: 5, type: 'min7' }, { root: 4, type: 'dom7' }],
    [{ root: 0, type: 'minor' }, { root: 5, type: 'minor' }, { root: 3, type: 'major' }, { root: 4, type: 'minor' }],
    [{ root: 0, type: 'min7' }, { root: 6, type: 'maj7' }, { root: 5, type: 'dom7' }, { root: 0, type: 'min7' }],
  ],
  pentatonic: [
    [{ root: 0, type: 'major' }, { root: 4, type: 'major' }, { root: 5, type: 'major' }, { root: 0, type: 'major' }],
  ],
  blues: [
    [{ root: 0, type: 'dom7' }, { root: 4, type: 'dom7' }, { root: 0, type: 'dom7' }, { root: 5, type: 'dom7' }],
    [{ root: 0, type: 'dom7' }, { root: 3, type: 'dom7' }, { root: 4, type: 'dom7' }, { root: 0, type: 'dom7' }],
  ],
  dorian: [
    [{ root: 0, type: 'min7' }, { root: 3, type: 'dom7' }, { root: 4, type: 'min7' }, { root: 0, type: 'min7' }],
    [{ root: 0, type: 'min7' }, { root: 5, type: 'min7' }, { root: 3, type: 'dom7' }, { root: 4, type: 'dom7' }],
  ],
  mixolydian: [
    [{ root: 0, type: 'dom7' }, { root: 3, type: 'min7' }, { root: 4, type: 'major' }, { root: 0, type: 'dom7' }],
  ],
  japanese: [
    [{ root: 0, type: 'minor' }, { root: 4, type: 'major' }, { root: 0, type: 'minor' }],
  ],
}

const CHORD_INTERVALS: Record<string, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim: [0, 3, 6],
  dom7: [0, 4, 7, 10],
  min7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
}

function getChordPitches(chord: ChordDef, keyRoot: number, scale: MusicalScale, octave: number): number[] {
  const intervals = CHORD_INTERVALS[chord.type]
  const scaleIntervals = SCALES[scale]
  const chordRoot = getScaleNote(scale, keyRoot, chord.root, octave)
  return intervals.map(i => chordRoot + i)
}

function getChordToneDegrees(chord: ChordDef, scale: MusicalScale): number[] {
  const scaleIntervals = SCALES[scale]
  const chordIntervals = CHORD_INTERVALS[chord.type]
  const chordRootInterval = scaleIntervals[chord.root % scaleIntervals.length]
  return chordIntervals.map(ci => {
    const target = chordRootInterval + ci
    for (let d = 0; d < scaleIntervals.length * 2; d++) {
      const si = scaleIntervals[d % scaleIntervals.length] + Math.floor(d / scaleIntervals.length) * 12
      if (si === target) return d
    }
    return chord.root
  })
}

class ChordProgressionEngine {
  private progression: ChordDef[] = []
  private currentIndex = 0

  constructor(scale: MusicalScale, elementCount: number) {
    const available = CHORD_PROGRESSIONS[scale] || CHORD_PROGRESSIONS.major
    const selected = available[elementCount % available.length]
    this.progression = selected
  }

  next(): ChordDef {
    const chord = this.progression[this.currentIndex % this.progression.length]
    this.currentIndex++
    return chord
  }

  current(): ChordDef {
    return this.progression[(this.currentIndex - 1 + this.progression.length) % this.progression.length]
  }

  peek(): ChordDef {
    return this.progression[this.currentIndex % this.progression.length]
  }
}

function selectKeyAndScale(stats: CodeStats, language: string, complexity: number): { key: string; scale: MusicalScale } {
  const keys = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb']
  let key: string
  let scale: MusicalScale

  if (stats.conditionals > stats.loops) {
    scale = 'minor'
  } else if (stats.functions > 5) {
    scale = 'major'
  } else {
    scale = 'pentatonic'
  }

  const langKeyMap: Record<string, string> = {
    python: 'D',
    javascript: 'E',
    typescript: 'F',
    rust: 'C',
    go: 'G',
    c: 'A',
  }
  key = langKeyMap[language] || 'C'

  if (stats.depth > 4) scale = 'blues'
  if (complexity > 30) scale = 'dorian'
  if (language === 'python') scale = 'pentatonic'

  return { key, scale }
}

function selectBpm(stats: CodeStats, style: MusicStyle): number {
  const baseBpm = STYLE_CONFIG[style].bpm
  const densityFactor = Math.min(stats.density * 10, 30)
  const depthFactor = stats.depth * 3
  return Math.round(baseBpm + densityFactor - depthFactor)
}

function getScaleNote(scale: MusicalScale, root: number, degree: number, octave: number): number {
  const intervals = SCALES[scale]
  const octaveOffset = Math.floor(degree / intervals.length)
  const scaleIndex = ((degree % intervals.length) + intervals.length) % intervals.length
  return root + octave * 12 + intervals[scaleIndex] + octaveOffset * 12
}

function nameToSeed(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function nearestChordTone(pitch: number, chord: ChordDef, keyRoot: number, scale: MusicalScale, octave: number): number {
  const chordPitches = getChordPitches(chord, keyRoot, scale, octave)
  let best = chordPitches[0]
  let bestDist = Math.abs(pitch - best)
  for (const cp of chordPitches) {
    const d = Math.abs(pitch - cp)
    if (d < bestDist) {
      bestDist = d
      best = cp
    }
  }
  const chordPitchesUp = getChordPitches(chord, keyRoot, scale, octave + 1)
  for (const cp of chordPitchesUp) {
    const d = Math.abs(pitch - cp)
    if (d < bestDist) {
      bestDist = d
      best = cp
    }
  }
  return best
}

type ConfigType = ReturnType<typeof selectKeyAndScale>

function mapFunction(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const nameSeed = element.name ? nameToSeed(element.name) % 7 : 0
  const notes: MusicalNote[] = []

  const baseOctave = 4 + Math.min(element.depth, 3)
  const isAsync = element.properties?.async
  const isExported = element.properties?.exported
  const chordTones = getChordToneDegrees(chord, config.scale)

  if (style === 'piano') {
    const melodyLength = Math.max(8, Math.min(16, (element.name?.length || 4) * 2))
    const chordPitches = getChordPitches(chord, root, config.scale, baseOctave - 1)

    for (const p of chordPitches) {
      notes.push({
        pitch: p,
        duration: '1n',
        velocity: 0.18,
        time: startTime,
        instrument: styleCfg.padInstrument,
      })
    }

    notes.push({
      pitch: getScaleNote(config.scale, root, chord.root, baseOctave - 2),
      duration: '1n',
      velocity: 0.35,
      time: startTime,
      instrument: styleCfg.bassInstrument,
    })

    const pianoPatterns: number[][] = [
      [0, 1, 2, 0, 1, 2, 0, 1],
      [2, 1, 0, 1, 2, 0, 1, 0],
      [0, 2, 1, 0, 2, 1, 0, 2],
    ]
    const pattern = pianoPatterns[nameSeed % pianoPatterns.length]
    const pianoDurations = ['4n', '8n', '8n', '4n', '8n', '8n', '2n', '4n']

    for (let i = 0; i < melodyLength; i++) {
      const toneIdx = pattern[i % pattern.length] % chordTones.length
      const degree = chordTones[toneIdx]
      const isStrong = i % 4 === 0
      const pitch = isStrong
        ? getScaleNote(config.scale, root, degree, baseOctave)
        : getScaleNote(config.scale, root, (degree + (i % 2 === 0 ? 1 : -1) + 7) % 7, baseOctave)

      notes.push({
        pitch,
        duration: pianoDurations[i % pianoDurations.length],
        velocity: isStrong ? 0.8 : (i === melodyLength - 1 ? 0.85 : 0.5),
        time: startTime + i * 0.25,
        instrument: styleCfg.defaultInstrument,
        effect: isAsync ? 'delay' : undefined,
      })
    }
  } else {
    const melodyLength = Math.max(6, Math.min(12, (element.name?.length || 4) * 2))
    const durations = ['16n', '8n', '16n', '8n', '16n', '4n', '16n', '8n', '16n', '8n', '16n', '2n']
    const chordPitches = getChordPitches(chord, root, config.scale, baseOctave - 1)

    for (const p of chordPitches) {
      notes.push({
        pitch: p,
        duration: '2n',
        velocity: 0.3,
        time: startTime,
        instrument: styleCfg.padInstrument,
      })
    }

    notes.push({
      pitch: getScaleNote(config.scale, root, chord.root, baseOctave - 2),
      duration: '2n',
      velocity: 0.5,
      time: startTime,
      instrument: styleCfg.bassInstrument,
    })

    for (let i = 0; i < melodyLength; i++) {
      const isStrong = i % 4 === 0
      const degree = isStrong
        ? chordTones[i % chordTones.length]
        : (chordTones[i % chordTones.length] + (i % 2 === 0 ? 1 : -1) + 7) % 7
      const pitch = getScaleNote(config.scale, root, degree, baseOctave)
      const duration = durations[i % durations.length]
      const velocity = isExported
        ? (i === 0 ? 1.0 : 0.8)
        : (isStrong ? 0.9 : 0.6)

      notes.push({
        pitch,
        duration,
        velocity,
        time: startTime + i * 0.125,
        instrument: styleCfg.defaultInstrument,
        effect: isAsync ? 'delay' : undefined,
      })

      if (i % 4 === 3 && i < melodyLength - 1) {
        const passingDegree = (chordTones[0] + 1) % 7
        notes.push({
          pitch: getScaleNote(config.scale, root, passingDegree, baseOctave),
          duration: '32n',
          velocity: 0.4,
          time: startTime + i * 0.125 + 0.0625,
          instrument: styleCfg.defaultInstrument,
        })
      }
    }
  }

  return notes
}

function mapLoop(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []
  const isNested = element.depth > 1
  const chordTones = getChordToneDegrees(chord, config.scale)

  if (style === 'piano') {
    const arpeggioIdx = nameToSeed(element.name || 'loop') % chordTones.length
    const pattern = chordTones.slice(arpeggioIdx, arpeggioIdx + 3).length >= 3
      ? chordTones.slice(arpeggioIdx, arpeggioIdx + 3)
      : [...chordTones.slice(arpeggioIdx), ...chordTones.slice(0, 3 - (chordTones.length - arpeggioIdx))]
    const repeats = isNested ? 3 : 2

    for (let r = 0; r < repeats; r++) {
      for (let i = 0; i < pattern.length; i++) {
        const degree = pattern[i % pattern.length]
        const pitch = getScaleNote(config.scale, root, degree, 4 + (i >= 3 ? 1 : 0))
        const time = startTime + (r * pattern.length + i) * 0.2
        const velocity = i === 0 ? 0.7 : (i === pattern.length - 1 ? 0.6 : 0.45)

        notes.push({
          pitch,
          duration: i === 0 ? '4n' : '8n',
          velocity,
          time,
          instrument: styleCfg.defaultInstrument,
        })
      }
    }

    notes.push({
      pitch: getScaleNote(config.scale, root, chord.root, 3),
      duration: '2n',
      velocity: 0.45,
      time: startTime,
      instrument: styleCfg.bassInstrument,
    })

    const chordPitches = getChordPitches(chord, root, config.scale, 3)
    for (const p of chordPitches) {
      notes.push({
        pitch: p,
        duration: '1n',
        velocity: 0.15,
        time: startTime,
        instrument: styleCfg.padInstrument,
      })
    }
  } else {
    const beats = 8

    for (let i = 0; i < beats; i++) {
      const time = startTime + i * 0.125

      notes.push({
        pitch: getScaleNote(config.scale, root, 0, 2),
        duration: '16n',
        velocity: i === 0 || i === 4 ? 0.95 : 0.6,
        time,
        instrument: styleCfg.drumInstrument,
      })

      if (i % 2 === 0) {
        notes.push({
          pitch: getScaleNote(config.scale, root, 2, 3),
          duration: '8n',
          velocity: 0.5,
          time: time + 0.0625,
          instrument: styleCfg.drumInstrument,
        })
      }

      if (i % 2 === 1) {
        notes.push({
          pitch: getScaleNote(config.scale, root, 5, 4),
          duration: '16n',
          velocity: 0.55,
          time: time + 0.03125,
          instrument: styleCfg.drumInstrument,
        })
      }

      if (isNested) {
        notes.push({
          pitch: getScaleNote(config.scale, root, 4, 4),
          duration: '16n',
          velocity: 0.7,
          time: time + 0.0625,
          instrument: styleCfg.drumInstrument,
        })

        if (i % 4 === 2) {
          notes.push({
            pitch: getScaleNote(config.scale, root, 6, 3),
            duration: '8n',
            velocity: 0.8,
            time,
            instrument: styleCfg.drumInstrument,
          })
        }
      }

      if (i === 0 || i === 4) {
        notes.push({
          pitch: getScaleNote(config.scale, root, chord.root, 2),
          duration: '4n',
          velocity: 0.7,
          time,
          instrument: styleCfg.bassInstrument,
        })
      }
    }
  }

  return notes
}

function mapConditional(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []
  const isElse = element.name === 'else' || element.name === 'elif'
  const chordPitches = getChordPitches(chord, root, config.scale, 3)
  const chordTones = getChordToneDegrees(chord, config.scale)

  if (style === 'piano') {
    for (let i = 0; i < chordPitches.length; i++) {
      notes.push({
        pitch: chordPitches[i],
        duration: '2n',
        velocity: 0.35,
        time: startTime + i * 0.15,
        instrument: styleCfg.padInstrument,
      })
    }

    const melodyTones = isElse
      ? [chordTones[2], chordTones[1], chordTones[0], chordTones[1]]
      : [chordTones[0], chordTones[1], chordTones[2], chordTones[1]]
    for (let i = 0; i < melodyTones.length; i++) {
      notes.push({
        pitch: getScaleNote(config.scale, root, melodyTones[i], 5),
        duration: i === melodyTones.length - 1 ? '4n' : '8n',
        velocity: 0.55 + i * 0.05,
        time: startTime + i * 0.2,
        instrument: styleCfg.defaultInstrument,
      })
    }
  } else {
    for (const p of chordPitches) {
      notes.push({
        pitch: p,
        duration: '2n',
        velocity: 0.5,
        time: startTime,
        instrument: styleCfg.padInstrument,
      })
    }

    const melodyDegree = isElse ? chordTones[2] : chordTones[0]
    notes.push({
      pitch: getScaleNote(config.scale, root, melodyDegree, 5),
      duration: '8n',
      velocity: 0.7,
      time: startTime,
      instrument: styleCfg.defaultInstrument,
    })
    notes.push({
      pitch: getScaleNote(config.scale, root, chordTones[1], 5),
      duration: '8n',
      velocity: 0.6,
      time: startTime + 0.125,
      instrument: styleCfg.defaultInstrument,
    })
    notes.push({
      pitch: getScaleNote(config.scale, root, chordTones[2], 5),
      duration: '4n',
      velocity: 0.7,
      time: startTime + 0.25,
      instrument: styleCfg.defaultInstrument,
    })
  }

  return notes
}

function mapVariable(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []
  const chordTones = getChordToneDegrees(chord, config.scale)

  if (style === 'piano') {
    notes.push({
      pitch: getScaleNote(config.scale, root, chord.root, 3),
      duration: '2n',
      velocity: 0.4,
      time: startTime,
      instrument: styleCfg.bassInstrument,
    })
    for (let i = 0; i < Math.min(3, chordTones.length); i++) {
      notes.push({
        pitch: getScaleNote(config.scale, root, chordTones[i], 5),
        duration: i === 0 ? '4n' : '8n',
        velocity: 0.45 + i * 0.05,
        time: startTime + i * 0.2,
        instrument: styleCfg.defaultInstrument,
      })
    }
  } else {
    notes.push({
      pitch: getScaleNote(config.scale, root, chord.root, 2),
      duration: '4n',
      velocity: 0.55,
      time: startTime,
      instrument: styleCfg.bassInstrument,
    })

    notes.push({
      pitch: getScaleNote(config.scale, root, chordTones[1 % chordTones.length], 2),
      duration: '8n',
      velocity: 0.4,
      time: startTime + 0.25,
      instrument: styleCfg.bassInstrument,
    })

    notes.push({
      pitch: getScaleNote(config.scale, root, chord.root, 2),
      duration: '8n',
      velocity: 0.45,
      time: startTime + 0.375,
      instrument: styleCfg.bassInstrument,
    })
  }

  return notes
}

function mapImport(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []
  const chordTones = getChordToneDegrees(chord, config.scale)

  for (let i = 0; i < Math.min(3, chordTones.length); i++) {
    notes.push({
      pitch: getScaleNote(config.scale, root, chordTones[i], 5),
      duration: '8n',
      velocity: 0.25 + i * 0.08,
      time: startTime + i * 0.15,
      instrument: styleCfg.padInstrument,
      effect: 'reverb',
    })
  }

  return notes
}

function mapComment(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []

  const chordPitches = getChordPitches(chord, root, config.scale, 4)
  for (const p of chordPitches) {
    notes.push({
      pitch: p,
      duration: '1n',
      velocity: 0.15,
      time: startTime,
      instrument: styleCfg.padInstrument,
      effect: 'reverb',
    })
  }

  return notes
}

function mapReturn(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []
  const chordTones = getChordToneDegrees(chord, config.scale)

  for (let i = 0; i < Math.min(3, chordTones.length); i++) {
    const idx = Math.min(i, chordTones.length - 1)
    notes.push({
      pitch: getScaleNote(config.scale, root, chordTones[chordTones.length - 1 - idx], 4 - Math.floor(i / 2)),
      duration: '8n',
      velocity: 0.65 - i * 0.12,
      time: startTime + i * 0.2,
      instrument: styleCfg.defaultInstrument,
      effect: 'fadeout',
    })
  }

  return notes
}

function mapClass(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []

  const chordPitches = getChordPitches(chord, root, config.scale, 3)
  for (const p of chordPitches) {
    notes.push({
      pitch: p,
      duration: '1n',
      velocity: 0.5,
      time: startTime,
      instrument: styleCfg.padInstrument,
    })
  }

  notes.push({
    pitch: getScaleNote(config.scale, root, chord.root, 5),
    duration: '2n',
    velocity: 0.75,
    time: startTime + 0.5,
    instrument: styleCfg.defaultInstrument,
  })

  return notes
}

function mapTryCatch(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const notes: MusicalNote[] = []

  const isCatch = element.type === 'trycatch' && /catch|except/.test(element.name || '')
  const chordPitches = getChordPitches(chord, root, config.scale, 4)

  if (isCatch) {
    notes.push({
      pitch: chordPitches[0] + 1,
      duration: '4n',
      velocity: 0.85,
      time: startTime,
      instrument: styleCfg.defaultInstrument,
      effect: 'distortion',
    })
  } else {
    notes.push({
      pitch: chordPitches[0],
      duration: '4n',
      velocity: 0.5,
      time: startTime,
      instrument: styleCfg.defaultInstrument,
    })
  }

  return notes
}

function mapDefault(element: CodeElement, config: ConfigType, style: MusicStyle, startTime: number, chord: ChordDef): MusicalNote[] {
  const styleCfg = STYLE_CONFIG[style]
  const root = KEY_MAP[config.key]
  const chordTones = getChordToneDegrees(chord, config.scale)
  const nameSeed = element.name ? nameToSeed(element.name) % chordTones.length : 0
  const pitch = getScaleNote(config.scale, root, chordTones[nameSeed], 3 + Math.min(element.depth, 2))

  return [{
    pitch,
    duration: '8n',
    velocity: 0.4,
    time: startTime,
    instrument: styleCfg.defaultInstrument,
  }]
}

type MapperFn = (el: CodeElement, cfg: ConfigType, style: MusicStyle, t: number, chord: ChordDef) => MusicalNote[]

const MAPPER_MAP: Record<CodeElementType, MapperFn> = {
  function: mapFunction,
  class: mapClass,
  loop: mapLoop,
  conditional: mapConditional,
  variable: mapVariable,
  import: mapImport,
  comment: mapComment,
  return: mapReturn,
  assignment: mapDefault,
  operator: mapDefault,
  string: mapDefault,
  number: mapDefault,
  decorator: mapImport,
  trycatch: mapTryCatch,
}

export function mapCodeToMusic(parseResult: ParseResult, style: MusicStyle = 'electronic'): MusicResult {
  const complexity = parseResult.stats.depth * parseResult.stats.functions + parseResult.stats.conditionals + parseResult.stats.loops
  const config = selectKeyAndScale(parseResult.stats, parseResult.language, complexity)
  const bpm = selectBpm(parseResult.stats, style)
  const beatDuration = 60 / bpm

  const chordEngine = new ChordProgressionEngine(config.scale, parseResult.elements.length)

  const sections: MusicalSection[] = []
  let currentTime = 0

  for (const element of parseResult.elements) {
    const mapper = MAPPER_MAP[element.type] || mapDefault
    const chord = chordEngine.next()
    const notes = mapper(element, config, style, currentTime, chord)

    const LABELS: Record<CodeElementType, string> = {
      function: '🎵 Function',
      class: '🏛️ Class',
      loop: '🔄 Loop',
      conditional: '🔀 Conditional',
      variable: '📦 Variable',
      import: '📥 Import',
      comment: '💬 Comment',
      return: '↩️ Return',
      assignment: '📝 Assignment',
      operator: '⚡ Operator',
      string: '🔤 String',
      number: '🔢 Number',
      decorator: '✨ Decorator',
      trycatch: '🛡️ Try/Catch',
    }

    sections.push({
      element,
      notes,
      label: `${LABELS[element.type]} ${element.name || ''}`.trim(),
    })

    if (notes.length > 0) {
      const maxNoteTime = Math.max(...notes.map(n => n.time))
      let gap: number
      if (style === 'piano') {
        gap = element.type === 'comment' ? beatDuration * 0.2 : beatDuration * 0.5
      } else {
        gap = element.type === 'comment' ? beatDuration * 0.15 : beatDuration * 0.3
      }
      currentTime = maxNoteTime + gap
    } else {
      currentTime += style === 'piano' ? beatDuration * 0.2 : beatDuration * 0.15
    }
  }

  const allNotes: MusicalNote[] = sections.flatMap(s => s.notes)
  const totalDuration = allNotes.length > 0
    ? Math.max(...allNotes.map(n => n.time)) + 1
    : 0

  return {
    sections,
    bpm,
    key: config.key,
    scale: config.scale,
    style,
    totalDuration,
    notes: allNotes,
  }
}
