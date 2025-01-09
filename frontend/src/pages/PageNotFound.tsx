
export function PageNotFound(): HTMLElement
{
	
	const element = document.createElement( 'div' );
	element.innerHTML = `<div class="page">
							<h1>404 Page Not Found</h1>
							<p>
								Could not find a page with the URL: <strong>${ window.location.pathname }</strong>
							</p>
						</div>`;
	return element;
}
