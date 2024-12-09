import { updateDocumentTitle } from "../services/seo-service.tsx";
import { signUp } from "../services/session-service.tsx";
import { Router } from "../modules/Router.tsx";

async function onSubmit(event: Event): Promise<void> {
	event.preventDefault();
	const form = event.target as HTMLFormElement;
	const usernameInput = form.querySelector('#username') as HTMLInputElement;
	const passwordInput = form.querySelector('#password') as HTMLInputElement;
	const confirmPasswordInput = form.querySelector('#confirm-password') as HTMLInputElement;
	
	usernameInput.setCustomValidity('');
	passwordInput.setCustomValidity('');
	confirmPasswordInput.setCustomValidity('');
	
	let isValid = true;
	
	if (usernameInput.value.length < 3 || usernameInput.value.length > 20 || !/^[A-Za-z0-9]+$/.test(usernameInput.value)) {
		usernameInput.setCustomValidity('Username must be be between 3 and 20 characters long and it can only contain letters and digits.');
		isValid = false;
	}
	
	// Password validation
	if (passwordInput.value.length < 8 || passwordInput.value.length > 30 || !/[A-Z]/.test(passwordInput.value) || !/[a-z]/.test(passwordInput.value) || !/[0-9]/.test(passwordInput.value) || !/[^A-Za-z0-9]/.test(passwordInput.value)) {
		passwordInput.setCustomValidity('Password must be between 8 and 30 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
		isValid = false;
	}
	
	if (passwordInput.value !== confirmPasswordInput.value) {
		confirmPasswordInput.setCustomValidity('Passwords do not match.');
		isValid = false;
	}
	
	if (!isValid) {
		form.reportValidity();
		return;
	}
	
	signUp(usernameInput.value, passwordInput.value)
		.then(() => {
			window.history.pushState({}, '', '/');
			Router();
		})
		.catch((error) => {
			const formError = form.querySelector('.form-error') as HTMLElement;
			formError.textContent = error.message;
		});
}

export function SignUp(): HTMLElement {
	updateDocumentTitle('General Utils | Sign Up');
	
	const element = document.createElement('div');
	element.innerHTML = `
		<div class="page">
			<form id="signup-form" novalidate>
				<h1>Sign Up Page</h1>
				<div class="form-group">
					<label for="username">Username:</label>
					<input type="text" id="username" name="username" required minlength="3" pattern="^[A-Za-z0-9]+$">
				</div>
				<div class="form-group">
					<label for="password">Password:</label>
					<input type="password" id="password" name="password" required>
				</div>
				<div class="form-group">
					<label for="confirm-password">Confirm Password:</label>
					<input type="password" id="confirm-password" name="confirm-password" required>
				</div>
				
				<div class="form-group">
					<p class="form-error"></p>
				</div>
				
				<button type="submit">Sign Up</button>
				
				
			</form>
		</div>
	`;
	
	const form = element.querySelector('#signup-form') as HTMLFormElement;
	form.onsubmit = onSubmit;
	
	return element;
}
