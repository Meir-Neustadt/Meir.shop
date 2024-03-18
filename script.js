const root = document.querySelector('#root')
const search = document.querySelector('#f')
const selector = document.querySelector('#selctor')
const checkbox = document.querySelector('#checkbox')
const cartIcon = document.querySelector('#buttonCart')
const deletion = document.querySelector('.z-0')

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
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MSgkDZ3BYrrfCB7jhIp301FQIEjNNy5pZA&usqp=CAU"
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
        "image": "https://roasters.co.il/wp-content/uploads/2024/02/%D7%90%D7%99%D7%96%D7%94-%D7%92%D7%96%D7%A2-%D7%9B%D7%9C%D7%91%D7%99%D7%9D-%D7%9E%D7%AA%D7%90%D7%99%D7%9D-%D7%9C%D7%9A-%D7%A2%D7%9C-%D7%A4%D7%99-%D7%92%D7%9C%D7%92%D7%9C-%D7%94%D7%9E%D7%96%D7%9C%D7%95%D7%AA-%D7%A9%D7%9C%D7%9A.jpg"
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
let requieredSorting = 'name'
let searchedInput = ''
const list = []
const cart = []

addToCart = (e) => {
    let { id } = e.target
    id = id.split('_')[1]
    const product = data.find(el => el.id == id)
    if (cart.includes(product)) {
        product.quantity += 1
    } else {
        product.quantity = 1
        cart.push(product)
    }
 }

const createCard = (product) => {
    const cardEl = document.createElement('div')
    cardEl.className = 'col-4 my-3'
    const innerCardEl = document.createElement('div')
    innerCardEl.className = 'card w-100'
    innerCardEl.innerHTML = `
    <img src="${product.image}" class="card-img-top">
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
    btn.id = `btn_${product.id}`
    btn.className = "btn btn-primary"
    btn.innerHTML = `Buy now`
    btn.addEventListener('click', addToCart)
    innerCardEl.append(btn)
    cardEl.append(innerCardEl)
    return cardEl;
}

const render = arr => {
    root.innerHTML = ''
    if (searchedInput.length != 0) arr = filterSearched(arr)
    if (arr.length > 0) {
        sorting(arr, requieredSorting)
        arr.map(item => root.append(createCard(item)))
    } else root.innerHTML = `<h2>מצטערים, לא נמצאו פריטים התואמים לחיפושך</h2>`
}

const filterSearched = arr => {
    return arr.filter(item => item.name.toLowerCase().includes(searchedInput))
}

const sorting = (data, key) => {
    switch (key) {
        case 'low to high':
            data.sort((a, b) => a.price - b.price)
            break
        case 'high to low':
            data.sort((a, b) => b.price - a.price)
            break
        case 'name':
            data.sort((a, b) => a.name.localeCompare(b.name))
            break
    }
}

const showModal = () => {
    const modalBackground = document.createElement('div')
    modalBackground.id = 'showCart'
    modalBackground.className = 'modal-background fs-4 pt-5 mt-4'
    const modalWindow = document.createElement('div')
    modalWindow.className = 'my-modal bg-light m-auto'
    document.body.prepend(modalBackground)
    modalBackground.append(modalWindow)
    const modalCloseBtn = document.createElement('button')
    modalCloseBtn.className = 'btn-close bg-danger '
    modalCloseBtn.addEventListener('click', closeModal)
    modalWindow.append(modalCloseBtn)
    const modalBodyEl = document.createElement('table')
    modalBodyEl.id = 'modalBodyEl'
    modalBodyEl.innerHTML += `<th scope="col">Product Name</th>
    <th scope="col">Price</th><th scope="col">Quantity</th><th scope="col">Total</th>`
    modalBodyEl.className = 'modal-body table table-striped m-0 bg-whith'
    modalWindow.append(modalBodyEl)
    cart.map(item => modalBodyEl.append(createCartItem(item)))
    let total=0
    cart.map(item => total += item.price*item.quantity)
    const cartItem = document.createElement('div')
    cartItem.id='cartItem'
    cartItem.className='fs-3 text-center fw-bold bg-info-subtle p-3'
    cartItem.innerHTML=`Total to pay: ` + total + '$'
    modalBackground.append(cartItem)
}
const closeModal = () => {
    const model = document.querySelector('.modal-background')
    model.remove()
    render(currentData)
}

const createCartItem = (product) => {
    const cartItem = document.createElement('tr')
    cartItem.innerHTML = `<td scope="col" class="fs-2 fw-semibold w-50"><img src="${product.image}" class="card-img-top w-25 pe-4">${product.name}</td>
    <td scope="col">${product.price}$</td>`
    const tdEL = document.createElement('td')
    const buttons = document.createElement('div')
    buttons.className='d-flex flex-row'
    const minusBtn = document.createElement('button')
    minusBtn.addEventListener('click', () => {
        product.quantity-=1
        if(product.quantity==0) cart.splice(cart.indexOf(product), 1)
        closeModal()
        if(cart.length>0) showModal()
    })
    minusBtn.innerHTML = '-';
    const plusBtn = document.createElement('button')
    plusBtn.innerHTML = '+';
    buttons.append(minusBtn)
    plusBtn.addEventListener('click',() => {
        product.quantity+=1
        closeModal()
        showModal()
    })
    const quantity = document.createElement('div')
    quantity.className='m-2'
    buttons.append(quantity)
    quantity.innerHTML= product.quantity
    buttons.append(plusBtn)
    tdEL.append(buttons)
    cartItem.append(tdEL)
    const sum = document.createElement('td')
    sum.innerHTML=product.price * product.quantity + `$`
    cartItem.append(sum)
    return cartItem
}

const filterForCheck = (data, list) => {
    currentData = (data.filter(item => list.includes(item.cat)));
}



//main////////////


render(currentData)



//event listeners////////////


search.addEventListener('input', e => {
    searchedInput = e.target.value.toLowerCase()
    render(currentData)
})

selector.addEventListener('change', e => {
    requieredSorting = e.target.value
    render(currentData)
})

cartIcon.addEventListener('click', e => {
    showModal()
})

checkbox.addEventListener('change', e => {
    const name = e.target.name
    const check = e.target.checked
    if (check) {
        list.push(name)
    } else {
        const index = list.indexOf(name)
        list.splice(index, 1)
    }
    if (list.length == 0) {
        currentData = data
        render(currentData)
    }
    else {
        filterForCheck(data, list)
        render(currentData)
    }
})