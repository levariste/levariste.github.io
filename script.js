const darkThemeButton = document.getElementById("dark-theme");
const lightThemeButton = document.getElementById("light-theme");
const logo = document.getElementById("logo");

(function preloadLogos() {
  const logoPaths = [
    "../images/logo_bis.svg",
    "../images/logo_ter.svg",
    "../images/logo.svg",
  ];
  logoPaths.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
})();

function detectDeviceType() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const orientation = width > height ? "landscape" : "portrait";

  document.body.setAttribute("data-orientation", orientation);

  if (width <= 480) {
    document.body.setAttribute("data-device", "mobile");
  } else if (width <= 768) {
    document.body.setAttribute("data-device", "tablet");
  } else if (width <= 1200) {
    document.body.setAttribute("data-device", "laptop");
  } else {
    document.body.setAttribute("data-device", "desktop");
  }

  adjustParallaxForOrientation(orientation);
}

function adjustParallaxForOrientation(orientation) {
  const header = document.querySelector("header");
  if (!header) return;

  const deviceType = document.body.getAttribute("data-device");

  if (deviceType === "mobile" || deviceType === "tablet") {
    if (orientation === "landscape") {
      header.style.minHeight = deviceType === "mobile" ? "4em" : "8em";
    } else {
      header.style.minHeight = "";
    }

    header.style.transform = "translateY(0)";
    function detectDeviceType() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? "landscape" : "portrait";

      document.body.setAttribute("data-orientation", orientation);

      if (width <= 480) {
        document.body.setAttribute("data-device", "mobile");
      } else if (width <= 768) {
        document.body.setAttribute("data-device", "tablet");
      } else if (width <= 1200) {
        document.body.setAttribute("data-device", "laptop");
      } else {
        document.body.setAttribute("data-device", "desktop");
      }

      adjustParallaxForOrientation(orientation);
    }

    function adjustParallaxForOrientation(orientation) {
      const header = document.querySelector("header");
      if (!header) return;

      const deviceType = document.body.getAttribute("data-device");

      if (deviceType === "mobile" || deviceType === "tablet") {
        if (orientation === "landscape") {
          header.style.minHeight = deviceType === "mobile" ? "4em" : "8em";
        } else {
          header.style.minHeight = "";
        }

        header.style.transform = "translateY(0)";
        header.style.backgroundPosition = "center 0";
      }
    }

    header.style.backgroundPosition = "center 0";
  }
}

let lastScrollTime = 0;
function parallaxHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  const scrollPosition = window.scrollY || window.pageYOffset;
  const deviceType = document.body.getAttribute("data-device");
  const orientation = document.body.getAttribute("data-orientation");

  if (scrollPosition >= window.innerHeight) return;

  let parallaxFactor = 0.15;
  let bgPositionFactor = 0.3;

  switch (deviceType) {
    case "mobile":
    case "tablet":
      parallaxFactor = 0.1;
      bgPositionFactor = 0.15;
      break;
    case "laptop":
      parallaxFactor = 0.12;
      bgPositionFactor = 0.25;
      break;
  }

  window.requestAnimationFrame(() => {
    header.style.transform = `translateY(${scrollPosition * parallaxFactor}px)`;
    header.style.backgroundPosition = `center ${
      scrollPosition * bgPositionFactor
    }px`;
  });
}

function changeLogoWithFade(newLogoSrc) {
  const logo = document.getElementById("logo");
  if (logo.src.includes(newLogoSrc)) return;
  logo.classList.add("fade-out");
  setTimeout(() => {
    logo.src = newLogoSrc;
    logo.classList.remove("fade-out");
    logo.classList.add("fade-in");
    setTimeout(() => {
      logo.classList.remove("fade-in");
    }, 140);
  }, 10);
}

function lightTheme() {
  document.body.classList.remove("dark-mode");
  darkThemeButton.style.display = "inline-block";
  lightThemeButton.style.display = "none";
  localStorage.setItem("theme", "light");

  document.body.style.transition = "background-color 0.5s ease-in-out";

  if (logo) {
    setTimeout(() => {
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html"
      ) {
        changeLogoWithFade("images/logo_bis.svg");
      } else {
        changeLogoWithFade("../images/logo_bis.svg");
      }
    }, 0);
  }
}

function darkTheme() {
  document.body.classList.add("dark-mode");
  darkThemeButton.style.display = "none";
  lightThemeButton.style.display = "inline-block";
  localStorage.setItem("theme", "dark");
  document.body.style.transition = "background-color 0.5s ease-in-out";

  if (logo) {
    setTimeout(() => {
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html"
      ) {
        changeLogoWithFade("images/logo_ter.svg");
      } else {
        changeLogoWithFade("../images/logo_ter.svg");
      }
    }, 0);
  }
}

if (darkThemeButton) darkThemeButton.addEventListener("click", darkTheme);
if (lightThemeButton) lightThemeButton.addEventListener("click", lightTheme);

let scrollTimeout;
let lastKnownScroll = 0;
let ticking = false;

function optimizedScroll() {
  const deviceType = document.body.getAttribute("data-device");

  let throttleDelay = 1;

  switch (deviceType) {
    case "mobile":
      throttleDelay = 60;
      break;
    case "tablet":
      throttleDelay = 30;
      break;
    case "laptop":
      throttleDelay = 10;
      break;
    default:
      throttleDelay = 1;
  }

  window.addEventListener(
    "scroll",
    () => {
      lastKnownScroll = window.scrollY || window.pageYOffset;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            parallaxHeader();
          }, throttleDelay);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

optimizedScroll();

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    detectDeviceType();

    parallaxHeader();

    document.body.classList.add("resizing");
    setTimeout(() => {
      document.body.classList.remove("resizing");
    }, 300);
  }, 100);
});

document.addEventListener("DOMContentLoaded", () => {
  detectDeviceType();
  parallaxHeader();
});

const localTheme = localStorage.getItem("theme");
if (localTheme === "dark") {
  darkTheme();
} else {
  lightTheme();
}

const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme");
if (theme === "dark") {
  darkTheme();
} else if (theme === "light") {
  lightTheme();
}

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  const root = window.location.href.split("/").slice(0, -1).join("/");

  function redirect(preference) {
    if (preference.includes("fr")) {
      window.location.href = root + "/fr";
    } else if (preference.includes("en")) {
      window.location.href = root + "/en";
    } else if (preference.includes("es")) {
      window.location.href = root + "/sp";
    } else if (preference.includes("it")) {
      window.location.href = root + "/it";
    }
  }

  const language = navigator.language || navigator.userLanguage;
}
