import { Link } from "react-router-dom";
import { LOGO, FEDOS_SLUG } from "../config.js";
import { loginUrl, registerUrl } from "../lib/fedos-public.js";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-crest">
        <img className="nav-logo" src={LOGO} alt="Hyde Park Rangers FC crest" />
        <div>
          <div className="nav-name">Hyde Park Rangers FC</div>
          <div className="nav-league">OutSouth League · Chicago</div>
        </div>
      </Link>
      <div className="nav-right">
        <Link to="/#teams" className="nav-link">Teams</Link>
        <a href={loginUrl("hyde-park-rangers", "player")} className="nav-link nav-signin">Player Log In</a>
        <a href={loginUrl("hyde-park-rangers", "guardian")} className="nav-link nav-signin">Guardian Log In</a>
        <a href={registerUrl(FEDOS_SLUG)} className="nav-cta">Register Now</a>
      </div>
    </nav>
  );
}
