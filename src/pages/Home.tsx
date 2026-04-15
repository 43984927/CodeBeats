import { useState, useCallback } from 'react'
import type { MusicStyle, MusicResult, ParseResult } from '../core/index'
import { parseCode, mapCodeToMusic } from '../core/index'
import Visualizer from '../components/Visualizer'

const SAMPLE_CODES: Record<string, string> = {
  python: `import numpy as np

def fibonacci(n):
    """Generate fibonacci sequence"""
    result = []
    a, b = 0, 1
    for i in range(n):
        result.append(a)
        a, b = b, a + b
    return result

class DataProcessor:
    def __init__(self, data):
        self.data = data
        self.processed = False

    def filter(self, threshold):
        filtered = []
        for item in self.data:
            if item > threshold:
                filtered.append(item)
        return filtered

    def transform(self):
        if self.processed:
            return self.data
        try:
            result = [x * 2 for x in self.data]
            self.processed = True
            return result
        except Exception as e:
            return []`,

  javascript: `import React, { useState, useEffect } from 'react';

function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  const increment = () => {
    setCount(prev => prev + 1);
    setHistory(prev => [...prev, count]);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    } else {
      console.warn('Count cannot be negative');
    }
  };

  const reset = () => {
    setCount(initialCount);
    setHistory([]);
  };

  return { count, history, increment, decrement, reset };
}

class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => this.off(event, callback);
  }

  emit(event, data) {
    const callbacks = this.listeners[event] || [];
    for (const cb of callbacks) {
      cb(data);
    }
  }
}`,

  rust: `use std::collections::HashMap;

#[derive(Debug, Clone)]
struct Cache<V: Clone> {
    data: HashMap<String, V>,
    capacity: usize,
}

impl<V: Clone> Cache<V> {
    fn new(capacity: usize) -> Self {
        Cache {
            data: HashMap::new(),
            capacity,
        }
    }

    fn get(&self, key: &str) -> Option<V> {
        self.data.get(key).cloned()
    }

    fn set(&mut self, key: String, value: V) {
        if self.data.len() >= self.capacity {
            if let Some(oldest) = self.data.keys().next().cloned() {
                self.data.remove(&oldest);
            }
        }
        self.data.insert(key, value);
    }
}

fn fibonacci(n: u32) -> u64 {
    if n <= 1 {
        return n as u64;
    }
    let mut a = 0u64;
    let mut b = 1u64;
    for _ in 0..n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    a
}`,
  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SIZE 100

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* create_node(int data) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->next = NULL;
    return node;
}

typedef struct {
    Node* head;
    int size;
} LinkedList;

void list_append(LinkedList* list, int data) {
    Node* node = create_node(data);
    if (list->head == NULL) {
        list->head = node;
    } else {
        Node* current = list->head;
        while (current->next != NULL) {
            current = current->next;
        }
        current->next = node;
    }
    list->size++;
}

int list_get(LinkedList* list, int index) {
    if (index < 0 || index >= list->size) {
        return -1;
    }
    Node* current = list->head;
    for (int i = 0; i < index; i++) {
        current = current->next;
    }
    return current->data;
}

int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

