export function updateDocumentTitle( title: string )
{
	document.title = title;
}

export function updateMetaDescription( description: string )
{
	let meta = document.querySelector( 'meta[name="description"]' ) as HTMLMetaElement;
	if ( !meta )
	{
		meta = document.createElement( 'meta' );
		meta.name = 'description';
		document.head.appendChild( meta );
	}
	meta.setAttribute( 'content', description );
}

export function updateMetaKeywords( keywords: string )
{
	let meta = document.querySelector( 'meta[name="keywords"]' ) as HTMLMetaElement;
	if ( !meta )
	{
		meta = document.createElement( 'meta' );
		meta.name = 'keywords';
		document.head.appendChild( meta );
	}
	meta.setAttribute( 'content', keywords );
}

export function updateMetaAuthor( author: string )
{
	let meta = document.querySelector( 'meta[name="author"]' ) as HTMLMetaElement;
	if ( !meta )
	{
		meta = document.createElement( 'meta' );
		meta.name = 'author';
		document.head.appendChild( meta );
	}
	meta.setAttribute( 'content', author );
}


