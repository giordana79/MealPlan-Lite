## Flusso funzionamento del Progetto

**Home Page (app/page.js)**

- È un Server Component.
- Viene chiamata la funzione listCategories() da lib/meals.js per recuperare le categorie dall’API TheMealDB.
- Passa le categorie a HomeClient (un Client Component).

I dati statici come le categorie si fetchano lato server, mentre la parte interattiva come la ricerca, filtri, paginazione è nel client.

**HomeClient (components/HomeClient.jsx)**

- Client Component e può usare useState, useEffect e leggere dal browser.
- Mostra:
  - Barra di ricerca (input testo con debounce).
  - Menu a tendina con categorie.
  - Passa query + selectedCategory a ClientSearch.

**Ricerca (components/ClientSearch.jsx)**

- Client component.
- Usa il custom hook useDebounce per evitare chiamate API ad ogni tasto, attende 300–400ms prima di lanciare la query.
- Effettua un fetch all' API interna /api/search?q=...&c=....questo per semplificare, perché tutta la logica di fetch/filtri sta lato server (app/api/search/route.js).
- Visualizza i risultati con RecipeCard.
- Supporta loading e nessun risultato.

**API interna (app/api/search/route.js)**

- Route API di Next.js (App Router).
- Riceve query q (testo) e c (categoria).
- Chiama searchMeals(q) da lib/meals.js, se c’è c, filtra le ricette per categoria e restituisce un JSON di ricette già normalizzate.

In questo modo il client, parla solo con /api/search.

**Dettaglio ricetta (app/recipes/[id]/page.js)**

- Server Component dinamico (route [id]).
  Recupera id da params, chiama lookupMeal(id) in lib/meals.js.
- Mostra:
  - Titolo + immagine.
  - Categoria e area geografica.
  - Lista ingredienti + quantità (normalizzata).
  - Istruzioni testuali.
- Include RecipeActions (un Client Component) per i pulsanti “preferiti” e “piano settimanale”.

**Azioni ricetta (components/RecipeActions.jsx)**

- Client component.

- Mostra due pulsanti:
  - "Aggiungi ai preferiti" e salva l’ID in localStorage tramite funzioni di lib/storage.js.
  - "Aggiungi al piano settimanale", apre un DayMealPicker per scegliere giorno e pranzo/cena, poi aggiorna localStorage.
- Usa "useState" di React per aggiornare l’interfaccia.

**Piano settimanale (app/plan/page.js)**

- Client component.
- Legge il piano da localStorage (tramite readPlan in lib/storage.js).
- Mostra una tabella 7 giorni × 2 pasti (Pranzo/Cena).
- Ogni cella può contenere una ricetta (salvata con ID).
- L’utente può cambiare o rimuovere ricette e l’oggetto piano viene riscritto in localStorage.
- Persistenza: anche ricaricando la pagina, i dati restano.

**Preferiti (app/favorites/page.js)**

- Client component.
- Legge gli ID delle ricette preferite da localStorage.
- Per ogni ID chiama lookupMeal(id) per ottenere i dati completi.
- Mostra i preferiti in una griglia di RecipeCard e se non ci sono preferiti mostra messaggio “Nessun preferito”.

**Gestione dati API (lib/meals.js)**

- Contiene tutte le funzioni per fetchare e normalizzare i dati:
  - searchMeals(q) ➜ cerca ricette per nome.
  - lookupMeal(id) ➜ dettaglio singola ricetta.
  - listCategories() ➜ lista categorie.
- Normalizza i campi API (es. strIngredient1..20 → array ingredients).
  In questo modo se un domani si cambiano le API, si deve modificare solo lib/meals.js e non tutto il progetto.

**Gestione storage (lib/storage.js)**

- Wrapper per localStorage.
- Espone funzioni:
  - readFavorites, toggleFav, isFav.
  - readPlan, savePlan, defaultPlanTemplate.
    Qui è centralizzata tutta la logica di salvataggio/lettura.

**Tema Dark/Light (components/ThemeToggle.jsx + CSS)**

- Client component con bottone per lo switch 🌙 ⇆ ☀️.
- Cambia l’attributo data-theme su `<html>`.
- globals.css ha variabili CSS per background e foreground.
  Il tema scelto viene salvato in localStorage e resta al refresh.

**Risultati nel localStorage**

mealplan salvato nel localStorage:

`mealplan:plan {"monday":{"lunch":"52844","dinner":"53065"},"tuesday":{"lunch":"53086","dinner":null},}`

`mealplan:favorites ["53086","52844","53065"]`

**Riassunto**

Server (App Router) → fetch dati esterni (categorie, dettaglio ricette).
API interna → semplifica il client e centralizza la logica.
Client Components → gestiscono interattività (useState, localStorage).
Persistenza → preferiti e piano settimanale in localStorage.
Tema → switch moderno con persistenza.
