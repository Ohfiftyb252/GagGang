import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Copy, Heart, Search, Share2, Shuffle, Star, X, Clock3, Flame,
  Sparkles, Skull, Ghost, Smile, Angry, PawPrint, Coins, Music2
} from "lucide-react";
import "./styles.css";

type Category =
  | "ALL" | "LENNY" | "RAGE" | "SUS" | "CUTE" | "CHAOS"
  | "ANIMAL" | "WEIRD" | "MONEY" | "DANCE" | "REACTION" | "LEGEND";

type Gag = {
  id: number;
  text: string;
  category: Exclude<Category, "ALL">;
  tags: string[];
};

const gags: Gag[] = [
  {id:1,text:"( ͡° ͜ʖ ͡°)",category:"LENNY",tags:["lenny","classic","sus"]},
  {id:2,text:"¯\\\\_(ツ)_/¯",category:"REACTION",tags:["whatever","shrug"]},
  {id:3,text:"ಠ_ಠ",category:"REACTION",tags:["look","judging"]},
  {id:4,text:"(¬‿¬)",category:"SUS",tags:["smirk","sneaky"]},
  {id:5,text:"( ͡ᵔ ͜ʖ ͡ᵔ )",category:"SUS",tags:["lenny","happy"]},
  {id:6,text:"( ͡°╭͜ʖ╮͡° )",category:"LENNY",tags:["lenny"]},
  {id:7,text:"(͡ ͡° ͜ つ ͡͡°)",category:"LENNY",tags:["lenny"]},
  {id:8,text:"( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",category:"LEGEND",tags:["lenny","squad"]},
  {id:9,text:"(ノಠ益ಠ)ノ彡┻━┻",category:"RAGE",tags:["table","angry"]},
  {id:10,text:"┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻",category:"RAGE",tags:["table","rage"]},
  {id:11,text:"(╯°□°）╯︵ ┻━┻",category:"RAGE",tags:["table","angry"]},
  {id:12,text:"┬──┬ ノ( ゜-゜ノ)",category:"RAGE",tags:["fix","table"]},
  {id:13,text:"(ง'̀-'́)ง",category:"RAGE",tags:["fight","boxing"]},
  {id:14,text:"Ლ(ಠ益ಠᲚ)",category:"RAGE",tags:["angry"]},
  {id:15,text:"｡゜(｀Д´)゜｡",category:"RAGE",tags:["cry","angry"]},
  {id:16,text:"(ಥ﹏ಥ)",category:"REACTION",tags:["cry","sad"]},
  {id:17,text:"(;´༎ຶД༎ຶ`)",category:"REACTION",tags:["cry","dramatic"]},
  {id:18,text:"ಥ_ಥ",category:"REACTION",tags:["cry","sad"]},
  {id:19,text:"ಠ_ಥ",category:"REACTION",tags:["sad","look"]},
  {id:20,text:"(•_•) ( •_•)>⌐■-■ (⌐■_■)",category:"LEGEND",tags:["deal","cool"]},
  {id:21,text:"ヾ(⌐■_■)ノ♪",category:"DANCE",tags:["music","cool"]},
  {id:22,text:"♪~ ᕕ(ᐛ)ᕗ",category:"DANCE",tags:["walk","music"]},
  {id:23,text:"~(˘▾˘~)",category:"DANCE",tags:["dance"]},
  {id:24,text:"(~˘▾˘)~",category:"DANCE",tags:["dance"]},
  {id:25,text:"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",category:"CUTE",tags:["sparkle","happy"]},
  {id:26,text:"(づ｡◕‿‿◕｡)づ",category:"CUTE",tags:["hug","love"]},
  {id:27,text:"༼ つ ◕_◕ ༽つ",category:"CUTE",tags:["give","hug"]},
  {id:28,text:"༼ つ ಥ_ಥ ༽つ",category:"CUTE",tags:["hug","sad"]},
  {id:29,text:"(づ￣ ³￣)づ",category:"CUTE",tags:["kiss","hug"]},
  {id:30,text:"♥‿♥",category:"CUTE",tags:["love"]},
  {id:31,text:"(｡◕‿‿◕｡)",category:"CUTE",tags:["cute"]},
  {id:32,text:"(｡◕‿◕｡)",category:"CUTE",tags:["cute"]},
  {id:33,text:"(◕‿◕✿)",category:"CUTE",tags:["flower","cute"]},
  {id:34,text:"ʕ•ᴥ•ʔ",category:"ANIMAL",tags:["bear"]},
  {id:35,text:"(ᵔᴥᵔ)",category:"ANIMAL",tags:["bear","cute"]},
  {id:36,text:"| (• ◡•)| (❍ᴥ❍ʋ)",category:"ANIMAL",tags:["dog"]},
  {id:37,text:"Ƹ̵̡Ӝ̵̨̄Ʒ",category:"ANIMAL",tags:["butterfly"]},
  {id:38,text:"(._.) ( L: ) ( .-. ) ( :L ) (._.)",category:"ANIMAL",tags:["feet","weird"]},
  {id:39,text:"༼ʘ̚ل͜ʘ̚༽",category:"WEIRD",tags:["cursed","face"]},
  {id:40,text:"༼ ºل͟º ༼ ºل͟º ༼ ºل͟º ༽ ºل͟º ༽ ºل͟º ༽",category:"WEIRD",tags:["cursed","chain"]},
  {id:41,text:"Ლ,ᔑ•ﺪ͟͠•ᔐ.Ლ",category:"WEIRD",tags:["alien","cursed"]},
  {id:42,text:"﴾͡๏̯͡๏﴿ O'RLY?",category:"WEIRD",tags:["orly","classic"]},
  {id:43,text:"( ಠ ͜ʖರೃ)",category:"WEIRD",tags:["cursed","lenny"]},
  {id:44,text:"◔̯◔",category:"WEIRD",tags:["face"]},
  {id:45,text:"◔ ⌣ ◔",category:"WEIRD",tags:["face"]},
  {id:46,text:"☼.☼",category:"WEIRD",tags:["face"]},
  {id:47,text:"ب_ب",category:"WEIRD",tags:["face","deadpan"]},
  {id:48,text:"ʘ‿ʘ",category:"SUS",tags:["eyes","watching"]},
  {id:49,text:"(ʘ‿ʘ)",category:"SUS",tags:["eyes","smirk"]},
  {id:50,text:"ಠ‿↼",category:"SUS",tags:["wink"]},
  {id:51,text:"( ⚆ _ ⚆ )",category:"REACTION",tags:["stare"]},
  {id:52,text:"⚆ _ ⚆",category:"REACTION",tags:["stare"]},
  {id:53,text:"◉_◉",category:"REACTION",tags:["shocked"]},
  {id:54,text:"ಠOಠ",category:"REACTION",tags:["shock"]},
  {id:55,text:"(•Ω•)",category:"REACTION",tags:["confused"]},
  {id:56,text:"(°ロ°)☝",category:"REACTION",tags:["point"]},
  {id:57,text:"☜(˚▽˚)☞",category:"REACTION",tags:["shrug","point"]},
  {id:58,text:"☞ﾟ∀ﾟ)☞",category:"REACTION",tags:["point"]},
  {id:59,text:"☞(ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)",category:"REACTION",tags:["point","squad"]},
  {id:60,text:"┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴",category:"SUS",tags:["watching","lenny"]},
  {id:61,text:"┬┴┬┴┤(･_├┬┴┬┴",category:"SUS",tags:["watching"]},
  {id:62,text:"(ง ͠° ͟ل͜ ͡°)ง",category:"SUS",tags:["fight","lenny"]},
  {id:63,text:"(ง°ل͜°)ง",category:"SUS",tags:["fight","lenny"]},
  {id:64,text:"ヽ༼ຈل͜ຈ༽ﾉ",category:"CHAOS",tags:["raise","chaos"]},
  {id:65,text:"༼ つ ͡° ͜ʖ ͡° ༽つ",category:"SUS",tags:["give","lenny"]},
  {id:66,text:"(͡ ͡° ͜ つ ͡͡°)",category:"SUS",tags:["lenny"]},
  {id:67,text:"¯\\\\(°_O)/¯",category:"REACTION",tags:["shrug","confused"]},
  {id:68,text:"(´・Ω・`)",category:"REACTION",tags:["confused","sad"]},
  {id:69,text:"(´・Ω・)っ由",category:"WEIRD",tags:["offer","random"]},
  {id:70,text:"ಠ~ಠ",category:"SUS",tags:["skeptical"]},
  {id:71,text:"ರ_ರ",category:"REACTION",tags:["look"]},
  {id:72,text:"¬_¬",category:"REACTION",tags:["look","annoyed"]},
  {id:73,text:"(；一_一)",category:"REACTION",tags:["tired"]},
  {id:74,text:"(─‿‿─)",category:"REACTION",tags:["calm"]},
  {id:75,text:"^̮^",category:"CUTE",tags:["happy"]},
  {id:76,text:"^̮^",category:"CUTE",tags:["happy"]},
  {id:77,text:"(~_^)",category:"SUS",tags:["wink"]},
  {id:78,text:"(✿´‿`)",category:"CUTE",tags:["flower","happy"]},
  {id:79,text:"ƪ(˘⌣˘)Ʃ",category:"CUTE",tags:["shrug","happy"]},
  {id:80,text:"(▰˘◡˘▰)",category:"CUTE",tags:["happy"]},
  {id:81,text:"(Ღ˘⌣˘Ღ)",category:"CUTE",tags:["love"]},
  {id:82,text:"[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]",category:"MONEY",tags:["money","five"]},
  {id:83,text:"[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]",category:"MONEY",tags:["money","lenny"]},
  {id:84,text:"[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]",category:"MONEY",tags:["cash"]},
  {id:85,text:"┬─┬ノ( º _ ºノ)",category:"CHAOS",tags:["table","fix"]},
  {id:86,text:"┬─┬﻿ ︵ /(.□. ）",category:"CHAOS",tags:["table"]},
  {id:87,text:"（╯°□°）╯︵( .O.)",category:"CHAOS",tags:["throw","chaos"]},
  {id:88,text:"ᕙ(⇀‸↼‶)ᕗ",category:"CHAOS",tags:["strong","flex"]},
  {id:89,text:"ᕦ(Ò_Óˇ)ᕤ",category:"CHAOS",tags:["strong","flex"]},
  {id:90,text:"☜(⌒▽⌒)☞",category:"DANCE",tags:["happy","dance"]},
  {id:91,text:"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)",category:"LEGEND",tags:["sparkle","squad"]},
  {id:92,text:"/╲/\\╭( ͡° ͡° ͜ʖ ͡° ͡°)╮/\\╱/",category:"LEGEND",tags:["lenny","angel"]},
  {id:93,text:"( ͡° ͜ʖ ͡°)╭∩╮",category:"LEGEND",tags:["lenny","middle"]},
  {id:94,text:"(づ｡◕‿‿◕｡)づ ♥",category:"CUTE",tags:["hug","love"]},
  {id:95,text:"(>人<)",category:"CUTE",tags:["please"]},
  {id:96,text:"٩◔̯◔۶",category:"WEIRD",tags:["arms"]},
  {id:97,text:"≧☉_☉≦",category:"WEIRD",tags:["eyes","shock"]},
  {id:98,text:"(･.◤)",category:"WEIRD",tags:["cursed"]},
  {id:99,text:"(>Ლ)",category:"WEIRD",tags:["cursed"]},
  {id:100,text:"=U",category:"WEIRD",tags:["tiny","weird"]},
  {id:101,text:"( ⚆ _ ⚆ )",category:"REACTION",tags:["stare","blank"]},
  {id:102,text:"(ʘᗩʘ')",category:"REACTION",tags:["shock"]},
  {id:103,text:"☜(⌒▽⌒)☞",category:"CUTE",tags:["happy"]},
  {id:104,text:"(° ͡ ͜ ͡ʖ ͡ °)",category:"LENNY",tags:["lenny","wide"]},
  {id:105,text:"( ﾟヮﾟ)",category:"CUTE",tags:["happy"]},
  {id:106,text:"^̮^  ^̮^  ^̮^",category:"LEGEND",tags:["squad"]},
  {id:107,text:"(•_•) ( •_•)>⌐■-■ (⌐■_■)",category:"LEGEND",tags:["deal","sunglasses"]},
  {id:108,text:"| (• ◡•)| (❍ᴥ❍ʋ)",category:"ANIMAL",tags:["dog","friends"]},
  {id:109,text:"┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴",category:"LEGEND",tags:["lurker","lenny"]},
  {id:110,text:"(ง ͠° ͟ل͜ ͡°)ง  (ง ͠° ͟ل͜ ͡°)ง",category:"CHAOS",tags:["squad","fight"]},
];

