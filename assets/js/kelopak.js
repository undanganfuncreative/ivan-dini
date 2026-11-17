/**
 * Kelopak bunga berjatuhan — hiasan gerak di seluruh halaman.
 *
 * Bentuk, warna, dan gerakannya diatur di assets/css/percantik.css (bagian 7).
 * Untuk mematikan efek ini cukup hapus baris <script src="assets/js/kelopak.js">
 * di index.html.
 *
 * Pengaturan di bawah boleh diubah:
 */
(function () {
  "use strict";

  var JUMLAH_HP = 14; // jumlah kelopak di layar HP
  var JUMLAH_DESKTOP = 22; // jumlah kelopak di layar lebar
  var UKURAN = [10, 18]; // ukuran kelopak (px): terkecil, terbesar
  var LAMA_JATUH = [10, 18]; // lama satu kali jatuh (detik): tercepat, terlambat
  var WARNA = [
    ["#f6cfc8", "#d98c8c"], // merah muda
    ["#f2b8b5", "#b5545a"], // merah muda tua
    ["#c25a60", "#7c2527"], // marun
    ["#f5e3c0", "#d9b77e"], // krem keemasan
  ];

  // pengunjung yang mematikan animasi di perangkatnya: tidak ada kelopak
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  function acak(min, max) {
    return min + Math.random() * (max - min);
  }

  function buatKelopak() {
    var jatuh = document.createElement("span");
    var ayun = document.createElement("span");
    var kelopak = document.createElement("span");
    var ukuran = acak(UKURAN[0], UKURAN[1]);
    var lama = acak(LAMA_JATUH[0], LAMA_JATUH[1]);
    var warna = WARNA[Math.floor(Math.random() * WARNA.length)];

    jatuh.className = "pc-kelopak";
    jatuh.style.left = acak(0, 100) + "%";
    jatuh.style.animationDuration = lama + "s";
    // jeda negatif: kelopak langsung tersebar, tidak jatuh serempak dari atas
    jatuh.style.animationDelay = -acak(0, lama) + "s";
    jatuh.style.setProperty("--pc-geser", acak(-60, 60) + "px");

    ayun.className = "pc-kelopak__ayun";
    ayun.style.animationDuration = acak(2.5, 4.5) + "s";
    ayun.style.animationDelay = -acak(0, 4) + "s";

    kelopak.className = "pc-kelopak__bentuk";
    kelopak.style.width = ukuran + "px";
    kelopak.style.height = ukuran * 1.3 + "px";
    kelopak.style.background =
      "linear-gradient(135deg, " + warna[0] + ", " + warna[1] + ")";
    kelopak.style.opacity = acak(0.55, 0.9).toFixed(2);
    kelopak.style.animationDuration = acak(3, 6) + "s";
    kelopak.style.animationDelay = -acak(0, 6) + "s";

    ayun.appendChild(kelopak);
    jatuh.appendChild(ayun);
    return jatuh;
  }

  function mulai() {
    var wadah = document.createElement("div");
    var jumlah = window.innerWidth < 768 ? JUMLAH_HP : JUMLAH_DESKTOP;

    wadah.className = "pc-kelopak-wadah";
    wadah.setAttribute("aria-hidden", "true");

    for (var i = 0; i < jumlah; i++) {
      wadah.appendChild(buatKelopak());
    }
    document.body.appendChild(wadah);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mulai);
  } else {
    mulai();
  }
})();
