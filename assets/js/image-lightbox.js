document.addEventListener("click", (event) => {
  const link = event.target.closest(
    ".project-figure a[href], .project-media-grid a[href]"
  );
  if (!link || !/\.(?:png|jpe?g|webp|gif|svg)(?:$|\?)/i.test(link.href)) return;

  event.preventDefault();

  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.setAttribute("aria-label", "Image preview");

  const image = document.createElement("img");
  image.src = link.href;
  image.alt = link.querySelector("img")?.alt || "Enlarged project image";

  const close = document.createElement("button");
  close.className = "image-lightbox-close";
  close.type = "button";
  close.setAttribute("aria-label", "Close image preview");
  close.textContent = "×";
  close.addEventListener("click", () => dialog.close());

  dialog.append(image, close);
  dialog.addEventListener("click", (clickEvent) => {
    if (clickEvent.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => dialog.remove(), { once: true });
  document.body.append(dialog);
  dialog.showModal();
});
