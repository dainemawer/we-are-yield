/**
 * Long-form homepage copy, shared by the page and its Markdown version
 * (`/index.md`, served to agents that ask for `text/markdown`). Editing it here
 * updates both, so they can't drift apart.
 */
export const home = {
  mission:
    "Our mission at Yield is to help businesses turn ideas into impact by building fast, embedding intelligence, and guiding digital growth with clarity and honesty.",
  about:
    "Yield helps startups and growing businesses move from idea to execution faster. Through rapid MVP development, AI automation, and digital consulting, we deliver outcomes by design — combining cutting-edge innovation with a structured process. With honesty, agility, and premium craft, we’re the partner businesses trust to save time, optimize resources, and stay ahead of what’s next.",
  loop: {
    heading: "Always a human in the loop.",
    body: "AI doesn’t replace your people — it empowers them. Yield ensures automation is ethical, valuable, and aligned with your business goals.",
    stat: { value: 20, label: "Hours saved per week" },
    caseStudy:
      "A retail client saved 20+ hours per week by automating inventory reports and customer responses. That time now goes into growth initiatives instead of spreadsheets.",
  },
  community:
    "Founders, operators and builders comparing notes on AI, MVPs and growing lean.",
  contact: "Let’s explore how AI automation could work in your business.",
} as const;
