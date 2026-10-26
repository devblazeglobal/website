import Image from "next/image";

// Leadership team, shown on Home and About. Areas per person from the client
// (24 and 26 Oct 2026). Roles and LinkedIn removed at the client's request.
// Photos are pre-cropped to the card (900x1230) so every head is the same
// size and height: crown at 150px, crown-to-chin 330px.
type Member = { name: string; photo: string; skills: string[] };

const TEAM: Member[] = [
  { name: "Emelia", photo: "/team/emelia-long-c2.jpg", skills: ["CFO", "Corporate Secretary", "Digitalisation", "Tax"] },
  { name: "Benjamin", photo: "/team/benjamin-long-c2.jpg", skills: ["Strategy", "Treasury", "Processes"] },
  { name: "Benedict", photo: "/team/benedict-long-c2.jpg", skills: ["Accounting", "Corporate Secretary"] },
  { name: "Bernie", photo: "/team/bernie-long-c4.jpg", skills: ["CFO", "Strategy", "Management consulting"] },
];

function Card({ m, i }: { m: Member; i: number }) {
  return (
    <li>
      <div className={`rv-card rv-${i} has-photo`}>
        <div className="rv-photo" aria-hidden="true"><Image src={m.photo} alt="" fill sizes="(max-width: 900px) 440px, 25vw" /></div>
        <div className="rv-mid"><b className="rv-name">{m.name}</b></div>
        <ul className="rv-skills" aria-label={`${m.name}: areas covered`}>{m.skills.map((s) => <li key={s}>{s}</li>)}</ul>
      </div>
    </li>
  );
}

export function TeamCards() {
  return <ul className="rv-cards rv-n4">{TEAM.map((m, i) => <Card key={m.name} m={m} i={i} />)}</ul>;
}
