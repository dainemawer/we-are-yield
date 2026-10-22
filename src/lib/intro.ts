export const INTRO_STORAGE_KEY = "yield:intro";

export type IntroMode = "full" | "quick" | "none";

export function readIntroMode(): IntroMode {
  const mode = document.documentElement.dataset.intro;
  return mode === "full" || mode === "quick" ? mode : "none";
}

/** Remember the intro was seen: skip it this session, shorten it next time. */
export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    localStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Not critical.
  }
}
