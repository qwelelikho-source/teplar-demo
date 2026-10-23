"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, type FormEvent } from "react";
import "./teplar.css";

const U = "https://teplarclean.co.za/wp-content/uploads/";
const EMAIL = "info@teplarclean.co.za";
const PHONE = "0696109378";

const services = [
  { i: "home", t: "Residential Cleaning", d: "Regular weekly, bi-weekly or monthly cleaning tailored to your lifestyle.", h: "residential-cleaning-service/" },
  { i: "building", t: "Commercial & Office", d: "A clean, healthy workplace that makes a positive impression.", h: "commercial-cleaning-services/" },
  { i: "sparkle", t: "Deep Cleaning", d: "A thorough top-to-bottom clean, removing built-up dirt, dust and grease.", h: "deep-house-cleaning/" },
  { i: "box", t: "Move-In & Move-Out", d: "Leave a property spotless, or prepare a new home for a fresh start.", h: "move-in-move-out-cleaning/" },
  { i: "key", t: "Airbnb Cleaning", d: "Fast turnover cleaning that helps hosts keep guest-ready properties.", h: "teplarclean-cleaning-services-in-cape-town/" },
  { i: "wrench", t: "Post-Construction", d: "Removes construction dust, debris and residue from finished spaces.", h: "post-construction-cleaning/" },
];

const work = [
  ["2026/06/WhatsApp-Image-2026-06-19-at-10.39.27-AM.jpeg", "5-Bedroom Airbnb Deep Clean, Camps Bay"],
  ["2026/06/WhatsApp-Image-2026-06-19-at-10.39.35-AM.jpeg", "Student Accommodation Cleaning, Stellenbosch"],
  ["2026/07/IMG_3262.jpg", "3-Bedroom Move-In Cleaning, Sandown"],
  ["2026/06/WhatsApp-Image-2026-01-14-at-14.48.36-1.jpeg", "2-Bedroom Deep Cleaning, Tygervalley"],
  ["2025/11/WhatsApp-Image-2025-09-14-at-11.02.26-1-1.jpeg", "2-Bedroom Deep Cleaning, Milnerton"],
  ["2026/06/IMG_3925.jpg", "7-Bedroom Airbnb Deep Cleaning, Wemmershoek"],
];

const areas: Record<string, string[]> = {
  "City Bowl & Atlantic Seaboard": ["Cape Town CBD", "V&A Waterfront", "Gardens", "Tamboerskloof", "Bantry Bay", "Clifton", "Camps Bay", "Sea Point", "Woodstock", "Observatory"],
  "Southern Suburbs": ["Claremont", "Rondebosch", "Kenilworth", "Constantia"],
  "Northern Suburbs & West Coast": ["Blouberg", "Bloubergstrand", "Table View", "Sandown", "Parklands", "Milnerton", "Century City", "Bellville", "Durbanville"],
  "Winelands & Helderberg": ["Stellenbosch", "Somerset West", "Paarl", "Franschhoek"],
};

const pkgs = [
  { n: "Basic", p: "R1,400", inc: ["4 visits a month", "1 bedroom cleaning", "Laundry (wash and iron)"] },
  { n: "Standard", p: "R1,600", pop: true, inc: ["4 visits a month", "2 bedrooms cleaning", "Laundry (wash and iron)"] },
  { n: "Premium", p: "R1,800", inc: ["4 visits a month", "3 bedrooms cleaning", "Laundry (wash and iron)"] },
];

const faqs = [
  ["What cleaning services does Teplar offer?", "Residential, commercial and office, deep cleaning, Airbnb, move-in and move-out, and post-construction cleaning, as listed on the current website."],
  ["Which areas do you cover?", "See the service areas above. If your suburb isn't listed, contact Teplar and they'll confirm whether they can assist."],
  ["How much does cleaning cost?", "Pricing depends on property size, type of cleaning and condition of the space. Request a free quote for a tailored price."],
  ["Do you bring your own equipment and products?", "The current site says yes, at additional cost. [Confirm details with Teplar]"],
  ["Do you offer Airbnb turnover cleaning?", "Yes, Airbnb and short-term rental cleaning is listed as a service. [Confirm exact turnover inclusions with Teplar]"],
  ["How do I book?", "Use the quote form, or contact Teplar by phone, WhatsApp or email. [Confirm scheduling process with Teplar]"],
];

