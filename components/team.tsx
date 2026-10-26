import Image from "next/image";

// Leadership team, shown on Home and About. Skills per person from the
// 24 Oct 2026 client review doc. Bernie: photo 25 Oct; role, surname,
// LinkedIn and areas not supplied yet.
// `zoom` < 1 shrinks a tight headshot onto its own studio grey (`ground`)
// so every face sits at the same size as the others.
type Member = { name: string; role?: string; photo?: string; zoom?: number; ground?: string; linkedin?: string; linkedinSoon?: boolean; skills: string[] };

const TEAM: Member[] = [
  { name: "Emelia Long", role: "Chartered Accountant", photo: "/team/emelia-long.jpg", linkedin: "https://www.linkedin.com/in/emelia-long-839a5a72/", skills: ["CFO", "Corporate Secretary", "Digitalisation", "Tax"] },
  { name: "Benjamin Long", role: "Company Secretary", photo: "/team/benjamin-long.jpg", linkedin: "https://www.linkedin.com/in/benjaminltf/", skills: ["Strategy", "Treasury", "Processes"] },
  { name: "Benedict Long", role: "Accountant", photo: "/team/benedict-long.jpg", linkedin: "https://www.linkedin.com/in/benedict-long-511929b3/", skills: ["Accounting", "Corporate Secretary"] },
  // Placeholders until the client sends Bernie's role, LinkedIn and areas.
  { name: "Bernie", role: "Role to be confirmed", photo: "/team/bernie-long.jpg", zoom: 0.8, ground: "#7a7c80", linkedinSoon: true, skills: ["Area to be confirmed", "Area to be confirmed"] },
];

// Soft side and top edges, so a shrunken photo melts into its grey ground.
const FADE = "linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent), linear-gradient(180deg, transparent, #000 18%)";

const LinkedIn = () => <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V21h-4z" /></svg>;

function Card({ m, i }: { m: Member; i: number }) {
  const body = (
    <>
      {m.photo
        ? <div className="rv-photo" aria-hidden="true" style={m.ground ? { background: m.ground } : undefined}><Image src={m.photo} alt="" fill sizes="(max-width: 900px) 440px, 25vw" style={m.zoom ? { transform: `scale(${m.zoom})`, transformOrigin: "50% 100%", WebkitMaskImage: FADE, maskImage: FADE, WebkitMaskComposite: "source-in", maskComposite: "intersect" } : undefined} /></div>
        : <div className="rv-ph" aria-hidden="true"><svg viewBox="0 0 80 80"><circle cx="40" cy="28" r="16" /><path d="M8 80c2-20 16-30 32-30s30 10 32 30z" /></svg></div>}
      <div className="rv-mid">
        {m.role && <span className="rv-role">{m.role}</span>}
        <b className="rv-name">{m.name}</b>
        {(m.linkedin || m.linkedinSoon) && <span className="rv-pill"><LinkedIn />LinkedIn</span>}
      </div>
      {m.skills.length > 0 && (
        <ul className="rv-skills" aria-label={`${m.name}: areas covered`}>{m.skills.map((s, i) => <li key={`${s}-${i}`}>{s}</li>)}</ul>
      )}
    </>
  );
  const cls = `rv-card rv-${i}${m.photo ? " has-photo" : ""}`;
  return <li>{m.linkedin ? <a className={cls} href={m.linkedin} target="_blank" rel="noopener">{body}</a> : <div className={cls}>{body}</div>}</li>;
}

export function TeamCards() {
  return <ul className="rv-cards rv-n4">{TEAM.map((m, i) => <Card key={m.name} m={m} i={i} />)}</ul>;
}
