"use strict";
(function () {
    const loadFile = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open("get", url, true);
        request.callback = callback
        request.onloadend = function () {
            this.callback.call(this, request.responseText);
        }
        request.send(null);
    }

    const setupHeader = () => {
        const topAppBar = document.getElementsByClassName("materialy-app-bar-top")[0];
        const topAppBarDrawerButton = document.getElementsByClassName("materialy-app-bar-top--checkbox")[0];
        const navigationDrawer = document.getElementsByClassName("materialy-navigation-drawer")[0];
        const navigationDrawerScrim = document.getElementsByClassName("materialy-navigation-drawer__modal--scrim")[0];
        const mainContent = document.getElementsByClassName("materialy-content")[0]

        if (window.innerWidth <= 896) {
            navigationDrawer.classList.add("materialy-navigation-drawer__modal");
        } else {
            navigationDrawer.classList.remove("materialy-navigation-drawer__modal");
        }

        //topAppBarDrawerButton.removeEventListener("change");

        topAppBarDrawerButton.addEventListener("change", function () {
            let isModalNavigation = navigationDrawer.classList.contains("materialy-navigation-drawer__modal");
            let isFullHeightNavigation = navigationDrawer.classList.contains("materialy-navigation-drawer__full-height");
            if (topAppBarDrawerButton.checked) {
                navigationDrawer.classList.add("materialy-navigation-drawer__open");
                if (isModalNavigation) {
                    navigationDrawerScrim.classList.add("materialy-navigation-drawer__modal--scrim__open");
                } else {
                    mainContent.classList.add("materialy-content__open-drawer");
                    if (isFullHeightNavigation) {
                        topAppBar.classList.add("materialy-app-bar-top__full-height-open");
                    }
                }
            } else {
                navigationDrawer.classList.remove("materialy-navigation-drawer__open");
                if (isModalNavigation) {
                    navigationDrawerScrim.classList.remove("materialy-navigation-drawer__modal--scrim__open");
                } else {
                    mainContent.classList.remove("materialy-content__open-drawer");
                    if (isFullHeightNavigation) {
                        topAppBar.classList.remove("materialy-app-bar-top__full-height-open");
                    }
                }
            }
        })
    }

    const setupNavigationDrawer = (html) => {
        const baseUrl = document.URL.replace("http://", "").replace("https://", "").split("/")[0];
        let replacedHtml = html.replace(/\$baseUrl/g, "https://" + baseUrl + "/materialy");
        document.getElementsByClassName("materialy-navigation-drawer")[0].innerHTML = replacedHtml;

        Array.from(document.querySelectorAll('.materialy-ripple')).forEach((elem) => {
            elem.removeEventListener('click', rippleEffect);
            elem.addEventListener('click', rippleEffect);
        });
        Array.from(document.querySelectorAll('.materialy-ripple__base-accent')).forEach((elem) => {
            elem.removeEventListener('click', rippleEffect);
            elem.addEventListener('click', rippleEffect);
        });
        Array.from(document.querySelectorAll('.materialy-ripple__accent')).forEach((elem) => {
            elem.removeEventListener('click', rippleEffect);
            elem.addEventListener('click', rippleEffect);
        });
        Array.from(document.querySelectorAll('.materialy-ripple__base-primary')).forEach((elem) => {
            elem.removeEventListener('click', rippleEffect);
            elem.addEventListener('click', rippleEffect);
        });
        Array.from(document.querySelectorAll('.materialy-ripple__primary')).forEach((elem) => {
            elem.removeEventListener('click', rippleEffect);
            elem.addEventListener('click', rippleEffect);
        });
    }

    loadFile("https://riku1227.github.io/materialy/module/header.html", (html) => {
        document.getElementsByClassName("materialy-app-bar-top")[0].innerHTML = html;
        setupHeader();
    });
    loadFile("https://riku1227.github.io/materialy/module/navigation-drawer.html", setupNavigationDrawer);

    const rippleEffect = (event) => {
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

    Array.from(document.querySelectorAll('.materialy-ripple')).forEach((elem) => {
        elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__base-accent')).forEach((elem) => {
        elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__accent')).forEach((elem) => {
        elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__base-primary')).forEach((elem) => {
        elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__primary')).forEach((elem) => {
        elem.addEventListener('click', rippleEffect);
    });

    const textFieldEffect = (elem) => {
        const children = elem.children;
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
                var style = window.getComputedStyle(input);
                const inputFontSize = parseFloat(style.height) / 16;
                const translateSize = ((inputFontSize) * 8 + 7 + inputFontSize * 0.5) - parseInt(parseFloat(style.height) / 16);
                console.log(inputFontSize + " : " + translateSize)
                hint.style.transform = `translateY(-${translateSize}px) scale(0.75,0.75)`;
            });

            input.addEventListener("blur", function (e) {
                if (e.target.value === "") {
                    hint.style.transform = "";
                }
            });
        }
    }

    Array.from(document.querySelectorAll('.materialy-text-field')).forEach((elem) => {
        textFieldEffect(elem);
    });

    Array.from(document.querySelectorAll('.materialy-text-field')).forEach((elem) => {
        textFieldEffect(elem);
    });

    let timer = 0;
    window.onresize = () => {
        if (timer > 0) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            setupHeader();
        }, 150);
    };
}());