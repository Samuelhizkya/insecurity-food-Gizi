function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.dataset.target)
    let current = 0
    const increment = target / 30

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        stat.textContent = target
        clearInterval(timer)
      } else {
        stat.textContent = Math.floor(current)
      }
    }, 50)
  })
}

// Trigger animation when page loads
window.addEventListener("load", () => {
  setTimeout(animateStats, 500)
})
