# MiJoRi Tech — LTO Officer

Complete IT311 — Application Development & Emerging Technology Final Project
promotional film, developed by MiJoRi Tech — Group 2.

**Final composition: FinalFilm** · 1920×1080 · 30fps · 5,027 frames · 2:47.57.
The application is a student-developed Mobile-Based Traffic Violation Ticketing
System with Web Administration; the video does not claim government deployment.

## Preview on an Android phone

Open this repository in GitHub Codespaces. The supplied dev container installs
packages and starts Studio automatically. Open **Ports → 3000 → Open in Browser**,
then choose **FinalFilm**. The **Final-Scenes** folder contains independently
previewable scenes. Landscape mode is recommended. Account availability and
Codespaces usage limits are controlled by GitHub.

A terminal-assisted environment can use:

```sh
npm ci
npm run dev
```

## Export MP4

Open **Actions → Verify and export video → Run workflow**, select **FinalFilm**,
and download the completed run's **mijori-video** artifact. Studio also has a
Render button. The equivalent command is:

```sh
npm run render
# out/mijori-lto-officer-final.mp4
```

Remotion downloads a browser on first render. To use an existing compatible
browser, append `-- --browser-executable=/path/to/chromium`.

## Audio and synchronization

Original ria.mp3, micah.mp3 and joseph.mp3 remain unchanged. Separate cleaned
FLAC copies retain the full speech, pronunciation and pace. The final stereo mix
contains all three in Ria → Micah → Joseph order, original sound effects and an
original instrumental score. Music ducks automatically during narration.

- Machine-readable phrase/scene/asset/animation/SFX map: **src/production/sync-map.json**
- Source-relative word captions: **src/production/*-captions.json**
- Composition-wide captions: **src/production/all-captions.json**
- Subtitle export: **public/subtitles/final.srt**
- Audio measurements: **src/production/final-audio-report.json**

Ria says “LTO Officer” at approximately 28.84s. The title/phone reveal starts at
frame 865, the nearest 30fps frame. No “Our Purpose” narration was invented; that
passage is absent from Ria's file. The ending uses music, branding and credits.
Micah's recorded closing lines remain in her complete recording before Joseph.

The original synth score uses no borrowed samples, reference audio or third-party
melody. Its composition, generated audio and synthesis source are offered under
CC0-1.0. See **public/audio/ORIGINAL-SCORE-LICENSE.txt** and
**scripts/compose-score.py**. Original procedural effects have documented project
reuse rights in public/audio/README.md. No music upload is required to render.

## Real application media and privacy

The film uses the supplied Android screenshots and two actual recording excerpts
for address and vehicle interactions. All published media has baked privacy masks.
Raw recordings remain outside this repository. Private names, credentials, default
PIN hints, license/plate details, camera-content details and server URLs are hidden.

The real ticket QR embeds a private server URL. It is masked and labeled clearly;
no fictional replacement QR is generated. Demo ticket reference and fine amounts
come from the supplied captures. The GPS and offline/sync illustrations are
identified as conceptual; the recording shows location unavailable.

## Project structure and checks

Production scenes live in src/production/scenes/. They reuse the established
phone, wave, vector, spring and typography components. The earlier 15/20-second
compositions and legacy draft remain available as historical previews.

```sh
npm test
npm run build
npm run verify:final
npm run verify:studio
```

REMOTION_BROWSER_EXECUTABLE optionally selects a browser for checks.
REMOTION_STUDIO_URL optionally selects a running Studio URL for the browser check.

Audio/asset regeneration scripts require FFmpeg, Python and numpy, but normal
preview/export does not: prepared safe assets and mixed audio are included.
Source asset paths in preparation scripts refer to the private supplied originals.
The synchronization builder uses the locally inspected ASR records; the resulting
JSON maps and captions are committed, so no transcription service is needed to run.

## Team

- Ria Jane A. Balacuit — Project Leader
- Micah P. Cadeliña — Documentation
- Joseph P. Yamson — Programmer

**Smarter Enforcement. Safer Roads.**
