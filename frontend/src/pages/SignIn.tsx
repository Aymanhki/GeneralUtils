import { updateDocumentTitle } from "../services/seo-service.tsx";
import { Router } from "../modules/Router.tsx";

export function SignIn(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Sign In' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Sign In Page</h1>
							<p>This Page is under construction</p>
							<button id="signup-btn">Sign Up</button>
						</div>`;
	
	
	const signupBtn = element.querySelector('#signup-btn') as HTMLButtonElement;
	signupBtn.onclick = () => {
		window.history.pushState( {}, '', '/signup' );
		Router();
	};
	
	return element;
}
