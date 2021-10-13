const url = "https://mock-data-api.firebaseio.com/webb21/products.json"
const productContainer = document.getElementById("productContainer")



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
    return image
    
}

function renderAllItems(item){
    //console.log(item.images[0].src.small)
    const wrapper = document.createElement("div")

    wrapper.appendChild(createDescription(item))
    wrapper.appendChild(createImg(item))
    wrapper.appendChild(createPriceRatingStock(item))
    

    productContainer.appendChild(wrapper)
    console.log(item)
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