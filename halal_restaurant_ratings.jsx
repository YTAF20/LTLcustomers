import { useState, useMemo, useRef } from "react";

const raw = [
  ["El Halal Amigos", "Mexican", "San Jose / Fremont", 95, 90, 80, "#1 voted halal in Bay Area, great food — but their polished IG/YouTube means less room for us to add value digitally"],
  ["Zareen's", "Indian/Pakistani", "Mountain View / Palo Alto", 95, 88, 78, "Top 3 voted, multiple SB locations — strong existing brand means digital gap is low"],
  ["Kinara", "Indian Fusion", "SF / South Bay", 85, 82, 88, "#2 voted Bay Area halal — already strong online; limited digital gap"],
  ["Arya Steakhouse", "Persian", "Palo Alto", 95, 80, 82, "South Bay fine dining, good Yelp — moderate social presence, some room to help"],
  ["Maya's Halal Taqueria", "Mexican", "Bay Area", 75, 80, 88, "Top 5 voted, active social — digital gap is low"],
  ["Mirchi's / Mirchi Cafe", "Indian", "Fremont / South Bay", 88, 78, 80, "Strong Fremont presence, decent social — moderate gap"],
  ["Kusan Uyghur Cuisine", "Uyghur", "San Jose", 95, 42, 76, "SJ-based, great food, barely any social media or web presence — prime target"],
  ["Gulzaar", "Afghan/Pakistani/ME", "West San Jose", 95, 38, 85, "5-star Yelp, SJ-based, minimal social footprint — excellent candidate"],
  ["Chikin Drip", "American/Halal", "South Bay", 82, 78, 75, "Top 6 voted, modern brand — already has social presence"],
  ["Port of Peri Peri", "Portuguese Fusion", "SF / Fremont / SJ", 85, 80, 72, "Multi-location, active social — limited digital gap"],
  ["Darda Seafood", "Chinese/Halal", "Milpitas", 95, 40, 78, "Prime Milpitas location, high reviews, very weak social media — great opportunity"],
  ["iniBurger", "American/Burgers", "Bay Area", 72, 76, 74, "Chain presence with decent social — limited room to help"],
  ["Halal Wings Plus", "American/Wings", "Bay Area", 72, 45, 78, "Popular niche, limited digital footprint — solid opportunity"],
  ["Lados", "Mediterranean", "Bay Area", 70, 72, 76, "Active IG, decent presence — moderate gap only"],
  ["Pakwan", "Pakistani/Indian", "SF / Fremont / Hayward", 70, 55, 80, "Established multi-location chain, has website — moderate digital gap but strong performance"],
  ["Cracked & Battered", "American", "Bay Area", 68, 72, 74, "Active social @cracked_and_battered — limited gap"],
  ["Sala Thai 2", "Thai", "Fremont", 82, 35, 72, "Fremont-based, well-reviewed, almost no web/social — strong candidate"],
  ["De Afghanan", "Afghan", "Fremont / SF", 78, 38, 72, "Top 19 voted, Fremont location, very weak digital — good target"],
  ["Wayback Burger", "American/Burgers", "Milpitas", 90, 72, 58, "National chain — handles its own marketing, limited opportunity"],
  ["Kabab & Curry", "Indian", "Santa Clara", 95, 40, 68, "Michelin-noted, prime SB location, minimal social — strong candidate"],
  ["Burma Bistro", "Burmese", "Bay Area", 65, 35, 72, "Unique niche, very limited digital — good opportunity if SB-adjacent"],
  ["Charminar Express", "Indian", "Sunnyvale / Fremont", 88, 35, 68, "Multiple SB locations, almost no social media — high opportunity"],
  ["Jood", "Mediterranean", "Bay Area", 68, 38, 70, "Solid reviews, weak online presence — moderate-high gap"],
  ["Momo Grill / Urban Momo", "Nepalese", "Bay Area", 68, 30, 68, "Growing niche, very limited web/social — digital gap is large"],
  ["Dish n Dash", "Mediterranean", "Sunnyvale / Campbell", 92, 45, 60, "Multiple SB locations, minimal social — solid target"],
  ["Maykadeh", "Persian", "SF", 30, 55, 72, "Great restaurant but SF-only — proximity kills the score"],
  ["Habibi's / Habibiz", "Chinese/Fusion Halal", "Fremont / Newark", 78, 50, 64, "Trending on TikTok — some social presence but inconsistent; moderate gap"],
  ["Turkish Kitchen", "Turkish", "SF", 28, 68, 70, "SF-only, good social — proximity too low"],
  ["Falafel Corner", "Mediterranean", "SF", 25, 42, 66, "SF-only, weak digital, but location makes it low priority"],
  ["Curry Up Now", "Indian Fusion", "Multi-location", 80, 78, 58, "Large chain social following — limited digital gap for us"],
  ["The Halal Guys", "American/Mediterranean", "Multi-location", 75, 80, 55, "National chain with marketing team — not our target"],
  ["Angry Chickz", "American/Chicken", "Bay Area", 68, 70, 60, "Chain concept, moderate social — limited gap"],
  ["Ijava Cafe", "Café/Bistro", "San Jose", 95, 38, 62, "SJ-based, featured in guides, very weak social/web — prime target"],
  ["Mingalaba", "Burmese", "Burlingame", 55, 40, 66, "Peninsula location, weak digital — moderate opportunity"],
  ["Bongo's", "American", "SF", 20, 45, 62, "SF-only — proximity makes this low priority"],
  ["Shalimar", "Pakistani/Indian", "SF", 20, 35, 65, "SF institution, minimal web — but location is far from SB"],
  ["Aicha", "Moroccan", "SF", 18, 28, 58, "SF-only, almost no digital presence — digital gap is there but location isn't"],
  ["Mourad", "Moroccan Fine Dining", "SF", 18, 58, 62, "High-end SF, partial halal — not our target"],
  ["Dalida", "Mediterranean Fine Dining", "SF", 18, 60, 58, "SF fine dining, partial halal — not aligned"],
  ["Mathilde", "French", "SF", 15, 45, 55, "Steak-only halal, SF — very low priority"],
  ["Piccolo", "Italian", "SF", 15, 42, 52, "Partial halal, SF fine dining — not aligned"],
  ["Kabul Waterfront", "Afghan", "SF", 18, 32, 60, "Partial halal, SF — location limits opportunity"],
  ["Tarim Garden / Tarim Global", "Uyghur", "Bay Area", 60, 22, 60, "Niche cuisine, barely any web/social — decent digital gap, moderate proximity"],
  ["Krispy Krunchy", "Fried Chicken", "Multi", 65, 30, 48, "Gas station chain — not a restaurant partner target"],
  ["Kabob Trolley", "Mediterranean", "Bay Area", 68, 25, 62, "Food truck model, very weak digital — high gap but performance is modest"],
  ["Falafel Fremont", "Mediterranean", "Fremont", 82, 22, 65, "Fremont-based, almost zero digital — strong candidate"],
  ["Fremont Kabob", "Afghan/Kabob", "Fremont", 82, 20, 62, "Fremont location, minimal online presence — high gap"],
  ["Afghan Awasana", "Afghan", "Bay Area", 72, 18, 60, "Very weak digital, decent performance — solid target"],
  ["Mom's Biryani", "Pakistani", "Bay Area", 72, 28, 68, "Loyal following, weak social — good opportunity"],
  ["Bismillah", "Pakistani/Indian", "Fremont", 82, 22, 64, "Fremont-based, nearly no web/social — strong candidate"],
];

