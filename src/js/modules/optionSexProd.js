import {products, mainRender, showAmount, searchProd} from "../content";


export function animationOptionSex() {
    let arrBottomsOption = Array.from(document.getElementsByClassName("button_option"));
    arrBottomsOption[0].classList.add("button_option_untouch")
    for (let i = 0; i < arrBottomsOption.length; i++) {
        arrBottomsOption[i].addEventListener("click", (e) => {
            for (let i = 0; i < arrBottomsOption.length; i++) {
                arrBottomsOption[i].classList.remove("button_option_untouch")
            }
            e.target.classList.add("button_option_untouch")
        });
    }
}

export function changeOptionOnClick(current, mainProd, product) {

    let changeMan = document.getElementById("button_man");
    let changeWoman = document.getElementById("button_woman");
    let changeChildren = document.getElementById("button_children");

    let arrOptionSex = [changeMan, changeWoman, changeChildren]
    let arrIndex = ["man", "woman", "children"]

     function optionSex(prod, sexTarget) {
        let filterProd = prod.filter(el => el.sex === sexTarget);
        return filterProd
    }

    arrOptionSex.map((el, index) => {
        el.addEventListener("click", (e) => {
            current = 0;
            mainProd = optionSex(product, arrIndex[index]);
            mainRender(mainProd)
                .then(() => {
                    searchProd(mainProd)
                    showAmount(mainProd)
                })
            console.log(mainProd.length)
            return mainProd
        });
    })
}

export function btnChangeAll(mainProd) {
    let changeAll = document.getElementById("button_all");

    changeAll.addEventListener("click", (e) => {
        mainProd = products;
        mainRender(mainProd)
            .then(()=>{
                searchProd(mainProd)
                showAmount(mainProd)
            });
        return mainProd
    });
}