import {Stage} from '../ProductionKit';
import {AppDemo} from '../AppDemo';
export const Scene07=()=> <Stage><AppDemo title="VIOLATIONS & AUTOMATIC FINES" beats={[
 {
  "at": 0,
  "media": "violations",
  "y": 435,
  "label": "Select the applicable violations"
 },
 {
  "at": 4,
  "media": "selectionClip",
  "y": 435,
  "label": "Real violation selection"
 },
 {
  "at": 9.1,
  "media": "finesClip",
  "y": 455,
  "label": "Select another violation"
 },
 {
  "at": 13.1,
  "media": "finesClip",
  "y": 865,
  "label": "The app calculates the total",
  "note": "Actual recording: the total changes from ₱3,000 to ₱8,000"
 },
 {
  "at": 17.1,
  "media": "finesClip",
  "y": 865,
  "label": "Total fine · ready for review",
  "note": "Amounts displayed by the actual application"
 }
]}/></Stage>;
