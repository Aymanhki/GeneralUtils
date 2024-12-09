import { API_URL } from "./globals-service.tsx";


export async function checkSession(): Promise<any>
{
	try
	{
		const session = document.cookie.match( /(^| )general-utils-session-id=([^;]+)/ );
		const sessionValue = session ? session[ 2 ] : null;
		
		if ( !sessionValue )
		{
			return Promise.resolve( null );
		}
		
		let response = await fetch( `${ API_URL }/auth/check-session`, {
			headers: {
				Authorization: `Bearer ${ sessionValue }`,
			},
		} );

		if ( !response.ok )
		{
			const errorData = `${ response.status } ${ response.statusText } ${ await response.text() }`;
			throw new Error( errorData || 'An error occurred' );
		}
		
		return await response.json();
	} catch ( error ) {
		console.error( error );
	}
}


export async function signIn( username: string, password: string )
{
	try
	{
		const response = await fetch( `${ API_URL }/auth/sign-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { username, password } ),
		} );
		
		
		if ( !response.ok ) {
			const errorData = `${ response.status } ${ response.statusText } ${ await response.text() }`;
			throw new Error( errorData || 'An error occurred' );
		}
		
		const data = await response.json();
		
		await signOut();
		document.cookie = `general-utils-session-token=${ JSON.stringify( data ) }; path=/ expires=${ new Date( Date.now() + 1000 * 60 * 60 * 24 * 7 ).toUTCString() }`;
		
		return data;
	} catch ( error ) {
		console.error( error );
		return error;
	}
}

export async function signOut()
{
	document.cookie = 'general-utils-session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export async function signUp( username: string, password: string )
{
	try
	{
		
		
		const response = await fetch( `${ API_URL }/auth/sign-up`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { username, password } ),
		} );
		
		const data = await response.json();
		
		if ( !response.ok )
		{
			const errorData = `${ response.status } ${ response.statusText } ${ await response.text() }`;
			throw new Error( errorData || 'An error occurred' );
		}
		
		const session_id = data.session_id;
		document.cookie = `general-utils-session-id=${ session_id }; path=/; expires=${ new Date( Date.now() + 1000 * 60 * 60 * 24 * 7 ).toUTCString() }`;
		
		return data;
	} catch ( error ) {
		console.error( error );
	}
}
