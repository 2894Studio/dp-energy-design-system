/**
 * Comportamiento de las demos. Un solo listener delegado por evento;
 * cada demo declara lo que hace con atributos, sin JS propio.
 */

const done = (window as any).__dpeDemos;
if (!done) {
	(window as any).__dpeDemos = true;

	document.addEventListener('click', (e) => {
		const t = e.target as HTMLElement;

		// Toggletip: .infob con aria-controls → .tip
		const infob = t.closest<HTMLElement>('.dpe .infob');
		if (infob) {
			const tip = document.getElementById(infob.getAttribute('aria-controls') ?? '');
			const open = infob.getAttribute('aria-expanded') === 'true';
			infob.setAttribute('aria-expanded', String(!open));
			if (tip) tip.hidden = open;
			e.stopPropagation();
			return;
		}

		// Fila desplegable: .expandir con aria-controls → fila hija
		const exp = t.closest<HTMLElement>('.dpe .expandir');
		if (exp) {
			const row = document.getElementById(exp.getAttribute('aria-controls') ?? '');
			const open = exp.getAttribute('aria-expanded') === 'true';
			exp.setAttribute('aria-expanded', String(!open));
			if (row) row.hidden = open;
			return;
		}

		// Diálogo: [data-abre] / [data-cierra]
		const abre = t.closest<HTMLElement>('.dpe [data-abre]');
		if (abre) {
			(document.getElementById(abre.dataset.abre!) as HTMLDialogElement | null)?.showModal();
			return;
		}
		const cierra = t.closest<HTMLElement>('.dpe [data-cierra]');
		if (cierra) {
			cierra.closest('dialog')?.close();
			return;
		}

		// Copiar con confirmación en el sitio
		const copiar = t.closest<HTMLElement>('.dpe .iconbtn.copiar');
		if (copiar && !copiar.classList.contains('hecho')) {
			const label = copiar.getAttribute('aria-label') ?? '';
			const use = copiar.querySelector('use');
			const href = use?.getAttribute('href');
			copiar.classList.add('hecho');
			copiar.setAttribute('aria-label', 'Copiado');
			use?.setAttribute('href', '/icons.svg#i-check');
			const live = copiar.parentElement?.querySelector('[aria-live]');
			if (live) live.textContent = 'Copiado';
			setTimeout(() => {
				copiar.classList.remove('hecho');
				copiar.setAttribute('aria-label', label);
				if (href) use?.setAttribute('href', href);
				if (live) live.textContent = '';
			}, 2000);
			return;
		}

		// Botón ocupado
		const busy = t.closest<HTMLElement>('.dpe [data-demo-busy]');
		if (busy && busy.getAttribute('aria-busy') !== 'true') {
			busy.setAttribute('aria-busy', 'true');
			setTimeout(() => busy.setAttribute('aria-busy', 'false'), 2000);
			return;
		}

		// Interruptores: aria-pressed
		const press = t.closest<HTMLElement>('.dpe [aria-pressed]');
		if (press) {
			press.setAttribute('aria-pressed', String(press.getAttribute('aria-pressed') !== 'true'));
			return;
		}

		// Cierra toggletips abiertos al hacer clic fuera
		document.querySelectorAll<HTMLElement>('.dpe .infob[aria-expanded="true"]').forEach((b) => {
			b.setAttribute('aria-expanded', 'false');
			const tip = document.getElementById(b.getAttribute('aria-controls') ?? '');
			if (tip) tip.hidden = true;
		});
	});

	document.addEventListener('keydown', (e) => {
		if (e.key !== 'Escape') return;
		document.querySelectorAll<HTMLElement>('.dpe .infob[aria-expanded="true"]').forEach((b) => {
			b.setAttribute('aria-expanded', 'false');
			const tip = document.getElementById(b.getAttribute('aria-controls') ?? '');
			if (tip) tip.hidden = true;
			b.focus();
		});
	});

	// Barra de selección: casillas [data-sel] actualizan la barra de su demo
	document.addEventListener('change', (e) => {
		const box = e.target as HTMLInputElement;
		const demo = box.closest('.dpe');
		if (!demo || !box.matches('[data-sel], [data-sel-todo]')) return;
		const boxes = [...demo.querySelectorAll<HTMLInputElement>('[data-sel]')];
		if (box.matches('[data-sel-todo]')) boxes.forEach((b) => (b.checked = box.checked));
		const n = boxes.filter((b) => b.checked).length;
		boxes.forEach((b) => b.closest('tr')?.setAttribute('aria-selected', String(b.checked)));
		const bar = demo.querySelector<HTMLElement>('.barra-sel');
		if (bar) {
			bar.dataset.hay = String(n > 0);
			const c = bar.querySelector('[data-cuenta]');
			if (c) c.textContent = `${n} ${n === 1 ? 'seleccionado' : 'seleccionados'}`;
		}
	});

	// Subida: realce al arrastrar
	['dragenter', 'dragover'].forEach((ev) =>
		document.addEventListener(ev, (e) => {
			const z = (e.target as HTMLElement).closest?.<HTMLElement>('.dpe .subida');
			if (z) {
				e.preventDefault();
				z.dataset.arrastrando = 'true';
			}
		}),
	);
	['dragleave', 'drop'].forEach((ev) =>
		document.addEventListener(ev, (e) => {
			const z = (e.target as HTMLElement).closest?.<HTMLElement>('.dpe .subida');
			if (z) {
				e.preventDefault();
				z.dataset.arrastrando = 'false';
			}
		}),
	);
}
