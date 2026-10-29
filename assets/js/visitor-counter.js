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

  var storageKey = "visitor-counter:" + siteUrl;

  function render(data) {
    counter.querySelector("[data-views-today]").textContent = data.today_hits.toLocaleString("en-US");
    counter.querySelector("[data-views-total]").textContent = data.total_hits.toLocaleString("en-US");
  }

  async function countVisit() {
    var day = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit"
    }).format(new Date());
    var saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && saved.day === day) {
      render(saved);
      return;
    }

    var response = await fetch(endpoint, { cache: "no-store", referrerPolicy: "no-referrer" });
    if (!response.ok) throw new Error("Could not load visit counts");
    var data = await response.json();
    if (
      !Number.isSafeInteger(data.today_hits) || data.today_hits < 0 ||
      !Number.isSafeInteger(data.total_hits) || data.total_hits < 0
    ) throw new Error("Invalid visit counts");

    localStorage.setItem(storageKey, JSON.stringify({
      day: day, today_hits: data.today_hits, total_hits: data.total_hits
    }));
    render(data);
  }

  // Serialize first visits from multiple tabs before checking the shared cache.
  var visit = navigator.locks
    ? navigator.locks.request(storageKey, countVisit)
    : countVisit();
  visit.catch(function () {
    counter.title = "Visit counts are temporarily unavailable";
  });
})();
