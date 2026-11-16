export function validateTicket(picks,events,now=Date.now()) {
 if(!Array.isArray(picks)||!picks.length||picks.length>5)throw Error('Wähle 1 bis 5 Spiele.');
 const seen=new Set();
 return picks.map(p=>{const e=events.find(e=>e.id===p.eventId);if(!e||e.start<=now)throw Error('Spiel nicht mehr verfügbar.');if(seen.has(e.id))throw Error('Nur ein Tipp pro Spiel.');seen.add(e.id);const o=e.outcomes.find(o=>o.name===p.name);if(!o||!Number.isFinite(o.price)||o.price<=1)throw Error('Ungültige Auswahl.');return {eventId:e.id,name:o.name,price:o.price,start:e.start};});
}
export function normalizeEvents(raw,sport,now=Date.now()) {
 return raw.flatMap(e=>{const start=Date.parse(e.commence_time);const b=e.bookmakers?.find(b=>b.markets?.some(m=>m.key==='h2h'));const market=b?.markets.find(m=>m.key==='h2h');if(!start||start<=now||!market)return [];const outcomes=market.outcomes.filter(o=>typeof o.name==='string'&&Number.isFinite(o.price)&&o.price>1).map(o=>({name:o.name,price:o.price}));if(outcomes.length<2)return [];return [{id:e.id,sport,league:e.sport_title||sport,home:e.home_team,away:e.away_team,start,source:b.title,updated:market.last_update||b.last_update,outcomes}];});
}
export function scoreTicket(picks,results) {
 if(picks.some(p=>results[p.eventId]&&results[p.eventId]!=='void'&&results[p.eventId]!==p.name))return {status:'lost',points:0};
 if(picks.some(p=>!results[p.eventId]))return {status:'pending',points:0};
 const active=picks.filter(p=>results[p.eventId]!=='void');
 return active.length?{status:'won',points:Math.round(100*active.reduce((n,p)=>n*p.price,1))}:{status:'void',points:0};
}
