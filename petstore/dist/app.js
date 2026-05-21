const yearTarget = document.querySelector('#current-year');

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

const isLocalFilePreview = window.location.protocol === 'file:';

if (isLocalFilePreview) {
  document.querySelectorAll('[data-local-href]').forEach((link) => {
    link.setAttribute('href', link.getAttribute('data-local-href'));
  });
}

const destinationLinks = document.querySelectorAll('[data-track]');

destinationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const destination = link.getAttribute('data-track');
    if (destination) {
      console.debug(`[navigation] opening ${destination}`);
    }
  });
});
