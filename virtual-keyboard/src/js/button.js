

const CssClasses = {
    button: ["keyboard__key", "key"],
    caseDown: "case-down",
    caseUp: ["case-up", "hidden"]
}

function createComponent(btn) {
    const component = document.createElement('div')
    component.classList.add(CssClasses.button[0])
    component.classList.add(CssClasses.button[1])
    component.classList.add(btn.class)

    const caseDown = document.createElement('div')
    caseDown.classList.add(CssClasses.caseDown)
    caseDown.textContent = btn.caseDown

    const caseUp = document.createElement('div')
    caseUp.classList.add(CssClasses.caseUp[0])
    caseUp.classList.add(CssClasses.caseUp[1])
    caseUp.textContent = btn.caseUp

    component.append(caseDown, caseUp)

    return component

}

export { createComponent };