const tierConfig = {
  1: { label: "High Opportunity", color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.4)" },
  2: { label: "Medium Opportunity", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.4)" },
  3: { label: "Lower Opportunity", color: "#ef4444", bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.35)" },
};

function computeRestaurant({ id, name, cuisine, location, proximity, webStrength, performance, notes }) {
  const digitalGap = 100 - webStrength;
  const score = Math.round((proximity * 0.35) + (performance * 0.30) + (digitalGap * 0.35));
  const tier = score >= 72 ? 1 : score >= 55 ? 2 : 3;
  return { id, name, cuisine, location, proximity, webStrength, digitalGap, performance, score, notes, tier };
}

let _uid = 0;
const initialRestaurants = raw.map(([name, cuisine, location, proximity, webStrength, performance, notes]) =>
  computeRestaurant({ id: ++_uid, name, cuisine, location, proximity, webStrength, performance, notes })
);

function ScoreBar({ value, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 6, width: "100%", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function ScorePill({ value, color }) {
  return (
    <span style={{
      display: "inline-block", background: color, color: "#fff",
      fontFamily: "'Courier Prime', monospace", fontWeight: 700, fontSize: 13,
      borderRadius: 6, padding: "2px 9px", letterSpacing: 1, minWidth: 40, textAlign: "center"
    }}>{value}%</span>
  );
}

function SliderField({ label, value, onChange, hint, color }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <label style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{label}</label>
        <span style={{
          fontFamily: "'Courier Prime', monospace", fontSize: 14, fontWeight: 700,
          color: color, background: "rgba(255,255,255,0.08)", padding: "1px 8px", borderRadius: 4
        }}>{value} / 10</span>
      </div>
      {hint && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 6, lineHeight: 1.4 }}>{hint}</div>}
      <input
        type="range" min="1" max="10" value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: color, cursor: "pointer", display: "block" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>
        <span>1</span><span>5</span><span>10</span>
      </div>
    </div>
  );
}

