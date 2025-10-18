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

// Initialize on page load
window.addEventListener("load", () => {
  initQuiz()
})
