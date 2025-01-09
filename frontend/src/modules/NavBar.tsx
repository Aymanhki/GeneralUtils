import { Router } from './Router.tsx';
import { globals } from "../services/globals-service.tsx";
import '../styles/navbar.css';

export function createNavBar(): HTMLElement
{
	const nav = document.createElement( 'nav' );
	let isOpen = false;

	nav.innerHTML = `

		${ globals.isDarkMode ? `<img src="/assets/logo/utils-logo-for-dark-mode.svg" alt="Utils Logo" class="logo">` :
		 `<img src="/assets/logo/utils-logo-for-light-mode.svg" alt="Utils Logo" class="logo">` }
		

		${ globals.isMobile ?

		`
				<div class="nav-links-container">
					<button class='hamburger-menu' id="hamburger-menu">
						<span class="bar bar1"></span>
						<span class="bar bar2"></span>
						<span class="bar bar3"></span>
					</button>
				</div>

				<div class="side-pane" id="side-pane">
	                <div class="side-links">
	                    <a href="/get-link" data-link>Get Link</a>
	                    <a href="/convert-file" data-link>Convert File</a>
	                    <a href="/board" data-link>Board</a>
	                    <a href="/download-media" data-link>Download Link</a>
	                    ${ !globals.user ? `<a href="/donate" data-link>Donate</a>` : '' }
	                    ${ globals.user ? `
							${ globals.isDarkMode ?
							`<img src="/assets/images/default_pfp-for-dark-mode.svg" alt="Profile Picture" class="pfp-img">` :
							`<img src="/assets/images/default_pfp-for-light-mode.svg" alt="Profile Picture" class="pfp-img">` }` :
			
							`<a href="/signin" data-link>Sign In</a>` }
	                </div>
            	</div>
			`

		:

		`
			<div class="nav-links-container">
				<a href="/get-link" data-link>Get Link</a>
				<a href="/convert-file" data-link>Convert File</a>
				<a href="/board" data-link>Board</a>
				<a href="/download-media" data-link>Download Link</a>
				${ !globals.user ? `<a href="/donate" data-link>Donate</a>` : '' }
				
				${ globals.user ? `
					${ globals.isDarkMode ?
					`<img src="/assets/images/default_pfp-for-dark-mode.svg" alt="Profile Picture" class="pfp-img">` :
					`<img src="/assets/images/default_pfp-for-light-mode.svg" alt="Profile Picture" class="pfp-img">` }` :
	
					`<a href="/signin" data-link>Sign In</a>` }
			</div>
			`
	}


			`;


	nav.className = 'navbar';

	const hamburgerButton = nav.querySelector( '#hamburger-menu' ) as HTMLElement;
	const sidePane = nav.querySelector( '#side-pane' ) as HTMLElement;

	if ( hamburgerButton )
	{
		hamburgerButton.addEventListener( 'click', () =>
		{
			isOpen = !isOpen;
			hamburgerButton.classList.toggle( 'open', isOpen );
			sidePane.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
		} );
	}

	nav.addEventListener( 'click', ( e ) =>
	{
		e.preventDefault();
		const target = e.target as HTMLElement;

		if ( target.tagName === 'A' && target.hasAttribute( 'data-link' ) )
		{
			const href = target.getAttribute( 'href' );

			if ( href )
			{
				if (globals.isMobile && isOpen)
				{
					isOpen = !isOpen;
					hamburgerButton.classList.toggle( 'open', isOpen );
					sidePane.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
				}
				
				setTimeout( () => {
					window.history.pushState( {}, '', href );
					Router();
				}, 100 );

			}
		}
		else if ( target.tagName === 'IMG' )
		{
			if (globals.isMobile && isOpen)
			{
				isOpen = !isOpen;
				hamburgerButton.classList.toggle( 'open', isOpen );
				sidePane.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)';
			}
			
			setTimeout( () =>
			{
				window.history.pushState( {}, '', '/' );
				Router();
			}, 100 );
		}
	} );

	return nav;
}

