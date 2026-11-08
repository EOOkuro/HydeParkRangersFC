import { LEAGUE_URL, LOGO, FEDOS_SLUG } from "../config.js";
import { loginUrl } from "../lib/fedos-public.js";

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer-logo" src={LOGO} alt="Hyde Park Rangers FC crest" />
      <p>
        Hyde Park Rangers FC · Part of the <a href={LEAGUE_URL}>OutSouth League</a> · MegCity Futbol · Chicago, IL
      </p>
      <p><a href={loginUrl(FEDOS_SLUG)}>Player &amp; parent sign in</a></p>
    </footer>
  );
}
