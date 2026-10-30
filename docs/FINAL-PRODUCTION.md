The production below describes the preserved v1 export. For the current revision, see [QUALITY-REVISION.md](QUALITY-REVISION.md) and FINAL-EXPORT-VERIFICATION.json. The v1 measurements remain in FINAL-V1-EXPORT-VERIFICATION.json.

# Final production notes

The full production uses the existing working Remotion project and retains its
blue/navy palette, layered waves, original road/car illustrations, spring-driven
logo formation, dimensional phone treatment and word-highlighted captions.
All ten storyboard scenes are authored independently and registered for Studio.

## Story and evidence

All source MP3s, eight screenshots, app recording, reference MP4, previous preview
and written 10-scene guide were accessible. A larger local Whisper model generated
word-level timestamps for all three recordings. The spoken recordings determine
the scenes, not the approximate written times. Proper brand spelling was corrected
in captions; recorded wording is preserved where it differs from the written guide.
The source's absent “Our Purpose” segment is not fabricated.

The full film introduces the app at Ria's actual “LTO Officer” phrase, about 28.84s
(frame 865). It then demonstrates login/PIN/dashboard, guided ticket details,
address/vehicle interactions, camera/GPS, violation totals, the actual electronic
ticket, conceptual offline synchronization and complete academic/team credits.

The machine-readable sync map contains speaker, spoken phrase, source and global
start/end, corresponding asset, animation, transition and sound effect. Scene
windows and title reveal use this map; audio assembly uses the same frame offsets.
The primary clock is 30fps, with 18-frame visual overlaps and untrimmed audio tracks.

## Privacy and accuracy

Static and recording exports are permanently redacted before publication. Asset
hashes, source filenames and mask coordinates are in asset-manifest.json. OCR
checks found no private-address/default-PIN/credential patterns in the published
screenshots. The actual ticket QR was decoded privately to check its safety;
it contains a private server URL, so its pixel region is blocked in the export.
No replacement QR, synthetic app interface or invented traffic fine is introduced.

The recording's GPS review says location unavailable. GPS and sync diagrams are
clearly illustrations; they do not claim a demonstrated successful GPS fix or
verified network-loss/server-recovery test. The application remains identified
as a student-developed IT311 final project throughout the film.

## Sound

The originals are unchanged. Existing conservative per-speaker cleaned copies
are used complete and in order, without rate changes. An original 96bpm synth
score was authored for this production and offered under CC0-1.0, with no borrowed
melody/samples or copyrighted reference audio. Original procedural effects cover
traffic-like air, ticking, transitions, interface clicks, logo rise, shutter,
calculation confirmation, ticket notification and sync.

The score ducks against the voice with a 25ms attack and 450ms release. The closing
rises gently after narration. A two-pass normalization targets -16 LUFS and peak
below -1dBTP. No physical mobile-speaker audition is claimed from the remote
workspace; measured output and a downloadable MP4 permit listening on the phone.

## Verification

A 75-frame full-resolution technical test around the title reveal rendered and
was checked. TypeScript/bundle, narration integrity and sync-map tests passed.
Twenty-three representative frames, including scene starts, reveal boundaries,
source recording clips, fine/ticket/GPS/privacy and closing, rendered successfully.
They were inspected for clipping, missing sources and overlapping text. Studio's
browser check passed on the final composition. Final output measurements and
full decode/audio checks are recorded separately after the full export finishes.

## Completed export

The complete final MP4 was created and verified. Video: 1920x1080, 30fps, 5,027
frames, 167.566667 seconds. MP4 container: 167.573 seconds, H.264 video and stereo
AAC audio. Full-file strict decode passed. All 168 one-second frame samples were
non-identical to their neighbors. Audio correlated with the complete prepared mix,
and beginning/middle/ending speech sections from each speaker were checked.

Final measured integrated loudness: -16.03 LUFS; true peak: -3.19 dBTP.
The output is 65,003,341 bytes (about 62MiB). The original MP3 source hashes still
match. Exact output SHA-256 and audio/voice comparison results are published in
FINAL-EXPORT-VERIFICATION.json. No claims of a physical phone-speaker audition are
made. The downloadable video uses Android-compatible H.264/AAC in MP4.
