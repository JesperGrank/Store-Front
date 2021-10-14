const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const productContainer = document.getElementById("productContainer")
const shoppingCart = document.getElementById("shoppingCart")
const totalSpent = document.getElementById("totalSpent")

const transactions = []
let startValue = 0
const filterInput = document.getElementById("filterInput")
const filterButton = document.getElementById("filterButton")

filterButton.addEventListener("click", function(){
    productContainer.innerHTML = ""
    const userInput = filterInput.value
    getStoreList(userInput)
})

function createShoppingCartList(item){
    const p = document.createElement("p")
    p.innerHTML = `${item.name} - ${item.price}`
    return p
}

function calculateTotalSpent(){
    let sum = 0
    transactions.forEach(function(element){
        sum = sum + element
    })
    return sum
}

function createPriceRatingStock(item){
    const p = document.createElement("p")
    p.innerText = `Price: ${item.price} - Rating: ${item.rating} - Stock: ${item.stock}`
    return p
}

function createDescription(item){
    const description = document.createElement("h2")
    description.innerText = `${item.name} --- ${item.description}`
    return description
}

function createImg(item){
    const image = document.createElement("img")
    image.src = item.images[0].src.small
    image.alt = item.images[0].alt
    image.width = "250"

    image.addEventListener("click", function(){
        transactions.push(item.price)
        console.log(transactions)
        totalSpent.innerHTML = `Total: ${calculateTotalSpent()}`
        shoppingCart.appendChild(createShoppingCartList(item))
    })

    return image
}

function onBuyButton(item) {
    const button = document.createElement("button")
    const id = item.id
    button.innerHTML = "Buy"
    button.value = id

    button.addEventListener("click", function () {
        transactions.push(item.price)
        totalSpent.innerHTML = `Total: ${calculateTotalSpent()}`
        shoppingCart.appendChild(createShoppingCartList(item))
        console.log(button)
    })
    return button
}

function renderAllItems(item, userInput){

    const wrapper = document.createElement("div")

    if(item.rating >= userInput){
    wrapper.appendChild(createDescription(item))
    wrapper.appendChild(createImg(item))
    wrapper.appendChild(createPriceRatingStock(item))
    wrapper.appendChild(onBuyButton(item))

    productContainer.appendChild(wrapper)
    }
}


function renderStoreItems(data, userInput){
    data.forEach(function(item){
        renderAllItems(item, userInput)
    })
}

function getStoreList(userInput){
    fetch(url)
    .then(respnse => respnse.json())
    .then(data => {
        renderStoreItems(data, userInput)
    })
}

getStoreList(startValue)