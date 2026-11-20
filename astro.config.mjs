// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

const nuevo = { text: 'Nuevo', variant: 'success' };

export default defineConfig({
	site: 'https://dp-energy-design-system.vercel.app',
	markdown: { smartypants: false },
	integrations: [
		starlight({
			title: 'D.P. Energy',
			description: 'Sistema de diseño de D.P. Energy: fundamentos, componentes y patrones de producto.',
			logo: { src: './src/assets/isotipo.svg', alt: '' },
			favicon: '/favicon.svg',
			defaultLocale: 'root',
			locales: { root: { label: 'Español', lang: 'es' } },
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource/michroma',
				'./src/styles/tokens.css',
				'./src/styles/theme.css',
				'./src/styles/components.css',
			],
			social: [
				{ icon: 'github', label: 'Repositorio', href: 'https://github.com/2894Studio/dp-energy-design-system' },
			],
			editLink: { baseUrl: 'https://github.com/2894Studio/dp-energy-design-system/edit/main/' },
			lastUpdated: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			components: { SiteTitle: './src/components/SiteTitle.astro' },
			plugins: [starlightLinksValidator({ errorOnLocalLinks: false })],
			sidebar: [
				{ label: 'Inicio', items: [{ label: 'Visión general', link: '/' }, 'empezar'] },
				{
					label: 'Fundamentos',
					items: [
						'fundamentos/color',
						{ slug: 'fundamentos/tipografia', badge: nuevo },
						'fundamentos/espaciado',
						'fundamentos/radios',
						'fundamentos/elevacion',
						'fundamentos/movimiento',
						'fundamentos/iconografia',
						{ slug: 'fundamentos/logotipo', badge: nuevo },
					],
				},
				{
					label: 'Componentes',
					items: [
						{
							label: 'Acciones',
							collapsed: true,
							items: [
								'componentes/boton',
								'componentes/boton-icono',
								{ slug: 'componentes/boton-flotante', badge: nuevo },
								'componentes/boton-acceso',
								'componentes/menu-acciones',
							],
						},
						{
							label: 'Contenedores',
							collapsed: true,
							items: ['componentes/tarjeta', 'componentes/dialogo', 'componentes/ficha-detalle'],
						},
						{
							label: 'Estados y avisos',
							collapsed: true,
							items: [
								'componentes/etiqueta',
								'componentes/aviso',
								'componentes/toggletip',
								'componentes/esqueleto',
								'componentes/pasos',
							],
						},
						{
							label: 'Datos',
							collapsed: true,
							items: [
								'componentes/tabla',
								'componentes/fila-desplegable',
								'componentes/barra-seleccion',
								'componentes/fila-cifras',
								{ slug: 'componentes/agenda', badge: nuevo },
							],
						},
						{
							label: 'Filtros',
							collapsed: true,
							items: [
								'componentes/resumen-estatus',
								'componentes/barra-filtros',
								'componentes/chip',
								'componentes/ambito',
							],
						},
						{
							label: 'Entrada de datos',
							collapsed: true,
							items: ['componentes/formulario', 'componentes/subida-archivo'],
						},
						{
							label: 'Conversación',
							collapsed: true,
							items: [{ slug: 'componentes/hilo-conversacion', badge: nuevo }],
						},
					],
				},
				{
					label: 'Patrones',
					items: ['patrones/vistas-de-estado', 'patrones/filtrar-y-buscar', 'patrones/dashboard'],
				},
				{
					label: 'Diseño de página',
					items: ['layout/composicion', 'layout/cromo', 'layout/entrada', 'layout/objetivos-tactiles'],
				},
				{ label: 'Contenido', items: ['contenido/voz'] },
				{
					label: 'Recursos',
					items: [
						'recursos/tokens',
						'recursos/descargas',
						'recursos/checklist',
						'recursos/errores-comunes',
						'recursos/historial',
					],
				},
			],
		}),
	],
});
