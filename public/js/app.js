const btn = document.getElementById("btn_search")
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
    let shoeBox = createNewElement("div", "box_shoe", null, null, null);
    shoeBox.style.backgroundImage = "url(css/images/" + product.imgUrl + ")";
    let coast = createNewElement("p", "main_coast_shoe", "$" + product.price, null);
    let boxSale = createNewElement("div", "boxSale", countPercent(product.priceDown, product.price), null);

    let coastDown = createNewElement("p", "down_coast_shoe", product.priceDown, null);

    let sex = createNewElement("p", "sex_box_shoe", product.sex, null);
    let title = createNewElement("h5", "name_box_shoe", product.title);

    let showItem = createNewElement("div", "show_more", "show more", [{
        "name": "data-id",
        "value": product.id
    }], null)

    let shoeBoxFull = appChild(shoeBox, [coast, coastDown, sex, title, boxSale, showItem])
    return shoeBoxFull
}

function render(products) {
    const productsBox = document.getElementById('range_content_box')
    productsBox.innerHTML ='';
    const from = current * per_page
    const to = current * per_page + per_page
    products.slice(from, to).map(el => {
        productsBox.appendChild(createCard(el))
    })
}

function renderPag(products) {
    const paginationBox = document.getElementById("pag_box");
    paginationBox.innerHTML = "";
    for (let i = 0; i < Math.ceil(prod.length / per_page); i++) {
        paginationBox.appendChild(Builder.createNewElement("div", "pag_item", i + 1, [{
            "name": "data-name",
            "value": i
        }]));
    }
    if (prod.length > 0) {
        paginationBox.firstChild.classList.add("active_pag")
    }
}

if (btn) {
    // btn.addEventListener('click', () => {
        fetch('/products/all')
            .then(data => data.json())
            .then((data) => {
                render(data)
                current +=4;
                console.log(current)


                // const productBox = document.getElementById('range_content_box')
                // productBox.appendChild(BuilderComponent.createCard(prod[i]))

            })
    // })
}


