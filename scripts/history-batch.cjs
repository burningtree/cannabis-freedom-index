// Generic runner: node fill.cjs data.json
// data = { checks: [[id, wikiPage, newDate?]], entries: [{id,date,c,cat,title,desc,before,page,replaces}] }
// `before`: "FREE", "REG", an array, a delta object applied to the scores that follow, or null (context).
const fs=require("fs"),y=require("js-yaml");
const data=JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
let text=fs.readFileSync("changes.yaml","utf8");
const K=["possession","cultivation","enforcement","sharing","consumption","access"];
const cur={};for(const f of fs.readdirSync("countries")){const id=f.replace(".yaml","");const p="countries/"+f+(f.endsWith(".yaml")?"":"/index.yaml");cur[id]=y.load(fs.readFileSync(p,"utf8"))}
const T=d=>Date.parse(d.length===4?d+"-07-01":d.length===7?d+"-15":d);
const block=id=>{const i=text.indexOf(`- id: ${id}\n`);if(i<0)throw new Error("missing "+id);let j=text.indexOf("\n- id:",i);j=j<0?text.length:j+1;return [i,j]};
const drop=id=>{const [i,j]=block(id);text=text.slice(0,i)+text.slice(j)};
const edit=(id,fn)=>{const [i,j]=block(id);text=text.slice(0,i)+fn(text.slice(i,j))+text.slice(j)};
const wrap=(t,w=96)=>{const out=[];let line="";for(const word of t.split(" ")){if((line+" "+word).trim().length>w){out.push(line);line=word}else line=(line+" "+word).trim()}out.push(line);return out.map(l=>"    "+l).join("\n")};
const q=t=>(/: |^["'\[{>|*&!%@`]| #/.test(t)?JSON.stringify(t):t);
const src=(page)=>/^https?:/.test(page[1]||"")?page:["Wikipedia — "+decodeURIComponent(page).replace(/_/g," "),"https://en.wikipedia.org/wiki/"+page];
const PRESET={FREE:[10,10,10,10,10,8],REG:[6,3,6,3,5,6]};
const fmt=b=>"{"+K.map((k,i)=>`${k}: ${b[i]}`).join(", ")+"}";
for(const [id,page,date] of data.checks||[]) edit(id,b=>{
  if(date) b=b.replace(/  date: "[^"]+"/,`  date: "${date}"`);
  if(!b.includes("\n  checked: true\n")) b=b.replace("\n  sources:\n","\n  checked: true\n  sources:\n");
  const [t,u]=src(page); if(!b.includes(u)) b=b.replace(/\n*$/,"\n")+`    - title: ${q(t)}\n      url: ${u}\n\n`;
  return b});
const N=(data.entries||[]).map(n=>({...n,before:typeof n.before==="string"?PRESET[n.before]:n.before,src:src(n.page)}));
for(const n of N){ if(n.c&&!cur[n.c]) throw new Error("no country "+n.c); if(n.replaces) drop(n.replaces); }
const existing=y.load(text);
const scored=existing.filter(e=>e.before).map(e=>({c:e.country,t:T(e.date),b:K.map(k=>e.before[k])}));
const afterOf=(c,t)=>{const next=scored.filter(s=>s.c===c&&s.t>t).sort((a,b)=>a.t-b.t)[0];return next?next.b:K.map(k=>cur[c].scores[k])};
N.sort((a,b)=>T(b.date)-T(a.date));
let flat=0;
for(const n of N){
  if(n.before&&!Array.isArray(n.before)){const after=afterOf(n.c,T(n.date));const b=after.map((v,i)=>Math.max(0,Math.min(10,v+(n.before[K[i]]||0))));
    if(b.every((v,i)=>v===after[i])){n.before=null;flat++}else n.before=b}
  if(n.before){const after=afterOf(n.c,T(n.date));if(n.before.every((v,i)=>v===after[i]))throw new Error("no change: "+n.id);scored.push({c:n.c,t:T(n.date),b:n.before})}
}
for(const n of N){ if(text.includes(`- id: ${n.id}\n`)) throw new Error("dup "+n.id);
  text=text.replace(/\n*$/,"\n")+`\n- id: ${n.id}\n  date: "${n.date}"\n  category: ${n.cat}\n`+(n.c?`  country: ${n.c}\n`:"")+`  title: ${q(n.title)}\n  description: >-\n${wrap(n.desc)}\n`+(n.before?`  before: ${fmt(n.before)}\n`:"")+(n.unchecked?"":"  checked: true\n")+`  sources:\n    - title: ${q(n.src[0])}\n      url: ${n.src[1]}\n`}
const head=text.slice(0,text.indexOf("- id:"));
const blocks=text.slice(text.indexOf("- id:")).split(/\n(?=- id: )/).map(b=>b.replace(/\n+$/,""));
const d=b=>b.match(/  date: "([^"]+)"/)[1];
blocks.sort((a,b)=>T(d(b))-T(d(a)));
fs.writeFileSync("changes.yaml",head+blocks.join("\n\n")+"\n");
const all=y.load(fs.readFileSync("changes.yaml","utf8"));
console.log("added",N.length,"(flat deltas kept as context:",flat+")","| total",all.length,"| checked",all.filter(e=>e.checked).length,"| unchecked",all.filter(e=>!e.checked&&!e.estimate).length,"| estimates",all.filter(e=>e.estimate).length);
