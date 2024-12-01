import { Home } from '../pages/Home';
import { SignIn } from "../pages/SignIn.tsx";
import { SignUp } from "../pages/SignUp.tsx";
import { Board } from "../pages/Board.tsx";
import { ConvertFile } from "../pages/ConvertFile.tsx";
import { DownloadMedia } from "../pages/DownloadMedia.tsx";
import { GetLink } from "../pages/GetLink.tsx";
import { createNavBar } from "./NavBar.tsx";
import { createFooter } from "./Footer.tsx";
import { Donate } from "../pages/Donate.tsx";
import { PageNotFound } from "../pages/PageNotFound.tsx";

export function Router(): void
{
	const path = window.location.pathname;
	const app = document.getElementById( 'app' );
	const nav = createNavBar();
	const footer = createFooter();
	
	if ( app )
	{
		app.innerHTML = '';
		app.appendChild( nav );
		
		switch ( path )
		{
			case '/':
				app.appendChild( Home() );
				break;
			case '/signin':
				app.appendChild( SignIn() );
				break;
			case '/signup':
				app.appendChild( SignUp() );
				break;
			case '/board':
				app.appendChild( Board() );
				break;
			case '/convert-file':
				app.appendChild( ConvertFile() );
				break;
			case '/download-media':
				app.appendChild( DownloadMedia() );
				break;
			case '/get-link':
				app.appendChild( GetLink() );
				break;
			case '/donate':
				app.appendChild( Donate() );
				break;
			default:
				app.appendChild( PageNotFound() );
				break;
		}
		
		app.appendChild( footer );
	}
	else
	{
		console.error( 'App element not found' );
	}
}

window.addEventListener( 'popstate', Router );
