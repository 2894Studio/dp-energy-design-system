import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';

// Íconos del sistema. Para añadir uno: su nombre de Material Symbols aquí, y se usa como #i-<nombre>.
export const ICONS = [
	'add', 'arrow_back', 'block', 'calendar_month', 'chat', 'check', 'check_circle', 'chevron_right',
	'close', 'content_copy', 'delete', 'description', 'download', 'edit', 'error', 'expand_more',
	'filter_list', 'folder', 'group', 'help', 'home', 'info', 'location_on', 'lock', 'logout', 'menu',
	'more_vert', 'notifications', 'pause_circle', 'person', 'refresh', 'remove', 'schedule', 'search',
	'send', 'settings', 'smart_toy', 'sort', 'upload', 'visibility', 'warning',
];

// Nombre en el sistema → archivo en la librería, cuando difieren.
const ALIAS = { expand_more: 'keyboard_arrow_down' };

const dir = 'node_modules/@material-symbols/svg-400/rounded';
const symbols = ICONS.map((name) => {
	const src = ALIAS[name] ?? name;
	const file = existsSync(`${dir}/${src}-fill.svg`) ? `${dir}/${src}-fill.svg` : `${dir}/${src}.svg`;
	if (!existsSync(file)) throw new Error(`Ícono inexistente: ${name}`);
	const path = readFileSync(file, 'utf8').match(/<path[^>]*\/>/g).join('');
	return `<symbol id="i-${name}" viewBox="0 -960 960 960">${path}</symbol>`;
});

const sprite = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>\n`;
mkdirSync('public/descargas', { recursive: true });
writeFileSync('public/icons.svg', sprite);
writeFileSync('public/descargas/dp-energy-icons.svg', sprite);
writeFileSync('src/tokens/icons.json', JSON.stringify(ICONS));
console.log(`íconos: ${ICONS.length}`);
