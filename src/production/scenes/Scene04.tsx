import {Stage} from '../ProductionKit';
import {AppDemo} from '../AppDemo';
export const Scene04=()=> <Stage><AppDemo title="OFFICER ACCESS & DASHBOARD" beats={[
 {
  "at": 0,
  "media": "login",
  "y": 398,
  "label": "Officer login"
 },
 {
  "at": 2.2,
  "media": "loginClip",
  "y": 430,
  "label": "Login → dashboard",
  "note": "Real screen recording · credentials and personal records protected"
 },
 {"at":4.4,"media":"loginClip","y":260,"label":"Dashboard · real app interaction"},
 {
  "at": 9.2,
  "media": "dashboard",
  "y": 230,
  "label": "Essential tools, together"
 },
 {
  "at": 11.5,
  "media": "dashboard",
  "y": 325,
  "label": "Issue a new ticket"
 }
]}/></Stage>;
