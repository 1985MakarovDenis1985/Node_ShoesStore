import {Data} from "./modules/data";
import {Builder} from "./modules/build";
import {animationOptionSex, btnChangeAll, changeOptionOnClick} from "./modules/optionSexProd";


const BuilderComponent = new Builder();
export const products = Data.loadProducts();

let per_page = 6;
let current = 0;
let mainProd = products;

let boxContent = document.getElementById("range_content_box");
let paginationBox = document.getElementById("pag_box");

let searchForm = document.getElementById("search");
let btn_search = document.getElementById("btn_search");


// COUNT AND PAGE PRODUCTS --- !
function firstI() {
    return current * per_page;
}

function secondI(i, prod) {
    return i < current * per_page + per_page && i < prod.length;
}


// RENDER PRODUCTS --- !
function renderProd(prod) {
    boxContent.innerHTML = "";
    for (let i = firstI(); secondI(i, prod); i++) {
        console.log(secondI(i, prod))
        boxContent.appendChild(BuilderComponent.createCard(prod[i]))
    }
    countPercentAndAddCurrency("boxSale", "down_coast_shoe");
    pageItemInformation()
}


// CREATE PAGINATION --- !
function renderPag(prod) {
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

function changePag(prod) {
    let countPag = Array.from(document.getElementsByClassName("pag_item"));
    countPag.map((el) => {
        el.addEventListener("click", (e) => {
            current = el.dataset.name;
            renderProd(prod);
            for (let i = 0; i < countPag.length; i++) {
                countPag[i].classList.remove("active_pag");
            }
            e.target.classList.add("active_pag");
        })
    })
}


// OPTIONS OF PRODUCTS --- !
animationOptionSex()
changeOptionOnClick(current, mainProd, products)
btnChangeAll(mainProd)


//SEARCH PRODUCT --- !
export function search(prod) {
    current = 0;
    paginationBox.innerHTML = "";
    let searchRegExp = new RegExp(searchForm.value, ["i"]);
    prod = prod.filter(el => searchRegExp.test(el.name));
    mainRender(prod);
    return mainProd = prod;
}

export function searchProd(prod) {
    btn_search.addEventListener("click", (e) => {
        search(prod);
        pageItemInformation()
    });

    searchForm.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
            search(prod);
        }
    });
}


// COUNT ITEM ON THE PAGE --- !
export function showAmount(mainProd) {
    document.getElementById("amountItem").innerHTML = "";
    if (mainProd.length > 0) {
        document.getElementById("amountItem").innerHTML = "AMOUNT ON THIS PAGE: " + mainProd.length
    } else {
        document.getElementById("amountItem").innerHTML = "unfortunately nothing has been found"
    }
}



// ADD CURRENCY AND PERCENT --- !
function countPercentAndAddCurrency(boxSale, down_coast_shoe) {
    let saleForBlock = Array.from(document.getElementsByClassName(boxSale));
    for (let i = 0; i < saleForBlock.length; i++) {
        if (saleForBlock[i].innerHTML == -Infinity) {
            saleForBlock[i].style.display = "none"
        } else {
            saleForBlock[i].innerHTML = "-" + saleForBlock[i].innerHTML + "%"
        }
    }
    let firstPriceAdd = Array.from(document.getElementsByClassName(down_coast_shoe));
    for (let i = 0; i < firstPriceAdd.length; i++) {
        if (firstPriceAdd[i].innerHTML != " ") {
            firstPriceAdd[i].innerHTML = "$" + firstPriceAdd[i].innerHTML
        }
    }
}



// CREATE CART LIST TO BUY --- !
let cartCount = [];
function pageItemInformation() {
    let buttonsShowMore = Array.from(document.getElementsByClassName("show_more"));
    buttonsShowMore.map((el) => {
        el.addEventListener("click", (e) => {
            for (let i = 0; i < products.length; i++) {
                if (products[i].nameData == el.dataset.name) {
                    BuilderComponent.createPageInformation(products[i]);

                    // build information page =>
                    countPercentAndAddCurrency(" sale_price_shoe_page_info", "first_price_shoe_page_info")
                    document.getElementById("page_item_info").style.display = "block";
                    (function () {
                        document.getElementById("exit_button").addEventListener("click", (e) => {
                            document.getElementById("page_item_info").style.display = "none";
                        });
                    })();

                    // build Cart =>
                    createCartList()
                }
            }
        })
    })
}