const categoryMeta: Record<Category, {label:string; icon: React.ReactNode}> = {
  ALL:{label:"ALL",icon:<Sparkles size={15}/>},
  LENNY:{label:"LENNY",icon:<Ghost size={15}/>},
  RAGE:{label:"RAGE",icon:<Angry size={15}/>},
  SUS:{label:"SUS",icon:<EyeIcon/>},
  CUTE:{label:"CUTE",icon:<Smile size={15}/>},
  CHAOS:{label:"CHAOS",icon:<Skull size={15}/>},
  ANIMAL:{label:"ANIMAL",icon:<PawPrint size={15}/>},
  WEIRD:{label:"WEIRD",icon:<Ghost size={15}/>},
  MONEY:{label:"MONEY",icon:<Coins size={15}/>},
  DANCE:{label:"DANCE",icon:<Music2 size={15}/>},
  REACTION:{label:"REACTION",icon:<Clock3 size={15}/>},
  LEGEND:{label:"LEGENDS",icon:<Flame size={15}/>},
};

function EyeIcon(){ return <span className="eye-icon">◉</span>; }

function App(){
  const [current, setCurrent] = useState<Gag>(gags[0]);
  const [category, setCategory] = useState<Category>("ALL");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>(() => JSON.parse(localStorage.getItem("gaggang-favorites") || "[]"));
  const [recent, setRecent] = useState<number[]>(() => JSON.parse(localStorage.getItem("gaggang-recent") || "[]"));
  const [tab, setTab] = useState<"home"|"favorites"|"recent">("home");
  const [copied, setCopied] = useState(false);

  useEffect(()=>{ localStorage.setItem("gaggang-favorites",JSON.stringify(favorites)); },[favorites]);
  useEffect(()=>{ localStorage.setItem("gaggang-recent",JSON.stringify(recent)); },[recent]);

  const pool = useMemo(() => {
    const q=query.trim().toLowerCase();
    return gags.filter(g => {
      const cat = category==="ALL" || g.category===category;
      const search = !q || g.text.toLowerCase().includes(q) || g.tags.some(t=>t.includes(q)) || g.category.toLowerCase().includes(q);
      return cat && search;
    });
  },[category,query]);

  const shown = tab==="favorites"
    ? gags.filter(g=>favorites.includes(g.id))
    : tab==="recent"
      ? recent.map(id=>gags.find(g=>g.id===id)).filter(Boolean) as Gag[]
      : pool;

  const pick = (source=pool.length?pool:gags) => {
    const candidates = source.filter(g=>g.id!==current.id);
    const next=(candidates.length?candidates:source)[Math.floor(Math.random()*(candidates.length?candidates.length:source.length))];
    setCurrent(next);
    setRecent(r=>[next.id,...r.filter(id=>id!==next.id)].slice(0,12));
    setCopied(false);
  };

  const selectGag=(g:Gag)=>{
    setCurrent(g);
    setRecent(r=>[g.id,...r.filter(id=>id!==g.id)].slice(0,12));
    setCopied(false);
  };

  const copy=async()=>{
    await navigator.clipboard.writeText(current.text);
    setCopied(true);
    setTimeout(()=>setCopied(false),1400);
  };

  const share=async()=>{
    if(navigator.share){
      await navigator.share({title:"GAGGANG",text:current.text});
    } else await copy();
  };

  const toggleFav=()=>setFavorites(f=>f.includes(current.id)?f.filter(id=>id!==current.id):[...f,current.id]);

  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{
      if(e.code==="Space" && document.activeElement?.tagName!=="INPUT"){e.preventDefault();pick();}
      if(e.key.toLowerCase()==="c" && document.activeElement?.tagName!=="INPUT") copy();
    };
    window.addEventListener("keydown",handler);
    return()=>window.removeEventListener("keydown",handler);
  });

  return <div className="app">
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">G</div>
        <div><div className="brand-name">GAGGANG</div><div className="brand-sub">HIGH QUALITY TEXT GAGS</div></div>
      </div>
      <div className="top-actions">
        <button className="icon-btn" onClick={()=>setTab(tab==="favorites"?"home":"favorites")} aria-label="Favorites">
          <Heart size={18} fill={tab==="favorites"?"currentColor":"none"}/>
          <span>{favorites.length}</span>
        </button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="eyebrow"><span className="live-dot"/> THE TEXT GAG VAULT</div>
        <h1>WE SPEAK<br/><span>FLUENT NONSENSE.</span></h1>
        <p>Random Unicode chaos, curated for maximum reaction.</p>
      </section>

      <section className="stage">
        <div className="stage-meta">
          <span className="pill">{current.category}</span>
          <button className="mini-fav" onClick={toggleFav} aria-label="Favorite">
            <Heart size={18} fill={favorites.includes(current.id)?"currentColor":"none"}/>
          </button>
        </div>
        <div className="gag-display" onClick={copy} title="Click to copy">{current.text}</div>
        <div className="stage-hint">{copied ? "COPIED TO CLIPBOARD" : "CLICK THE GAG TO COPY • SPACE FOR RANDOM"}</div>
        <div className="primary-actions">
          <button className="random-btn" onClick={()=>pick()}><Shuffle size={19}/> HIT ME</button>
          <button className="secondary-btn" onClick={copy}><Copy size={17}/> {copied?"COPIED":"COPY"}</button>
          <button className="secondary-btn" onClick={share}><Share2 size={17}/> SHARE</button>
        </div>
      </section>

      <section className="controls">
        <div className="tabs">
          <button className={tab==="home"?"active":""} onClick={()=>setTab("home")}>VAULT</button>
          <button className={tab==="favorites"?"active":""} onClick={()=>setTab("favorites")}><Heart size={14}/> FAVORITES</button>
          <button className={tab==="recent"?"active":""} onClick={()=>setTab("recent")}><Clock3 size={14}/> RECENT</button>
        </div>
        <div className="search">
          <Search size={17}/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search gags, tags, moods..." />
          {query && <button onClick={()=>setQuery("")}><X size={15}/></button>}
        </div>
      </section>

      <section className="categories">
        {(Object.keys(categoryMeta) as Category[]).map(c=>
          <button key={c} onClick={()=>{setCategory(c);setTab("home")}} className={category===c&&tab==="home"?"cat active":"cat"}>
            {categoryMeta[c].icon}<span>{categoryMeta[c].label}</span>
          </button>
        )}
      </section>

      <section className="grid-head">
        <div><strong>{tab==="favorites"?"YOUR FAVORITES":tab==="recent"?"RECENT GAGS":"THE GANG"}</strong><span>{shown.length} GAGS</span></div>
        <button onClick={()=>pick(shown.length?shown:pool)}><Shuffle size={15}/> RANDOMIZE</button>
      </section>

      <section className="gag-grid">
        {shown.map(g=><button className={"gag-card "+(g.id===current.id?"selected":"")} key={g.id} onClick={()=>selectGag(g)}>
          <span className="card-cat">{g.category}</span>
          <span className="card-text">{g.text}</span>
          <span className="card-foot"><span>{g.tags.slice(0,2).map(t=>"#"+t).join(" ")}</span>{favorites.includes(g.id)&&<Heart size={14} fill="currentColor"/>}</span>
        </button>)}
        {!shown.length && <div className="empty"><Star size={28}/><h3>NO GAGS HERE YET</h3><p>Hit the heart on a gag and build your collection.</p></div>}
      </section>
    </main>

    <footer>
      <span>GAGGANG © 2026</span>
      <span>BUILT FOR CHAOS</span>
    </footer>
  </div>
}

createRoot(document.getElementById("root")!).render(<App />);
