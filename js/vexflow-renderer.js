/**
 * Guitar Alchemist — VexFlow Rendering Utilities
 * Requires VexFlow 4.x loaded via CDN before this script.
 */
const GaRenderer = (() => {
  const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const FLAT_NAMES = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];

  const SCALE_INTERVALS = {
    major:            [0, 2, 4, 5, 7, 9, 11],
    natural_minor:    [0, 2, 3, 5, 7, 8, 10],
    harmonic_minor:   [0, 2, 3, 5, 7, 8, 11],
    melodic_minor:    [0, 2, 3, 5, 7, 9, 11],
    pentatonic_major: [0, 2, 4, 7, 9],
    pentatonic_minor: [0, 3, 5, 7, 10],
    blues:            [0, 3, 5, 6, 7, 10],
    dorian:           [0, 2, 3, 5, 7, 9, 10],
    phrygian:         [0, 1, 3, 5, 7, 8, 10],
    lydian:           [0, 2, 4, 6, 7, 9, 11],
    mixolydian:       [0, 2, 4, 5, 7, 9, 10],
    aeolian:          [0, 2, 3, 5, 7, 8, 10],
    locrian:          [0, 1, 3, 5, 6, 8, 10],
  };

  const CHORD_INTERVALS = {
    major:  [0, 4, 7],
    minor:  [0, 3, 7],
    '7':    [0, 4, 7, 10],
    maj7:   [0, 4, 7, 11],
    min7:   [0, 3, 7, 10],
    dim:    [0, 3, 6],
    aug:    [0, 4, 8],
    sus2:   [0, 2, 7],
    sus4:   [0, 5, 7],
    dim7:   [0, 3, 6, 9],
    add9:   [0, 2, 4, 7],
  };

  // Map flat note names to sharp equivalents for lookup
  const FLAT_TO_SHARP = { Db:'C#', Eb:'D#', Fb:'E', Gb:'F#', Ab:'G#', Bb:'A#', Cb:'B' };

  function rootIndex(root) {
    let r = root.trim();
    if (FLAT_TO_SHARP[r]) r = FLAT_TO_SHARP[r];
    const idx = NOTE_NAMES.indexOf(r);
    return idx >= 0 ? idx : 0;
  }

  // Use flat names if root is a flat note
  function usesFlats(root) {
    return root.includes('b') || ['F','Bb','Eb','Ab','Db','Gb'].includes(root);
  }

  function midiToVexKey(midi) {
    const octave = Math.floor(midi / 12) - 1;
    const noteIdx = midi % 12;
    const name = NOTE_NAMES[noteIdx];
    // VexFlow uses format like "c/4", "c#/4"
    return name.toLowerCase().replace('#', '#') + '/' + octave;
  }

  function getScaleNotes(root, scaleType) {
    const intervals = SCALE_INTERVALS[scaleType] || SCALE_INTERVALS.major;
    const ri = rootIndex(root);
    const flats = usesFlats(root);
    const names = flats ? FLAT_NAMES : NOTE_NAMES;
    return intervals.map(i => {
      const noteIdx = (ri + i) % 12;
      const octave = i + ri >= 12 ? 5 : 4;
      return { name: names[noteIdx], midi: 60 + ri + i, octave, vexKey: midiToVexKey(60 + ri + i) };
    });
  }

  function getChordNotes(root, quality) {
    const intervals = CHORD_INTERVALS[quality] || CHORD_INTERVALS.major;
    const ri = rootIndex(root);
    const flats = usesFlats(root);
    const names = flats ? FLAT_NAMES : NOTE_NAMES;
    return intervals.map(i => {
      const noteIdx = (ri + i) % 12;
      const octave = i + ri >= 12 ? 5 : 4;
      return { name: names[noteIdx], midi: 60 + ri + i, octave, vexKey: midiToVexKey(60 + ri + i) };
    });
  }

  function renderScale(containerId, root, scaleType) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

    const notes = getScaleNotes(root, scaleType);
    // Add octave note to complete the scale
    const ri = rootIndex(root);
    const flats = usesFlats(root);
    const names = flats ? FLAT_NAMES : NOTE_NOTES || (flats ? FLAT_NAMES : NOTE_NAMES);
    const octaveNote = {
      name: (flats ? FLAT_NAMES : NOTE_NAMES)[ri],
      midi: 60 + ri + 12,
      octave: 5,
      vexKey: midiToVexKey(60 + ri + 12)
    };
    const allNotes = [...notes, octaveNote];

    const width = Math.max(600, allNotes.length * 60 + 80);
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(width, 160);
    const context = renderer.getContext();
    context.setFont('Arial', 10);

    const stave = new Stave(10, 20, width - 20);
    stave.addClef('treble');
    stave.setContext(context).draw();

    const vexNotes = allNotes.map(n => {
      const key = n.vexKey;
      const note = new StaveNote({ keys: [key], duration: 'q' });
      // Add accidental if needed
      if (n.name.includes('#')) note.addModifier(new Accidental('#'));
      if (n.name.includes('b') && n.name.length > 1) note.addModifier(new Accidental('b'));
      return note;
    });

    const voice = new Voice({ num_beats: allNotes.length, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables(vexNotes);

    new Formatter().joinVoices([voice]).format([voice], width - 80);
    voice.draw(context, stave);

    // Add note names below
    const noteLabels = document.createElement('div');
    noteLabels.style.cssText = 'text-align:center; color:#333; font-size:0.85rem; margin-top:0.5rem;';
    noteLabels.textContent = allNotes.map(n => n.name).join('  ');
    container.appendChild(noteLabels);
  }

  function renderChord(containerId, root, quality) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

    const notes = getChordNotes(root, quality);
    const width = 300;
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(width, 160);
    const context = renderer.getContext();

    const stave = new Stave(10, 20, width - 20);
    stave.addClef('treble');
    stave.setContext(context).draw();

    const keys = notes.map(n => n.vexKey);
    const chord = new StaveNote({ keys, duration: 'w' });

    // Add accidentals
    notes.forEach((n, i) => {
      if (n.name.includes('#')) chord.addModifier(new Accidental('#'), i);
      if (n.name.includes('b') && n.name.length > 1) chord.addModifier(new Accidental('b'), i);
    });

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables([chord]);

    new Formatter().joinVoices([voice]).format([voice], width - 80);
    voice.draw(context, stave);

    const label = document.createElement('div');
    label.style.cssText = 'text-align:center; color:#333; font-size:0.85rem; margin-top:0.5rem;';
    label.textContent = notes.map(n => n.name).join(' - ');
    container.appendChild(label);
  }

  return {
    renderScale, renderChord,
    getScaleNotes, getChordNotes,
    SCALE_INTERVALS, CHORD_INTERVALS,
    NOTE_NAMES, FLAT_NAMES
  };
})();
