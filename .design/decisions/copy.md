# Second Son Productions — Copy Framework

## Voice Definition

**Tone:** Authoritative, institutional, precise. The voice of a cultural institution that lets the work speak first.

**Characteristics:**
- **Declarative, not promotional.** State facts. "5x Grammy Winner" not "Amazing Grammy-winning artist!"
- **Precise language.** "Curated" not "put together." "Residency" not "regular gig." "Orchestrator" not "music person."
- **Institutional gravity.** Like reading a museum placard or a Blue Note liner note — earned authority, no hype.
- **Third person.** Artists are referred to by name or surname, never "our amazing artist."
- **Em-dash free.** Use periods and commas. No em dashes anywhere in site copy.

**What the voice is NOT:**
- Not casual or conversational
- Not salesy or promotional
- Not breathless or hyperbolic ("incredible," "amazing," "unbelievable")
- Not first person ("We're so proud to...")

## Microcopy Guide

### Navigation
- Home | About | Events | Contact (top nav)
- Artist List | Events | Contact (mobile nav)
- "Inquire" (CTA button — institutional, not "Contact Us" or "Get in Touch")

### CTAs
- "Inquire" — primary site CTA (contact/booking)
- "Tickets" — tour date links (with arrow →)
- "View Artist" — roster hover state (implied, not literal button text)

### Labels
- "Event Production" — event card category label
- "Pianist / Producer / Composer" — artist role labels (slash-separated, capitalized)
- "Selected albums as leader" — discography subtitle

### Form Copy
- Field labels: Name, Email, Subject (dropdown), Message
- Subject options: Booking Inquiry, Press Inquiry, General, Other
- Submit button: "Send Message →"
- Success state: "Message Sent" (replaces button text for 3s)

### Empty States
- Tour dates: "No upcoming dates at this time."
- Tour dates fallback: "Check Bandsintown for updates."
- Tour dates error: "Unable to load tour dates right now."

### Footer
- Tagline (inner pages): "Management, composition, and live events for artists redefining film, television, and the global stage."
- Tagline (homepage): "Artist & Tour Management / Los Angeles"
- Copyright: "© 2026 Second Son Productions. All rights reserved."

## Page-by-Page Copy Notes

### Homepage (index.html)
- **Credential sequence:** Timed slides build authority before revealing the brand name. Each slide states a fact: "Grammy Winners Managed," "Super Bowl Performances," etc.
- **H1:** "Second Son Productions" (hidden in credential final slide for SEO)
- **Statement section:** One powerful line that positions the company. Currently: "We build ecosystems around extraordinary artists."
- **Roster section:** Artist names as primary content. Role labels and meta underneath. No paragraph descriptions — the names carry weight.

### About (about.html)
- **H1:** "About Second Son Productions"
- **Section headings:** "The Collective" (team), "Our Practice" (services), "News" (press)
- **Service cards:** Short, punchy descriptions. One sentence per service.
- **News cards:** Source attribution (e.g., "Steinway & Sons"), headline, one-sentence summary.

### Events (events.html)
- **H1:** "Events"
- **Subtitle:** "Flagship performances and curated festival programming, from the Super Bowl to the Hollywood Bowl."
- **Event cards:** Category label ("Event Production"), title, one-sentence description, location + year.

### Artist Pages
- **H1:** Artist name
- **Role label:** Above H1, slash-separated (e.g., "Pianist / Producer / Composer")
- **Meta items:** Location, key accolade, label/platform (dot-separated)
- **Bio:** 3-4 paragraphs. Factual, precise, institutional. Lead with the most impressive credential. Weave chronology with impact.
- **Sidebar blocks:** Instruments, Genres (as tags), Notable Collaborators, Awards, Connect (social links)
- **Discography:** "Selected albums as leader" — album name, year, label. No reviews or descriptions.
- **Tour dates:** Pulled live from Bandsintown API. Day/month, venue, city/region, ticket link.

## Writing Rules

1. Every artist bio leads with their strongest credential
2. Grammy counts are always specific: "5x Grammy Winner" not "multiple Grammy winner"
3. Album titles in `<em>` tags
4. Locations formatted: "City, ST" (US) or "City, Country" (international)
5. Years as standalone spans, not full dates unless API-sourced
6. No exclamation marks in any site copy
7. No em dashes anywhere — use periods, commas, or semicolons
8. Social proof through specificity: name the venue, name the collaborator, name the award
