import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';

const EXT = 'com.dpenergy.theme';
const tokens = JSON.parse(readFileSync('src/tokens/tokens.json', 'utf8'));

const light = [];
const dark = [];
const flat = [];

(function walk(node, path) {
	for (const [key, value] of Object.entries(node)) {
		if (key.startsWith('$') || typeof value !== 'object') continue;
		if ('$value' in value) {
			const theme = value.$extensions?.[EXT];
			light.push(`  --${key}: ${theme?.light ?? value.$value};`);
			if (theme?.dark) dark.push(`  --${key}: ${theme.dark};`);
			flat.push({
				name: `--${key}`,
				group: path[0],
				type: value.$type,
				light: theme?.light ?? value.$value,
				dark: theme?.dark ?? null,
				description: value.$description ?? '',
			});
		} else {
			walk(value, [...path, key]);
		}
	}
})(tokens, []);

const reduced = `@media (prefers-reduced-motion: reduce) {
  :root { --dur-micro: 1ms; --dur-base: 120ms; --dur-enter: 120ms; --ease-spring: linear; --stagger: 0ms; }
}`;

const header = '/* Generado por scripts/build-tokens.mjs desde src/tokens/tokens.json — no editar a mano. */\n';
const css = `${header}:root {\n${light.join('\n')}\n}\n:root[data-theme='dark'] {\n${dark.join('\n')}\n}\n${reduced}\n`;

writeFileSync('src/styles/tokens.css', css);
writeFileSync('src/tokens/tokens.flat.json', JSON.stringify(flat, null, 2));

mkdirSync('public/descargas', { recursive: true });
const darkAuto = `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme='light']) {\n${dark.map((l) => '  ' + l).join('\n')}\n  }\n}\n`;
writeFileSync('public/descargas/dp-energy-tokens.css', css + darkAuto);
copyFileSync('src/tokens/tokens.json', 'public/descargas/dp-energy-tokens.json');

console.log(`tokens: ${flat.length} (${dark.length} con valor oscuro)`);
