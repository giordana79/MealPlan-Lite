**Definizione di SEO: Search Engine Optimization**

SEO è l’insieme di tecniche, pratiche e strategie volte a migliorare la visibilità di un sito web sui motori di ricerca (come Google, Bing o DuckDuckGo) in modo organico, cioè senza pagare pubblicità.
In pratica:
SEO significa fare in modo che un sito compaia più in alto nei risultati di ricerca quando qualcuno cerca parole chiave pertinenti al proprio contenuto.

**Principali aspetti della SEO**

**SEO On-Page (interno al sito)**

1. Struttura delle pagine: titoli `<h1>, <h2>,` meta description, URL puliti
2. Contenuti di qualità e pertinenti
3. Uso corretto delle immagini (alt, dimensioni ottimali)
4. Performance del sito (velocità di caricamento)

**SEO Off-Page (esterno al sito)**

1. Link da altri siti verso il tuo (backlink)
2. Condivisione sui social media
3. Reputazione online

**SEO Tecnica**

1. Struttura del sito e sitemap
2. Mobile-friendly (compatibile con smartphone)
3. Sicurezza (HTTPS)
4. Indicizzazione da parte dei motori di ricerca

---

**Next**
React è utilizzato per creare interfacce utente (UI) ma possiede dei limiti.Non ha un sistema integrato di routing difatti usa React Router, funziona solo client-side rendering (CSR), le pagine vengono costruite nel browser, non è ideale per SEO e tempo di caricamento. Non gestisce backend/API, richiede un server separato. Pertanto per superare questi limiti nasce Next.js e per fornire un framework completo pur mantenendo la semplicità di React.

Next.js creato da Vercel si definisce come un framewrok full-stack basato su React.  
Aggiunge funzionalità extra come il rouuting automatico basato su file system, rendering flessibile:CSR, API Routes(backend incluso), ottimizzazioni integrate(immagini, script,caching, etc). Viene molto usato in aziende come Netflix,, TikTok, GitHub.

**Rendering lato server (SSR - Server-Side Rendering)**
In React tradizionale, tutto viene renderizzato nel browser. Con SSR, le pagine vengono generate dal server prima di essere inviate al client, migliorando:
Velocità di caricamento
SEO (motori di ricerca leggono subito i contenuti)

**Static Site Generation (SSG)**
Alcune pagine possono essere generate staticamente durante la build.
Ideale per blog, landing page o pagine con contenuti che non cambiano spesso.

**Routing automatico**
Basta creare file nella cartella pages/ e Next.js crea automaticamente le route.

pages/index.js → /
pages/about.js → /about
pages/blog/[id].js → /blog/1, /blog/2, ...

**API routes**
Può creare endpoint API direttamente dentro la stessa app Next.js senza bisogno di un backend separato.

// pages/api/hello.js

```
export default function handler(req, res) {
res.status(200).json({ message: "Ciao!" });
}
```

**Ottimizzazione immagini e performance**
Componenti come <Image> ottimizzano automaticamente dimensione e formato delle immagini.

**Supporto TypeScript**
Next.js funziona nativamente con TypeScript, senza configurazioni complicate.

**Full Stack**
Si può usare sia il frontend che creare piccoli backend (API routes) all’interno dello stesso progetto.

**Vantaggi**

1. Migliora SEO e performance grazie al rendering lato server o statico.
2. Riduce la complessità del routing rispetto a React puro.
3. Consente di fare full-stack senza avere un backend separato (piccole app).
4. Grande ecosistema, integrabile con CMS, database, e servizi moderni.

Rendering: CSR, SSR, SSG, ISR

**CSR (Client-Siide Rendering)**
In React il rendering avviene nel browser si hanno app fluide e buona UI, però il SEO scarso, il primo caricamento è più lento.

**SSR(Server-Side Rendering)**
Next.js genera la pagina più pronta lato server e la invia al browser, si ha un ottima SEO, il tempo al primo caricamento è molto veloce, però abbiamo un carico maggiore lato server

**SSG(Static-Site generation)**
Next.js genera le pagina una volta sola in fase di build, si hanno elevate prestazioni e hosting. semplice, però fino alla prossima build il contenuto sarà statico.

**ISR(Icremental-Static regeneration)**
Ha un approccio ibrido, alcune pagine statiche si generano solo quando cambiano i dati,il vantaggio che si ottiene è l'unione tra la velocità del SSG e la "freschezza dei dati"

**API Routes**
Next.js ci consente di scrivere i file dentro. la cartella pages/api/ che poi diventano gli endpoint del backend.

Per es. pages/api/hello.js -> /api/hello
NOn è necesssario un server separatoperchè è già tutto integrato ed è utile per il login, database.

**Ottimizzazioni incluse**

1. <image> ottimizza automaticamente immagini(lazy loading, formati moderni)
2. <link> navigazione veloce con pre-fetch automatico3. Codice split automatico, cioè carica solo il necesssario per la pagina richiesta.
3. Codice split automatico -> carica solo il necessario per la pagina richiesta.

Quindi l'app sarà più veloce senza che noi siamo tenuti a scrivere configurazioni complesse.

**Deploy facile**
Le app Next.js si possono distribuire facilmente su piattaforme come Vercel(L'azienda che sviluppa Next)

Next.js conviene utilizzarlo se ci serve SEO blog, e-commerce, news, se vvolgiamo performance ottimizzate (render server statico), se vogliamo full-stack senza un backend separato e. se lavoriamo su progetti. scalabili e moderni.

Next.js offre metodi integrati per recupare dati:

- Fetch lato server nei componenti server

---

### Regola generale per Next.js (App Router)

**Server Component (default):**
Non usare useState, useEffect, localStorage.
Possono fare async/await fetch lato server.
Esempi: app/page.js, app/recipes/[id]/page.js.

**Client Component (con "use client"):**
Serve in cima al file se usi hook (useState, useEffect) o localStorage.
Questi vivono solo lato browser.
Esempi: app/plan/page.js, components/ClientSearch.jsx.

---

Prerequisiti: Node.js >= 18

Creare un nuovo progetto (comandi):

- npx create-next-app@latest my-next-app
- cd my-next-app
- npm run dev

Per pulire la cache:

- rm -rf .next

Per eliminare solo la cache di HMR senza cancellare tutto:

- rm -rf .next/cache/webpack

Per l'installazione delle dipendenze vedi Installazione_Dip.png

---

---
