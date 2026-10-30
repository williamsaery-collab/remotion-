# Speech denoiser model provenance

Model: somnolent-hogwash (`sh.rnnn`), recording-noise/speech model from [GregorR/rnnoise-models](https://raw.githubusercontent.com/GregorR/rnnoise-models/master/somnolent-hogwash-2018-09-01/sh.rnnn).

SHA-256: `70bb6685eb0c2a1d18e2918dca3fbfbd39317010b1802eb1b6ea73a92f3fdec0`.

Upstream's README states that, except for its tools directory and README, the work is not creative and not subject to copyright. A short verbatim notice excerpt and upstream link are included as SOURCE-README.md. We redistribute the model with that upstream statement, without claiming to have trained it.

Used locally with FFmpeg's arnndn filter for denoising existing human recordings. It does not generate or replace speech. No narration is sent to a speech synthesis service.
