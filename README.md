# Frikandellenstad.nl 🌭

**Waar iedereen speciaal is!**

Een vrolijke, fictieve stripstad geïnspireerd op Helmond, met een interactieve wijkplattegrond, grappige stadsnieuwtjes, burgemeester Frik en een persoonlijk snackpaspoort.

## Publiceren met GitHub Pages

1. Open de [Pages-instellingen](https://github.com/Alexw5701/frikandellenstad-website/settings/pages).
2. Kies onder **Build and deployment** voor **Deploy from a branch**.
3. Selecteer **main** en **/(root)** en klik op **Save**.
4. Het bestand `CNAME` is ingesteld op `frikandellenstad.nl`. Koppel dat domein in de Pages-instellingen en stel bij de domeinprovider de DNS in.
5. Zet **Enforce HTTPS** aan zodra GitHub een geldig certificaat heeft uitgegeven.

### DNS voor het hoofddomein

| Type | Naam | Waarde |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | alexw5701.github.io |

Deze instellingen betreffen alleen de website. Verwijder of wijzig geen mail-gerelateerde DNS-records.

### Techniek

- Statische HTML, CSS en JavaScript; geen server of buildproces nodig.
- `index.html` bevat de volledige website, inclusief kaart en interactiviteit.
- `favicon.svg` is het websitepictogram.
- `robots.txt` en `sitemap.xml` ondersteunen zoekmachine-indexering.

**Let op:** de getekende plattegrond is speels en slechts globaal gebaseerd op de ligging van Helmondse wijken. Nieuws en personages van de fictieve stad zijn verzonnen.
