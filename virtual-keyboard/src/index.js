// import { button} from "./js/button";


import { createComponent } from "./js/page";
import data from './js/data.js';
import dataRu from './js/dataRu.js';
import * as Button from "./js/button";


window.onload = function () {
    console.log("Hello!")
    handlerButton()
}

let language = 'en'


function setLocalStorage() {
    localStorage.setItem("language", language.value);
}
window.addEventListener("beforeunload", setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem("language")) {
        language = localStorage.getItem("language");
    }
}
window.addEventListener("load", getLocalStorage)
if (language === "en") {
    const page = createComponent(data)
    document.body.append(page)
} else {
    const page = createComponent(dataRu)
    document.body.append(page)
}



const handlerButton = () => {
    let keyboard = document.querySelector('.keyboard')
    keyboard.addEventListener("click", (e) => {
    let click = e.target
        showLetter(click)
    })
}

const showLetter = (click) => {
    let letter = click.innerHTML
    let clickArray = letter.split('')
    const textarea = document.querySelector('.textarea')
    if (clickArray.length === 1) {
        textarea.innerHTML += letter
    }
    if (click.classList.contains('space')) {
        textarea.innerHTML += " "
    }
    if (letter === "CapsLock") {
        changeKeyboardCase()
    }
    if (letter === "Backspace") {
        deleteLetterLeft()
    }
    if (letter === "Del") {
        deleteLetterRight()
    }
}

const changeKeyboardCase = () => {
    const caseDown = document.querySelectorAll(".case-down")
    caseDown.forEach(item => {
        if (item.classList.contains("hidden")) {
            item.classList.remove("hidden")
        } else {
            item.classList.add("hidden")
        }

    })
    const caseUp = document.querySelectorAll(".case-up")
    caseUp.forEach(item => {
        if (item.classList.contains("hidden")) {
            item.classList.remove("hidden")
        } else {
            item.classList.add("hidden")
        }
    })
}

const deleteLetterLeft = () => {
    let currentPos = getCursorPosition()
    const textarea = document.querySelector('.textarea')
    let contentArray = textarea.innerHTML.split('')
    if (currentPos === 0) {
        textarea.innerHTML = contentArray.slice(0, -1).join('')
    } else {
        contentArray.splice(currentPos - 1, 1)
        textarea.innerHTML = contentArray.join('')
    }
}

const deleteLetterRight = () => {
    let currentPos = getCursorPosition()
    const textarea = document.querySelector('.textarea')
    let contentArray = textarea.innerHTML.split('')
    if (currentPos !== 0) {
        contentArray.splice(currentPos, 1)
        textarea.innerHTML = contentArray.join('')
    }
}

const getCursorPosition = () =>{
    const textarea = document.querySelector('.textarea')
    let currentPos = 0;
    if ( document.selection ) {
    textarea.focus ();
        let sel = document.selection.createRange();
        sel.moveStart ('character', -textarea.value.length);
        currentPos = sel.text.length;
    } else if ( textarea.selectionStart || textarea.selectionStart === '0' ) {
        currentPos = textarea.selectionStart;
    }
    return currentPos;
}

function runOnKeys(func, ...codes) {
    let pressed = new Set()
    document.addEventListener('keydown', function(event) {
        pressed.add(event.code);
        for (let code of codes) {
            if (!pressed.has(code)) {
                return
            }
        }
        pressed.clear()
        func()
    })
    document.addEventListener('keyup', function(event) {
        pressed.delete(event.code)
    })
}

runOnKeys(() => {
    changeLanguage()

},
    "ControlLeft",
    "AltLeft"
)
let buttons = []
const changeLanguage = () => {
    if (language === "en" || language === "undefined") {
        language = "ru"
        localStorage.setItem("language", language)
        createKeyboard(dataRu)
    } else {
        language = "en"
        localStorage.setItem("language", language)
        createKeyboard(data)

    }

}

const createKeyboard = (data) => {
    buttons = []
    let keyboard = document.querySelector(".keyboard")
    keyboard.innerHTML = ""
    data.forEach(btn => {
        const btnComponent = Button.createComponent(btn)
        buttons.push(btnComponent)
    })
    buttons.forEach(i => {
        keyboard.append(i)
    })
}


