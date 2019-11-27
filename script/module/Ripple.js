export class Ripple {
    static _rippleEffect(event) {
        const target = event.target;
        const rippleSpan = document.createElement("span");
        const rippleSpanSize = target.offsetWidth;
        const targetLocation = target.getBoundingClientRect();

        const x = event.pageX - targetLocation.left - window.pageXOffset - (rippleSpanSize / 2);
        const y = event.pageY - targetLocation.top - window.pageYOffset - (rippleSpanSize / 2);

        const ripplePosition = `top: ${y}px; left: ${x}px; height: ${rippleSpanSize}px; width: ${rippleSpanSize}px;`;

        target.appendChild(rippleSpan);
        rippleSpan.setAttribute("style", ripplePosition);
        target.classList.forEach((className) => {
            if (className.indexOf("materialy-ripple") != -1) {
                switch (className) {
                    case "materialy-ripple":
                        rippleSpan.setAttribute("class", "materialy-ripple--effect");
                        break;
                    case "materialy-ripple__base-accent":
                        rippleSpan.setAttribute("class", "materialy-ripple--effect__base-accent");
                        break;
                    case "materialy-ripple__accent":
                        rippleSpan.setAttribute("class", "materialy-ripple--effect__accent");
                        break;
                    case "materialy-ripple__base-primary":
                        rippleSpan.setAttribute("class", "materialy-ripple--effect__base-primary");
                        break;
                    case "materialy-ripple__primary":
                        rippleSpan.setAttribute("class", "materialy-ripple--effect__primary");
                        break;
                    default:
                        rippleSpan.setAttribute("class", "materialy-ripple--effect");
                        break;
                }
            }
        });
        const rippleId = `materialy-ripple-${Math.random()}`
        rippleSpan.setAttribute("id", rippleId)

        setTimeout(() => {
            document.getElementById(rippleId).remove();
        }, 1250);
    }

    static addRippleEffect(element) {
        element.removeEventListener('click', this._rippleEffect);
        element.addEventListener('click', this._rippleEffect);
    }

    static autoSetupRippleEffect() {
        document.querySelectorAll('.materialy-ripple').forEach((element) => {
            this.addRippleEffect(element);
        });
        document.querySelectorAll('.materialy-ripple__base-accent').forEach((element) => {
            this.addRippleEffect(element);
        });
        document.querySelectorAll('.materialy-ripple__accent').forEach((element) => {
            this.addRippleEffect(element);
        });
        document.querySelectorAll('.materialy-ripple__base-primary').forEach((element) => {
            this.addRippleEffect(element);
        });
        document.querySelectorAll('.materialy-ripple__primary').forEach((element) => {
            this.addRippleEffect(element);
        });
    }
}