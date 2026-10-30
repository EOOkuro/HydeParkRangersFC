import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BODY_IMAGE, HEADER_IMAGE, LEAGUE_URL, CONTACT_EMAIL, FIRST_TEAMS, YOUTH_GROUPS, INCLUDES } from "../config.js";

export default function Home() {
  useEffect(() => { document.title = "Hyde Park Rangers FC — Hyde Park's Club"; }, []);
  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ "--hero-img": `url("${HEADER_IMAGE}")` }}>
        <div className="hero-eyebrow">Hyde Park · Chicago South Side</div>
        <h1 className="hero-title">
          Hyde Park's
          <span>Football Club</span>
        </h1>
        <p className="hero-sub">
          Men's, women's, and youth soccer rooted in Hyde Park. Everyone welcome. No experience necessary.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-primary">Register Your Child</Link>
          <a href="#teams" className="btn-outline">Our Teams</a>
        </div>
      </section>

      {/* TEAMS */}
      <section className="section" id="teams">
        <div className="section-label">The Club</div>
        <h2 className="section-title">Every Age.<br />One Community.</h2>

        <div className="team-group-title">First Teams</div>
        <div className="teams-grid">
          {FIRST_TEAMS.map((t) => (
            <div className="team-card" key={t.badge}>
              <div className="team-badge">{t.badge}</div>
              <div className="team-name">{t.name}</div>
              <p className="team-desc">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="team-group-title">Youth · Rangers Academy · U6 – U18</div>
        <div className="age-grid">
          {YOUTH_GROUPS.map((g) => (
            <Link to="/register" className="age-card" key={g}>
              <b>{g}</b>
              <span>Rangers</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PHOTO */}
      <figure className="photo-band">
        <img src={BODY_IMAGE} alt="Hyde Park Rangers FC" loading="lazy" />
      </figure>

      {/* YOUTH SIGNUP (no prices on the front page) */}
      <section className="signup-section" id="register">
        <div className="signup-inner">
          <div>
            <div className="section-label">What's Included</div>
            <ul className="includes-list">
              {INCLUDES.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div className="signup-form-side">
            <div className="section-label">Youth Program</div>
            <h2 className="section-title">Register Your Child Today</h2>
            <p className="signup-copy">
              Spots are limited. Hyde Park Rangers FC is building the next generation of South Side footballers — give your child a real team, a real kit, and a real community this summer.
            </p>
            <Link to="/register" className="btn-primary">Register Now</Link>
          </div>
        </div>
      </section>

      {/* LEAGUE BAND */}
      <div className="league-band">
        <div className="league-band-label">Competing In</div>
        <div className="league-band-name">The OutSouth League</div>
        <a href={LEAGUE_URL} className="league-band-link" target="_blank" rel="noreferrer">chicagosuperleague.com →</a>
      </div>

      {/* CONTACT */}
      <section className="contact-section">
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">Join The Club</h2>
        <p className="contact-sub">Questions about youth registration, adult tryouts, or sponsorship? Reach out.</p>
        <div className="contact-actions">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">Email Us</a>
          <a href={LEAGUE_URL} className="btn-outline" target="_blank" rel="noreferrer">Visit League Site</a>
        </div>
      </section>
    </>
  );
}
