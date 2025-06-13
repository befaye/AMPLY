function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Optional: Close dropdown if clicking outside
window.addEventListener("click", function (e) {
  const avatar = document.querySelector(".avatar-icon");
  const dropdown = document.getElementById("dropdownMenu");
  if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});