function RestaurantModal({ initial, onSave, onClose }) {
  const toForm = r => r ? {
    name: r.name, cuisine: r.cuisine, location: r.location,
    proximity: Math.max(1, Math.min(10, Math.round(r.proximity / 10))),
    webStrength: Math.max(1, Math.min(10, Math.round(r.webStrength / 10))),
    performance: Math.max(1, Math.min(10, Math.round(r.performance / 10))),
    notes: r.notes || ""
  } : { name: "", cuisine: "", location: "", proximity: 5, webStrength: 5, performance: 5, notes: "" };

  const [form, setForm] = useState(() => toForm(initial));
  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  const setStr = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const preview = computeRestaurant({
    id: 0, name: form.name, cuisine: form.cuisine, location: form.location,
    proximity: form.proximity * 10, webStrength: form.webStrength * 10,
    performance: form.performance * 10, notes: form.notes
  });

  const tc = tierConfig[preview.tier];
  const valid = form.name.trim().length > 0;

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8, color: "#e8e8e8", padding: "8px 12px", fontSize: 13, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit"
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14,
          padding: "28px 28px 24px", width: "100%", maxWidth: 520,
          maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#f0f0f0" }}>
            {initial ? "Edit Restaurant" : "Add Restaurant"}
          </h2>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.4)",
            cursor: "pointer", fontSize: 20, lineHeight: 1, padding: "0 4px"
          }}>&#x2715;</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 4 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 4 }}>Restaurant Name *</label>
            <input value={form.name} onChange={setStr("name")} placeholder="e.g. Gulzaar" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 4 }}>Cuisine</label>
            <input value={form.cuisine} onChange={setStr("cuisine")} placeholder="e.g. Afghan/Pakistani" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 4 }}>Location</label>
            <input value={form.location} onChange={setStr("location")} placeholder="e.g. West San Jose" style={inputStyle} />
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "20px 0 18px" }} />

        <SliderField
          label="South Bay Proximity"
          value={form.proximity}
          onChange={set("proximity")}
          hint="How close is this restaurant to South Bay? (1 = far away, 10 = core South Bay)"
          color="#60a5fa"
        />
        <SliderField
          label="Web / Social Presence"
          value={form.webStrength}
          onChange={set("webStrength")}
          hint="How strong is their existing digital presence? Lower = bigger opportunity for us"
          color="#fb923c"
        />
        <SliderField
          label="Business Performance"
          value={form.performance}
          onChange={set("performance")}
          hint="How well-reviewed and established is this business? (Yelp, Google, foot traffic)"
          color="#a78bfa"
        />

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 4 }}>Analysis / Notes</label>
          <textarea
            value={form.notes} onChange={setStr("notes")}
            placeholder="Any notes about this restaurant..."
            rows={3} style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{
          background: "rgba(255,255,255,0.04)", border: `1px solid ${tc.border}`,
          borderRadius: 10, padding: "12px 16px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap"
        }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>Score Preview</div>
            <ScorePill value={preview.score} color={tc.color} />
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            <span style={{ color: "#60a5fa" }}>Proximity {preview.proximity}</span>
            {" "}&#xD7;35% + <span style={{ color: "#a78bfa" }}>Perf {preview.performance}</span>
            {" "}&#xD7;30% + <span style={{ color: "#fb923c" }}>Gap {preview.digitalGap}</span>
            {" "}&#xD7;35%
            <br />
            <span style={{ color: tc.color, fontWeight: 600 }}>{tc.label}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, color: "rgba(255,255,255,0.6)", padding: "9px 20px", fontSize: 13, cursor: "pointer"
          }}>Cancel</button>
          <button
            onClick={() => {
              if (!valid) return;
              onSave({
                name: form.name.trim(), cuisine: form.cuisine.trim(), location: form.location.trim(),
                proximity: form.proximity * 10, webStrength: form.webStrength * 10,
                performance: form.performance * 10, notes: form.notes.trim()
              });
            }}
            disabled={!valid}
            style={{
              background: valid ? "#22c55e" : "rgba(34,197,94,0.3)", border: "none", borderRadius: 8,
              color: "#fff", padding: "9px 24px", fontSize: 13, fontWeight: 600,
              cursor: valid ? "pointer" : "not-allowed"
            }}
          >{initial ? "Save Changes" : "Add Restaurant"}</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [restaurantList, setRestaurantList] = useState(initialRestaurants);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [expandedId, setExpandedId] = useState(null);
  const [modal, setModal] = useState(null);
  const uidRef = useRef(_uid);

  const filtered = useMemo(() => {
    let list = [...restaurantList];
    if (filter !== "all") list = list.filter(r => r.tier === Number(filter));
    if (search) list = list.filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase())
    );
    list.sort((a, b) => b[sortBy] - a[sortBy]);
    return list;
  }, [restaurantList, filter, search, sortBy]);

  const avg = restaurantList.length ? Math.round(restaurantList.reduce((s, r) => s + r.score, 0) / restaurantList.length) : 0;
  const highCount = restaurantList.filter(r => r.tier === 1).length;
  const medCount = restaurantList.filter(r => r.tier === 2).length;
  const lowCount = restaurantList.filter(r => r.tier === 3).length;

  const handleSave = (data) => {
    if (modal.mode === "add") {
      setRestaurantList(prev => [...prev, computeRestaurant({ id: ++uidRef.current, ...data })]);
    } else {
      const updated = computeRestaurant({ id: modal.restaurant.id, ...data });
      setRestaurantList(prev => prev.map(r => r.id === updated.id ? updated : r));
    }
    setModal(null);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setRestaurantList(prev => prev.filter(r => r.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleEdit = (restaurant, e) => {
    e.stopPropagation();
    setModal({ mode: "edit", restaurant });
  };

  const btnBase = {
    border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600,
    padding: "4px 10px", cursor: "pointer", letterSpacing: 0.3
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f14", fontFamily: "'DM Sans', sans-serif", color: "#e8e8e8", padding: "0 0 60px 0" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{
        background: "linear-gradient(135deg, #0b0f14 0%, #111827 50%, #0f1a12 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "40px 32px 32px", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 300, height: 300,
          background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)", pointerEvents: "none"
        }} />
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 11, letterSpacing: 3, color: "#22c55e", fontWeight: 600, textTransform: "uppercase" }}>Bay Area Halal</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>///</span>
            <span style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Outreach Opportunity Index</span>
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 600, margin: "0 0 6px", letterSpacing: -0.5, lineHeight: 1.2 }}>
            Restaurant Opportunity Ratings
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, margin: "0 0 28px", maxWidth: 580, lineHeight: 1.6 }}>
            Scored on <strong style={{ color: "rgba(255,255,255,0.65)" }}>South Bay proximity</strong>,{" "}
            <strong style={{ color: "rgba(255,255,255,0.65)" }}>business performance and reviews</strong>, and{" "}
            <strong style={{ color: "rgba(255,255,255,0.65)" }}>digital presence</strong> (website + social media).
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, maxWidth: 700 }}>
            {[
              { label: "Overall Avg", value: `${avg}%`, sub: "across all restaurants", accent: "#60a5fa" },
              { label: "High Opportunity", value: highCount, sub: "restaurants (75%+)", accent: "#22c55e" },
              { label: "Medium Opp.", value: medCount, sub: "restaurants (55–74%)", accent: "#f59e0b" },
              { label: "Lower Opp.", value: lowCount, sub: "restaurants (<55%)", accent: "#ef4444" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 22, fontFamily: "'Courier Prime', monospace", fontWeight: 700, color: s.accent }}>{s.value}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{s.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "24px auto 0", padding: "0 32px" }}>
        <div style={{
          background: "rgba(96,165,250,0.07)", border: "1px solid rgba(96,165,250,0.2)",
          borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6
        }}>
          <strong style={{ color: "rgba(96,165,250,0.9)" }}>Methodology:</strong> Each restaurant scored across 3 weighted dimensions —{" "}
          <em>South Bay proximity</em> (35%), <em>business performance / Yelp reviews</em> (30%), and{" "}
          <em>digital gap</em> (35%). DIGITAL GAP IS INVERTED — weak social/web = higher score, because that is where we add value.
          Higher scores = stronger candidate for outreach and support services. Scored based on publicly available data as of April 2026.
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "20px auto 0", padding: "0 32px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search restaurant, cuisine, location..."
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8, color: "#e8e8e8", padding: "8px 14px", fontSize: 13, outline: "none",
              flex: "1 1 220px", minWidth: 200
            }}
          />
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{
            background: "#181f2a", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, color: "#e8e8e8", padding: "8px 12px", fontSize: 13, outline: "none"
          }}>
            <option value="all">All Tiers</option>
            <option value="1">High Opportunity</option>
            <option value="2">Medium Opportunity</option>
            <option value="3">Lower Opportunity</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
            background: "#181f2a", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, color: "#e8e8e8", padding: "8px 12px", fontSize: 13, outline: "none"
          }}>
            <option value="score">Sort: Overall Score</option>
            <option value="proximity">Sort: South Bay Proximity</option>
            <option value="digitalGap">Sort: Digital Gap</option>
            <option value="performance">Sort: Performance</option>
          </select>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>
            {filtered.length} restaurants
          </span>
          <button
            onClick={() => setModal({ mode: "add" })}
            style={{
              ...btnBase, background: "#22c55e", color: "#fff",
              padding: "8px 16px", fontSize: 13, marginLeft: "auto", whiteSpace: "nowrap"
            }}
          >+ Add Restaurant</button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "16px auto 0", padding: "0 32px", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((r) => {
          const tc = tierConfig[r.tier];
          const isExpanded = expandedId === r.id;
          return (
            <div
              key={r.id}
              onClick={() => setExpandedId(isExpanded ? null : r.id)}
              style={{
                background: isExpanded ? tc.bg : "rgba(255,255,255,0.03)",
                border: `1px solid ${isExpanded ? tc.border : "rgba(255,255,255,0.07)"}`,
                borderRadius: 10, padding: "14px 18px", cursor: "pointer", transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 180px", minWidth: 160 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f0f0f0", marginBottom: 2 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{r.cuisine} · {r.location}</div>
                </div>

                <div style={{ flex: "1 1 200px", minWidth: 160 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", width: 72 }}>South Bay</span>
                      <div style={{ flex: 1 }}><ScoreBar value={r.proximity} color="#60a5fa" /></div>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", width: 28, textAlign: "right" }}>{r.proximity}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", width: 72 }}>Performance</span>
                      <div style={{ flex: 1 }}><ScoreBar value={r.performance} color="#a78bfa" /></div>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", width: 28, textAlign: "right" }}>{r.performance}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, color: "#fb923c", width: 72 }}>Gap &#x2191;</span>
                      <div style={{ flex: 1 }}><ScoreBar value={r.digitalGap} color="#fb923c" /></div>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", width: 28, textAlign: "right" }}>{r.digitalGap}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 64 }}>
                  <ScorePill value={r.score} color={tc.color} />
                  <span style={{ fontSize: 10, color: tc.color, fontWeight: 600 }}>{tc.label.split(" ")[0]}</span>
                </div>

                <div style={{ display: "flex", gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <button
                    onClick={e => handleEdit(r, e)}
                    style={{ ...btnBase, background: "rgba(96,165,250,0.15)", color: "#60a5fa" }}
                  >Edit</button>
                  <button
                    onClick={e => handleDelete(r.id, e)}
                    style={{ ...btnBase, background: "rgba(239,68,68,0.12)", color: "#ef4444" }}
                  >Delete</button>
                </div>
              </div>

              {isExpanded && (
                <div style={{
                  marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)",
                  fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6
                }}>
                  <strong style={{ color: "rgba(255,255,255,0.75)" }}>Analysis: </strong>{r.notes || "No notes added."}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 900, margin: "28px auto 0", padding: "0 32px" }}>
        <div style={{
          display: "flex", gap: 20, flexWrap: "wrap", padding: "14px 18px",
          background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)"
        }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Score key:</span>
          <span style={{ fontSize: 11, color: "#60a5fa" }}>&#x25A0; South Bay Proximity</span>
          <span style={{ fontSize: 11, color: "#a78bfa" }}>&#x25A0; Business Performance</span>
          <span style={{ fontSize: 11, color: "#fb923c" }}>&#x25A0; Digital Gap &#x2191; (weak presence = higher score)</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>Click any row to expand details</span>
        </div>
      </div>

      {modal && (
        <RestaurantModal
          initial={modal.mode === "edit" ? modal.restaurant : null}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
