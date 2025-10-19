const foods = [
  { name: "Nasi", price: 5000, icon: "🍚", nutrition: "Karbohidrat" },
  { name: "Telur", price: 3000, icon: "🥚", nutrition: "Protein" },
  { name: "Sayuran", price: 4000, icon: "🥬", nutrition: "Vitamin" },
  { name: "Daging", price: 8000, icon: "🍖", nutrition: "Protein" },
  { name: "Buah", price: 6000, icon: "🍎", nutrition: "Vitamin" },
  { name: "Susu", price: 7000, icon: "🥛", nutrition: "Kalsium" },
  { name: "Roti", price: 4000, icon: "🍞", nutrition: "Karbohidrat" },
  { name: "Ikan", price: 9000, icon: "🐟", nutrition: "Protein" },
  { name: "Kacang", price: 5000, icon: "🥜", nutrition: "Protein" },
  { name: "Beras Merah", price: 6000, icon: "🌾", nutrition: "Karbohidrat" },
  { name: "Bayam", price: 3000, icon: "🥬", nutrition: "Vitamin" },
  { name: "Wortel", price: 4000, icon: "🥕", nutrition: "Vitamin" },
  { name: "Tahu", price: 4000, icon: "🟫", nutrition: "Protein" },
  { name: "Tempe", price: 3500, icon: "🟫", nutrition: "Protein" },
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

// Initialize on page load
window.addEventListener("load", () => {
  initSimulation()
})
