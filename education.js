document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const tabName = this.dataset.tab

    // Hide all tab panes
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.remove("active")
    })

    // Remove active class from all buttons
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.remove("active")
    })

    // Show selected tab
    document.getElementById(tabName).classList.add("active")
    this.classList.add("active")
  })
})
