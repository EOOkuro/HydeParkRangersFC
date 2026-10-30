import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-crest">
        <div className="crest-icon">⚽</div>
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
