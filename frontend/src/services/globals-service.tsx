import { createNavBar } from "../modules/NavBar.tsx"

export const API_URL: string = 'http://127.0.0.1:8080/api';

export const globals = {
	user: null as any,
	listeners: [] as ((user: any) => void)[],
	setUser(newUser: any) {
		this.user = newUser;
		this.listeners.forEach((listener) => listener(newUser));
	},
	onUserChange(listener: (user: any) => void) {
		this.listeners.push(listener);
	},
	isMobile: window.innerWidth < 768,
	isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
}



export function updateUser(newUser: any): void {
	globals.setUser(newUser);
}

function updateIsMobile() {
	globals.isMobile = window.innerWidth < 768;
	const nav = document.querySelector('.navbar') as HTMLElement;
	if (nav) {
		nav.replaceWith(createNavBar());
	}
}

function updateFavicon() {
	const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
	if (favicon) {
		favicon.href = globals.isDarkMode
			? '/assets/logo/utils-logo-for-dark-mode.svg'
			: '/assets/logo/utils-logo-for-light-mode.svg';
	}
}

function updateIsDarkMode(event: MediaQueryListEvent) {
	globals.isDarkMode = event.matches;
	const nav = document.querySelector('.navbar') as HTMLElement;
	if (nav) {
		nav.replaceWith(createNavBar());
	}
	updateFavicon();
}

window.addEventListener('resize', updateIsMobile);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateIsDarkMode);

