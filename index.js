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
    p.innerHTML = `${item.name} - ${item.price}`
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
    description.innerText = `${item.name} --- ${item.description}`
    return description
}

function createImg(item) {
    const image = document.createElement("img")
    image.src = item.images[0].src.small
    image.alt = item.images[0].alt
    image.width = "250"

    image.addEventListener("click", function () {
        transactions.push(item.price)
        totalSpent.innerHTML = `Total: ${calculateTotalSpent()}`
        shoppingCart.appendChild(createShoppingCartList(item))
    })
    return image
}

function onBuyButton(item) {
    const button = document.createElement("button")
    button.innerHTML = `Köp ${item.name}`

    button.addEventListener("click", function () {
        transactions.push(item.price)
        totalSpent.innerHTML = `Total: ${calculateTotalSpent()}`
        shoppingCart.appendChild(createShoppingCartList(item))
    })
    return button
}



function renderAllItems(item, userInput) {

    const wrapper = document.createElement("div")

    /*
    item.rating >= userInput || !userInput || (!item.rating && userInput <= 1
    */

    if (!userInput || item.rating >= userInput ) {

        wrapper.appendChild(createDescription(item))
        wrapper.appendChild(createImg(item))
        wrapper.appendChild(createPriceRatingStock(item))
        wrapper.appendChild(onBuyButton(item))

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