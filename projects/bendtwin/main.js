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
