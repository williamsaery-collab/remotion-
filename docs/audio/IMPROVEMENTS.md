# Improved preview: motion and audio

## Motion diagnosis and changes

Earlier objects completed short entrances and then held mostly static. Layers
were separated with fades and the background wave displacement was small.
The revision keeps the existing React/TypeScript project and Preview20 composition.

- Road: three top-view cars follow a widening perspective road, scale with depth,
  and move beneath a continuous camera push/pan. The clock continues ticking.
- Typography: spring-based word entrances use Ria's source word timestamps.
- Process icons: larger staggered entrances at 6.72, 7.80 and 9.92 seconds,
  continued floating/rotation, orbiting highlights, and convergence into the logo.
- Background: four continuously changing wave layers with independent movement,
  depth gradients, particles and a circular clock-to-blue transition.
- Logo: travelling blue/gold strokes trace the mark; spring scale, staggered
  word formation and glow connect into the phone entrance.
- Phone: enlarged real redacted login capture, spring-driven 3D rotation,
  continuous pitch/yaw drift, a moving reflection and soft grounding shadow.
- Blur: sampled DOM motion blur is limited to road/formation layers so the actual
  app screen remains sharp. The experimental HTML-in-canvas implementation failed
  on this Chromium with a cached-paint error, so the supported CameraMotionBlur
  fallback is used. Springs and eased keyframes remain deterministic at 30fps.

## Audio inspection and processing

Original files remain untouched; their SHA-256 values still match the supplied
recordings. Cleaned FLACs are separate 32kHz mono, 16-bit voice masters. No source
speech was cut, sped up, pitch-shifted, re-recorded or synthesized. Decoded lengths
match originals to a fraction of one millisecond; source order/timings are retained.

Initial integrated loudness was -7.52 LUFS (Ria), -12.99 (Micah), and -22.01
(Joseph). Joseph's quiet-window floor was materially higher. Spectral inspection
informed conservative settings rather than using one aggressive preset.

Processing: 70/75/85Hz high-pass respectively; 14kHz low-pass; FFT noise-reduction
ceilings of 4/4/8dB with measured floor estimates; +0.7dB broad presence EQ; soft
2:1 compression (18ms attack, 180ms release); look-ahead limiting; and two-pass
loudness normalization. No hard gate and no de-esser were used. Spectral inspection
did not establish a persistent sibilance problem warranting additional suppression.

The cleaned files measure about -17 LUFS each. Joseph's stable 0.05–0.35s opening
noise sample fell from -46.53dBFS to about -55.7dBFS despite bringing his voice up.
Nonstationary handling/background sounds can remain; these are conservative
cleanups, not claims that all noise or source clipping has been repaired.

The preview stereo voice/SFX mix targets -16 LUFS and true peak below -1dBTP.
See src/audio/processing-report.json for measured values and exact filters.
A comparison on real phone speakers remains a useful listening check; no claim
of a physical mobile-speaker test is made from the remote execution environment.

## Music and effects

No licensed music file is available. Its slot is disabled. Please supply an
instrumental track with terms permitting the project. The optional pipeline ducks
music against narration (35ms attack, 450ms release), starts at low level, and fades
in/out gently. No unverified track is downloaded.

Sound effects are original, procedurally synthesized for this project. They are
kept well below voice level. Future-scene effects are prepared but the full film
is not being developed before approval of this revised 20-second sample.

## Reproduction

Use `python scripts/inspect-audio.py` for original-file inspection and
`python scripts/prepare-audio.py` to regenerate cleanup and preview mix. Both
require FFmpeg and numpy. Normal Studio/export use needs no Python setup because
the processed assets are included. `npm run render:preview` renders Preview20;
`npm run build` and `npm test` check the project. Original recordings remain in
public/voices; separate cleaned copies are in public/voices/cleaned.
