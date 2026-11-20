# Sistema de diseño D.P. Energy

Documentación del sistema de diseño de D.P. Energy: fundamentos, componentes, patrones y tokens.
Construida con [Astro](https://astro.build) y [Starlight](https://starlight.astro.build).

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ (tokens, sprite, páginas, índice de búsqueda)
npm run preview
```

Requiere Node 22.12 o superior.

## Estructura

| Ruta | Contenido |
|---|---|
| `src/tokens/tokens.json` | Fuente única de tokens (formato DTCG). |
| `scripts/build-tokens.mjs` | Genera `src/styles/tokens.css` y las descargas de tokens. |
| `scripts/build-icons.mjs` | Genera el sprite de íconos desde Material Symbols. |
| `src/styles/components.css` | CSS de todos los componentes, bajo `.dpe`. |
| `src/components/` | Piezas de la documentación (`Example`, `TokenTable`, `Guideline`…). |
| `src/content/docs/` | Una página MDX por recurso. |

Ver `CLAUDE.md` para las reglas de edición y versionado.
