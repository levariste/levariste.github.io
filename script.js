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
darkThemeButton.addEventListener("click", toggleTheme);
lightThemeButton.addEventListener("click", toggleTheme);
