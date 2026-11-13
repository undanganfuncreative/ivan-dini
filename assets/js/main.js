/**
 * Undangan Pernikahan Ivan & Dinni — skrip halaman
 *
 * 1. Tinggi layar (--vh) untuk browser mobile
 * 2. Cover: halaman terkunci sampai tombol "Buka Undangan" ditekan
 * 3. Musik latar: jeda saat tab ditinggalkan, lanjut saat kembali
 * 4. Amplop digital: tampil/sembunyikan detail rekening
 * 5. Video pembuka: diputar setelah cover dibuka (lihat bagian "Mulai")
 */
(function () {
  "use strict";

  var COVER_DURATION = 1500; // ms, samakan dengan transisi di main.css

  /* 1. Tinggi layar
     100vh di browser mobile ikut menghitung address bar, jadi pakai --vh. */

  function setViewportHeight() {
    document.documentElement.style.setProperty(
      "--vh",
      window.innerHeight * 0.01 + "px",
    );
  }

  setViewportHeight();
  window.addEventListener("resize", setViewportHeight);

  /* 2. Cover */

  function lockPage() {
    var x = window.scrollX;
    var y = window.scrollY;

    window.onscroll = function () {
      window.scrollTo(x, y);
    };
    document.body.classList.add("is-cover-locked");
  }

  function openCover() {
    window.onscroll = null;
    document.body.classList.remove("is-cover-locked");
    document.body.classList.add("is-cover-open");

    setTimeout(function () {
      document.body.classList.add("is-cover-closed");
    }, COVER_DURATION);
  }

  /* 3. Musik latar */

  var resumeOnReturn = false;

  function getAudio() {
    return document.querySelector(".idb-audio-box .idb-audio-el");
  }

  function getPlayButton() {
    return document.querySelector(".idb-audio-box .idb-mute-sound");
  }

  function startMusic() {
    // izin untuk widget musik: pemutaran dipicu oleh klik pengunjung
    window.__BISDEV_MUSIC_ALLOWED = true;

    var button = getPlayButton();
    var audio = getAudio();

    if (button) {
      button.click();
    } else if (audio) {
      audio.play().catch(function () {});
    }
  }

  function pauseMusic() {
    var audio = getAudio();
    if (!audio || audio.paused) return;

    resumeOnReturn = true;
    audio.pause();
  }

  function resumeMusic() {
    var audio = getAudio();
    if (!audio || !resumeOnReturn) return;

    resumeOnReturn = false;
    window.__BISDEV_MUSIC_ALLOWED = true;

    audio.play().catch(function () {
      // browser menolak: beri tanda pada tombol musik
      var button = getPlayButton();
      if (!button) return;

      button.classList.add("idb-attention");
      setTimeout(function () {
        button.classList.remove("idb-attention");
      }, 2500);
    });
  }

  function resumeMusicSoon() {
    setTimeout(resumeMusic, 200);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      pauseMusic();
    } else {
      resumeMusicSoon();
    }
  });
  window.addEventListener("blur", pauseMusic);
  window.addEventListener("focus", resumeMusicSoon);

  /* 4. Amplop digital */

  function bindGiftToggle() {
    var $ = window.jQuery;
    if (!$) return;

    $("#klik").on("click", function (event) {
      event.preventDefault();
      $("#amplop").toggle(500);
    });
  }

  /* Mulai */

  document.addEventListener("DOMContentLoaded", function () {
    var openButton = document.getElementById("open");
    var video = document.querySelector(
      ".slideAwal .elementor-background-video-container video",
    );

    lockPage();
    bindGiftToggle();

    // video pembuka baru diputar setelah cover dibuka, bukan saat halaman dimuat
    if (video) video.removeAttribute("autoplay");

    if (!openButton) return;

    openButton.addEventListener(
      "click",
      function () {
        openCover();
        startMusic();
        if (video && video.paused) video.play().catch(function () {});
      },
      { once: true },
    );
  });
})();
