import {sumCartPrice} from "../content";

export class Builder {

    static createNewElement(tag, classEl = null, innerEl = null, attrEl = null, imgEl = null, currency = null) {
        let el = document.createElement(tag);
        el.className = (classEl) ? classEl : "";
        el.innerHTML = (innerEl) ? innerEl : "";
        el.style.backgroundImage = imgEl;

        if (attrEl) {
            attrEl.map((atteEl) => el.setAttribute(atteEl.name, atteEl.value));
        }
        return el
    }

    static appChild(parent, children) {
        children.map((el) => {
            parent.appendChild(el)
        });
        return parent
    }


    createCard(products) {
        let shoeBox = Builder.createNewElement("div", "box_shoe", null, null, null);
        shoeBox.style.backgroundImage = "url(images/" + products.imgEl + ")";
        let coast = Builder.createNewElement("p", "main_coast_shoe", "$" + products.price, null);
        let boxSale = Builder.createNewElement("div", "boxSale", countPercent(products.priceDown, products.price), null);

        let coastDown = Builder.createNewElement("p", "down_coast_shoe", products.priceDown, null);

        let sex = Builder.createNewElement("p", "sex_box_shoe", products.sex, null);
        let title = Builder.createNewElement("h5", "name_box_shoe", products.name);

        let showItem = Builder.createNewElement("div", "show_more", "show more", [{
            "name": "data-name",
            "value": products.nameData
        }], null)

        let shoeBoxFull = Builder.appChild(shoeBox, [coast, coastDown, sex, title, boxSale, showItem])
        return shoeBoxFull
    }

    //////

    /////

    createPageInformation(product) {
        // Left box //
        let title = Builder.appChild(Builder.createNewElement("p", "title_page_info des_page_info"), [Builder.createNewElement("span", "spanFirst", "Title: "), Builder.createNewElement("span", null, product.name)]);
        let sex = Builder.appChild(Builder.createNewElement("p", "sex_page_info des_page_info"), [Builder.createNewElement("span", "spanFirst", "Sex: "), Builder.createNewElement("span", null, product.sex)]);
        let size = Builder.appChild(Builder.createNewElement("p", "size_page_info des_page_info"), [Builder.createNewElement("span", "spanFirst", "Size: "), Builder.createNewElement("span", null, product.size)]);
        let description = Builder.appChild(Builder.createNewElement("p", "description_page_info des_page_info"), [Builder.createNewElement("span", "spanFirst", "Description: "), Builder.createNewElement("span", null, product.desc)]);
        let buttonBuy = Builder.createNewElement("button", "button_buy", "BUY NOW", [{
            "name": "id",
            "value": "button_buy"
        }, {"name": "data-name", "value": product.nameData}]);
        let leftBox = Builder.appChild(Builder.createNewElement("div", "content_page_info_box_left"), [title, sex, size, description, buttonBuy]);
        // Right box //
        let exitButton = Builder.appChild(Builder.createNewElement("div", "exit_button", null, [{
            "name": "id",
            "value": "exit_button"
        }]), [Builder.createNewElement("div", "lineOne"), Builder.createNewElement("div", "lineSecond")]);
        let rightBox = Builder.appChild(Builder.createNewElement("div", "content_page_info_box_right", null, [{
            "name": "id",
            "value": "content_page_info_box_right"
        }]), [exitButton, Builder.createNewElement("div", "main_price_shoe_page_info", "$" + product.price), Builder.createNewElement("div", "first_price_shoe_page_info", product.priceDown), Builder.createNewElement("div", "sale_price_shoe_page_info", countPercent(product.priceDown, product.price)),
            Builder.createNewElement("div", "cart_wrap_box", null, [{
            "name": "id",
            "value": "cart_wrap_box"
        }])
            ]);
        rightBox.style.backgroundImage = "url(images/" + product.imgEl + ")"

        let pageItemContent = Builder.appChild(Builder.createNewElement("div", "content_page_info"), [leftBox, rightBox]);
        let pageItemInformation = document.getElementById("page_item_info").innerHTML = "";
        pageItemInformation = Builder.appChild(document.getElementById("page_item_info"), [pageItemContent]);

        return pageItemInformation
    }

    createBoxWish(cartCount) {
        let cartWrapBox = document.getElementById("cart_wrap_box");
        document.getElementById("cart_wrap_box").innerHTML=" ";
        let cartBox = Builder.appChild(Builder.createNewElement("div", "cartBox", null, [{
            "name": "id",
            "value": "cartBox"
        }]), [Builder.createNewElement("i", "fas fa-cart-arrow-down"), Builder.createNewElement("p", "cordCount", cartCount.length)]);
        return cartWrapBox.appendChild(cartBox)
    }


