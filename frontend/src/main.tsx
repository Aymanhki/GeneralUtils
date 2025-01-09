import { Router } from './modules/Router.tsx';

export async function Main(): Promise<void>
{
	await Router();
	window.addEventListener( 'popstate', Router );
}
