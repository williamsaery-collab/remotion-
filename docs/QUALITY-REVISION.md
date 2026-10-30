# Final quality revision

The previous 167.567-second final MP4 is preserved locally and on Drive. The new file is exported separately as `out/mijori-lto-officer-final-v2.mp4`.

## Actual application visibility

Scenes 4–8 now use an original-media overview at 350 pixels wide and a 1240×650 focused crop. The crop occupies about 65% of the frame width; together the two app views occupy about 52% of the entire frame area. They are straight-on, with no 3D tilt, glare, floating transforms or motion blur on app text. Decorative paragraphs have been removed. Subtitles occupy the lane below the large crop. The introduction retains the existing 3D reveal.

The supplied native media is 576×1280. The footage and crops are taken directly from that original recording and original screenshots, never from an earlier video render or thumbnail. Enlarging this supplied source cannot restore detail that was not recorded; no fictional or reconstructed UI text is used. The large crop makes the actual fields and amounts substantially easier to read.

New permanently redacted real clips: login-to-dashboard, name-field focus, camera capture-to-preview, violation selection and fine calculation. Address and vehicle interactions remain. Camera footage contains a keyboard, with no personal details, so the real capture and preview can be shown. The photographic monitor screenshot remains masked. The actual offline/demo access option introduces the existing conceptual sync diagram.

The recording's fine example changes from ₱3,000 to ₱8,000. The supplied ticket screenshot is a different example with ₱6,000 and reference TK-2026-213385; neither is represented as invented data or the same underlying record. The original ticket QR encodes a private server URL, so it remains permanently protected. Reference and amounts are visible.

## Joseph narration

Processing starts from the byte-identical original `public/voices/joseph.mp3`. The earlier FFT cleanup copy is retained in `out/audio-revision/joseph-previous.flac`, and the entire v1 film remains backed up.

The selected RNNoise-compatible recording-noise/speech model is bundled with provenance. Mix 0.88 retains some original signal to protect natural consonants and vowels. An initial 0.94 test reduced noise more, but independent ASR missed a quiet phrase; the selected gentler setting recognized that phrase. No captions or narration were rewritten to suit recognition output.

The pipeline removes rumble below 85 Hz, denoises, compensates the measured 480-sample/10 ms model latency, applies gentle presence EQ, moderate 2:1 compression and two-pass loudness normalization. There is no gating, word trimming, time stretching, pitch change or speech synthesis. Final speech timing correlation has zero additional delay at 16 kHz. Resampling changes the decoded length by only one 48 kHz sample (about 0.02 ms).

Measured noise comparison after matching speech level: the steady tail noise is 12.3 dB lower than in the previous cleanup. The all-pause speech-to-nonspeech ratio improves from 10.8 to 16.4 dB. These are noise-floor proxies, not clean-reference SNR/STOI or a promise that every sound is removed. Breaths and intermittent handling/impact noise may remain. Professional listening assessment still requires human ears; no clean reference exists for a valid intrusive intelligibility score. Independent ASR checks support retention of the spoken content.

`out/audio-revision/Joseph-Original-Then-Revised-Comparison.mp3` contains the original first 20 seconds at matched loudness, a one-second gap, then the cleaned same 20 seconds.

Ria: -17.00 LUFS; Micah: -16.99 LUFS; Joseph: about -17.25 LUFS. Music is reduced during narration; automatic ducking uses a 0.022 threshold, 5:1 ratio, 30 ms attack and 500 ms release. Effects are 20% quieter. The original closing music level remains.

## Synchronization and verification

All ten scene boundaries, source voice offsets, caption words/timestamps, 5027-frame duration and the frame-865 LTO Officer reveal remain unchanged. The full export stays 1920×1080 at 30 FPS.

Commands:

```sh
npm ci
npm run dev
npm test
npm run build
REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium npm run verify:readability
npm run render:revision-samples
npm run render -- --browser-executable=/usr/bin/chromium --concurrency=2 --crf=18 --audio-bitrate=256k
python scripts/verify-export.py out/mijori-lto-officer-final-v2.mp4
```

The four sample exports cover ticket creation, camera capture, violations/fines and digital ticket. They contain the real composition audio and captions and are decoded with strict FFmpeg error checking. Final verification checks frame count, resolution, FPS, complete decode, motion samples, full mixed-audio correlation, complete source voice checksums and voice sections, loudness and true peak. Privacy masks are reviewed visually and with OCR samples.
