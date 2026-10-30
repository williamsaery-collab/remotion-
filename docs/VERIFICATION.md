# Verification — October 30, 2026

## Passed in the managed workspace

- Installed 260 npm packages and generated a lockfile; Remotion 4.0.539.
- `npm run dev` started Remotion Studio on port 3000 (with environment network
  permission); HTTP returned 200.
- Automated Chromium browser check loaded Studio, Opening15, LTOOfficer and its
  preview canvas. Screenshot: `out/checks/studio.png` (generated, not committed).
- Implemented the opening before the other scenes. `npm run build` passed.
- Rendered the complete opening MP4. ffprobe confirmed **1920×1080**, **30/1 fps**,
  **450 frames**, **15.000 seconds**. Inspected a rendered frame visually.
- Expanded the composition to all ten scenes; TypeScript and production bundle
  passed again.
- Rendered 21 full-film sample frames: every scene, all nine transition midpoints,
  and first/last frames. Metadata assertions passed: 4500 frames, 30 fps, 1080p.
- Visually inspected opening, introduction, dual-phone and closing/credits frames.
- Project tests cover timeline length minus transition overlap, voice cue bounds
  and overlap, and matching Remotion package versions.
- Refreshed package-lock.json offline after declaring the renderer dependency.

## Limits and remaining integration

- No app screenshots or recorded voices were supplied. The missing-asset path
  was exercised successfully: clearly labeled screenshot placeholders and silence.
  Actual media playback, recording durations and narration synchronization still
  require the team's files.
- The full 150-second MP4 has not been exported; the opening was exported and the
  full film was verified through its bundle, Studio and sample renders.
- GitHub repository inspection/push returned 404. The remote repository was not
  modified. Local project history is separate until access allows reconciliation.
- Codespaces auto-start and GitHub Actions are configured but cannot be verified
  remotely until the repository is accessible.
- Local test renders used `/usr/bin/chromium`; portable scripts use Remotion's
  browser or REMOTION_BROWSER_EXECUTABLE. Frame samples are half-resolution for
  efficient inspection; the opening export was full 1920×1080.

Re-run `npm test`, `npm run build`, and `npm run verify:frames` after replacing
assets or changing timing. Run `npm run verify:studio` with the preview running.

## Revised academic opening

Opening15 now uses CinematicOpening. Production build and existing project tests
passed. Studio was restarted and its browser check passed. The complete revised
opening rendered successfully; ffprobe confirmed 1920x1080, 30 fps, 450 frames,
15 seconds. A frame at 12 seconds was inspected for typography, phone staging,
placeholder clarity and academic attribution. Real app media and recorded voice
synchronization remain pending file transfer. No raw screenshots were published.

## Actual app capture update

The corrected public repository /balacuitriajane-netizen/remotion was successfully
cloned and confirmed empty. Both connected identities report push=false.
Retrieved eight screenshots and one 176.799-second screen recording from Drive;
reviewed the screenshots and sampled footage throughout. The actual dashboard
capture was rendered with opaque privacy redactions into a safe standalone PNG.
Its pixels were inspected before use; raw originals were never staged in Git.
The opening production build, type check, project tests and Studio browser check
passed. A complete 15-second 1080p/30fps opening with the real dashboard rendered
successfully. Final export removes redundant overlays to preserve dashboard icons.
No voice-over is used until the team's original recordings are provided.

## 20-second preview with official recordings

All provided media was accessible. ffprobe measured reference 96.04s; Ria
53.786122s, Micah 43.023673s, Joseph 57.730612s. Original MP3 SHA-256 values match
committed copies exactly. All three were transcribed locally for word timing;
50ms RMS waveform data is retained. First 20s captions were checked against the
scene guide; remaining ASR transcripts are explicitly drafts.

Preview20 production bundle and project tests passed. Studio browser check passed.
The complete sample rendered as 600 frames at 1920x1080/30fps with an AAC audio
stream. Container length is about 20.011s due to audio encoding; video is exactly
20.000s. Decoded sample/source waveform correlation was 0.99936 after accounting
for a 25ms AAC encoding offset (less than one video frame). No time stretching,
voice synthesis, source-word cuts or narration processing was applied.

Road/problem and real-login hero frames were inspected. The caption display was
refined to keep phrases readable across short word gaps. Credentials and server
address are irreversibly masked in the login PNG, inspected before publication.
Legacy full-film audio was disabled so old cue durations cannot truncate these
new official recordings. Full production remains pending preview approval.

## Continuous-motion and audio-cleanup revision

The existing Preview20 composition was revised, with original source MP3s retained.
Added perspective traffic, continuing camera drift, eased/spring typography, larger
rotating phone, layered waves, animated icons and light-trail logo formation.
Sampled DOM motion blur is used on illustration/formation layers; experimental
HTML-in-canvas blur was tested and replaced after a Chromium paint-cache failure.
Actual login pixels remain from the redacted original screenshot.

Conservative per-speaker noise reduction/EQ/compression and two-pass loudness
normalization produced separate FLAC voice masters. Decoded durations remain
within a fraction of one millisecond of the original recordings. Source hashes
remain unchanged. Voice levels measure approximately -17 LUFS per file.
No persistent sibilance problem was established; de-essing was not applied.
Music is disabled pending a licensed file; original procedural effects are active.

A complete revised 600-frame preview was exported at 1920x1080, 30fps with stereo
narration/SFX. Export measured -16.08 LUFS integrated, -5.78 dBTP true peak and
2.4 LU loudness range. Road, icon, logo and phone frames were inspected; a final
layout correction keeps opening type inside the safe area. Build, source-integrity
tests and Studio check passed. No physical phone-speaker listening test or complete
full-length movie export is claimed.

## Complete final film

FinalFilm exported successfully as 5,027 1080p/30fps frames (2:47.57). Full video
and audio decode passed. The complete prepared mix was compared to the AAC export;
all three speakers' opening, middle and ending speech sections matched at their
configured frame offsets. Original MP3 SHA-256 checks passed. No repeated adjacent
one-second video samples were found. Actual exported loudness was -16.03 LUFS and
true peak -3.19dBTP. See docs/FINAL-EXPORT-VERIFICATION.json for exact measurements,
output hash, source coverage and render details.
