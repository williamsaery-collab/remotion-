import {Stage} from '../ProductionKit';
import {AppDemo} from '../AppDemo';
export const Scene08=()=> <Stage><AppDemo title="DIGITAL TRAFFIC TICKET" beats={[
 {
  "at": 0,
  "media": "ticket",
  "y": 65,
  "label": "The completed digital ticket"
 },
 {
  "at": 4.5,
  "media": "ticket",
  "y": 545,
  "label": "Recorded violations and total fine"
 },
 {
  "at": 8.9,
  "media": "ticket",
  "y": 225,
  "label": "Unique reference · TK-2026-213385"
 },
 {
  "at": 11.2,
  "media": "ticket",
  "y": 215,
  "label": "QR ticket reference",
  "note": "Original QR area protected: it encodes a private server address. No replacement code."
 },
 {
  "at": 14,
  "media": "ticket",
  "y": 850,
  "label": "View or print the ticket"
 }
]}/></Stage>;
