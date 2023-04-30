import * as Button from "./button";

const CssClasses = {
  page: "centralizer",
  title: "title",
  textarea: ["body__textarea", "textarea"],
  keyboard: ["body__keyboard", "keyboard"],
  description: "description",
  language: "language"
};
let buttons = [];

function createElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}
function createComponent(data) {
  if (!Array.isArray(data)) {
    throw TypeError("Keyboard error. Button array is invalid.");
  }
  const component = createElement("div", CssClasses.page);
  const title = createElement("h1", CssClasses.title);
  title.textContent = "RSS Виртуальная клавиатура";
  component.append(title);
  const textarea = createElement("textarea", CssClasses.textarea[0]);
  textarea.classList.add(CssClasses.textarea[1]);
  textarea.rows = 5;
  textarea.cols = 50;
  component.append(textarea);
  const keyboard = createElement("div", CssClasses.keyboard[0]);
  keyboard.classList.add(CssClasses.keyboard[1]);
  component.append(keyboard);
  const description = createElement("div", CssClasses.description);
  description.textContent = "Клавиатура создана в операционной системе Windows";
  component.append(description);
  const language = createElement("div", CssClasses.language);
  language.textContent = "Для переключения языка комбинация: левые ctrl + alt";
  component.append(language);
  data.forEach(btn => {
    const btnComponent = Button.createComponent(btn);
    buttons.push(btnComponent);
  });
  buttons.forEach(i => {
    keyboard.append(i);
  });
  return component;
}

export { createComponent };
