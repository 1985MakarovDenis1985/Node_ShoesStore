// const axios = require('axios')
// import axios from 'axios'
let current = 0;
const per_page = 6


function createNewElement(tag, classEl = null, innerEl = null, attrEl = null, imgUrl = null, currency = null) {
    let el = document.createElement(tag);
    el.className = (classEl) ? classEl : "";
    el.innerHTML = (innerEl) ? innerEl : "";
    el.style.backgroundImage = imgUrl;

    if (attrEl) {
        attrEl.map((atteEl) => el.setAttribute(atteEl.name, atteEl.value));
    }
    return el
}

function appChild(parent, children) {
    children.map((el) => {
        parent.appendChild(el)
    });
    return parent
}

function countPercent(price, newPrice) {
    let count = Math.ceil(100 - newPrice * 100 / price);
    return +count
}

function createCard(product) {
    let shoeBox = createNewElement("div", "box_shoes", null, null, null);
    shoeBox.style.backgroundImage = "url(/img/" + product.imgUrl + ")";
    let coast = createNewElement("p", "main_coast_shoe prod-currency-bd", +product.price, null);

    let boxSale = createNewElement("div", "boxSale", "-" + countPercent(product.startPrice, product.price) + "%", null);
    let coastDown = createNewElement("p", "down_coast_shoe prod-currency-bd", +product.startPrice, null);

    let sex = createNewElement("p", "sex_box_shoe", product.sex, null);
    let title = createNewElement("h5", "name_box_shoe", product.title);


    let showItem = createNewElement("a", "show_more", "show more", [{
        "name": "data-id",
        "value": product._id
    }, {
        "name": "href",
        "value": '/products/' + product._id
    }], null)
    let shoeBoxFull
    if (!product.startPrice) {
        shoeBoxFull = appChild(shoeBox, [coast, sex, title, showItem])
    } else {
        shoeBoxFull = appChild(shoeBox, [coast, coastDown, sex, title, boxSale, showItem])
    }
    return shoeBoxFull
}

function render(products) {
    const productsBox = document.getElementById('range_content_box')
    productsBox.innerHTML = '';
    const from = current * per_page
    const to = current * per_page + per_page
    products.slice(from, to).map(el => {
        productsBox.appendChild(createCard(el))
    })
}

function renderPag(products) {
    const paginationBox = document.getElementById("pag_box");
    // pagItem.map(el => el.classList.remove('active_pag'))

    paginationBox.innerHTML = "";
    for (let i = 0; i < Math.ceil(products.length / per_page); i++) {
        paginationBox.appendChild(createNewElement("div", "pag_item", i + 1, [{
            "name": "data-number",
            "value": i
        }]));
    }
    const pagItem = Array.from(document.getElementsByClassName('pag_item'))
    pagItem[current].classList.add('active_pag')
    pagItem.map(el => {
        el.addEventListener('click', (e) => {
            pagItem.map(el => el.classList.remove('active_pag'))
            current = +e.target.dataset.number
            render(products)
            document.querySelectorAll('.prod-currency-bd').forEach(el => {
                el.textContent = toCurrency(el.textContent)
            })
            pagItem[current].classList.add('active_pag')
        })
    })
}

async function getProducts(sex) {
    current = 0
    const prod = await fetch(`/products/all`)
        .then(data => data.json())
        .then((data) => {
            if (sex) {
                const a = data.filter(el => el.sex === sex)
                render(a)
                renderPag(a)
                console.log("as")
            } else {
                render(data)
                renderPag(data)
            }
        })
    document.querySelectorAll('.prod-currency-bd').forEach(el => {
        el.textContent = toCurrency(el.textContent)
    })
}

const btn = document.getElementById("range_content_box")
if (btn) {
    getProducts()
    //
    document.getElementById('getAll').addEventListener('click', () => {
        getProducts()
    })
    document.getElementById('getMen').addEventListener('click', () => {
        getProducts('man')
    })
    document.getElementById('getWomen').addEventListener('click', () => {
        getProducts('woman')
    })
    document.getElementById('getChildren').addEventListener('click', () => {
        getProducts('children')
    })

}

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('btn-remove')) {
            const id = event.target.dataset.id
            const csrf = event.target.dataset.csrf

            fetch('/cart/remove/' + id, {
                method: 'delete',
                headers: {
                    "X-XSRF-TOKEN": csrf
                }
            }).then((res) => res.json())
                .then(card => {
                    window.location.href = "/cart"
                })
        }
    })
}

const toCurrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price)
}
const toDate = date => {
    return new Intl.DateTimeFormat('ru-Ru', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

function setCurrencyForCartAndOther(){
    document.querySelectorAll('.prod-currency').forEach(el => {
        el.textContent = toCurrency(el.textContent)
    })
    fetch(`/cart/sum`)
        .then(data => data.json())
        .then(data => {
            const navCart = document.getElementById('cart_summarise_prise')
            if (navCart) {
                navCart.textContent = toCurrency(data)
            }
        })
}
setCurrencyForCartAndOther()

document.querySelectorAll('.date').forEach(el => {
    el.textContent = toDate(el.textContent)
})

M.Tabs.init(document.querySelectorAll(".tabs"))









