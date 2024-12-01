import { updateDocumentTitle } from "../services/seo-service.tsx";


export function ConvertFile(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Convert File' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Convert File Page</h1>
							<p>This Page is under construction</p>
						</div>`;
	return element;
}
