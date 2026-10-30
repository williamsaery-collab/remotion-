# Supplied application materials

Source folder: https://drive.google.com/drive/folders/1GvwS0CV98yPaiRpdM_zZoJB4SKKhQBKF

All eight original JPG screenshots and the 176.799-second screen recording were
retrieved successfully. Screenshots were inspected individually; the recording
was sampled every 15 seconds across its duration to inspect the navigation.
Raw material stays outside the Git repository because it includes personal data,
credentials, configuration addresses and scannable identifiers.

## Screenshot inventory

| Drive filename suffix | Content |
| --- | --- |
| 121015_775.jpg | Dashboard and recent tickets — used in the opening after redaction |
| 121015_973.jpg | Review and issue ticket |
| 121016_056.jpg | Electronic citation with QR, barcode and fine breakdown |
| 121016_089.jpg | Violation selection with selected-count and fine total |
| 121016_268.jpg | Email/password login |
| 121016_502.jpg | Camera evidence capture |
| 121016_736.jpg | First ticket step: violator details |
| 121016_629.jpg | PIN login |

The samples show login → dashboard → violator details → vehicle details → camera
capture/photo review → violation search/selection → review → issue → history.
The recording includes keyboard entry and address selection. Review screens show
GPS as unavailable in this demonstration. The supplied material does not establish
successful GPS acquisition or a complete network-disconnection/reconnection test.
The dashboard/history includes sync status labels; describe offline/sync behavior
according to the verified recording or additional demonstration in the full film.

## Opening asset handling

scripts/prepare-dashboard.mjs renders opaque overlays over the actual original
576x1280 dashboard capture, exports public/screenshots/approved/dashboard.png,
and removes its temporary intake copy. It removes status-bar content, officer
name, recent-ticket references, names and identifying trailing fields. The safe
PNG was inspected visually. No fictional data, controls or app design were added.
The source PNG itself is redacted; no redundant dashboard overlay obscures icons during playback.

Only this safe dashboard asset is committed. The other screenshots and raw screen
recording await scene-specific redaction before use after opening approval.
The opening now displays the actual dashboard instead of the placeholder.

No standalone team voice-overs were present in the folder. The screen recording
has an audio stream, whose identity/role has not been verified; it is not used as
narration. The opening stays silent until the team's narration is supplied.

## Repository

The Drive document provides the corrected repository address:
https://github.com/balacuitriajane-netizen/remotion

It is public and was inspected through GitHub metadata and a successful clone.
The clone was empty, with no package.json or existing source to repair.
Both connected GitHub identities report pull=true, push=false. Public visibility
allows reading, but publishing requires a connection with repository write access.
