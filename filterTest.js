const products = [{
        rating: 1,
        price: 2,
        stock: 2
    },
    {
        rating: 2,
        price: 13,
        stock: 4
    },
    {
        rating: 3,
        price: 2500,
        stock: 3
    },
    {

        price: 161,
        stock: 16
    },
    {
        rating: 5,
        price: 23,
        stock: 7
    },
    {

        price: 48,
        stock: 11
    },
    {
        rating: 7,
        price: 763,
        stock: 8
    },
    {
        rating: 8,
        price: 192,
        stock: 7
    },
    {
        rating: 9,
        price: 130,
        stock: 10
    },
    {
        rating: 10,
        price: 413,
        stock: 13
    }
]

const productContainer = document.getElementById("productContainer")
const filterButton = document.getElementById("filterButton")
const filterInput = document.getElementById("filterInput")
let test = 0




filterButton.addEventListener("click", function () {
    productContainer.innerHTML = ""
    const userInput = filterInput.value
    const filteredProducts = products.filter(function(product) {
        return product.rating >= userInput
    })
    getProducts(filteredProducts)
    console.log(filteredProducts)
})



function renderProducts(product, userInput) {
    
    
    
    const wrapper = document.createElement("div")

    const productRating = document.createElement("p")
    productRating.innerText = `Rating: ${product.rating || "PRODUCT NOT RATED"}`

    const productPrice = document.createElement("p")
    productPrice.innerText = `Price: ${product.price}`

    const productStock = document.createElement("p")
    productStock.innerText = `Stock: ${product.stock}`

    const br = document.createElement("br")

    if(product.rating >= userInput){
    wrapper.appendChild(productRating)
    wrapper.appendChild(productPrice)
    wrapper.appendChild(productStock)
    wrapper.appendChild(br)

    productContainer.appendChild(wrapper)
    }

}

function getProducts(userInput) {
    products.forEach(function (product) {
        renderProducts(product, userInput)
    })
}

getProducts()



// const filteredOnRating = products.filter(function(item){
//     return item.rating >= 9
// })

// console.log(products)
// console.log(filteredOnRating)
