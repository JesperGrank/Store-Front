const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const productContainer = document.getElementById("productContainer")
const shoppingCart = document.getElementById("shoppingCart")
const totalSpent = document.getElementById("totalSpent")

const transactions = []

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

function renderAllItems(item){

    //const id = item.id
    
    //console.log(item.images[0].src.small)
    const wrapper = document.createElement("div")
    /*
    const button = document.createElement("button")
    button.innerHTML = "Buy"
    button.value = id
    
    button.addEventListener("click", function(){
        transactions.push(item.price)
        totalSpent.innerHTML = `Total: ${calculateTotalSpent()}`
        shoppingCart.appendChild(createShoppingCartList(item))
        console.log(button)
    })
    */

    wrapper.appendChild(createDescription(item))
    wrapper.appendChild(createImg(item))
    wrapper.appendChild(createPriceRatingStock(item))
    wrapper.appendChild(onBuyButton(item))

    productContainer.appendChild(wrapper)
    
}


function renderStoreItems(data){
    data.forEach(function(item){
        renderAllItems(item)
    })
}

function getStoreList(){
    fetch(url)
    .then(respnse => respnse.json())
    .then(data => {
        renderStoreItems(data)
    })
}

getStoreList()