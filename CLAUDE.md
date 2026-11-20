# Sistema de diseño D.P. Energy — guía para editar

Sitio Astro + Starlight. Una página MDX por recurso en `src/content/docs/`. Idioma: español.

## Fuentes únicas

- **Tokens:** `src/tokens/tokens.json` (DTCG; el valor oscuro va en
  `$extensions."com.dpenergy.theme".dark`). Nunca edites `src/styles/tokens.css`: lo genera
  `scripts/build-tokens.mjs` en cada `dev`/`build`.
- **Íconos:** la lista `ICONS` de `scripts/build-icons.mjs`. Para añadir uno, añade su nombre de
  Material Symbols Rounded; se usa como `#i-<nombre>`.
- **CSS de componentes:** `src/styles/components.css`, todo bajo `.dpe`. CSS de un solo componente
  puede ir en `src/styles/components/<slug>.css`, importado desde su página.

## Reglas

- Ningún valor literal en un componente: todo pasa por un token. Si falta, se añade a `tokens.json`.
- Las demos usan `<Example>`: el bloque «Código» se genera del mismo marcado, nunca se escribe aparte.
- Páginas de componente en este orden: demo, Cuándo usarlo, Anatomía, Variantes, Estados, Uso
  (Hacer / No hacer), Accesibilidad, Tokens, Relacionados. Ver `componentes/boton.mdx`.
- Tono: instrucciones, no historia del proceso. Frases cortas. Sin relleno.
- Nombres de otras marcas o clientes no aparecen en el sitio.

## Versionado

Cada cambio publicado lleva una fila en `recursos/historial.mdx` y actualiza la versión de
`package.json` (la portada la lee de ahí):

- **patch** (3.0.N): aclaración o corrección sin cambio de comportamiento.
- **minor** (3.N.0): regla o componente nuevo.
- **major** (N.0.0): cambia el valor de un token ya en uso.

## Verificar antes de publicar

`npm run build` debe terminar sin errores (incluye la validación de enlaces internos y el índice de
búsqueda). Revisa las páginas tocadas en claro y oscuro, a 1440 y 390 px.
