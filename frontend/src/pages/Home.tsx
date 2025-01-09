import { updateDocumentTitle } from "../services/seo-service.tsx";




export function Home(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Home' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Home Page</h1>
							<p>This Page is under construction</p>
						</div>`;
	return element;
}
