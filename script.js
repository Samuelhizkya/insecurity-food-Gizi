// Page Navigation
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"))

  // Show selected page
  document.getElementById(page).classList.add("active")

  // Update nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.dataset.page === page) {
      link.classList.add("active")
    }
  })

  // Scroll to top
  window.scrollTo(0, 0)

  // Initialize page-specific content
  if (page === "simulation") {
    initSimulation()
  } else if (page === "quiz") {
    initQuiz()
  }
}

// Tab Navigation
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

// Hamburger Menu
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex"
})

// Close menu when link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.style.display = "none"
  })
})

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

// Trigger animation when home page is loaded
window.addEventListener("load", () => {
  navigateTo("home")
  setTimeout(animateStats, 500)
})

// Simulation Game
const foods = [
  { name: "Nasi", price: 5000, icon: "🍚", nutrition: "Karbohidrat" },
  { name: "Telur", price: 3000, icon: "🥚", nutrition: "Protein" },
  { name: "Sayuran", price: 4000, icon: "🥬", nutrition: "Vitamin" },
  { name: "Daging", price: 8000, icon: "🍖", nutrition: "Protein" },
  { name: "Buah", price: 6000, icon: "🍎", nutrition: "Vitamin" },
  { name: "Susu", price: 7000, icon: "🥛", nutrition: "Kalsium" },
  { name: "Roti", price: 4000, icon: "🍞", nutrition: "Karbohidrat" },
  { name: "Ikan", price: 9000, icon: "🐟", nutrition: "Protein" },
]

const budget = 50000
let spent = 0
let selectedFoods = []

function initSimulation() {
  const foodGrid = document.getElementById("foodGrid")
  foodGrid.innerHTML = ""

  foods.forEach((food, index) => {
    const foodItem = document.createElement("div")
    foodItem.className = "food-item"
    foodItem.innerHTML = `
            <div class="food-icon">${food.icon}</div>
            <div class="food-name">${food.name}</div>
            <div class="food-price">Rp ${food.price.toLocaleString()}</div>
        `

    foodItem.addEventListener("click", () => {
      addFoodToCart(index)
    })

    foodGrid.appendChild(foodItem)
  })

  updateSimulationDisplay()
}

function addFoodToCart(index) {
  const food = foods[index]

  if (spent + food.price <= budget) {
    selectedFoods.push(food)
    spent += food.price
    updateSimulationDisplay()
  } else {
    alert("Anggaran tidak cukup untuk membeli " + food.name)
  }
}

function updateSimulationDisplay() {
  const remaining = budget - spent
  const percentage = (spent / budget) * 100

  document.getElementById("budgetAmount").textContent = "Rp " + budget.toLocaleString()
  document.getElementById("remainingAmount").textContent = "Rp " + remaining.toLocaleString()
  document.getElementById("progressFill").style.width = percentage + "%"
  document.getElementById("progressText").textContent = Math.round(percentage) + "%"

  let statusMessage = ""
  if (percentage === 0) {
    statusMessage = "Masih banyak pilihan"
  } else if (percentage < 50) {
    statusMessage = "Anggaran masih cukup"
  } else if (percentage < 80) {
    statusMessage = "Anggaran mulai terbatas"
  } else if (percentage < 100) {
    statusMessage = "Anggaran hampir habis"
  } else {
    statusMessage = "Anggaran habis"
  }
  document.getElementById("budgetStatus").textContent = statusMessage

  const selectedList = document.getElementById("selectedList")
  selectedList.innerHTML = ""

  selectedFoods.forEach((food, index) => {
    const item = document.createElement("div")
    item.className = "selected-item"
    item.innerHTML = `
            <span class="selected-item-name">${food.icon} ${food.name}</span>
            <div style="display: flex; gap: 1rem; align-items: center;">
              <span class="selected-item-price">Rp ${food.price.toLocaleString()}</span>
              <button class="selected-item-remove" onclick="removeFoodFromCart(${index})">Hapus</button>
            </div>
        `
    selectedList.appendChild(item)
  })

  // Show analyze button if items selected
  document.getElementById("analyzeBtn").style.display = selectedFoods.length > 0 ? "inline-block" : "none"
}

function removeFoodFromCart(index) {
  spent -= selectedFoods[index].price
  selectedFoods.splice(index, 1)
  document.getElementById("simulationResult").style.display = "none"
  updateSimulationDisplay()
}

function analyzeNutrition() {
  const nutritionMap = {}

  selectedFoods.forEach((food) => {
    if (!nutritionMap[food.nutrition]) {
      nutritionMap[food.nutrition] = 0
    }
    nutritionMap[food.nutrition]++
  })

  const result = document.getElementById("simulationResult")
  const analysis = document.getElementById("nutritionAnalysis")
  const feedback = document.getElementById("nutritionFeedback")

  let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">'

  Object.entries(nutritionMap).forEach(([nutrition, count]) => {
    const percentage = (count / selectedFoods.length) * 100
    html += `<div style="background: white; padding: 1rem; border-radius: 0.5rem; text-align: center; border-left: 4px solid var(--secondary-orange);">
            <strong>${nutrition}</strong><br>
            <span style="font-size: 1.5rem; color: var(--secondary-orange);">${count}</span> item<br>
            <small>${Math.round(percentage)}%</small>
        </div>`
  })

  html += "</div>"
  analysis.innerHTML = html

  // Generate feedback
  let feedbackText = ""
  const nutritionCount = Object.keys(nutritionMap).length

  if (nutritionCount >= 3) {
    feedbackText = "✅ Bagus! Anda memilih makanan yang seimbang dengan berbagai nutrisi."
  } else if (nutritionCount === 2) {
    feedbackText = "⚠️ Cukup baik, tapi coba tambahkan makanan dengan nutrisi lain untuk keseimbangan lebih baik."
  } else {
    feedbackText = "❌ Kurang seimbang. Coba pilih makanan dengan nutrisi yang berbeda-beda."
  }

  feedback.innerHTML = `<strong>Saran:</strong> ${feedbackText}`
  result.style.display = "block"
}

