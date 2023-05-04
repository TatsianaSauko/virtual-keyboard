import { createComponent } from "./js/page";
import data from "./js/data.js";
import dataRu from "./js/dataRu.js";
import * as Button from "./js/button";

let language = "en";
let buttons = [];

function getLocalStorage() {
  if (localStorage.getItem("language")) {
    language = localStorage.getItem("language");
  }
}

window.addEventListener("load", getLocalStorage);

const createKeyboard = (obj) => {
  buttons = [];
  let keyboard = document.querySelector(".keyboard");
  keyboard.innerHTML = "";
  obj.forEach(btn => {
    const btnComponent = Button.createComponent(btn);
    buttons.push(btnComponent);
  });
  buttons.forEach(i => {
    keyboard.append(i);
  });
};

const createPage = () => {
  getLocalStorage();
  if (language === "en") {
    const page = createComponent(data);
    document.body.append(page);
  } else {
    const page = createComponent(dataRu);
    document.body.append(page);
    createKeyboard(dataRu);
  }
};

const getCursorPosition = () => {
  let textarea = document.querySelector(".textarea");
  let currentPos = 0;
  if (document.selection) {
    textarea.focus();
    let sel = document.selection.createRange();
    sel.moveStart("character", -textarea.value.length);
    currentPos = sel.text.length;
  } else if (textarea.selectionStart || textarea.selectionStart === "0") {
    currentPos = textarea.selectionStart;
  }
  return currentPos;
};

const showLetter = (letter) => {
  let currentPos = getCursorPosition();
  let textarea = document.querySelector(".textarea");
  let contentArray = textarea.value.split("");
  contentArray.splice(currentPos, 0, letter);
  textarea.value = contentArray.join("");
  textarea.focus();
  if (letter === "    ") {
    textarea.selectionStart = currentPos + 4;
    textarea.selectionEnd = currentPos + 4;
  } else {
    textarea.selectionStart = currentPos + 1;
    textarea.selectionEnd = currentPos + 1;
  }
};

const hiddenCaseDown = () => {
  const caseDown = document.querySelectorAll(".case-down");
  caseDown.forEach(item => {
    item.classList.add("hidden");
  });
};
const hiddenCaps = () => {
  const caps = document.querySelectorAll(".caps");
  caps.forEach(item => {
    item.classList.add("hidden");
  });
};

const hiddenCaseUp = () => {
  const caseUp = document.querySelectorAll(".case-up");
  caseUp.forEach(item => {
    item.classList.add("hidden");
  });
};

const hiddenShiftCaps = () => {
  const shiftCaps = document.querySelectorAll(".shift-caps");
  shiftCaps.forEach(item => {
    item.classList.add("hidden");
  });
};

const showKeyboardCaseCaps = () => {
  hiddenCaseDown();
  hiddenShiftCaps();
  hiddenCaseUp();
  let caps = document.querySelectorAll(".caps");
  caps.forEach(item => {
    item.classList.remove("hidden");
  });
};

const changeButtonCapsLock = () => {
  let buttonCapsLock = document.querySelector(".CapsLock");
  if (buttonCapsLock.classList.contains("active")) {
    buttonCapsLock.classList.remove("active");
  } else {
    buttonCapsLock.classList.add("active");
  }
};

const showKeyboardCaseDown = () => {
  hiddenShiftCaps();
  hiddenCaseUp();
  hiddenCaps();
  let caseDown = document.querySelectorAll(".case-down");
  caseDown.forEach(item => {
    item.classList.remove("hidden");
  });
};

const changeKeyboardCase = () => {
  let buttonCapsLock = document.querySelector(".CapsLock");
  if (buttonCapsLock.classList.contains("active")) {
    showKeyboardCaseCaps();
  } else {
    showKeyboardCaseDown();
  }
};

const deleteLetterLeft = () => {
  let currentPos = getCursorPosition();
  let textarea = document.querySelector(".textarea");
  let contentArray = textarea.value.split("");
  contentArray.splice(currentPos - 1, 1);
  textarea.value = contentArray.join("");
  textarea.focus();
  textarea.selectionStart = currentPos - 1;
  textarea.selectionEnd = currentPos - 1;
};

const deleteLetterRight = () => {
  let currentPos = getCursorPosition();
  let textarea = document.querySelector(".textarea");
  let contentArray = textarea.value.split("");
  contentArray.splice(currentPos, 1);
  textarea.value = contentArray.join("");
  textarea.focus();
  textarea.selectionStart = currentPos;
  textarea.selectionEnd = currentPos;
};

const getLetter = (click) => {
  let letter = click.innerHTML;
  let clickArray = letter.split("");
  if (clickArray.length === 1) {
    showLetter(letter);
  }
  if (letter === "&amp;") {
    showLetter(clickArray[0]);
  }
  if (letter === "CapsLock") {
    changeButtonCapsLock();
    changeKeyboardCase();
  }
  if (letter === "Backspace") {
    deleteLetterLeft();
  }
  if (letter === "Del") {
    deleteLetterRight();
  }
  if (letter === "Enter") {
    showLetter("\n");
  }
  if (click.classList.contains("Space")) {
    showLetter(" ");
  }
  if (letter === "Tab") {
    showLetter("    ");
  }
};

const handlerButton = () => {
  let keyboard = document.querySelector(".keyboard");
  keyboard.addEventListener("click", (e) => {
    let click = e.target;
    getLetter(click);
  });
};

