import { API_URL } from "./globals-service.tsx";


export async function checkSession(): Promise<any>
{
	const session = document.cookie.match( /(^| )general-utils-session-token=([^;]+)/ );
	const sessionValue = session ? JSON.parse( session[2] ) : null;
	
	if ( !sessionValue )
	{
		return Promise.resolve( null );
	}
	
	let response = await fetch( `${ API_URL }/auth/check-session`, {
		headers: {
			Authorization: `Bearer ${ sessionValue.token }`,
		},
	} );
	
	let data: any = await response.json();
	if ( data.error )
	{
		throw new Error( data.error );
	}
	return sessionValue.token;
}


export async function signIn( username: string, password: string )
{
	return fetch( `${ API_URL }/auth/sign-in`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( { username, password } ),
	} )
		.then( response => response.json() )
		.then( data =>
		{
			if ( data.error )
			{
				throw new Error( data.error );
			}
			return data;
		} )
		.then( data =>
		{
			document.cookie = `general-utils-session-token=${ JSON.stringify( data ) }; path=/`;
			return data;
		} );
}

export async function signOut()
{
	document.cookie = 'general-utils-session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
	
}


