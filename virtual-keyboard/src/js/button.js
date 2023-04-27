

const CssClasses = {
    button: ["keyboard__key", "key"],
    caseDown: "case-down",
    caseUp: ["case-up", "hidden"],
    caps: ["caps", "hidden"],
    shiftCaps: ["shift-caps", "hidden"]
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

    const caps = document.createElement('div')
    caps.classList.add(CssClasses.caps[0])
    caps.classList.add(CssClasses.caps[1])
    caps.textContent = btn.caps

    const shiftCaps = document.createElement('div')
    shiftCaps.classList.add(CssClasses.shiftCaps[0])
    shiftCaps.classList.add(CssClasses.shiftCaps[1])
    shiftCaps.textContent = btn.shiftCaps

    component.append(caseDown, caseUp, caps, shiftCaps)

    return component

}

export { createComponent };