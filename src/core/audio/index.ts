import * as Tone from 'tone'
import type { MusicResult, MusicalNote } from '../mapper/index'

export type PlaybackState = 'stopped' | 'playing' | 'paused'

export interface SynthesizerCallbacks {
  onNotePlay?: (note: MusicalNote, index: number) => void
  onSectionChange?: (sectionIndex: number, label: string) => void
  onPlaybackEnd?: () => void
  onTimeUpdate?: (currentTime: number, totalTime: number) => void
}

class Synthesizer {
  private synths: Map<string, Tone.PolySynth> = new Map()
  private effects: Map<string, Tone.ToneAudioNode> = new Map()
  private scheduledEvents: number[] = []
  private isPlaying: boolean = false
  private isPaused: boolean = false
  private startTime: number = 0
  private pauseTime: number = 0
  private callbacks: SynthesizerCallbacks = {}
  private currentMusic: MusicResult | null = null
  private analyser: Tone.Analyser | null = null

  constructor(callbacks?: SynthesizerCallbacks) {
    if (callbacks) this.callbacks = callbacks
  }

  private getSynth(instrument: string): Tone.PolySynth {
    if (this.synths.has(instrument)) {
      return this.synths.get(instrument)!
    }

    let synth: Tone.PolySynth

    switch (instrument) {
      case 'GrandPiano':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' as const, partials: [1, 0.6, 0.3, 0.15, 0.08] },
          envelope: { attack: 0.008, decay: 0.8, sustain: 0.35, release: 2.5 },
          volume: -6,
        })
        break
      case 'GrandPianoBass':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' as const, partials: [1, 0.4, 0.15] },
          envelope: { attack: 0.01, decay: 1.0, sustain: 0.3, release: 2.0 },
          volume: -8,
        })
        break
      case 'GrandPianoPad':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' as const, partials: [1, 0.5, 0.2, 0.1] },
          envelope: { attack: 0.15, decay: 0.6, sustain: 0.5, release: 3.0 },
          volume: -10,
        })
        break
      case 'SoftMallet':
        synth = new Tone.PolySynth(Tone.MembraneSynth, {
          envelope: { attack: 0.002, decay: 0.3, sustain: 0.0, release: 0.5 },
          volume: -12,
        })
        break
      case 'Piano':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' as const },
          envelope: { attack: 0.005, decay: 0.3, sustain: 0.2, release: 1.2 },
        })
        break
      case 'Synth':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sawtooth' as const },
          envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.5 },
        })
        break
      case 'SynthBass':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'square' as const },
          envelope: { attack: 0.01, decay: 0.1, sustain: 0.4, release: 0.2 },
        })
        break
      case 'Bass':
      case 'Cello':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' as const },
          envelope: { attack: 0.05, decay: 0.3, sustain: 0.6, release: 0.8 },
        })
        break
      case 'SubBass':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' as const },
          envelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 1.0 },
        })
        break
      case 'Pad':
      case 'Strings':
      case 'Atmosphere':
      case 'VinylPad':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' as const },
          envelope: { attack: 0.3, decay: 0.5, sustain: 0.8, release: 2.0 },
        })
        break
      case 'Vibraphone':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'sine' as const },
          envelope: { attack: 0.01, decay: 0.5, sustain: 0.3, release: 1.5 },
        })
        break
      case 'Square':
      case 'SquareBass':
      case 'Triangle':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'square' as const },
          envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.2 },
        })
        break
      case 'EPiano':
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' as const },
          envelope: { attack: 0.01, decay: 0.4, sustain: 0.3, release: 1.0 },
        })
        break
      case 'Drums':
      case 'Brushes':
      case 'Percussion':
      case 'Timpani':
      case 'LoFiDrums':
      case 'Noise':
        synth = new Tone.PolySynth(Tone.MembraneSynth, {
          envelope: { attack: 0.001, decay: 0.2, sustain: 0.0, release: 0.2 },
        })
        break
      default:
        synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: 'triangle' as const },
          envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.5 },
        })
    }

    const isGrandPiano = instrument.startsWith('GrandPiano') || instrument === 'SoftMallet'
    const reverbDecay = isGrandPiano ? 4 : 2
    const reverbWet = isGrandPiano ? 0.55 : 0.3
    const reverb = new Tone.Reverb({ decay: reverbDecay, wet: reverbWet })
    const gain = new Tone.Gain(isGrandPiano ? 0.7 : 0.5)

    synth.chain(gain, reverb, Tone.Destination)

    this.synths.set(instrument, synth)
    this.effects.set(`${instrument}-reverb`, reverb)
    this.effects.set(`${instrument}-gain`, gain)

    return synth
  }

  private pitchToNote(pitch: number): string {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const octave = Math.floor(pitch / 12) - 1
    const noteIndex = pitch % 12
    return `${noteNames[noteIndex]}${octave}`
  }

  async play(music: MusicResult): Promise<void> {
    if (this.isPlaying) {
      this.stop()
    }

    await Tone.start()

    this.currentMusic = music
    this.isPlaying = true
    this.isPaused = false

    Tone.getTransport().bpm.value = music.bpm
    Tone.getTransport().timeSignature = 4

    if (!this.analyser) {
      this.analyser = new Tone.Analyser('waveform', 256)
      Tone.Destination.connect(this.analyser)
    }

    let noteIndex = 0
    for (const section of music.sections) {
      for (const note of section.notes) {
        const synth = this.getSynth(note.instrument)
        const noteName = this.pitchToNote(note.pitch)
        const duration = note.duration

        const eventId = Tone.getTransport().schedule((time) => {
          try {
            synth.triggerAttackRelease(noteName, duration, time, note.velocity)
          } catch (e) {
            // ignore note errors
          }

          if (this.callbacks.onNotePlay) {
            this.callbacks.onNotePlay(note, noteIndex)
          }
        }, note.time)

        this.scheduledEvents.push(eventId)
        noteIndex++
      }

      if (this.callbacks.onSectionChange) {
        const sectionIndex = music.sections.indexOf(section)
        const sectionStart = section.notes.length > 0 ? section.notes[0].time : 0
        const eventId = Tone.getTransport().schedule((time) => {
          if (this.callbacks.onSectionChange) {
            this.callbacks.onSectionChange(sectionIndex, section.label)
          }
        }, sectionStart)
        this.scheduledEvents.push(eventId)
      }
    }

    const endEvent = Tone.getTransport().schedule(() => {
      this.isPlaying = false
      if (this.callbacks.onPlaybackEnd) {
        this.callbacks.onPlaybackEnd()
      }
    }, music.totalDuration + 0.5)
    this.scheduledEvents.push(endEvent)

    Tone.getTransport().start()
    this.startTime = Tone.now()
  }

  pause(): void {
    if (this.isPlaying && !this.isPaused) {
      Tone.getTransport().pause()
      this.isPaused = true
      this.pauseTime = Tone.now()
    }
  }

  resume(): void {
    if (this.isPaused) {
      Tone.getTransport().start()
      this.isPaused = false
    }
  }

  stop(): void {
    Tone.getTransport().stop()
    Tone.getTransport().cancel()

    for (const eventId of this.scheduledEvents) {
      try {
        Tone.getTransport().clear(eventId)
      } catch (e) {
        // ignore
      }
    }
    this.scheduledEvents = []

    for (const synth of this.synths.values()) {
      synth.releaseAll()
    }

    this.isPlaying = false
    this.isPaused = false
    this.currentMusic = null
  }

  getPlaybackState(): PlaybackState {
    if (this.isPaused) return 'paused'
    if (this.isPlaying) return 'playing'
    return 'stopped'
  }

  getAnalyser(): Tone.Analyser | null {
    return this.analyser
  }

  getWaveformData(): Float32Array {
    if (this.analyser) {
      return this.analyser.getValue() as Float32Array
    }
    return new Float32Array(256)
  }

  setVolume(volume: number): void {
    Tone.Destination.volume.value = Tone.gainToDb(Math.max(0, Math.min(1, volume)))
  }

  async switchStyle(music: MusicResult): Promise<void> {
    const wasPlaying = this.isPlaying
    const currentPosition = Tone.getTransport().seconds

    this.stop()

    if (wasPlaying) {
      await this.play(music)
      if (currentPosition > 0 && currentPosition < music.totalDuration) {
        Tone.getTransport().seconds = Math.min(currentPosition, music.totalDuration * 0.8)
      }
    }
  }

  getCurrentTime(): number {
    if (!this.isPlaying) return 0
    return Tone.getTransport().seconds
  }

  dispose(): void {
    this.stop()
    for (const synth of this.synths.values()) {
      synth.dispose()
    }
    for (const effect of this.effects.values()) {
      effect.dispose()
    }
    this.synths.clear()
    this.effects.clear()
    if (this.analyser) {
      this.analyser.dispose()
      this.analyser = null
    }
  }
}

let instance: Synthesizer | null = null

export function getSynthesizer(callbacks?: SynthesizerCallbacks): Synthesizer {
  if (!instance) {
    instance = new Synthesizer(callbacks)
  } else if (callbacks) {
    instance['callbacks'] = callbacks
  }
  return instance
}

export function disposeSynthesizer(): void {
  if (instance) {
    instance.dispose()
    instance = null
  }
}
