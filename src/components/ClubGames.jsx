import { useEffect, useState } from "react";
import { fedosReady, getFixtures, niceWhen } from "../lib/fedos-public.js";
import { CLUB_NAME } from "../config.js";

// The club's next games and latest results, read live from FedOS. Shows nothing until FedOS has games for the club.
export default function ClubGames() {
  const [next, setNext] = useState([]), [done, setDone] = useState([]);
  useEffect(() => {
    if (!fedosReady()) return;
    const who = { team: CLUB_NAME };
    getFixtures(who, { kind: "upcoming", limit: 5 }).then(setNext).catch(() => {});
    getFixtures(who, { kind: "results", limit: 5 }).then(setDone).catch(() => {});
  }, []);
  if (next.length === 0 && done.length === 0) return null;
  const row = (g, score) => (
    <li key={g.event_id} className="game-row">
      <span className="game-when">{niceWhen(g.starts_at)}</span>
      <span className="game-teams">{g.home_team ?? "TBC"} vs {g.away_team ?? "TBC"}</span>
      {score ? <span className="game-score">{g.home_score}–{g.away_score}</span> : <span className="game-where">{g.venue ?? ""}</span>}
    </li>);
  return (
    <section className="section" id="games">
      <div className="section-label">Fixtures</div>
      <h2 className="section-title">Games &amp; Results</h2>
      <div className="teams-grid">
        {next.length > 0 && <div className="team-card"><div className="team-badge">NEXT UP</div><ul className="game-list">{next.map((g) => row(g, false))}</ul></div>}
        {done.length > 0 && <div className="team-card"><div className="team-badge">LATEST RESULTS</div><ul className="game-list">{done.map((g) => row(g, true))}</ul></div>}
      </div>
    </section>);
}
