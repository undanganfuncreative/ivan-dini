/**
 * Konfigurasi runtime Elementor.
 *
 * Skrip Elementor (assets/vendor/elementor*) membaca dua objek global ini
 * saat halaman dimuat: breakpoint responsif, lokasi berkas, dan pengaturan
 * lightbox galeri. Harus dimuat sebelum skrip Elementor.
 */

window.elementorFrontendConfig = {
  environmentMode: { edit: false, wpPreview: false, isScriptDebug: false },
  version: "4.2.3",
  is_rtl: false,
  is_static: false,

  // lokasi berkas, relatif terhadap index.html
  urls: {
    assets: "assets/vendor/elementor/",
    uploadUrl: "assets/images",
    ajaxurl: "",
  },

  // teks tombol pada lightbox galeri
  i18n: {
    shareOnFacebook: "Bagikan di Facebook",
    shareOnX: "Bagikan di X",
    pinIt: "Buat Pin",
    download: "Unduh",
    downloadImage: "Unduh gambar",
    fullscreen: "Layar Penuh",
    zoom: "Perbesar",
    share: "Bagikan",
    playVideo: "Putar Video",
    previous: "Sebelumnya",
    next: "Selanjutnya",
    close: "Tutup",
    a11yCarouselPrevSlideMessage: "Slide sebelumnya",
    a11yCarouselNextSlideMessage: "Slide selanjutnya",
    a11yCarouselFirstSlideMessage: "Ini slide pertama",
    a11yCarouselLastSlideMessage: "Ini slide terakhir",
    a11yCarouselPaginationBulletMessage: "Ke slide",
  },

  breakpoints: { xs: 0, sm: 480, md: 768, lg: 1025, xl: 1440, xxl: 1600 },
  responsive: {
    hasCustomBreakpoints: false,
    breakpoints: {
      mobile: {
        label: "Mobile Portrait",
        value: 767,
        default_value: 767,
        direction: "max",
        is_enabled: true,
      },
      mobile_extra: {
        label: "Mobile Landscape",
        value: 880,
        default_value: 880,
        direction: "max",
        is_enabled: false,
      },
      tablet: {
        label: "Tablet Portrait",
        value: 1024,
        default_value: 1024,
        direction: "max",
        is_enabled: true,
      },
      tablet_extra: {
        label: "Tablet Landscape",
        value: 1200,
        default_value: 1200,
        direction: "max",
        is_enabled: false,
      },
      laptop: {
        label: "Laptop",
        value: 1366,
        default_value: 1366,
        direction: "max",
        is_enabled: false,
      },
      widescreen: {
        label: "Layar lebar",
        value: 2400,
        default_value: 2400,
        direction: "min",
        is_enabled: false,
      },
    },
  },

  experimentalFeatures: {
    additional_custom_breakpoints: true,
    container: true,
    "nested-elements": true,
  },

  // pengaturan global: lightbox galeri
  kit: {
    active_breakpoints: ["viewport_mobile", "viewport_tablet"],
    global_image_lightbox: "yes",
    lightbox_enable_counter: "yes",
    lightbox_enable_fullscreen: "yes",
    lightbox_enable_zoom: "yes",
    lightbox_enable_share: "",
    lightbox_title_src: "",
    lightbox_description_src: "",
  },

  swiperClass: "swiper",
  nonces: {},
  settings: { page: [], editorPreferences: [] },
  post: { id: 27243, title: "", excerpt: "", featuredImage: "" },
};

window.ElementorProFrontendConfig = {
  urls: { assets: "assets/vendor/elementor-pro/", rest: "" },
  ajaxurl: "",
  nonce: "",
  settings: { lazy_load_background_images: false },
  popup: { hasPopUps: false },
  shareButtonsNetworks: {},
  facebook_sdk: { lang: "id_ID", app_id: "" },
  lottie: { defaultAnimationUrl: "" },
};
