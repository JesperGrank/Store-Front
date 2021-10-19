const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const productContainer = document.getElementById("productContainer")
const shoppingCart = document.getElementById("shoppingCart")
const totalSpent = document.getElementById("totalSpent")

const transactions = []
const errorMessage = document.getElementById("errorMessage")
const filterInput = document.getElementById("filterInput")
const filterButton = document.getElementById("filterButton")

filterButton.addEventListener("click", function () {
    const userInput = filterInput.value
    if (userInput < 1 || userInput > 5) {
        errorMessage.innerText = "Välj en siffra mellan 1-5"
    } else {
        errorMessage.innerText = ""
        productContainer.innerHTML = ""
        getStoreList(userInput)
    }
})


function createShoppingCartList(item) {
    const p = document.createElement("p")
    p.innerHTML = `${item.name} - ${item.price} kr`
    return p
}

function calculateTotalSpent() {
    let sum = 0
    transactions.forEach(function (element) {
        sum = sum + element
    })
    return sum
}

function createPriceRatingStock(item) {
    const p = document.createElement("p")
    p.innerText = `Price: ${item.price} / Rating: ${item.rating || "No rating"} / Stock: ${item.stock}`
    return p
}

function createDescription(item) {
    const description = document.createElement("h2")
    description.innerText = `${item.name} - ${item.description}`
    return description
}

function createImg(item) {
    const image = document.createElement("img")
    image.src = item.images[0].src.small
    image.alt = item.images[0].alt
    image.width = "300"
    image.height = "250"

    image.addEventListener("click", function () {
        onBuyClick(item)
    })
    return image
}

function createBuyButton(item) {
    const button = document.createElement("button")
    button.innerHTML = `Köp ${item.name}`

    button.addEventListener("click", function () {
        onBuyClick(item)
    })

    return button
}

function createLineBreak() {
    const lineBreak = document.createElement("hr")
    return lineBreak
}

function onBuyClick(item) {
    transactions.push(item.price)
    totalSpent.innerHTML = `Total: ${calculateTotalSpent()}`
    shoppingCart.appendChild(createShoppingCartList(item))
}


function renderAllItems(item, userInput) {
    const wrapper = document.createElement("div")

    if (item.rating >= userInput || !userInput) {

        wrapper.appendChild(createDescription(item))
        wrapper.appendChild(createImg(item))
        wrapper.appendChild(createPriceRatingStock(item))
        wrapper.appendChild(createBuyButton(item))
        wrapper.appendChild(createLineBreak())

        productContainer.appendChild(wrapper)
    }
}


function renderStoreItems(data, userInput) {
    data.forEach(function (item) {
        renderAllItems(item, userInput)
    })
}

function getStoreList(userInput) {
    fetch(url)
        .then(respnse => respnse.json())
        .then(data => {
            renderStoreItems(data, userInput)
        })
}

getStoreList()