const changeCapsCock = (event) => {
  let buttonCapsLock = document.querySelector(".CapsLock");
  if (event.code === "CapsLock" && !(buttonCapsLock.classList.contains("active"))) {
    buttonCapsLock.classList.add("active");
    changeKeyboardCase();
  } else if (event.code === "CapsLock" && buttonCapsLock.classList.contains("active")) {
    buttonCapsLock.classList.remove("active");
    showKeyboardCaseDown();
  }
};
let arr = [];
data.forEach(itemClass => {
  arr.push(itemClass.class);
});
const handlerKeyboardButton = () => {
  document.addEventListener("keydown", (e) => {
    changeCapsCock(e);
    e.preventDefault();
    let button = document.querySelector(`.${e.code}`);
    try {
      let children = button.childNodes;
      let elems = Array.prototype.slice.call(children);
      elems.forEach(elem => {
        if (!(elem.classList.contains("hidden"))) {
          if (elem.innerHTML !== "CapsLock") {
            getLetter(elem);
          }
        }
      });
    } catch (err) {
      e.preventDefault();
    }
  });
};

const showActiveButton = (pressed) => {
  pressed.forEach(value => {
    document.querySelector(`.${value}`).classList.add("active");
  });
};

const removeActiveButton = (pressed) => {
  pressed.forEach(value => {
    if (value !== "ShiftLeft" && value !== "ShiftRight") {
      document.querySelector(`.${value}`).classList.remove("active");
    }
  });
};

document.addEventListener("keyup", (event) => {
  let shiftLeft = document.querySelector(".ShiftLeft");
  let shiftRight = document.querySelector(".ShiftRight");
  if (event.code === "ShiftLeft") {
    shiftLeft.classList.remove("active");
  }
  if (event.code === "ShiftRight") {
    shiftRight.classList.remove("active");
  }
});

function runOnKeys(func, ...codes) {
  let pressed = new Set();
  document.addEventListener("keydown", (event) => {
    if (event.code !== "CapsLock" && arr.includes(event.code)) {
      pressed.add(event.code);
      showActiveButton(pressed);
    }
    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    func();
  });
  document.addEventListener("keyup", (event) => {
    removeActiveButton(pressed);
    pressed.delete(event.code);
  });
}

const changeLanguage = () => {
  buttons = [];
  if (language === "en") {
    language = "ru";
    localStorage.setItem("language", language);
    createKeyboard(dataRu);
  } else {
    language = "en";
    localStorage.setItem("language", language);
    createKeyboard(data);
  }
};

const changeActiveAltLeftControlLeft = () => {
  let buttonAltLeft = document.querySelector(".AltLeft");
  buttonAltLeft.classList.add("active");
  let controlLeft = document.querySelector(".ControlLeft");
  controlLeft.classList.add("active");
};

runOnKeys(
  () => {
    let buttonCapsLock = document.querySelector(".CapsLock");
    if (buttonCapsLock.classList.contains("active")) {
      changeLanguage();
      changeKeyboardCase();
      changeActiveAltLeftControlLeft();
      changeButtonCapsLock();
    } else {
      changeLanguage();
      changeActiveAltLeftControlLeft();
    }
  },
  "ControlLeft",
  "AltLeft"
);

document.addEventListener("keyup", (event) => {
  let buttonAltLeft = document.querySelector(".AltLeft");
  if (event.code === "AltLeft") {
    buttonAltLeft.classList.remove("active");
  }
  let controlLeft = document.querySelector(".ControlLeft");
  if (event.code === "AltLeft") {
    controlLeft.classList.remove("active");
  }
});

const showKeyboardCaseShiftCaps = () => {
  hiddenCaseUp();
  hiddenCaps();
  hiddenCaseDown();
  const shiftCaps = document.querySelectorAll(".shift-caps");
  shiftCaps.forEach(item => {
    item.classList.remove("hidden");
  });
};

const showKeyboardCaseShift = () => {
  hiddenCaseDown();
  hiddenCaps();
  hiddenShiftCaps();
  const caseUp = document.querySelectorAll(".case-up");
  caseUp.forEach(item => {
    item.classList.remove("hidden");
  });
};
document.addEventListener("keydown", (event) => {
  let buttonCapsLock = document.querySelector(".CapsLock");
  if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && buttonCapsLock.classList.contains("active")) {
    showKeyboardCaseShiftCaps();
  }
  if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && !(buttonCapsLock.classList.contains("active"))) {
    showKeyboardCaseShift();
  }
});

document.addEventListener("keyup", (event) => {
  let buttonCapsLock = document.querySelector(".CapsLock");
  if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && buttonCapsLock.classList.contains("active")) {
    showKeyboardCaseCaps();
  }
  if ((event.code === "ShiftLeft" || event.code === "ShiftRight") && !(buttonCapsLock.classList.contains("active"))) {
    showKeyboardCaseDown();
  }
});

document.addEventListener("mousedown", (event) => {
  let buttonCapsLock = document.querySelector(".CapsLock");
  if (event.target.innerHTML === "Shift" && buttonCapsLock.classList.contains("active")) {
    showKeyboardCaseShiftCaps();
  }
  if (event.target.innerHTML === "Shift" && !(buttonCapsLock.classList.contains("active"))) {
    showKeyboardCaseShift();
  }
});
document.addEventListener("mouseup", (event) => {
  let buttonCapsLock = document.querySelector(".CapsLock");
  if (event.target.innerHTML === "Shift" && buttonCapsLock.classList.contains("active")) {
    showKeyboardCaseCaps();
  }
  if (event.target.innerHTML === "Shift" && !(buttonCapsLock.classList.contains("active"))) {
    showKeyboardCaseDown();
  }
});

createPage();
handlerButton();
handlerKeyboardButton();
