import { updateDocumentTitle } from "../services/seo-service.tsx";

export function SignUp(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Sign Up' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Sign Up Page</h1>
							<p>This Page is under construction</p>
						</div>`;
	return element;
}
