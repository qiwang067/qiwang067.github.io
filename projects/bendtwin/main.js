'use strict';
const copyButton = document.getElementById('copy-citation');
const citation = document.getElementById('citation');
const copyStatus = document.getElementById('copy-status');
if (copyButton && citation && copyStatus) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    copyButton.disabled = true;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(citation.textContent.trim());
      copyStatus.textContent = 'Citation copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(citation);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      copyStatus.textContent = 'Automatic copy is unavailable. Select the citation and press Ctrl+C or ⌘C to copy.';
    } finally {
      copyButton.disabled = false;
    }
  });
}

const moreResearch = document.querySelector('.more-research');
if (moreResearch) {
  document.addEventListener('click', (event) => {
    if (!moreResearch.contains(event.target)) moreResearch.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && moreResearch.open) {
      const focusWasInside = moreResearch.contains(document.activeElement);
      moreResearch.open = false;
      if (focusWasInside) moreResearch.querySelector('summary').focus();
    }
  });
}

const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  const updateBackToTop = () => {
    backToTop.hidden = window.scrollY <= 300;
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  window.addEventListener('pageshow', updateBackToTop);
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    const topLink = document.querySelector('.project-name');
    if (topLink) topLink.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  });
}
