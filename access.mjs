const SLOT='prej-private-access-v1';
export function clearAccess(storage){try{storage?.removeItem(SLOT);}catch{}}
export function restoreAccess(location,history,storage,takeKey){
 const incoming=new URLSearchParams(location.hash.slice(1)).has('k');
 let raw=incoming?new URLSearchParams(location.hash.slice(1)).get('k'):null;
 if(!incoming){try{raw=storage?.getItem(SLOT);}catch{}}
 let key;
 try{key=takeKey({...location,hash:raw?'#k='+raw:'',pathname:location.pathname,search:location.search},history);}catch(e){clearAccess(storage);throw e;}
 if(incoming&&!key)clearAccess(storage);
 let retained=false;
 if(key){try{storage?.setItem(SLOT,raw);retained=!!storage;}catch{}}
 const url=new URL(location.href);url.hash=key?'k='+raw:'';
 return{key,shareUrl:url.href,retained};
}