// function => count common sum in cart   => ??? did not succeeded only use reduce ???
export function sumCartPrice(cartCount) {
    let arrPrice = [];
    if (cartCount != 0) {
        cartCount.map((el) => {
            arrPrice.push(el.price)
        });
        arrPrice = arrPrice.reduce(function (a, b) {
            return a + b
        });
    }
    return arrPrice
}
BuilderComponent.createCartFixed(cartCount)

function createCartList() {
    let buttonsBuy = document.getElementById("button_buy");
    buttonsBuy.addEventListener("click", (e) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].nameData == buttonsBuy.dataset.name) {

                cartCount.push(products[i]);
                BuilderComponent.createBoxWish(cartCount);
                BuilderComponent.createCartFixed(cartCount)//???
                cartSummarize();

                document.getElementById("cart_summarise_prise").innerHTML = "$" + sumCartPrice(cartCount); // => top cart;
                document.getElementById("cart_summarise_prise425").innerHTML = "$" + sumCartPrice(cartCount) // => top cart;
            }
        }
    });
}

function openAndRemoveItemOfCartList(cartEl) {
    let cartList = document.getElementById("cart_list");
    cartList.innerHTML = ""

    BuilderComponent.createTableOfOrders(cartCount);
    cartList.style.display = "block"

    let removeArr = Array.from(document.getElementsByClassName("remove_item_card"))
    removeArr = removeArr.map((el) => {
        for (let i = 0; i < cartCount.length; i++) {
            removeArr[i].setAttribute("data-remove", i);
        }
    });

    let btnRemove = Array.from(document.getElementsByClassName("remove_item_card"));
    btnRemove.map((el) => {
        el.addEventListener("click", (e) => {
            let itemRemove = +e.target.dataset.remove;
            cartCount.splice(itemRemove, 1)

            cartList.style.display = "block";
            openAndRemoveItemOfCartList("fixed_cart");

            document.getElementById("cart_summarise_prise").innerHTML = "$" + sumCartPrice(cartCount); // => top cart;
            document.getElementById("cart_summarise_prise425").innerHTML = "$" + sumCartPrice(cartCount) //

            BuilderComponent.createBoxWish(cartCount);
            BuilderComponent.createCartFixed(cartCount)//???
            cartSummarize()
        })
    })

    let exit = document.getElementById("exit_cart")
    exit.addEventListener("click", (e) => {
        cartList.innerHTML = "";
        cartList.style.display = "none"
    })
}

// BTN OF CARTS (TOP, BOTTOM, MOBILE) --- !
let arrCartButton = [document.getElementById("fixed_cart"),document.getElementById("nav_item_cart"),document.getElementById("basket425")]
arrCartButton.map(el => el.addEventListener("click", ()=>{
    openAndRemoveItemOfCartList("fixed_cart")
}))


function cartSummarize() {
    let cordCount = document.getElementById("cordCount")
    if (cartCount.length == 0) {
        cordCount.innerHTML = "Empty";
        document.getElementById("fixed_cart").style.width = "130px";
        document.getElementById("cart_summarise_prise").innerHTML = "$0"
    } else if (cartCount.length != 0) {
        document.getElementById("fixed_cart").style.width = "180px";
        cordCount.innerHTML = cartCount.length + " = " + "$" +sumCartPrice(cartCount)
    }
}
cartSummarize();


export async function mainRender(prod){
    await renderProd(prod);
    await renderPag(prod);
    await changePag(prod);
    await showAmount(mainProd)
}


mainRender(mainProd)
    .then(()=>{
        searchProd(mainProd)
    })

