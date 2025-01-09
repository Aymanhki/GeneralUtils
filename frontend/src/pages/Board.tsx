import { updateDocumentTitle } from "../services/seo-service.tsx";

export function Board(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Board' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Board Page</h1>
							<p>This Page is under construction</p>
						</div>`;
	return element;
}
