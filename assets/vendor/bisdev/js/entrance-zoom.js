(function () {
  if (window.__idbBisdevEntranceZoomInit) return;
  window.__idbBisdevEntranceZoomInit = true;
  var selVisible =
    ".idb-copy-rek.elementor-invisible[data-settings], .idb-kirim-hadiah.elementor-invisible[data-settings]";
  var selAll =
    ".idb-copy-rek[data-settings], .idb-kirim-hadiah[data-settings]";
  var zoomCycle = 1;
  function parseSettings(el) {
    var raw = el.getAttribute("data-settings") || "{}";
    try {
      return JSON.parse(raw);
    } catch (e) {
      return {};
    }
  }
  function applyZoom(scope) {
    var root =
      scope && scope.querySelectorAll ? scope : document;
    var items = root.querySelectorAll(selVisible);
    items.forEach(function (el) {
      if ((el.__idbZoomCycleApplied || 0) >= zoomCycle)
        return;
      var st = parseSettings(el);
      var anim = (st._animation || "zoomIn").toString();
      var delay =
        parseInt(st._animation_delay || 0, 10) || 0;
      if (!el.__idbEverShown)
        delay = Math.max(0, delay - 20);
      if (el.offsetParent === null) return;
      el.__idbZoomCycleApplied = zoomCycle;
      el.__idbEverShown = true;
      setTimeout(
        function () {
          if (
            (el.__idbZoomCycleApplied || 0) !== zoomCycle
          )
            return;
          el.classList.remove("elementor-invisible");
          el.classList.add("animated", anim);
        },
        Math.max(0, delay),
      );
    });
  }
  function replayZoom(scope) {
    var root =
      scope && scope.querySelectorAll ? scope : document;
    var items = root.querySelectorAll(selAll);
    zoomCycle += 1;
    items.forEach(function (el) {
      if (el.offsetParent === null) return;
      el.classList.remove("animated", "zoomIn");
      el.classList.add("elementor-invisible");
      el.__idbZoomCycleApplied = 0;
    });
    setTimeout(function () {
      schedule(root);
    }, 40);
  }
  function syncVisibleStateAndReplay(scope) {
    var root =
      scope && scope.querySelectorAll ? scope : document;
    var items = root.querySelectorAll(selAll);
    var shouldReplay = false;
    items.forEach(function (el) {
      var isVisible = el.offsetParent !== null;
      if (isVisible && !el.__idbWasVisible) {
        el.__idbWasVisible = true;
        shouldReplay = true;
      } else if (!isVisible && el.__idbWasVisible) {
        el.__idbWasVisible = false;
      }
    });
    if (shouldReplay) replayZoom(root);
  }
  var raf = 0;
  function schedule(scope) {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      applyZoom(scope);
    });
  }
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      schedule(document);
    },
  );
  window.addEventListener("load", function () {
    schedule(document);
  });
  document.addEventListener(
    "app:content-ready",
    function () {
      schedule(document);
    },
  );
  document.addEventListener("app:navigated", function () {
    schedule(document);
  });
  document.addEventListener(
    "idb:rekening-shown",
    function () {
      replayZoom(document);
    },
  );
  if (
    window.elementorFrontend &&
    window.elementorFrontend.hooks
  ) {
    window.elementorFrontend.hooks.addAction(
      "frontend/element_ready/global",
      function ($scope) {
        try {
          schedule(
            $scope && $scope[0] ? $scope[0] : document,
          );
        } catch (e) {
          schedule(document);
        }
      },
    );
  }
  var obs = new MutationObserver(function () {
    schedule(document);
    syncVisibleStateAndReplay(document);
  });
  obs.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["class", "style"],
  });
  syncVisibleStateAndReplay(document);
  schedule(document);
})();
