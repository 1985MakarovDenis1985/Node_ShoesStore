import {wrong} from "./forms";

export class isLogin {

    constructor() {
        this.emailBox = document.getElementById("email_box");
        this.buttonShowConten = document.getElementById("show_content");
        this.jsItem_box = document.getElementById("jsItem_box");
    }

    // test email //
    isSubmitDog(pass) {
        return /[\.]/.test(pass) && /[\@]/.test(pass);
    }

    isWord(pass) {
        return /[a-z]/i.test(pass);
    }

    // test password //
    isLowerWord(pass) {
        return /[a-z]/.test(pass)
    }

    isUpperWord(pass) {
        return /[A-Z]/.test(pass)
    }

    isNumber(pass) {
        return /[1-9]/.test(pass)
    }

    // remove / add class:
    loginTrue(buttonShowContent, buttonSubmit) {
        buttonShowContent.classList.remove("button_submit_untouch");
        buttonSubmit.classList.remove("button_submit_touch");

        buttonShowContent.classList.add("button_submit_touch");
        buttonSubmit.classList.add("button_submit_untouch");

        buttonShowContent.innerHTML = "You will see main content after registration";
    }

    loginFalse(buttonShowContent, buttonSubmit) {
        buttonShowContent.classList.remove("button_submit_touch");
        buttonSubmit.classList.remove("button_submit_untouch");

        buttonShowContent.classList.add("button_submit_untouch");
        buttonSubmit.classList.add("button_submit_touch");

        buttonSubmit.addEventListener("click", wrong(buttonSubmit), false);
        buttonShowContent.innerHTML = "Push button to see all range";
    }



     BSCTrue() {  // => button show content
        this.buttonShowConten.addEventListener("click", (e)=>{

            this.emailBox.style.animationName = "ep_disapear";
            this.buttonShowConten.classList.remove("button_submit_untouch");
            this.buttonShowConten.classList.add("button_submit_touch");

            setTimeout(function () {
                document.getElementById("password_box").style.animationName = "ep_disapear";
            },150);
            setTimeout(function () {
                document.getElementById("button_submit").style.animationName = "submit_disapear";
            },250);
            setTimeout(function () {
                document.getElementById("show_content").style.animationName = "show_content_disapear";
            },350);
            setTimeout(function () {
                this.jsItem_box.style.zIndex = "100000";
                document.getElementById("js_content_box_wrap").classList.add("js_content_box_change");
                document.getElementById("jsItem_box_wrap").style.bottom = "115px";
                document.getElementById("js_range_title").style.opacity = "1";
                document.getElementById("js_login_title").style.opacity = "0";

            },700);
            ///// ADD KEYFRAMES APPEAR RANGE
        })
    }
    BSCFalse() {
        setTimeout(function () {
            jsItem_box.style.backgroundColor = "transparent"
        },1000)
    }
    loginPageAppear(){
        this.emailBox.style.animationName = "ep_apear";
        this.buttonShowConten.classList.add("button_submit_untouch");

        setTimeout(function () {
            document.getElementById("password_box").style.animationName = "ep_apear";
        },150);
        setTimeout(function () {
            document.getElementById("button_submit").style.animationName = "submit_apear";
        },250);
        setTimeout(function () {
            document.getElementById("show_content").style.animationName = "show_content_apear";
        },350);
        setTimeout(function () {
            this.jsItem_box.style.zIndex = "1";
            document.getElementById("js_content_box_wrap").classList.remove("js_content_box_change");
            document.getElementById("js_range_title").style.opacity = "0";
            document.getElementById("js_login_title").style.opacity = "1";
        },10);

        ///// ADD KEYFRAMES DISAPPEAR RANGE
    }
}