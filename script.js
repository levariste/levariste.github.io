const darkTheme = document.getElementById("dark-theme");
const lightTheme = document.getElementById("light-theme");

darkTheme.style.display = "none";

function toggleTheme() {
  if (darkTheme.style.display === "none") {
    darkTheme.style.display = "block";
    lightTheme.style.display = "none";
  } else {
    darkTheme.style.display = "none";
    lightTheme.style.display = "block";
  }
  document.body.classList.toggle("dark-mode");
}
darkTheme.addEventListener("click", toggleTheme);
lightTheme.addEventListener("click", toggleTheme);
