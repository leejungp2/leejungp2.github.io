(function () {
  var counter = document.querySelector(".visitor-counter");
  if (!counter) return;

  var siteUrl = counter.dataset.siteUrl;
  var site = new URL(siteUrl);
  if (site.protocol !== "https:" || window.location.origin !== site.origin) return;

  var endpoint = new URL("https://hitscounter.dev/api/hit");
  endpoint.searchParams.set("url", siteUrl);
  endpoint.searchParams.set("tz", "Asia/Seoul");
  endpoint.searchParams.set("output", "json");

  fetch(endpoint, { cache: "no-store", referrerPolicy: "no-referrer" })
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load page views");
      return response.json();
    })
    .then(function (data) {
      if (
        !Number.isSafeInteger(data.today_hits) || data.today_hits < 0 ||
        !Number.isSafeInteger(data.total_hits) || data.total_hits < 0
      ) throw new Error("Invalid page view counts");

      counter.querySelector("[data-views-today]").textContent = data.today_hits.toLocaleString("en-US");
      counter.querySelector("[data-views-total]").textContent = data.total_hits.toLocaleString("en-US");
    })
    .catch(function () {
      counter.title = "Page view counts are temporarily unavailable";
    });
})();
