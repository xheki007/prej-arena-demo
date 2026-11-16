const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function platformAccountView(user){
 if(!user)return '<h2>Dein privates Arena-Konto</h2><p>Diese Vorschau verwendet die Anmeldung über ChatGPT. Lokale Entwicklungskonten sind getrennt.</p><a class="primary" href="/signin-with-chatgpt" target="_top">Mit ChatGPT anmelden</a>';
 return `<h2>Dein Arena-Profil</h2><p>Angemeldet über ChatGPT. Arena speichert kein zusätzliches Passwort. Deine lokale Testanmeldung wird nicht automatisch übernommen.</p><form id="platform-profile"><label>Anzeigename<input class="search" name="displayName" value="${esc(user.displayName)}" required minlength="2" maxlength="60" autocomplete="nickname"></label><button class="primary" type="submit">Profil speichern</button></form><button id="export-account" class="secondary">Eigene Daten herunterladen</button><p>Kontolöschung bleibt bis zur sicheren erneuten Identitätsbestätigung gesperrt.</p><a class="secondary" href="/signout-with-chatgpt" target="_top">Abmelden</a><p id="platform-status" role="status"></p>`;
}
export function pendingReviewMessage(ticket,now=Date.now()){
 if(ticket?.mode!=='real'||ticket.status!=='pending'||!Array.isArray(ticket.picks)||!ticket.picks.length)return '';
 if(!ticket.picks.every(p=>Number.isFinite(p.start)&&p.start<now-3*86400000))return '';
 return 'Auswertung überfällig: Eine manuelle Prüfung bestätigter Ergebnisse ist erforderlich. Der Datenanbieter liefert nur ein begrenztes Ergebnisfenster. Es werden keine Ergebnisse erfunden oder automatisch annulliert.';
}
