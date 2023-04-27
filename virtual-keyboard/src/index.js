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
        changeButtonCapsLock()
    }
    if (letter === "Backspace") {
        deleteLetterLeft()
    }
    if (letter === "Del") {
        deleteLetterRight()
    }
    if(letter === "Enter") {
        moveCursorNewLine()
    }
    if(letter === "Tab") {
        createHorizontalMargin()
    }
}

const changeButtonCapsLock = () => {
    let buttonCapsLock = document.querySelector(".CapsLock")
    if (buttonCapsLock.classList.contains("active")) {
        buttonCapsLock.classList.remove("active")
    } else {
        buttonCapsLock.classList.add("active")
    }
}

const createHorizontalMargin = () => {
    const textarea = document.querySelector('.textarea')
    textarea.innerHTML += "\t"
}

const moveCursorNewLine = () => {
    const textarea = document.querySelector('.textarea')
    textarea.innerHTML += "\n"
}

const changeKeyboardCase = () => {
    const caps = document.querySelectorAll(".caps")
    caps.forEach(item => {
        if (item.classList.contains("hidden")) {
            item.classList.remove("hidden")
        } else {
            item.classList.add("hidden")
        }
    })
    const caseDown = document.querySelectorAll(".case-down")
    caseDown.forEach(item => {
        if (item.classList.contains("hidden")) {
            item.classList.remove("hidden")
        } else {
            item.classList.add("hidden")
        }
    })
}

const deleteLetterLeft = () => {
    let currentPos = getCursorPosition()
    console.log(currentPos)
    const textarea = document.querySelector('.textarea')
    console.log(textarea.innerHTML)
    let contentArray = textarea.innerHTML.split('')
    if (currentPos === 0) {
        textarea.innerHTML = contentArray.slice(0, -1).join('')
    } else {
        contentArray.splice(currentPos - 1, 1)
        textarea.innerHTML = contentArray.join('')
        textarea.focus()
        textarea.selectionStart = currentPos - 1
    }
}

const deleteLetterRight = () => {
    let currentPos = getCursorPosition()
    const textarea = document.querySelector('.textarea')
    let contentArray = textarea.innerHTML.split('')
    if (currentPos !== 0) {
        contentArray.splice(currentPos, 1)
        textarea.innerHTML = contentArray.join('')
        textarea.focus()
        textarea.selectionStart = currentPos
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
    buttons = []
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

document.addEventListener('keydown', function(event) {
    let btn = event.code
    let buttonsKeyboard = document.querySelector(`".${btn}"`)
    buttonsKeyboard.classList.add("active")
})

document.addEventListener('keydown', function(event) {
    let caps = document.querySelectorAll(".caps")[0]
    if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && caps.classList.contains("active")) {
        showKeyboardCaseShiftCaps()
    }
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        showKeyboardCaseShift()
    }
})
document.addEventListener('keyup', function(event) {
    let caps = document.querySelectorAll(".caps")[0]
    if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && caps.classList.contains("active")) {
        showKeyboardCaseCaps()
    }
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        showKeyboardCaseDown()
    }
})

const showKeyboardCaseDown = () => {
    hiddenShiftCaps()
    hiddenCaseUp()
    hiddenCaps()
    let caseDown = document.querySelectorAll(".case-down")
    caseDown.forEach(item => {
        item.classList.remove("hidden")
    })
}

const showKeyboardCaseCaps = () => {
    hiddenCaseDown()
    hiddenShiftCaps()
    hiddenCaseUp()
    let caps = document.querySelectorAll(".caps")
    caps.forEach(item => {
        item.classList.remove("hidden")
    })

}
document.addEventListener('mousedown', function(event) {
    let caps = document.querySelectorAll(".caps")[0]
    if (event.target.innerHTML === "Shift"  && caps.classList.contains("active")) {
        showKeyboardCaseShiftCaps()
    }
    if (event.target.innerHTML === "Shift" && !(caps.classList.contains("active"))) {
        showKeyboardCaseShift()
    }
})
document.addEventListener('mouseup', function(event) {
    let caps = document.querySelectorAll(".caps")[0]
    if (event.target.innerHTML === "Shift"  && caps.classList.contains("active")) {
        showKeyboardCaseCaps()
    }
    if (event.target.innerHTML === "Shift" && !(caps.classList.contains("active"))) {
        showKeyboardCaseDown()
    }
})

const showKeyboardCaseShift = () => {
    hiddenCaseDown()
    hiddenCaps()
    hiddenShiftCaps()
    const caseUp = document.querySelectorAll(".case-up")
    caseUp.forEach(item => {
        item.classList.remove("hidden")
    })
}
const hiddenShiftCaps = () => {
    const shiftCaps = document.querySelectorAll(".shift-caps")
    shiftCaps.forEach(item => {
        item.classList.add("hidden")
    })
}
const hiddenCaseDown = () => {
    const caseDown = document.querySelectorAll(".case-down")
    caseDown.forEach(item => {
        item.classList.add("hidden")
    })
}
const hiddenCaps = () => {
    const caps = document.querySelectorAll(".caps")
    caps.forEach(item => {
        item.classList.add("hidden")
    })
}
const hiddenCaseUp = () => {
    const caseUp = document.querySelectorAll(".case-up")
    caseUp.forEach(item => {
        item.classList.add("hidden")
    })
}

const showKeyboardCaseShiftCaps = () => {
    hiddenCaseUp()
    hiddenCaps()
    hiddenCaseDown()
    const shiftCaps = document.querySelectorAll(".shift-caps")
    shiftCaps.forEach(item => {
        item.classList.remove("hidden")
    })
}