import { updateDocumentTitle } from "../services/seo-service.tsx";
import { Router } from "../modules/Router.tsx";
import '../styles/sign-in.css';
import { signIn} from "../services/session-service.tsx";


function onSubmit(event: Event): void {
	event.preventDefault();
	const form = event.target as HTMLFormElement;
	const usernameInput = form.querySelector('#username') as HTMLInputElement;
	const passwordInput = form.querySelector('#password') as HTMLInputElement;
	const formError = document.querySelector('.sign-in-form-error') as HTMLElement;
	
	usernameInput.setCustomValidity('');
	passwordInput.setCustomValidity('');
	
	if (!usernameInput.checkValidity() || !passwordInput.checkValidity()) {
		form.reportValidity();
		return;
	}
	
	signIn(usernameInput.value, passwordInput.value)
		.then(() => {
			window.history.pushState({}, '', '/');
			Router();
		})
		.catch((error) => {
			formError.textContent = error.message;
		});
}

export function SignIn(): HTMLElement
{
	updateDocumentTitle( 'General Utils | Sign In' );
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>Sign In</h1>
							
							<form id="sign-in-form">
								<div class="form-group">
									<label for="username">Username:</label>
									<input type="text" id="username" name="username" required>
								</div>
								
								<div class="form-group">
									<label for="password">Password:</label>
									<input type="password" id="password" name="password" required>
								</div>
							
								<button type="submit">Sign In</button>
							</form>
							
							<p class="sign-in-form-error"></p>
							
							<div class="sign-up-link-container">
								<p>Don't have an account?</p>
								<strong class="hyper-link-text" id="signup-btn">Sign Up</strong>
							</div>
						</div>`;
	
	
	const signupBtn = element.querySelector('#signup-btn') as HTMLButtonElement;
	signupBtn.onclick = () => {
		window.history.pushState( {}, '', '/signup' );
		Router();
	};
	
	const form = element.querySelector( '#sign-in-form' ) as HTMLFormElement;
	form.onsubmit = onSubmit;
	
	return element;
}
