import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FORM_ENDPOINT, STRIPE_URL, PRICE, CONTACT_EMAIL, YOUTH_GROUPS, INCLUDES } from "../config.js";

const SIZES = ["Youth S", "Youth M", "Youth L", "Youth XL", "Adult S", "Adult M"];

const empty = {
  parentName: "", parentEmail: "", parentPhone: "", emergencyName: "", emergencyPhone: "",
  playerName: "", birthdate: "", ageGroup: "", jerseySize: "", notes: "",
};

function Field({ label, hint, children }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

export default function Register() {
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | error | done
  const [msg, setMsg] = useState("");
  useEffect(() => { document.title = "Register — Hyde Park Rangers FC"; }, []);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const summary = () => [
    `Parent/guardian: ${f.parentName}`, `Email: ${f.parentEmail}`, `Phone: ${f.parentPhone}`,
    `Emergency contact: ${f.emergencyName} (${f.emergencyPhone})`,
    `Player: ${f.playerName}`, `Date of birth: ${f.birthdate}`, `Age group: ${f.ageGroup}`,
    `Jersey size: ${f.jerseySize}`, `Notes: ${f.notes || "none"}`,
  ].join("\n");

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending"); setMsg("");

    // No form service connected yet: open an email to the club instead.
    if (!FORM_ENDPOINT) {
      const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Rangers registration: " + f.playerName)}&body=${encodeURIComponent(summary())}`;
      window.location.href = url;
      setStatus("done");
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Rangers registration: ${f.playerName} (${f.ageGroup})`,
          email: f.parentEmail,
          parent_name: f.parentName, parent_phone: f.parentPhone,
          emergency_contact_name: f.emergencyName, emergency_contact_phone: f.emergencyPhone,
          player_name: f.playerName, player_birthdate: f.birthdate, age_group: f.ageGroup,
          jersey_size: f.jerseySize, notes: f.notes,
        }),
      });
      if (!res.ok) throw new Error("failed");
      if (STRIPE_URL) {
        window.location.href = `${STRIPE_URL}?prefilled_email=${encodeURIComponent(f.parentEmail)}`;
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setMsg("We couldn't save your registration. Check your connection and try again. Nothing was charged.");
    }
  };

  if (status === "done") {
    return (
      <main className="reg">
        <div className="reg-wrap">
          <div className="section-label">Thank you</div>
          <h1 className="section-title">Registration received</h1>
          <p className="signup-copy">
            {FORM_ENDPOINT
              ? "We have your details and will be in touch with next steps."
              : "Your email app should have opened with your registration. Send it to finish signing up."}
          </p>
          <Link to="/" className="btn-primary">Back to the club</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="reg">
      <div className="reg-wrap">
        <div className="section-label">Youth Program · U6 – U18</div>
        <h1 className="section-title">Register Your Player</h1>

        <div className="reg-grid">
          <form className="reg-form" onSubmit={submit}>
            <fieldset>
              <legend>Parent / guardian</legend>
              <div className="row">
                <Field label="Full name"><input required value={f.parentName} onChange={set("parentName")} autoComplete="name" /></Field>
                <Field label="Email" hint={STRIPE_URL ? "Use the email you'll pay with." : undefined}>
                  <input required type="email" value={f.parentEmail} onChange={set("parentEmail")} autoComplete="email" />
                </Field>
                <Field label="Phone"><input required type="tel" value={f.parentPhone} onChange={set("parentPhone")} autoComplete="tel" /></Field>
              </div>
              <div className="row">
                <Field label="Emergency contact name"><input required value={f.emergencyName} onChange={set("emergencyName")} /></Field>
                <Field label="Emergency contact phone"><input required type="tel" value={f.emergencyPhone} onChange={set("emergencyPhone")} /></Field>
              </div>
            </fieldset>

            <fieldset>
              <legend>Player</legend>
              <div className="row">
                <Field label="Player full name"><input required value={f.playerName} onChange={set("playerName")} /></Field>
                <Field label="Date of birth"><input required type="date" value={f.birthdate} onChange={set("birthdate")} /></Field>
                <Field label="Age group">
                  <select required value={f.ageGroup} onChange={set("ageGroup")}>
                    <option value="">Select</option>
                    {YOUTH_GROUPS.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </Field>
              </div>
              <div className="row">
                <Field label="Jersey size">
                  <select required value={f.jerseySize} onChange={set("jerseySize")}>
                    <option value="">Select</option>
                    {SIZES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Allergies or medical notes (optional)"><input value={f.notes} onChange={set("notes")} /></Field>
              </div>
              <div className="hint">One player per registration. Register siblings separately.</div>
            </fieldset>

            {status === "error" && <div className="error" role="alert">{msg}</div>}
            <button type="submit" className="btn-primary btn-block" disabled={status === "sending"}>
              {status === "sending" ? "Saving…" : STRIPE_URL ? `Continue to payment — ${PRICE}` : "Submit registration"}
            </button>
            {STRIPE_URL && <p className="note">Step 1 of 2. After you continue you'll be sent to secure checkout. Your spot isn't held until payment goes through.</p>}
          </form>

          <aside className="reg-side">
            <div className="section-label">What's Included</div>
            <ul className="includes-list">
              {INCLUDES.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
