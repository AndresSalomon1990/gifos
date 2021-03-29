//-------------------------------------------------------------
//IMPORTS
//-------------------------------------------------------------
import constants from "../../helper/constants.js";
import topNavStyle from "../modules/topNavStyle.js";
import nocturneMode from "../modules/nocturneMode.js";
import favorites from "../modules/favorites.js";
import trendingGifs from "../modules/trendingGifs.js";
import gif from "../modules/gif.js";

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
// FAVORITES GIFS
//-------------------------------------------------------------
const favGifs = favorites.get(
    constants.url.GIFS_BY_ID_URL,
    constants.queryStrings.PARAM_API_KEY,
    constants.queryStrings.API_KEY,
    constants.queryStrings.PARAM_IDS
);

favorites.render(
    favGifs,
    constants.elements.FAVORITES_RESULT_CONTAINER,
    constants.elements.SHOW_MORE_FAVORITES
)

//-------------------------------------------------------------
// FAVORITE GIFS FUNCTIONALITY - FAV, DOWNLOAD, EXPAND
//-------------------------------------------------------------

// Add favorite functionality to the fav icon
constants.elements.FAVORITES_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

// Add download functionality to the download icon
constants.elements.FAVORITES_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

// Add expand functionality to the expand icon - or to the gif itself for mobile
constants.elements.FAVORITES_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "icon-expand",
        constants.elements.MODAL,
        "data-expand-url",
        "data-expand-title",
        "data-expand-username",
        "data-expand-id"
    );
}, true);

constants.elements.FAVORITES_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "gif",
        constants.elements.MODAL,
        "data-gif-url",
        "data-gif-title",
        "data-gif-username",
        "data-gif-id"
    );
}, true);

//-------------------------------------------------------------
// SHOW MORE
//-------------------------------------------------------------
constants.elements.SHOW_MORE_FAVORITES.addEventListener("click", () => {
    favorites.showMore(constants.elements.SHOW_MORE_FAVORITES);

    favorites.render(
        favGifs,
        constants.elements.FAVORITES_RESULT_CONTAINER,
        constants.elements.SHOW_MORE_FAVORITES
    )
}, true);

//-------------------------------------------------------------
// MODAL FUNCTIONALITY - FAV, DOWNLOAD
//-------------------------------------------------------------

// Add close functionality to the modal X
constants.elements.MODAL.addEventListener("click", (event) => {
    gif.closeModal(event, "close-modal-icon", constants.elements.MODAL);
}, true);

// Add favorite functionality to the fav icon
constants.elements.MODAL.addEventListener("click", (event) => {
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

// Add download functionality to the download icon
constants.elements.MODAL.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

//-------------------------------------------------------------
// TRENDING GIFS
//-------------------------------------------------------------

const trendingGifsData = trendingGifs.get(
    constants.url.TRENDING_GIFS_URL,
    constants.queryStrings.PARAM_API_KEY,
    constants.queryStrings.API_KEY,
    constants.queryStrings.PARAM_LIMIT
);

// Render trending search gifs
trendingGifs.render(trendingGifsData, constants.elements.TRENDING_GIFOS_SLIDER);

// Add functionality to the next and prev buttons for the slider
constants.elements.PREV_BUTTON.addEventListener("click", () => {
    trendingGifs.scrollToRight(constants.elements.TRENDING_GIFOS_SLIDER);
}, false);

constants.elements.NEXT_BUTTON.addEventListener("click", () => {
    trendingGifs.scrollToLeft(constants.elements.TRENDING_GIFOS_SLIDER);
}, false);

//-------------------------------------------------------------
// TRENDING GIFS FUNCTIONALITY - FAV, DOWNLOAD, EXPAND
//-------------------------------------------------------------

// Add favorite functionality to the fav icon
constants.elements.TRENDING_GIFOS_SLIDER.addEventListener("click", (event) => {
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

// Add download functionality to the download icon
constants.elements.TRENDING_GIFOS_SLIDER.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

// Add expand functionality to the expand icon - or to the gif itself for mobile
constants.elements.TRENDING_GIFOS_SLIDER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "icon-expand",
        constants.elements.MODAL,
        "data-expand-url",
        "data-expand-title",
        "data-expand-username",
        "data-expand-id"
    );
}, true);

constants.elements.TRENDING_GIFOS_SLIDER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "gif",
        constants.elements.MODAL,
        "data-gif-url",
        "data-gif-title",
        "data-gif-username",
        "data-gif-id"
    );
}, true);