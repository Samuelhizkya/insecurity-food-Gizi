function showContactForm() {
  alert("Terima kasih telah menghubungi kami! Pesan Anda akan kami proses segera.")
}

// Initialize on page load
window.addEventListener("load", () => {
  // Resources page is static, no special initialization needed
  const symbols = document.querySelectorAll(".symbol")

  symbols.forEach((symbol, index) => {
    symbol.addEventListener("mouseenter", () => {
      symbol.style.animation = "none"
      setTimeout(() => {
        symbol.style.animation = ""
      }, 10)
    })
  })
})
