# 20-second approval preview

Select Preview20 in Studio. Export:

    npx remotion render src/index.ts Preview20 out/mijori-preview-20s.mp4

1920x1080, 30fps, 600 frames. Original vector road, car, clock, paperwork,
calculator and record icons; blue waves and dimensional phone animation. The
phone displays the actual login screenshot with the entered credentials, server
address and system status bars permanently masked in the source PNG. Source
copyrighted reference imagery, branding and audio are not included in the film.

## Narration source of truth

The MP3s have been copied without modifying their bytes. SHA-256 integrity is
checked by npm test. No playback speed changes, synthesized voice, music,
narration fades, equalization or word trimming have been applied.

| Source | Complete file length | Planned start |
| --- | --- | --- |
| Ria | 53.786122s | 0:00.000 |
| Micah | 43.023673s | 0:54.300 |
| Joseph | 57.730612s | 1:37.833 |

Total source duration: 154.540407 seconds. Two 0.5-second pauses and a 12-second
closing bring the frame-rounded plan to 167.566667 seconds (2:47.57). The plan is
editable in src/narration/timeline.json. These are planning values; the remaining
visual scenes have not been produced under this revision and no full MP4 is claimed.

The separate 20-second preview plays the first 20 seconds of Ria's intact file.
Her question finishes at about 19.22s; the next phrase begins at about 20.92s.
The composition ends within that pause, so no spoken word is cut at the boundary.
The complete Ria file is retained for the full production.

## Audio inspection and caption timing

All three files were decoded locally for inspection; 50ms RMS waveform windows
are saved beside the timeline. scripts/analyze-narration.py regenerates them
without altering the MP3s (requires numpy, ffmpeg and ffprobe).

Local faster-whisper base.en CPU/int8 ASR produced word timestamps per source.
GPU transcription was unavailable in this environment. ASR used a separate
analysis environment, not a runtime dependency. Its output for all three speakers
is retained as *draft* JSON in src/narration/. The first 20 seconds were checked
against the supplied scene guide and rendered as word-highlighted captions in
preview-captions.json. Names and later passages in the draft transcripts need
proofreading before final captions; for example ASR misheard MiJoRi Tech.
The older written 2:48 guide is not forced onto these differently worded recordings.

Micah's recording includes closing lines at its end. They stay in her complete
recording before Joseph, following the user's required Ria → Micah → Joseph order.

## Accessible materials

Nothing required for this preview is missing: all three MP3s, the 96.04-second
reference, eight original app screenshots, 176.799-second app recording, and the
written narration/scene guide are accessible. Reference sampled throughout its
runtime: bright blue, gentle waves, white type, rotating devices and minimalist
vector scenes. All original source media remains outside public except the team's
narration and safely redacted app images. No raw personal-data recording is shipped.

Full production waits for approval of Preview20. Legacy Opening15 and LTOOfficer
remain earlier drafts and are not the new complete promotional film.
