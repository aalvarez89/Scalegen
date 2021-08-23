// const { program } = require('commander')

import { Note, Scale, Key, Progression, ChordType } from '@tonaljs/tonal';

let notes = [['C'], ['D'], ['E'], ['F'], ['G'], ['A'], ['B']];

function sharpen(arr) {
  if (arr[3].length !== 2) {
    let half2 = arr.slice(4);
    let half1 = arr.slice(0, 4);
    if (arr[3].length !== 2) {
      half1[3].push('#');
    } else {
      half1[3].pop();
    }
    return half2.concat(half1);
  }
  return arr;
}
function flatten(arr) {
  if (arr[6].length !== 2) {
    let half2 = arr.slice(3);
    let half1 = arr.slice(0, 3);
    if (arr[6].length !== 2) {
      half2[3].push('b');
      // half2[3].push('♭');
    } else {
      half2[3].pop();
    }
    return half2.concat(half1);
  } else {
    return arr;
  }
}
function notesToString(arr) {
  return arr.map(x => x.join('')); //.join(' ');
}
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomNote() {
  let mod = (Math.random() < 0.5 ? -1 : 1) * randomInt(0, 7);
  mod = mod === -0 ? 0 : mod;

  console.log(`Mod: ${mod}`);

  if (mod > 0) {
    for (let i = 0; i < mod; i++) {
      notes = sharpen(notes);
    }
  } else if (mod < 0) {
    for (let i = 0; i < Math.abs(mod); i++) {
      notes = flatten(notes);
    }
  }

  return notesToString(notes)[0];
}

// console.log(process.argv);
let randomNote = getRandomNote();

let args = process.argv.slice(2);
args.forEach(a => {
  if (a[0] !== '-') {
    throw 'Argument needs "-"!';
  }
});
args = args.map(a => a.slice(1));
console.log(args);

let query;

if (args[0] !== undefined) {
  let pentatonic = args[0].includes('p') ? true : false;
  let major = args[0].includes('M') ? true : false;

  let note = args[1] !== undefined ? args[1] : randomNote;

  query = `${note.toUpperCase()} ${!major ? 'minor' : 'major'}${
    pentatonic ? ' pentatonic' : ''
  }`;
} else {
  query = `${randomNote} ${Math.random() < 0.5 ? 'major' : 'minor'}`;
}

// console.log(`Scale: ${query}`);

let randomScale = Scale.get(query); //.notes;

if (args[2] !== undefined) {
  let preExercise;

  if (args[2].includes('p')) {
    preExercise = [
      'Bend-Fold-Tap-Push',
      'Piano Taps',
      'Wrist Dumbells',
      'String Tension Bends',
      'Callus Slides'
    ];
    preExercise = preExercise[randomInt(0, preExercise.length - 1)];
  }
  let rightHandExercise = [
    'Strum',
    'Arpeggio',
    'Slap/Pluck',
    'Sweep',
    'Petrucci',
    'Pinch Harmonic'
  ];
  let leftHandExercise = [
    '1234 - 1/4',
    '1234 - 1/8',
    '1234 - 1/16',
    '1e+a',
    'Scale',
    'Interval Scale'
  ];
  let condition = [
    'Ghost Notes',
    'Hammer On',
    'Pull Off',
    'Slides',
    'Mute',
    'Harmonics',
    'Tapping',
    'String Skipping',
    'Hybrid Picking'
  ];

  let s_rhe = rightHandExercise[randomInt(0, rightHandExercise.length - 1)];
  let s_rep = leftHandExercise[randomInt(0, leftHandExercise.length - 1)];
  let s_con = condition[randomInt(0, condition.length - 1)];

  console.log(`
${preExercise ? preExercise : null}
${s_rhe} - ${s_con}
Reps: ${s_rep}`);
}

console.log(`
Query: ${query}
ScaleName: ${randomScale.name}
Notes: ${randomScale.notes}
Intervals: ${randomScale.intervals}
Chords: ${Scale.scaleChords(query)}
`);
// console.log(...randomScale);
// console.log(...Scale.scaleChords(query));

let chords = ChordType.get(Scale.scaleChords(query)[4]);
// console.log(chord.name, chord.intervals);
