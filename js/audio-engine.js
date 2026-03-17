/**
 * Guitar Alchemist — Web Audio API Playback Engine
 */
const AudioEngine = (() => {
  let ctx = null;
  const activeNodes = [];

  function getContext() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const FLAT_MAP = { 'Db':'C#','Eb':'D#','Fb':'E','Gb':'F#','Ab':'G#','Bb':'A#','Cb':'B' };

  function noteNameToMidi(name, octave = 4) {
    let n = name.trim();
    if (FLAT_MAP[n]) n = FLAT_MAP[n];
    const idx = NOTE_NAMES.indexOf(n);
    if (idx === -1) return 69; // fallback A4
    return (octave + 1) * 12 + idx;
  }

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function noteToFreq(name, octave = 4) {
    return midiToFreq(noteNameToMidi(name, octave));
  }

  function playNote(frequency, duration = 0.5, waveType = 'triangle') {
    const c = getContext();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = waveType;
    osc.frequency.value = frequency;
    osc.connect(gain);
    gain.connect(c.destination);

    const now = c.currentTime;
    // ADSR envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.02);        // Attack
    gain.gain.linearRampToValueAtTime(0.35, now + 0.12);       // Decay
    gain.gain.setValueAtTime(0.35, now + duration - 0.3);      // Sustain
    gain.gain.linearRampToValueAtTime(0, now + duration);      // Release

    osc.start(now);
    osc.stop(now + duration + 0.05);
    activeNodes.push(osc);
    osc.onended = () => {
      const i = activeNodes.indexOf(osc);
      if (i > -1) activeNodes.splice(i, 1);
    };
  }

  function playChord(frequencies, duration = 1, strum = false) {
    frequencies.forEach((freq, i) => {
      const delay = strum ? i * 0.025 : 0;
      setTimeout(() => playNote(freq, duration, 'triangle'), delay * 1000);
    });
  }

  async function playSequence(notes, tempo = 120) {
    const beatDuration = 60 / tempo;
    for (const note of notes) {
      const freq = typeof note === 'number' ? note : noteToFreq(note.name, note.octave || 4);
      const dur = note.duration || beatDuration;
      playNote(freq, dur);
      await new Promise(r => setTimeout(r, dur * 1000));
    }
  }

  function stopAll() {
    activeNodes.forEach(n => { try { n.stop(); } catch (e) {} });
    activeNodes.length = 0;
  }

  return { playNote, playChord, playSequence, stopAll, noteToFreq, noteNameToMidi, midiToFreq };
})();
