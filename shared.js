// Update active nav link based on current page
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

// Hamburger Menu
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex"
  })
}

// Close menu when link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.style.display = "none"
  })
})

// Initialize on page load
window.addEventListener("load", () => {
  updateActiveNavLink()
})
