// Copy-to-clipboard for BibTeX blocks on publication detail pages.
document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-target]");
  if (!button) return;

  const target = document.getElementById(button.dataset.copyTarget);
  if (!target) return;

  try {
    await navigator.clipboard.writeText(target.textContent);
    button.textContent = "Copied";
  } catch {
    button.textContent = "Copy failed";
  }
  clearTimeout(button.resetTimer);
  button.resetTimer = setTimeout(() => {
    button.textContent = "Copy";
  }, 1600);
});
