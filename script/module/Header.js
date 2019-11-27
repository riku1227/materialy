export class Header {
    static setupHeader(html) {
        document.getElementsByClassName("materialy-app-bar-top")[0].innerHTML = html;

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

    static updateHeader() {
        const navigationDrawer = document.getElementsByClassName("materialy-navigation-drawer")[0];
        if (window.innerWidth <= 896) {
            navigationDrawer.classList.add("materialy-navigation-drawer__modal");
        } else {
            navigationDrawer.classList.remove("materialy-navigation-drawer__modal");
        }
    }
}