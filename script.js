const darkThemeButton = document.getElementById("dark-theme");
const lightThemeButton = document.getElementById("light-theme");

function toggleTheme() {
  if (darkThemeButton.style.display === "none") {
    darkThemeButton.style.display = "block";
    lightThemeButton.style.display = "none";
  } else {
    darkThemeButton.style.display = "none";
    lightThemeButton.style.display = "block";
  }
  document.body.classList.toggle("dark-mode");
}
function lightTheme() {
  document.body.classList.remove("dark-mode");
  darkThemeButton.style.display = "block";
  lightThemeButton.style.display = "none";
  localStorage.setItem("theme", "light");
}
function darkTheme() {
  document.body.classList.add("dark-mode");
  darkThemeButton.style.display = "none";
  lightThemeButton.style.display = "block";
  localStorage.setItem("theme", "dark");
}
darkThemeButton.addEventListener("click", darkTheme);
lightThemeButton.addEventListener("click", lightTheme);

// get theme from local storage
const localTheme = localStorage.getItem("theme");
if (localTheme === "dark") {
  darkTheme();
} else {
  lightTheme();
}