    createCartFixed(cartCount) {
        let cartWrapBox = document.getElementById("fixed_cart");
        document.getElementById("fixed_cart").innerHTML=" ";

        let cartBox = Builder.appChild(Builder.createNewElement("div", "cartBox", null, [{
            "name": "id",
            "value": "cartBox"
        }]), [Builder.createNewElement("i", "fas fa-cart-arrow-down"), Builder.createNewElement("p", "cordCount", cartCount.length, [{"name":"id", "value":"cordCount"}])]);
        return cartWrapBox.appendChild(cartBox)

    }

    ///////////////////////

    createTableOfOrders(prod) {
        let ListOfOrdersWrap = document.getElementById("cart_list");
        ListOfOrdersWrap.innerHTML = "";
        ///////// => block top
        let cartItemBlockTop = Builder.createNewElement("div", "item_block_top", null, [{
            "name": "id",
            "value": "item_block_top"
        }]);
        for(let i = 0; i < prod.length; i++){
            let SelectSize = Builder.createNewElement("select", "select_size");

            for (let j = 0; j < prod[i].size.length; j++) {
                SelectSize.appendChild(Builder.createNewElement("option", "option", prod[i].size[j]))
            }

            let itemSizeBox = Builder.appChild(Builder.createNewElement("div", "item_of_card_desc item_of_card_size"),[Builder.createNewElement("span", null, "Chose size: "), SelectSize])
            let itemOfCardTitle =  Builder.appChild(Builder.createNewElement("div", "item_of_card_desc item_of_card_title"),[Builder.createNewElement("span", null, "Title: "), Builder.createNewElement("span", "item_of_card_second_text", prod[i].name)]);
            let itemOfCardPrice =  Builder.appChild(Builder.createNewElement("div", "item_of_card_desc item_of_card_price"),[Builder.createNewElement("span", null, "Price: "), Builder.createNewElement("span", "item_of_card_second_text", prod[i].price)])
            let buttonRemoveItem = Builder.createNewElement("div", "remove_item_card", "REMOVE");

            let CardBlockLeft = Builder.appChild(Builder.createNewElement("div", "item_of_card_block_left"), [itemOfCardTitle, itemOfCardPrice, itemSizeBox, buttonRemoveItem]);
            let CardBlockRight = Builder.appChild(Builder.createNewElement("div", "item_of_card_block_right"), [Builder.appChild(Builder.createNewElement("div", "item_of_card_desc item_of_card_title"), [Builder.createNewElement("span", null, "Description: "), Builder.createNewElement("span", "item_of_card_second_text", prod[i].desc)])])
            let CardBlockCenter = Builder.createNewElement("div", "item_of_card_block_centre");
            CardBlockCenter.style.backgroundImage = "url(images/" + prod[i].imgEl + ")";
            let cartItem = Builder.appChild(Builder.createNewElement("div", "item_of_card"), [CardBlockLeft, CardBlockCenter, CardBlockRight]);

            cartItemBlockTop.appendChild(cartItem);  // => will add to boxOfCart
        }

        ///////// => block bottom
        let commonGoods = Builder.appChild(Builder.createNewElement("p"), [Builder.createNewElement("span", "item_block_bottom_desc_first", "GOODS: "), Builder.createNewElement("span", "item_block_bottom_desc_second", prod.length + " items")])
        let commonSum = Builder.appChild(Builder.createNewElement("p"), [Builder.createNewElement("span", "item_block_bottom_desc_first", "SUM: "), Builder.createNewElement("span", "item_block_bottom_desc_second", "$" + sumCartPrice(prod))])
        let ButtonBuy = Builder.createNewElement("div", "buttom_cart_buy", "BUY", [{"name":"id", "value":"buttom_cart_buy"}]);
        let cartItemBlockBottom = Builder.appChild(Builder.createNewElement("div", "item_block_bottom" ), [commonGoods, commonSum, ButtonBuy] ); // => will add to boxOfCart

        ///////// => main box cart
        let boxOfCart = Builder.appChild(Builder.createNewElement("div", "box_of_cart", null, [{"name":"id", "value":"box_of_cart"}]), [cartItemBlockTop, cartItemBlockBottom]);
        let exitButtonCart = Builder.appChild(Builder.createNewElement("div", "exit_top_block_cart", null, [{"name":"id", "value":"exit_cart"}]), [Builder.createNewElement("div", "line_first"), Builder.createNewElement("div", "line_second")]);


        let ListOfOrders = Builder.appChild(ListOfOrdersWrap, [exitButtonCart, boxOfCart])

        return ListOfOrders;
    }
}


function countPercent(price, newPrice) {
    let count = Math.ceil(100 - newPrice * 100 / price);
    return +count
}


