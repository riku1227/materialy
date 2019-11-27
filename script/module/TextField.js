export class TextField {

    static updateTextFieldByDiv(textFieldDiv) {
        const children = textFieldDiv.children;
        let input = undefined;
        let hint = undefined;
        Array.from(children).forEach((it) => {
            if (it.classList.contains("materialy-text-field--input")) {
                input = it
            } else if (it.classList.contains("materialy-text-field--border") ||
                it.classList.contains("materialy-text-field--border__accent") ||
                it.classList.contains("materialy-text-field--border__primary")) {
                Array.from(it.children).forEach((x) => {
                    if (x.classList.contains("materialy-text-field--border--hint")) {
                        hint = x.children[0];
                    }
                });
            }
        });

        if (hint != undefined) {
            TextField.updateTextField(input, hint, false);
        }
    }

    static updateTextField(input, hint, isFocus) {
        if(input.value !== "" || isFocus) {
            var style = window.getComputedStyle(input);
            const inputFontSize = parseFloat(style.height) / 16;
            const translateSize = ((inputFontSize) * 8 + 7 + inputFontSize * 0.5) - parseInt(parseFloat(style.height) / 16);
            hint.style.transform = `translateY(-${translateSize}px) scale(0.75,0.75)`;
        } else {
            if(input.value === "") {
                hint.style.transform = "";
            }
        }
    }

    static addTextFieldEffect(elemnt) {
        const children = elemnt.children;
        let input = undefined;
        let hint = undefined;
        Array.from(children).forEach((it) => {
            if (it.classList.contains("materialy-text-field--input")) {
                input = it
            } else if (it.classList.contains("materialy-text-field--border") ||
                it.classList.contains("materialy-text-field--border__accent") ||
                it.classList.contains("materialy-text-field--border__primary")) {
                Array.from(it.children).forEach((x) => {
                    if (x.classList.contains("materialy-text-field--border--hint")) {
                        hint = x.children[0];
                    }
                });
            }
        });

        if (hint != undefined) {
            input.addEventListener("focus", function (e) {
                TextField.updateTextField(input, hint, true);
            });

            input.addEventListener("blur", function (e) {
                TextField.updateTextField(input, hint, false);
            });
        }
    }

    static autoSetupTextFieldEffect() {
        document.querySelectorAll('.materialy-text-field').forEach((element) => {
            TextField.addTextFieldEffect(element);
        });
    }

    static autoUpdateTextFields() {
        document.querySelectorAll('.materialy-text-field').forEach((element) => {
            TextField.updateTextFieldOnDiv(element);
        });
    }

    static getInputByTextFieldDiv(textFieldDiv) {
        const children = textFieldDiv.children;

        return Array.from(children).find(element => {
            return element.classList.contains("materialy-text-field--input")
        });
    }

    static getValueByTextFieldDiv(textFieldDiv) {
        return TextField.getInputByTextFieldDiv(textFieldDiv).value;
    }

    static setValueByTextFieldDiv(textFieldDiv, value) {
        TextField.getInputByTextFieldDiv(textFieldDiv).value = value;
        TextField.updateTextFieldByDiv(textFieldDiv);
    }
}