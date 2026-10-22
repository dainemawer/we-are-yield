import { INTRO_STORAGE_KEY } from "@/lib/intro";

/**
 * Runs synchronously while the browser parses <head>, before first paint.
 *
 * - `data-js`       → motion pre-states apply (see globals.css)
 * - `data-reduced`  → user prefers reduced motion
 * - `data-intro`    → which loader to play:
 *     full  — first ever visit: the cinematic loader
 *     quick — returning visitor, new session: the same sequence at ~55% length
 *     none  — already seen this session, deep link, or reduced motion
 *
 * Failsafe: if the motion runtime hasn't booted within 8s (script error,
 * extremely slow device) everything is revealed so content is never stranded.
 */
const script = `(function(){
var d=document.documentElement,k=${JSON.stringify(INTRO_STORAGE_KEY)};
d.setAttribute('data-js','');
var r=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(r)d.setAttribute('data-reduced','');
var i='full';
try{if(sessionStorage.getItem(k))i='none';else if(localStorage.getItem(k))i='quick';}catch(e){}
if(r||location.hash.length>1)i='none';
d.setAttribute('data-intro',i);
setTimeout(function(){if(!window.__yieldMotion){d.removeAttribute('data-js');d.setAttribute('data-intro','none');}},8000);
})()`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
