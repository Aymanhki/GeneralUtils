import '../styles/footer.css';

export function createFooter(): HTMLElement
{
	const footer = document.createElement( 'footer' );
	footer.className = 'footer';
	
	footer.innerHTML = `<div class="footer-content">
							<p class="copyright">
								© 2024 aymanhki. All rights reserved.
							</p>
						</div>`;
	
	// TODO: Add footer links (github, linkedin, etc.)
	
	return footer;
	
}