const paths: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  building: "M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 10h5a1 1 0 0 1 1 1v10M2 21h20M8 8h2M8 12h2M8 16h2",
  sparkle: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z",
  box: "M21 8l-9-5-9 5v8l9 5 9-5zM3.3 7.5 12 12l8.7-4.5M12 22V12",
  key: "M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3",
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z",
};
function Icon({ n }: { n: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[n]} /></svg>
  );
}

type Errs = Partial<Record<"name" | "contact" | "service" | "area", string>>;

export default function Home() {
  const [open, setOpen] = useState(false);
  const [errs, setErrs] = useState<Errs>({});
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

  const enquire = (p: string) => {
    setMsg(`I'd like to enquire about the ${p} recurring package.`);
    setDone(false);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const c = v("contact");
    const x: Errs = {};
    if (v("name").length < 2) x.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) && c.replace(/[^\d]/g, "").length < 9) x.contact = "Enter a valid phone number or email.";
    if (!v("service")) x.service = "Please choose a service.";
    if (!v("area")) x.area = "Please choose an area.";
    setErrs(x);
    if (!Object.keys(x).length) setDone(true); // demo only: no backend configured
  };

  const nav = [["Home", "#home"], ["Services", "#services"], ["About", "#about"], ["Service Areas", "#areas"], ["Contact", "#quote"]];

  return (
    <div className="tp" id="home">
      <header className="nav"><div className="wrap">
        <a href="#home" className="logo">Teplar<b>.</b> Cleaning</a>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        <nav className={"links" + (open ? " open" : "")} onClick={() => setOpen(false)}>
          {nav.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
          <a className="btn p" href="#quote">Get a Free Quote</a>
        </nav>
      </div></header>

      <section className="hero"><div className="wrap">
        <div>
          <span className="badge">Cleaning services across Cape Town</span>
          <h1>Professional Cleaning. <em>Exceptional Results.</em></h1>
          <p>Residential, commercial, Airbnb, deep cleaning and move-in/move-out services across Cape Town and the Winelands. Request a free, no-obligation quote today.</p>
          <div className="row"><a className="btn gold" href="#quote">Request a Free Quote</a><a className="btn ghost" href="#services">Explore Our Services</a></div>
        </div>
        <div className="heroimg"><img src={U + "2026/06/WhatsApp-Image-2026-06-19-at-10.39.27-AM-768x768.jpeg"} alt="Cleaned property by Teplar Cleaning Services" /><div className="float"><i><Icon n="sparkle" /></i><span><b>Free, no-obligation quotes</b>Tailored to your property</span></div></div>
      </div></section>

      <section className="sec" id="about"><div className="wrap">
        <span className="eyebrow">Why Teplar</span><h2>Reliable cleaning for homes and businesses</h2>
        <p className="lead">Flexible scheduling, customised cleaning plans and eco-friendly products, as described on Teplar&apos;s current website.</p>
        <div className="grid g4">
          {[["home", "Residential", "Regular and once-off home cleaning."], ["building", "Commercial", "Offices, retail, hospitality and more."], ["sparkle", "Deep Cleaning", "Thorough, top-to-bottom cleans."], ["box", "Move-In / Move-Out", "Fresh starts for every property."]].map(([i, t, d]) =>
            <div className="card" key={t}><div className="ico"><Icon n={i} /></div><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </div></section>

      <section className="sec alt" id="services"><div className="wrap">
        <span className="eyebrow">Our Services</span><h2>Cleaning tailored to your space</h2>
        <div className="grid g3">
          {services.map(s => <div className="card" key={s.t}><div className="ico"><Icon n={s.i} /></div><h3>{s.t}</h3><p>{s.d}</p>
            <a className="more" href="#quote">Get a quote →</a> · <a className="more" href={"https://teplarclean.co.za/" + s.h} target="_blank" rel="noreferrer">Details</a></div>)}
        </div>
      </div></section>

      <section className="sec"><div className="wrap">
        <span className="eyebrow">Portfolio</span><h2>Check out our work</h2>
        <div className="gal">{work.map(([s, c]) => <figure key={s}><img loading="lazy" src={U + s} alt={c} /><figcaption>{c}</figcaption></figure>)}</div>
        <p className="note">Concept note: project images and titles are taken from Teplar&apos;s current website for this private demo. Replace with approved originals before any launch.</p>
      </div></section>

      <section className="sec alt" id="areas"><div className="wrap">
        <span className="eyebrow">Service Areas</span><h2>Where we clean</h2>
        <div className="grid g2">{Object.entries(areas).map(([g, l]) =>
          <div className="card" key={g}><h3>{g}</h3><div className="chips">{l.map(a => <span key={a}>{a}</span>)}</div></div>)}</div>
        <p className="note">Not listed? Contact Teplar to confirm coverage.</p>
      </div></section>

      <section className="sec" id="packages"><div className="wrap">
        <span className="eyebrow">Recurring Cleaning</span><h2>Compare monthly packages</h2>
        <p className="lead">Existing advertised prices, shown for demonstration purposes.</p>
        <div className="grid g3">{pkgs.map(p =>
          <div className={"card" + (p.pop ? " pop" : "")} key={p.n}><h3>{p.n}</h3>
            <div className="price">From {p.p}<small> / month</small></div>
            <ul>{p.inc.map(i => <li key={i}>{i}</li>)}</ul>
            <p className="conf">Confirm package inclusions</p>
            <button className="btn p" onClick={() => enquire(p.n)}>Enquire about {p.n}</button></div>)}</div>
      </div></section>

      <section className="sec alt" id="quote"><div className="wrap" style={{ maxWidth: 820 }}>
        <span className="eyebrow">Free Quote</span><h2>Request your free quote</h2>
        {done ? <div className="ok" role="status"><h3>Thanks, your form is valid</h3>
          <p>This is a concept demo with no backend connected, so <b>no enquiry has been sent</b>. To reach Teplar, email {EMAIL} or call {PHONE}.</p></div> :
        <form onSubmit={submit} noValidate>
          <label>Name<input name="name" autoComplete="name" />{errs.name && <span className="err">{errs.name}</span>}</label>
          <label>Phone or email<input name="contact" autoComplete="email" />{errs.contact && <span className="err">{errs.contact}</span>}</label>
          <label>Service required<select name="service" defaultValue=""><option value="" disabled>Select…</option>{services.map(s => <option key={s.t}>{s.t}</option>)}</select>{errs.service && <span className="err">{errs.service}</span>}</label>
          <label>Area<select name="area" defaultValue=""><option value="" disabled>Select…</option>{Object.values(areas).flat().map(a => <option key={a}>{a}</option>)}</select>{errs.area && <span className="err">{errs.area}</span>}</label>
          <label className="full">Message<textarea name="message" rows={4} value={msg} onChange={e => setMsg(e.target.value)} /></label>
          <button className="btn p full" type="submit">Request a Free Quote</button>
        </form>}
      </div></section>

      <section className="sec"><div className="wrap" style={{ maxWidth: 820 }}>
        <span className="eyebrow">FAQ</span><h2>Frequently asked questions</h2>
        <div style={{ marginTop: 30 }}>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </div></section>

      <footer className="foot"><div className="wrap">
        <div>
          <div className="logo" style={{ color: "#fff" }}>Teplar<b>.</b> Cleaning</div>
          <p>Let us do the dirty work.</p><a className="btn p" href="#quote" style={{ background: "var(--gold)", borderColor: "var(--gold)", display: "inline-block" }}>Get a Free Quote</a>
        </div>
        <div><h4>Navigate</h4>{nav.map(([l, h]) => <a key={l} href={h}>{l}</a>)}</div>
        <div><h4>Services</h4>{services.slice(0, 5).map(s => <a key={s.t} href="#services">{s.t}</a>)}</div>
        <div><h4>Contact</h4><a href={"mailto:" + EMAIL}>{EMAIL}</a><a href={"tel:" + PHONE}>{PHONE}</a><a href="#areas">Cape Town, 7580</a></div>
        <p className="credit" style={{ gridColumn: "1/-1" }}>Website concept by LocalLaunch Digital Web Studio. Private sales concept, not an official Teplar website.</p>
      </div></footer>
    </div>
  );
}
