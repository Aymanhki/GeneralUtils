import { updateDocumentTitle } from "../services/seo-service.tsx";

export function DownloadMedia(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Download Media' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Download Link Page</h1>
							<p>This Page is under construction</p>
						</div>`;
	return element;
}
