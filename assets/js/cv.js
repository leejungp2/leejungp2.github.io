(function () {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll('.cv-section').forEach(function (section) {
    if (section.getBoundingClientRect().top < window.innerHeight - 36) return;
    section.classList.add('is-pending');
    observer.observe(section);
  });
})();
