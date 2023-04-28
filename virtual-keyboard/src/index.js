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
        getLetter(click)
    })
}
const getLetter = (click) => {
    let letter = click.innerHTML
    let clickArray = letter.split('')
    if (clickArray.length === 1) {
        showLetter(letter)
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
        showLetter("\n")
    }
    if(click.classList.contains("Space")) {
        showLetter(" ")
    }
    if(letter === "Tab") {
        showLetter("    ")
    }
}

const showLetter = (letter) => {
    let currentPos = getCursorPosition()
    let textarea = document.querySelector('.textarea')
    let contentArray = textarea.value.split('')
    contentArray.splice(currentPos, 0, letter)
    textarea.value = contentArray.join('')
    textarea.focus()
        if (letter === "    ") {
            textarea.selectionStart = currentPos + 4
            textarea.selectionEnd = currentPos + 4
        } else {
            textarea.selectionStart = currentPos + 1
            textarea.selectionEnd = currentPos + 1
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
    let textarea = document.querySelector('.textarea')
    let contentArray = textarea.value.split('')
    contentArray.splice(currentPos - 1, 1)
    textarea.value = contentArray.join('')
    textarea.focus()
    textarea.selectionStart = currentPos - 1
    textarea.selectionEnd = currentPos - 1

}

const deleteLetterRight = () => {
    let currentPos = getCursorPosition()
    let textarea = document.querySelector('.textarea')
    let contentArray = textarea.value.split('')
    contentArray.splice(currentPos, 1)
    textarea.value = contentArray.join('')
    textarea.focus()
    textarea.selectionStart = currentPos
    textarea.selectionEnd = currentPos
}

const getCursorPosition = () =>{
    let textarea = document.querySelector('.textarea')
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
    let buttonCapsLock = document.querySelector(".CapsLock")
    if (buttonCapsLock.classList.contains("active")) {
        changeLanguage()
        changeKeyboardCase()
        changeButtonCapsLock()

    } else {
        changeLanguage()
    }

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
    let buttonCapsLock = document.querySelector(".CapsLock")
    if (event.target.innerHTML === "Shift"  && buttonCapsLock.classList.contains("active")) {
        showKeyboardCaseShiftCaps()
    }
    if (event.target.innerHTML === "Shift"  && buttonCapsLock.classList.contains("active")) {
        showKeyboardCaseShift()
    }
})
document.addEventListener('keyup', function(event) {
    let caps = document.querySelectorAll(".caps")[0]
    if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && !(caps.classList.contains("hidden"))) {
        showKeyboardCaseCaps()
    }
    if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && caps.classList.contains("hidden")) {
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
    let buttonCapsLock = document.querySelector(".CapsLock")
    if (event.target.innerHTML === "Shift"  && buttonCapsLock.classList.contains("active")) {
        showKeyboardCaseShiftCaps()
    }
    if (event.target.innerHTML === "Shift" && !(buttonCapsLock.classList.contains("active"))) {
        showKeyboardCaseShift()
    }
})
document.addEventListener('mouseup', function(event) {
    let buttonCapsLock = document.querySelector(".CapsLock")
    if (event.target.innerHTML === "Shift"  && buttonCapsLock.classList.contains("active")) {
        showKeyboardCaseCaps()
    }
    if (event.target.innerHTML === "Shift" && !(buttonCapsLock.classList.contains("active"))) {
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
    console.log(shiftCaps)
    shiftCaps.forEach(item => {
        item.classList.remove("hidden")
    })
}