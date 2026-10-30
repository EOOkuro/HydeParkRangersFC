// One place for the things you will edit.
export const HEADER_IMAGE = "https://res.cloudinary.com/zuywi9ih/image/upload/v1793326474/IMG_0179_Original.jpg";
export const BODY_IMAGE = "https://res.cloudinary.com/zuywi9ih/image/upload/v1793326474/IMG_0922_Original.jpg";

export const LEAGUE_URL = "https://chicagosuperleague.com";
export const CONTACT_EMAIL = "info@chicagosuperleague.com";

export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || "";
export const STRIPE_URL = import.meta.env.VITE_STRIPE_URL || "";
export const PRICE = "$200"; // shown only on the payment button of the registration page

// Youth age groups, U6 to U18
export const YOUTH_GROUPS = Array.from({ length: 13 }, (_, i) => `U${i + 6}`);

export const FIRST_TEAMS = [
  { badge: "MEN'S FIRST TEAM", name: "Hyde Park Rangers FC", desc: "Competing in the OutSouth League — Chicago's premier grassroots adult soccer competition on the South Side." },
  { badge: "WOMEN'S FIRST TEAM", name: "Hyde Park Rangers FC", desc: "Women's competitive play in the OutSouth League. Open to players of all experience levels from Hyde Park and surrounding neighborhoods." },
];

export const INCLUDES = [
  "2 practice sessions per week",
  "Weekend games",
  "Full uniform included",
  "Practice shirt included",
  "U6–U18 · All skill levels",
  "No experience necessary",
];
