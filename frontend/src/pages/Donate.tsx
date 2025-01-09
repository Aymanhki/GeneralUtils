import { updateDocumentTitle } from "../services/seo-service.tsx";




export function Donate(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Donate' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Donate Page</h1>
							<p>This Page is under construction</p>
						</div>`;
	return element;
}
