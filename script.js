const root = document.querySelector('#root')
const search = document.querySelector('#input')
const selector = document.querySelector('#selctor')
const checkbox = document.querySelector('#checkbox')
const payment = document.querySelector('#payment')

const data = [
    {
        "id": "1",
        "cat": "food",
        "name": "Milk",
        "price": "6",
        "image": "https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_150.jpg"
    },
    {
        "id": "2",
        "cat": "food",
        "name": "Bread",
        "price": "8",
        "image": "https://cdn.pixabay.com/photo/2014/07/22/09/59/bread-399286_150.jpg"
    },
    {
        "id": "4",
        "cat": "food",
        "name": "Eggs",
        "price": "12",
        "image": "https://cdn.pixabay.com/photo/2015/09/17/17/19/egg-944495_150.jpg"
    },
    {
        "id": "3",
        "cat": "clothing",
        "name": "Coat",
        "price": "120",
        "image": "https://cdn.pixabay.com/photo/2015/05/29/19/19/person-789663_150.jpg"
    },
    {
        "id": "5",
        "cat": "clothing",
        "name": "Dress",
        "price": "4000",
        "image": "https://cdn.pixabay.com/photo/2016/06/29/04/17/wedding-dresses-1485984_150.jpg"
    },
    {
        "id": "6",
        "cat": "clothing",
        "name": "Shirt",
        "price": "70",
        "image": "https://cdn.pixabay.com/photo/2014/08/05/10/31/waiting-410328_150.jpg"
    },
    {
        "id": "7",
        "cat": "animals",
        "name": "Dog food",
        "price": "70",
        "image": "https://cdn.pixabay.com/photo/2017/04/07/10/53/dog-2210717_150.jpg"
    },
    {
        "id": "8",
        "cat": "animals",
        "name": "Cat toy",
        "price": "50",
        "image": "https://cdn.pixabay.com/photo/2018/07/21/09/17/cat-3552143_150.jpg"
    }
]

let currentData = data
let shoppingCart = []
let requieredSorting = 'price'
let searcheInput = ''
const list = []


const render = arr => {
    root.innerHTML = ''
    if(searcheInput.length != 0) arr = filterSearched(arr)
    if(arr.length > 0){
        sorting(arr,requieredSorting)
        arr.map(item => root.append(createCard(item)))
    } else root.innerHTML=`<h2>מצטערים, לא נמצאו פריטים התואמים לחיפושך</h2>`
}

const sorting = (arr, key) => {
    switch (key) {
        case 'price':
            arr.sort((a, b) => a.price - b.price)
            break
        case 'price-desc':
            arr.sort((a, b) => b.price - a.price)
            break
        case 'name':
            arr.sort((a, b) => a.name.localeCompare(b.name))
    }
}

const filterAsChecked = (arr, list)=>{
    currentData = (arr.filter(item => list.includes(item.cat)));
}

const filterSearched = arr => {
    return arr.filter(item => item.name.toLowerCase().includes(searcheInput))
}

const addToCart = e => {
    let id = e.target.id.split('_')[1]
    let product = data.find(el => el.id == id)
    addTo(product)
    console.log(shoppingCart)
}

const addTo = product => {
    if(! shoppingCart.some(el => el.id == product.id)) {
        product = {...product, amount : 1}
        shoppingCart.push(product)
    }else{
        product = shoppingCart.find(el => el.id == product.id)
        product.amount += 1
    }
}

const createCard = product => {
    const cardEl = document.createElement('div')
    cardEl.className = 'col-4 my-3'
    const innerCardEl = document.createElement('div')
    innerCardEl.className = 'card w-100'
    innerCardEl.innerHTML = `<img src="${product.image}" class="card-img-top">
        <div class="card-body bg-warning-subtle">
            <div class="card-title">
                <h2>${product.name}</h2>
            </div>
            <div class="card-text">
                <h3>price: <b>${product.price}</b> $</h3>
            </div>
            <div class="d-flex justify-content-between"> 
                <div class="text-end">
                    category: <b>${product.cat}</b>
                    id: <b>${product.id}</b>
                </div>
            </div>
        </div>`
    const btn = document.createElement('button')
    btn.className = "btn btn-primary"
    btn.innerHTML = `Buy now ${product.cat === 'animals' ? product.name + "Mivza!!" : product.name}`
    btn.id = `btn_${product.id}`
    btn.addEventListener('click', addToCart)
    innerCardEl.append(btn)
    cardEl.append(innerCardEl)
    return cardEl
}

const toPay = () => {
    const shoppingList = []
    let total = 0
    shoppingCart.map(el => {
        shoppingList.push(`${el.name} ${el.amount} ${el.price*el.amount}`)
        total += el.price*el.amount
    })
    root.innerHTML = '<ul>'
    shoppingList.map(el => root.innerHTML += `<li>${el}</li>`)
    root.innerHTML += `</ul> <h2>total: ${total}</h2>`
}

////////// Main ///////////


render(currentData)

search.addEventListener('input', e => {
    searcheInput = e.target.value.toLowerCase()
    render(currentData)
})

selector.addEventListener('change', e => {
    requieredSorting = e.target.value
    render(currentData)
})

checkbox.addEventListener('change', e => {
    const category = e.target.name
    const checked = e.target.checked
    if(checked){
        list.push(category)
    }else{
        const index = list.indexOf(category)
        list.splice(index, 1)
    }
    if(list.length == 0) currentData = data
    else filterAsChecked(data,list)
    render(currentData)
})

payment.addEventListener('click', e => {
    if(e.target.value == 'shop') render(currentData)
    else toPay()
})