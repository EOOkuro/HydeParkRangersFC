import { Link } from "react-router-dom";
import { LOGO } from "../config.js";

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
        <Link to="/register" className="nav-cta">Register Now</Link>
      </div>
    </nav>
  );
}