int main() {
    LinkedList list = {NULL, 0};
    for (int i = 0; i < 10; i++) {
        list_append(&list, fibonacci(i));
    }
    for (int i = 0; i < list.size; i++) {
        printf("fib(%d) = %d\\n", i, list_get(&list, i));
    }
    return 0;
}`,
}

const STYLES: { value: MusicStyle; label: string; emoji: string }[] = [
  { value: 'piano', label: 'Piano', emoji: '🎹' },
  { value: 'electronic', label: 'Electronic', emoji: '⚡' },
  { value: 'classical', label: 'Classical', emoji: '🎻' },
  { value: 'jazz', label: 'Jazz', emoji: '🎷' },
  { value: 'ambient', label: 'Ambient', emoji: '🌊' },
  { value: 'chiptune', label: 'Chiptune', emoji: '👾' },
  { value: 'lofi', label: 'Lo-Fi', emoji: '☕' },
]

export default function Home() {
  const [code, setCode] = useState(SAMPLE_CODES.python)
  const [language, setLanguage] = useState('python')
  const [style, setStyle] = useState<MusicStyle>('piano')
  const [isPlaying, setIsPlaying] = useState(false)
  const [music, setMusic] = useState<MusicResult | null>(null)
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [activeNoteIndex, setActiveNoteIndex] = useState(-1)
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1)
  const [volume, setVolume] = useState(0.7)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = useCallback(() => {
    try {
      setError(null)
      const result = parseCode(code)
      setParseResult(result)
      const musicResult = mapCodeToMusic(result, style)
      setMusic(musicResult)
    } catch (e: any) {
      setError(e.message || 'Analysis failed')
    }
  }, [code, style])

  const handlePlay = useCallback(async () => {
    try {
      setError(null)
      const { getSynthesizer } = await import('../core/audio/index')
      const synth = getSynthesizer({
        onNotePlay: (note, index) => {
          setActiveNoteIndex(index)
        },
        onSectionChange: (sectionIndex, label) => {
          setActiveSectionIndex(sectionIndex)
        },
        onPlaybackEnd: () => {
          setIsPlaying(false)
          setActiveNoteIndex(-1)
          setActiveSectionIndex(-1)
        },
      })

      if (isPlaying) {
        synth.stop()
        setIsPlaying(false)
        setActiveNoteIndex(-1)
        setActiveSectionIndex(-1)
        return
      }

      let currentMusic = music
      if (!currentMusic) {
        const result = parseCode(code)
        setParseResult(result)
        currentMusic = mapCodeToMusic(result, style)
        setMusic(currentMusic)
      }

      synth.setVolume(volume)
      await synth.play(currentMusic)
      setIsPlaying(true)
    } catch (e: any) {
      setError(e.message || 'Playback failed')
      setIsPlaying(false)
    }
  }, [code, style, music, isPlaying, volume])

  const handleStop = useCallback(async () => {
    const { getSynthesizer } = await import('../core/audio/index')
    const synth = getSynthesizer()
    synth.stop()
    setIsPlaying(false)
    setActiveNoteIndex(-1)
    setActiveSectionIndex(-1)
  }, [])

  const handleStyleChange = useCallback(async (newStyle: MusicStyle) => {
    setStyle(newStyle)
    if (isPlaying && parseResult) {
      try {
        const newMusic = mapCodeToMusic(parseResult, newStyle)
        setMusic(newMusic)
        const { getSynthesizer } = await import('../core/audio/index')
        const synth = getSynthesizer({
          onNotePlay: (note, index) => {
            setActiveNoteIndex(index)
          },
          onSectionChange: (sectionIndex, label) => {
            setActiveSectionIndex(sectionIndex)
          },
          onPlaybackEnd: () => {
            setIsPlaying(false)
            setActiveNoteIndex(-1)
            setActiveSectionIndex(-1)
          },
        })
        synth.setVolume(volume)
        await synth.switchStyle(newMusic)
      } catch (e: any) {
        setError(e.message || 'Style switch failed')
      }
    } else {
      setMusic(null)
    }
  }, [isPlaying, parseResult, volume])

  const handleSampleCode = (lang: string) => {
    setLanguage(lang)
    setCode(SAMPLE_CODES[lang] || SAMPLE_CODES.python)
    setMusic(null)
    setParseResult(null)
  }

  const handleShare = useCallback(async () => {
    if (!music) return
    const shareText = `🎵 I turned my ${parseResult?.language || 'code'} into music with CodeBeats!\n\nKey: ${music.key} ${music.scale} | BPM: ${music.bpm} | Style: ${music.style}\n\nTry it yourself →`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CodeBeats - Hear Your Code',
          text: shareText,
          url: window.location.href,
        })
      } catch (e) {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert('Copied to clipboard!')
    }
  }, [music, parseResult])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(10, 10, 26, 0.8)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>🎵</span>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              CodeBeats
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>Hear what your code sounds like</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['python', 'javascript', 'rust', 'c'].map(lang => (
            <button
              key={lang}
              onClick={() => handleSampleCode(lang)}
              style={{
                padding: '6px 14px',
                border: language === lang ? '1px solid #6366f1' : '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 20,
                background: language === lang ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: language === lang ? '#a5b4fc' : '#94a3b8',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'monospace',
                transition: 'all 0.2s',
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: 16,
        maxWidth: 1400,
        margin: '0 auto',
        minHeight: 'calc(100vh - 70px)',
      }}>
        {/* Left: Code Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 'calc(100vh - 100px)', overflow: 'hidden' }}>
          <div style={{
            background: 'rgba(15, 15, 35, 0.8)',
            borderRadius: 12,
            border: '1px solid rgba(99, 102, 241, 0.15)',
            overflow: 'hidden',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}>
            <div style={{
              padding: '10px 16px',
              borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, color: '#94a3b8', fontFamily: 'monospace' }}>
                {language}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }} />
              </div>
            </div>
            <textarea
              value={code}
              onChange={e => { setCode(e.target.value); setMusic(null); setParseResult(null) }}
              spellCheck={false}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#e2e8f0',
                fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
                fontSize: 13,
                lineHeight: 1.6,
                padding: 16,
                resize: 'none',
                outline: 'none',
                tabSize: 2,
                maxHeight: '50vh',
                overflowY: 'auto',
              }}
            />
          </div>

          {/* Style Selector */}
          <div style={{
            background: 'rgba(15, 15, 35, 0.8)',
            borderRadius: 12,
            border: '1px solid rgba(99, 102, 241, 0.15)',
            padding: 12,
          }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>
              MUSIC STYLE
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {STYLES.map(s => (
                <button
                  key={s.value}
                  onClick={() => handleStyleChange(s.value)}
                  style={{
                    padding: '6px 12px',
                    border: style === s.value ? '1px solid #6366f1' : '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: 8,
                    background: style === s.value ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                    color: style === s.value ? '#a5b4fc' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: 12,
                    transition: 'all 0.2s',
                  }}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{
            background: 'rgba(15, 15, 35, 0.8)',
            borderRadius: 12,
            border: '1px solid rgba(99, 102, 241, 0.15)',
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <button
              onClick={handlePlay}
              style={{
                padding: '10px 24px',
                border: 'none',
                borderRadius: 8,
                background: isPlaying
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                transition: 'all 0.2s',
                minWidth: 100,
              }}
            >
              {isPlaying ? '⏹ Stop' : '▶ Play'}
            </button>

            <button
              onClick={handleAnalyze}
              style={{
                padding: '10px 20px',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 8,
                background: 'rgba(99, 102, 241, 0.1)',
                color: '#a5b4fc',
                cursor: 'pointer',
                fontSize: 14,
                transition: 'all 0.2s',
              }}
            >
              🔍 Analyze
            </button>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                style={{ flex: 1, accentColor: '#6366f1' }}
              />
            </div>

            {music && (
              <button
                onClick={handleShare}
                style={{
                  padding: '10px 16px',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: 8,
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: '#a5b4fc',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                📤 Share
              </button>
            )}
          </div>
        </div>

        {/* Right: Visualizer + Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Visualizer */}
          <div style={{
            background: 'rgba(15, 15, 35, 0.8)',
            borderRadius: 12,
            border: '1px solid rgba(99, 102, 241, 0.15)',
            overflow: 'hidden',
            flex: 1,
            minHeight: 300,
          }}>
            <Visualizer
              music={music}
              isPlaying={isPlaying}
              activeNoteIndex={activeNoteIndex}
              activeSectionIndex={activeSectionIndex}
            />
          </div>

          {/* Stats Panel */}
          {parseResult && (
            <div style={{
              background: 'rgba(15, 15, 35, 0.8)',
              borderRadius: 12,
              border: '1px solid rgba(99, 102, 241, 0.15)',
              padding: 16,
            }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10, fontWeight: 600 }}>
                CODE ANALYSIS
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 8,
              }}>
                {[
                  { label: 'Functions', value: parseResult.stats.functions, emoji: '🎵' },
                  { label: 'Classes', value: parseResult.stats.classes, emoji: '🏛️' },
                  { label: 'Loops', value: parseResult.stats.loops, emoji: '🔄' },
                  { label: 'Conditions', value: parseResult.stats.conditionals, emoji: '🔀' },
                  { label: 'Variables', value: parseResult.stats.variables, emoji: '📦' },
                  { label: 'Comments', value: parseResult.stats.comments, emoji: '💬' },
                  { label: 'Depth', value: parseResult.stats.depth, emoji: '📏' },
                  { label: 'Complexity', value: parseResult.complexity, emoji: '🔥' },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: 'rgba(99, 102, 241, 0.08)',
                    borderRadius: 8,
                    padding: '8px 10px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 18 }}>{stat.emoji}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>{stat.value}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Music Info */}
          {music && (
            <div style={{
              background: 'rgba(15, 15, 35, 0.8)',
              borderRadius: 12,
              border: '1px solid rgba(99, 102, 241, 0.15)',
              padding: 16,
            }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10, fontWeight: 600 }}>
                MUSIC INFO
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
                  🎼 {music.key} {music.scale}
                </span>
                <span style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
                  ⏱ {music.bpm} BPM
                </span>
                <span style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
                  🎹 {music.style}
                </span>
                <span style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
                  📊 {music.notes.length} notes
                </span>
                <span style={{ color: '#a5b4fc', fontFamily: 'monospace' }}>
                  🎵 {music.sections.length} sections
                </span>
              </div>

              {/* Section Timeline */}
              <div style={{
                marginTop: 12,
                display: 'flex',
                gap: 2,
                overflow: 'hidden',
                borderRadius: 6,
              }}>
                {music.sections.map((section, idx) => (
                  <div
                    key={idx}
                    title={section.label}
                    onClick={() => setActiveSectionIndex(idx)}
                    style={{
                      flex: section.notes.length || 1,
                      height: 24,
                      background: idx === activeSectionIndex
                        ? 'linear-gradient(135deg, #6366f1, #ec4899)'
                        : 'rgba(99, 102, 241, 0.2)',
                      borderRadius: 3,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      minWidth: 4,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 12,
              padding: 12,
              color: '#fca5a5',
              fontSize: 13,
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
