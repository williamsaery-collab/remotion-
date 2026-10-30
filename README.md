# Revised motion and cleaned-audio preview

**Preview20** now has continuous camera/object motion, perspective traffic,
animated light trails, larger rotating phone, and separate cleaned recordings.
The original MP3s remain unchanged. Original subtle sound effects are mixed with
Ria for the 20-second preview. Music is disabled pending a licensed instrumental.
See [motion/audio improvements](docs/audio/IMPROVEMENTS.md) and the measured
[src/audio/processing-report.json](src/audio/processing-report.json).
The full film remains pending approval. Earlier notes below are historical.

# Current deliverable: 20-second motion preview

Select **Preview20** in Remotion Studio or use `npm run render:preview`.
It uses the brighter blue visual direction, actual redacted login capture and
Ria's original first 20 seconds, ending at a pause. All three full MP3 recordings
are included unchanged. No required assets are missing for this preview.

See [20-second preview and audio plan](docs/PREVIEW20.md). The new full production
is pending preview approval. The material below describes the earlier draft.

# MiJoRi Tech — LTO Officer

Cinematic promotional video for **IT311 — Application Development & Emerging
Technology**, Final Project. Developed by **MiJoRi Tech — Group 2**.

LTO Officer is a student-developed Mobile-Based Traffic Violation Ticketing
System with Web Administration. This film does not claim official government
deployment.

## Current opening for approval

Select **Opening15** in Remotion Studio: 15 seconds, 1920×1080, 30 fps.
The opening includes a traced logo reveal, dimensional floating phone, blue
lighting, gold accents, animated typography and subtle academic credits. The
phone displays our actual supplied dashboard, with personal details permanently
redacted in the committed PNG. No fictional application interface is used.

The opening has been rendered and inspected. Narration is silent until original
team recordings are supplied. The **LTOOfficer** composition is an earlier
150-second draft; adapting the full film to the supplied **2:48 official script**
waits for approval of this opening. See docs/OFFICIAL-NARRATION.md.

## Preview on Android using Codespaces

Open this repository in GitHub Codespaces (Code → Codespaces → Create).
The included dev container installs dependencies and starts Studio automatically.
Open **Ports → 3000 → Open in Browser**, then select **Opening15**. Landscape mode
is recommended. Codespaces availability and usage limits depend on your account.
The startup configuration is prepared; cloud startup depends on GitHub completing
its container setup.

For a terminal-assisted environment, run from the folder containing package.json:

```sh
npm ci
npm run dev
```

Studio serves port 3000. Use a forwarded port URL for a remote workspace; a remote
localhost URL is not directly reachable from your phone. The manifest and dev
script are included, resolving the earlier missing-package.json setup failure.

## Export MP4 without a phone terminal

Open **Actions → Verify and export video → Run workflow**, choose **Opening15**,
then download **mijori-video** from the completed run's Artifacts. The workflow
runs checks and can export the selected composition. The legacy full draft is
also selectable, but it is not the final 2:48 version.

Studio also offers a **Render** button (H.264 / MP4).

```sh
npm run render:opening  # out/opening.mp4
npm run render          # legacy full draft: out/lto-officer.mp4
```

Remotion may download Chrome Headless Shell on first render. To use an installed
browser, append `-- --browser-executable=/path/to/chromium` to a render command.

## Actual materials and privacy

All eight supplied screenshots were inspected and the screen recording was
sampled throughout its 176.799-second duration. See docs/MATERIALS-REVIEW.md.
Only the redacted dashboard is published under public/screenshots/approved/.
Raw screenshots and recording contain credentials, private server addresses,
personal records or scannable identifiers and remain outside this repository.
Other scenes await appropriate source redactions after opening approval.

scripts/prepare-dashboard.mjs renders opaque privacy overlays over the original
576×1280 dashboard and deletes its temporary intake copy. ProtectedAppScreen
accepts approved exports and labels missing screenshots explicitly.

## Recorded narration only

Add the team's real recordings as public/voices/ria.mp3, micah.mp3 and joseph.mp3.
No AI narration, substitute voices or unlicensed music is included.

src/opening-voice.json provides an opt-in cue with editable start, trim, duration
and volume for the opening; it defaults to disabled. Final narration must be
aligned to the real recordings rather than compressed into the 15-second draft.
The older src/voice-cues.json belongs to the legacy full-film draft and will be
replaced with the official per-scene speaker assignments during full production.

## Editing and verification

```sh
npm test
npm run build
npm run verify:frames
npm run verify:studio  # requires Studio running on port 3000
```

REMOTION_BROWSER_EXECUTABLE optionally selects a browser for verification scripts.
Scene components live in src/scenes/. CinematicOpening.tsx is the current approval
draft. All animations are frame-driven and use React with TypeScript. Missing
assets never require fake files. Generated output, dependencies, credentials and
raw intake are excluded from Git.

See docs/VERIFICATION.md for completed local checks and historical setup notes.
GitHub CI/Codespaces results must be assessed separately from local verification.

## Team

- Ria Jane A. Balacuit — Project Leader
- Micah P. Cadeliña — Documentation
- Joseph P. Yamson — Programmer

**Smarter Enforcement. Safer Roads.**
