const serviceOptions = [document.getElementById("btn-1"), document.getElementById("btn-2"), document.getElementById("btn-3")]
const itemsSection = document.getElementById("items-section")
const costSection = document.getElementById("cost-section")
const sendInvoiceBtn = document.getElementById("send-invoice-btn")
const totalAmountEl = document.getElementById("total-amount")
let removeWashCarBtn = document.getElementById("remove-wash-car-btn")
let removeMowLawnBtn = document.getElementById("remove-mow-lawn-btn")
let removePullWeedsBtn = document.getElementById("remove-pull-weeds-btn")
let priceCounter = 0
let servicesRequested = []

// listens for clicks on all the buttons and executes appropriate functions
  serviceOptions[0].addEventListener("click", function () {
    if (checkServicesRequested("wash car")) {
      addItem("wash car")
      servicesRequested.push("wash car")
      priceCounter += 10
      calculateTotalAmount()
      removeWashCarBtn = document.getElementById("remove-wash-car-btn")
    } else {
      alert("You've already entered this item, we don't want to charge you twice :)")
    }  
  })  

  serviceOptions[1].addEventListener("click", function () {
    if (checkServicesRequested("mow lawn")) {
      addItem("mow lawn")
      servicesRequested.push("mow lawn")
      priceCounter += 20
      calculateTotalAmount()
      removeMowLawnBtn = document.getElementById("remove-mow-lawn-btn")
    } else {
      alert("You've already entered this item, we don't want to charge you twice :)")
    }  
  })  

  serviceOptions[2].addEventListener("click", function () {
    if (checkServicesRequested("pull weeds")) {
      addItem("pull weeds")
      servicesRequested.push("pull weeds")
      priceCounter += 30
      calculateTotalAmount()
      removePullWeedsBtn = document.getElementById("remove-pull-weeds-btn")
    } else {
      alert("You've already entered this item, we don't want to charge you twice :)")
    }  
  })  

  sendInvoiceBtn.addEventListener("click", function () {
    // console.log(removeWashCarBtn, removeMowLawnBtn, removePullWeedsBtn)
    itemsSection.innerHTML = `<div id="items-section" class="items__label" data-aos="flip-right"><p>TASK</p></div>`
    costSection.innerHTML = `<div id="cost-section" class="items__label" data-aos="flip-right"><p>TOTAL</p></div>`
    servicesRequested = []
    totalAmountEl.innerHTML = null
    priceCounter = 0
  })  


// adds the item and price to the html
function addItem(itemType) {
  if (itemType == "wash car") {
    itemsSection.innerHTML += `<h2 class="wash-car" data-aos="fade-left">Wash Car <button id="remove-wash-car-btn" class="remove" onclick="removeItem('wash-car')">Remove</button></h2>`
    costSection.innerHTML += `<h2 class="wash-car" data-aos="fade-right"><span class="money-sign">$</span><span id="price">10</span></h2>`
  } else if (itemType == "mow lawn") {
    itemsSection.innerHTML += `<h2 class="mow-lawn" data-aos="fade-left">Mow Lawn <button id="remove-mow-lawn-btn" class="remove" onclick="removeItem('mow-lawn')">Remove</button></h2>`
    costSection.innerHTML += `<h2 class="mow-lawn" data-aos="fade-right"><span class="money-sign">$</span><span id="price">20</span></h2>`
  } else {
    itemsSection.innerHTML += `<h2 class="pull-weeds" data-aos="fade-left">Pull Weeds <button id="remove-pull-weeds-btn" class="remove" onclick="removeItem('pull-weeds')">Remove</button></h2>`
    costSection.innerHTML += `<h2 class="pull-weeds" data-aos="fade-right"><span class="money-sign">$</span><span id="price">30</span></h2>`
  }
}

// returns true if there are no items in servicesRequested matching toCheck
function checkServicesRequested(toCheck) {
  if (servicesRequested.length == 0) {
    return true
  }
  
  for (let i = 0; i < servicesRequested.length; i++) {
    if (servicesRequested[i] == toCheck) {
      return false
    } 
  }
  return true
}

// populates the total amount element
function calculateTotalAmount() {
  totalAmountEl.innerHTML = `<span style="margin-inline-end: 2px">$</span>${priceCounter}`
  if (priceCounter == 0) {
    totalAmountEl.innerHTML = null
  }
}

function removeItem(classToRemove) {
  const classToRemoveEl = document.getElementsByClassName(classToRemove)
  for (let i = 0; i < classToRemoveEl.length; i++) {
    classToRemoveEl[i].innerHTML = null
  }
  if (classToRemove == "wash-car") {
    priceCounter -= 10
    calculateTotalAmount()
    removeFromServicesRequested("wash car")
  } else if (classToRemove == "mow-lawn") {
    priceCounter -= 20
    calculateTotalAmount()
    removeFromServicesRequested("mow lawn")
  } else {
    priceCounter -= 30
    calculateTotalAmount()
    removeFromServicesRequested("pull weeds")
  }
}

function removeFromServicesRequested(toRemove) {
  for (let i = 0; i < servicesRequested.length; i++) {
    if (servicesRequested[i] == toRemove) {
      servicesRequested.splice(i, 1)
    }
  }
}