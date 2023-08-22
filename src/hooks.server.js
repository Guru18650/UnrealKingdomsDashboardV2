export async function handle({ event, resolve }) {
	return await resolve(event, {transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${event.url.pathname.startsWith("/admin") ? "wintry" : "modern"}"`)});
}
