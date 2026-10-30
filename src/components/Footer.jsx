import { LEAGUE_URL, LOGO } from "../config.js";

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer-logo" src={LOGO} alt="Hyde Park Rangers FC crest" />
      <p>
        Hyde Park Rangers FC · Part of the <a href={LEAGUE_URL}>OutSouth League</a> · MegCity Futbol · Chicago, IL
      </p>
    </footer>
  );
}
