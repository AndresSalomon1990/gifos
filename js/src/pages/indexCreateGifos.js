//-------------------------------------------------------------
//IMPORTS
//-------------------------------------------------------------
import constants from "../../helper/constants.js";
import topNavStyle from "../modules/topNavStyle.js";
import nocturneMode from "../modules/nocturneMode.js";
import recordRTC from "../modules/recordRTC.js";

//-------------------------------------------------------------
// CHANGE TOPNAVAR STYLE
//-------------------------------------------------------------

// Change style of topNavbar on scroll
window.addEventListener("scroll", () => {
    if(window.screen.width > 980) {
        topNavStyle.changeOnScroll(constants.elements.TOPNAV_CONTAINER);
    }
}, false);

// Change style of topNavbar on resize
window.addEventListener("resize", () => {
    if(window.screen.width < 980) {
        topNavStyle.removeShadow(constants.elements.TOPNAV_CONTAINER);
    }
}, false);

//-------------------------------------------------------------
// NOCTURNE MODE
//-------------------------------------------------------------
window.addEventListener("load", () => {
    nocturneMode.getCurrentTheme(constants.elements.NOCTURNE_MODE_MOBILE, constants.elements.NOCTURNE_MODE_DESKTOP);
}, false);

constants.elements.NOCTURNE_MODE_MOBILE.addEventListener("click", () => {
    nocturneMode.change(constants.elements.NOCTURNE_MODE_MOBILE, constants.elements.NOCTURNE_MODE_DESKTOP);
}, false);

constants.elements.NOCTURNE_MODE_DESKTOP.addEventListener("click", () => {
    nocturneMode.change(constants.elements.NOCTURNE_MODE_MOBILE, constants.elements.NOCTURNE_MODE_DESKTOP);
}, false);

//-------------------------------------------------------------
// RECORD
//-------------------------------------------------------------
constants.elements.START_BUTTON.addEventListener("click", (event) => {
    recordRTC.start(
        event,
        constants.elements.CREATE_GIF_TITLE,
        constants.elements.CREATE_GIF_MESSAGE,
        constants.elements.START_BUTTON,
        constants.elements.RECORD_BUTTON,
        constants.elements.RECORD_VIDEO,
        constants.elements.CANVAS_CONTAINER,
        constants.elements.STEP_1,
        constants.elements.STEP_2);
}, false);

constants.elements.RECORD_BUTTON.addEventListener("click", () => {
    recordRTC.record(
        constants.elements.RECORD_BUTTON,
        constants.elements.STOP_BUTTON,
        constants.elements.TIMER
    );
}, false);