function resetSimulation() {
  spent = 0
  selectedFoods = []
  document.getElementById("simulationResult").style.display = "none"
  updateSimulationDisplay()
}

// Quiz
const quizQuestions = [
  {
    question: "Berapa banyak orang yang mengalami kelaparan di dunia?",
    options: ["500 juta", "828 juta", "1 miliar", "2 miliar"],
    correct: 1,
  },
  {
    question: "Apa penyebab utama ketahanan pangan?",
    options: ["Hanya kemiskinan", "Perubahan iklim, kemiskinan, dan konflik", "Hanya perang", "Hanya pertanian"],
    correct: 1,
  },
  {
    question: "Berapa persen makanan yang terbuang di dunia?",
    options: ["10%", "20%", "40%", "60%"],
    correct: 2,
  },
  {
    question: "Apa dampak malnutrisi pada anak-anak?",
    options: [
      "Hanya masalah fisik",
      "Gangguan perkembangan fisik dan mental",
      "Tidak ada dampak serius",
      "Hanya masalah mental",
    ],
    correct: 1,
  },
  {
    question: "Solusi apa yang paling efektif untuk ketahanan pangan?",
    options: [
      "Hanya bantuan darurat",
      "Pertanian berkelanjutan dan kemitraan global",
      "Hanya teknologi",
      "Hanya mengurangi limbah",
    ],
    correct: 1,
  },
]

let currentQuestion = 0
let score = 0
let quizAnswered = false

function initQuiz() {
  currentQuestion = 0
  score = 0
  quizAnswered = false
  showQuizProgress()
  showQuizQuestion()
}

function showQuizProgress() {
  const progressContainer = document.getElementById("quizProgress")
  progressContainer.style.display = "block"

  const progress = (currentQuestion / quizQuestions.length) * 100
  document.getElementById("quizProgressFill").style.width = progress + "%"
  document.getElementById("quizProgressText").textContent =
    `Pertanyaan ${currentQuestion + 1} dari ${quizQuestions.length}`
}

function showQuizQuestion() {
  const container = document.getElementById("quizContainer")

  if (currentQuestion >= quizQuestions.length) {
    showQuizResult()
    return
  }

  const q = quizQuestions[currentQuestion]
  let html = `
        <div class="quiz-question">
            <h3>Pertanyaan ${currentQuestion + 1} dari ${quizQuestions.length}</h3>
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${q.question}</p>
            <div class="quiz-options">
    `

  q.options.forEach((option, index) => {
    html += `
            <div class="quiz-option" onclick="answerQuestion(${index})">
                ${option}
            </div>
        `
  })

  html += `
            </div>
        </div>
    `

  container.innerHTML = html
}

function answerQuestion(index) {
  if (quizAnswered) return

  quizAnswered = true
  const q = quizQuestions[currentQuestion]
  const options = document.querySelectorAll(".quiz-option")

  if (index === q.correct) {
    score++
    options[index].classList.add("correct")
  } else {
    options[index].classList.add("incorrect")
    options[q.correct].classList.add("correct")
  }

  setTimeout(() => {
    currentQuestion++
    quizAnswered = false
    showQuizProgress()
    showQuizQuestion()
  }, 1500)
}

function showQuizResult() {
  const container = document.getElementById("quizContainer")
  const percentage = Math.round((score / quizQuestions.length) * 100)

  let message = ""
  let emoji = ""
  if (percentage === 100) {
    message = "Sempurna! Anda adalah ahli ketahanan pangan!"
    emoji = "🏆"
  } else if (percentage >= 80) {
    message = "Luar biasa! Pengetahuan Anda sangat baik!"
    emoji = "⭐"
  } else if (percentage >= 60) {
    message = "Bagus! Terus tingkatkan pengetahuan Anda!"
    emoji = "👍"
  } else {
    message = "Terus belajar untuk memahami ketahanan pangan lebih baik!"
    emoji = "📚"
  }

  container.innerHTML = `
        <div class="quiz-result">
            <div style="font-size: 3rem; margin-bottom: 1rem;">${emoji}</div>
            <h3>Hasil Kuis Anda</h3>
            <div class="quiz-score">${score} dari ${quizQuestions.length}</div>
            <div style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--secondary-orange); font-weight: bold;">${percentage}%</div>
            <p style="font-size: 1.1rem; margin-bottom: 2rem;">${message}</p>
            <button class="btn btn-primary" onclick="initQuiz()">Coba Lagi</button>
        </div>
    `
}

function showContactForm() {
  alert("Terima kasih telah menghubungi kami! Pesan Anda akan kami proses segera.")
}
