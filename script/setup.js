"use strict";

import { Ripple } from "./module/Ripple.js";
import { TextField } from "./module/TextField.js";
import { Header } from "./module/Header.js"

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

    const setupNavigationDrawer = (html) => {
        const baseUrl = document.URL.replace("http://", "").replace("https://", "").split("/")[0];
        let replacedHtml = html.replace(/\$baseUrl/g, "https://" + baseUrl + "/materialy");
        document.getElementsByClassName("materialy-navigation-drawer")[0].innerHTML = replacedHtml;

        Ripple.autoSetupRippleEffect();
    }

    loadFile("https://riku1227.github.io/materialy/module/header.html", (html) => {
        Header.setupHeader(html);
    });
    loadFile("https://riku1227.github.io/materialy/module/navigation-drawer.html", setupNavigationDrawer);

    Ripple.autoSetupRippleEffect();
    TextField.autoSetupTextFieldEffect();

    let timer = 0;
    window.onresize = () => {
        if (timer > 0) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            Header.updateHeader();
        }, 150);
    };
}());