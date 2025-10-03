## MealPlanLite-variante

Quando compare un mess vuoto come nel caso del progetto "nessuna ricetta trovata", questo accade ì perché in HomeClient e ClientSearch, il componente parte subito con meals = [] e loading = false.
Quindi appena viene renderizzato, prima ancora che arrivi la risposta
dall’API, esso mostra subito "Nessuna ricetta trovata".
Per evitare ciò o si imposta loading = true all’inizio, oppure si gestisce lo stato iniziale con un flag. (la stessa cosa si fa anche per Favorites e Plan)

- meals parte con null invece di [].
- Finché è null, non mostra nessun messaggio.
- Mostra "Nessuna ricetta trovata" solo dopo che il fetch è completato ed effettivamente non ci sono risultati.

---

**Spinner animato**

Lo **spinner animato** fornisce un feedback visivo all’utente, così si comprende che l’app sta lavorando e non si è bloccata. Ciò migliora la UX durante i tempi di attesa.

Spinner e la gestione errori:

- Il feedback di stato: uno spinner durante il caricamento e un messaggio chiaro in caso di errore.
- Mostra lo spinner e messaggio di errore quando carica i preferiti.
- Quando carica spinner animato.
- Se c'è un errore mostra messaggio rosso ben visibile.
- Se non c'è alcun risultato mostra messaggio chiaro (“Nessuna ricetta trovata”).

---

La pagina dettaglio ricetta (RecipePage) avrà:

- uno spinner mentre carica,
- un messaggio di errore chiaro se qualcosa va storto.

**/recipes/[id]:**

- Si vede lo spinner mentre carica.
- Se l’API va in errore, appare un messaggio rosso “Errore durante il caricamento della ricetta”.
- Se la ricetta non esiste, appare un messaggio “Ricetta non trovata”.
- Se tutto ok, appare la ricetta con immagine, ingredienti, istruzioni e pulsanti.

---

Adesso il plan farà in questo modo:

1. Mostra lo spinner mentre legge da localStorage e carica i dettagli ricette.
2. Se c'è un errore mostra un messaggio rosso “Errore durante il caricamento del piano settimanale”.
3. Se tutto ok mostra la tabella settimanale con Pranzo/Cena per ogni giorno, con card ricetta o scritta "Vuoto", se non c'è nulla nel piano per quella giornata corrispondente.

---

L'aggiunta di alt alle immagini, aria-label ai bottoni e un focus ben visibile rende il progetto conforme alle linee guida WCAG 2.1 (_Web Content Accessibility Guidelines sono linee guida internazionali create dal W3C per rendere i contenuti web accessibili a tutti, comprese persone con disabilità visive, uditive, motorie o cognitive_)

- Tutte le immagini hanno alt descrittivo.
- Ogni bottone ha un aria-label chiaro.
- I controlli custom (come lo switch tema) sono ora navigabili da tastiera.
- Il focus è sempre visibile (alto contrasto) ed è evidente su link, bottoni, input e select, anche in dark mode.

---

**Ottimizzare le immagini con <Image> di Next.js è una best practice:**

_Tutte le immagini (Home, Griglia, Preferiti, Piano, Dettaglio) passano dal componente <Image>._

Le immagini vengono servite in formati moderni (WebP/AVIF).

- **WebP** lo sviluppatore è Google, sono più piccoli rispetto a JPEG/PNG con la stessa qualità e maggiore velocità al caricamento delle pagine web.
- **AVIF** lo sviluppatore è Alliance for Open Media, questi formati forniscono una migliore compressione di WebP: le immagini sono ancora più leggere con qualità superiore. Ottimi per fotografie e contenuti ad alta definizione.
  Hanno una buona compatibilità con i browser moderni (Chrome, Firefox, Edge, Opera), Safari sta ancora migliorando il supporto.
  Questi formati sono stati progettati per sostituire JPEG, PNG e GIF, offrendo dimensioni più ridotte e migliore qualità visiva, specialmente sul web e minore cosumo di larghezza di banda.

- scalate per il dispositivo,
- lazy loading (_è una tecnica di ottimizzazione delle applicazioni web che consiste nel caricare risorse solo quando servono, invece di caricarle tutte subito all’apertura della pagina. Questo riduce tempi di caricamento iniziali e migliora le prestazioni, specialmente su pagine ricche di immagini o contenuti multimediali.Le risorse come immagini, video, componenti JS, etc non vengono scaricate dal server all’inizio, ma vengono caricate solo quando l’utente le visualizza, come ad esempio scorrendo la pagina fino a quel punto_) automatico (eccetto se si usa priority).
- Sicurezza: solo i domini dichiarati in next.config.mjs sono consentiti.

---

(_Da vedere perchè non ha funzionato_)
Un controllo responsive per <Image> (es. con fill e container responsivo) così le immagini si adattano perfettamente anche sugli schermi piccoli

fill = immagine riempie il container.
sizes = istruzioni a Next.js per servire la giusta dimensione a seconda del device.
wrapper <Link> ha position: relative + altezza fissa (200px, modificabile).

- Su mobile le immagini riempiono la card in larghezza, mantenendo proporzioni.
- Su tablet/desktop la griglia si adatta.
- Ottimizzazione SEO + accessibilità (alt descrittivo).

---

### Nota

**Errore tipo "Objects are not valid as a React child" (no fill)**

Tipico di React: accade quando si sta passando un oggetto intero come figlio JSX, invece di una stringa/numero/elemento React, ossia quando si sta passando un oggetto direttamente dentro il JSX invece di una stringa o un numero.

Forzare la conversione in stringa:

```
<pre style={{ whiteSpace: "pre-wrap" }}>
  {typeof meal.instructions === "string"
    ? meal.instructions
    : JSON.stringify(meal.instructions, null, 2)}
</pre>

```

In questo modo se è testo lo mostra normalmente, se è un oggetto lo serializza in JSON leggibile.

`(typeof === "string" → mostra stringa, altrimenti JSON.stringify)`

Per proteggere i valori di input/categorie che arrivano dall’API

Rappresenta una versione blindata di tutti i componenti che usano dati provenienti dall’API (meal.title, meal.category, meal.area, meal.instructions, ecc.). Ogni campo viene controllato:

- Se è stringa, si mostra normalmente.
- Se è numero, si trasforma in stringa.
- Se è oggetto/altro, lo si converte con JSON.stringify.

---

Da localStorage:

```
mealplan:plan
{"monday":{"lunch":"53052","dinner":null},
"tuesday":{"lunch":null,"dinner":null},
"wednesday":{"lunch":"53069","dinner":null},
"thursday":{"lunch":null,"dinner":null},
"friday":{"lunch":null,"dinner":null},
"saturday":{"lunch":null,"dinner":null},
"sunday":{"lunch":null,"dinner":null}}


mealplan:favorites
["53052","53069"]

```
