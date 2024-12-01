import { updateDocumentTitle } from "../services/seo-service.tsx";


export function GetLink(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Get Link' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Get Link Page</h1>
							<p>This Page is under construction</p>
						</div>`;
	return element;
}
