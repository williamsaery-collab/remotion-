import {Stage} from '../ProductionKit';
import {AppDemo} from '../AppDemo';
export const Scene05=()=> <Stage><AppDemo title="CREATE A TRAFFIC TICKET" beats={[
 {
  "at": 0,
  "media": "violator",
  "y": 230,
  "label": "Violator information"
 },
 {
  "at": 3.6,
  "media": "namesClip",
  "y": 235,
  "label": "Name fields",
  "note": "Real field interaction · entered personal details protected"
 },
 {
  "at": 8.2,
  "media": "addressClip",
  "y": 545,
  "label": "Select an address"
 },
 {
  "at": 10.4,
  "media": "vehicleClip",
  "y": 215,
  "label": "Vehicle details"
 },
 {
  "at": 13.65,
  "media": "vehicle",
  "y": 240,
  "label": "Required fields"
 },
 {
  "at": 16.1,
  "media": "vehicle",
  "y": 685,
  "label": "Complete required details to continue"
 }
]}/></Stage>;
