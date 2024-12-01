import { Router } from './modules/Router.tsx';
import { globals } from './services/globals-service.tsx';
import { checkSession } from "./services/session-service.tsx";

export async function Main(): Promise<void>
{
	const checkUser = await checkSession();
	globals.setUser(checkUser);
	
	Router();
	window.addEventListener( 'popstate', Router );
	
}
