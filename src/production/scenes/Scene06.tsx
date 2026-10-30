import {Stage} from '../ProductionKit';
import {AppDemo} from '../AppDemo';
export const Scene06=()=> <Stage><AppDemo title="PHOTO EVIDENCE & LOCATION" beats={[
 {
  "at": 0,
  "media": "camera",
  "y": 700,
  "label": "In-app camera controls"
 },
 {
  "at": 4.4,
  "media": "cameraClip",
  "y": 725,
  "label": "Capture → evidence preview",
  "note": "Real capture and evidence preview · original app recording"
 },
 {
  "at": 8.5,
  "media": "review",
  "y": 205,
  "label": "Review the captured evidence",
  "note": "Actual review screen · evidence and personal details protected"
 },
 {
  "at": 10.2,
  "media": "review",
  "y": 725,
  "label": "GPS information, when available",
  "note": "This supplied demonstration reports “Location unavailable”."
 },
 {
  "at": 17.9,
  "media": "dashboard",
  "y": 190,
  "label": "LTO Officer · MiJoRi Tech"
 }
]}/></Stage>;
