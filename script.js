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

let lastScrollTime = 0;
function parallaxHeader() {
  const header = document.querySelector("header");
  const scrollPosition = window.pageYOffset;

  if (header && scrollPosition < window.innerHeight) {
    window.requestAnimationFrame(() => {
      header.style.transform = `translateY(${scrollPosition * 0.15}px)`;
      header.style.backgroundPosition = `center ${scrollPosition * 0.3}px`;
    });
  }
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
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    parallaxHeader();
  }, 1);
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
