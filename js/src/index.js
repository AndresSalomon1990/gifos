//-------------------------------------------------------------
//IMPORTS
//-------------------------------------------------------------
import constants from "../helper/constants.js";
import topNavStyle from "./modules/topNavStyle.js";
import trendingSearchTerms from "./modules/trendingSearchTerms.js";
import searchGifs from "./modules/searchGifs.js";
import searchAutocomplete from "./modules/searchAutocomplete.js";
import nocturneMode from "./modules/nocturneMode.js";
import gif from "./modules/gif.js";

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
// TRENDING TERMS
//-------------------------------------------------------------
const trendingTermsData = trendingSearchTerms.get(
    constants.url.TRENDING_SEARCH_TERMS_URL,
    constants.queryStrings.PARAM_API_KEY,
    constants.queryStrings.API_KEY);

// Add click functionality to the terms so they can fill the input
constants.elements.TRENDING_TERMS_CONTAINER.addEventListener("click", (event) => {
    trendingSearchTerms.addClickEventListener(
        event,
        constants.elements.SEARCH_GIFS_INPUT,
        "trending-search-term"
    );
}, true);

// Render trending search terms
trendingSearchTerms.render(trendingTermsData, constants.elements.TRENDING_TERMS_CONTAINER);

//-------------------------------------------------------------
// SEARCH BAR
//-------------------------------------------------------------

// Change search icon to X when the user fill the input typing
constants.elements.SEARCH_GIFS_INPUT.addEventListener("keyup", () => {
    if (constants.elements.SEARCH_GIFS_INPUT.value === "") {

        searchAutocomplete.clear(
            constants.elements.AUTOCOMPLETE_BOX,
            constants.elements.SEARCH_BAR_BOTTOM_LINE
        );

        constants.elements.SEARCH_TOGGLE_ICON.style.display = "block";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "none";
        constants.elements.SEARCH_ICON.style.display = "none";

    } else {
        constants.elements.SEARCH_TOGGLE_ICON.style.display = "none";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "block";
        constants.elements.SEARCH_ICON.style.display = "block";

        constants.elements.CANCEL_SEARCH_ICON.addEventListener("click", () => {            
            searchGifs.clear(
                constants.elements.SEARCH_GIFS_INPUT,
                constants.elements.SEARCH_RESULT_SEPARATOR,
                constants.elements.SEARCH_RESULT_TITLE,
                constants.elements.SEARCH_TOGGLE_ICON,
                constants.elements.CANCEL_SEARCH_ICON,
                constants.elements.SEARCH_ICON,
                constants.elements.SEARCH_RESULT_CONTAINER
            );

            searchAutocomplete.clear(
                constants.elements.AUTOCOMPLETE_BOX,
                constants.elements.SEARCH_BAR_BOTTOM_LINE
            );
        }, false);
    }
}, false);

// Change search icon to X when the input is filled on CHANGE
constants.elements.SEARCH_GIFS_INPUT.addEventListener("change", () => {
    if (constants.elements.SEARCH_GIFS_INPUT.value === "") {

        searchAutocomplete.clear(
            constants.elements.AUTOCOMPLETE_BOX,
            constants.elements.SEARCH_BAR_BOTTOM_LINE
        );

        constants.elements.SEARCH_TOGGLE_ICON.style.display = "block";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "none";
        constants.elements.SEARCH_ICON.style.display = "none";

    } else {
        constants.elements.SEARCH_TOGGLE_ICON.style.display = "none";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "block";
        constants.elements.SEARCH_ICON.style.display = "block";

        constants.elements.CANCEL_SEARCH_ICON.addEventListener("click", () => {
            searchGifs.clear(
                constants.elements.SEARCH_GIFS_INPUT,
                constants.elements.SEARCH_RESULT_SEPARATOR,
                constants.elements.SEARCH_RESULT_TITLE,
                constants.elements.SEARCH_TOGGLE_ICON,
                constants.elements.CANCEL_SEARCH_ICON,
                constants.elements.SEARCH_ICON,
                constants.elements.SEARCH_RESULT_CONTAINER
            );

            searchAutocomplete.clear(
                constants.elements.AUTOCOMPLETE_BOX,
                constants.elements.SEARCH_BAR_BOTTOM_LINE
            );
        }, false);
    }
}, false);

// Render gifs on input change
constants.elements.SEARCH_GIFS_INPUT.addEventListener("change", () => {
    const searchData = searchGifs.get(
        constants.url.SEARCH_URL,
        constants.elements.SEARCH_GIFS_INPUT,
        constants.queryStrings.PARAM_API_KEY,
        constants.queryStrings.API_KEY,
        constants.queryStrings.PARAM_Q,
        constants.queryStrings.PARAM_LIMIT,
        constants.queryStrings.PARAM_OFFSET
    );

    // searchData
    // .then(data => console.log(data.data))
    // .catch(error => console.log(error.message));

    searchGifs.render(
        searchData,
        constants.elements.SEARCH_GIFS_INPUT,
        constants.elements.SEARCH_RESULT_SEPARATOR,
        constants.elements.SEARCH_RESULT_TITLE,
        constants.elements.SEARCH_RESULT_CONTAINER
    );
}, false);

//-------------------------------------------------------------
// GIFS FUNCTIONALITY - FAV, DOWNLOAD, EXPAND
//-------------------------------------------------------------

// Add favorite functionality to the fav icon
constants.elements.SEARCH_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.favorite(event, "icon-fav-false", "icon-fav-true");
}, true);

// Add download functionality to the download icon
constants.elements.SEARCH_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.download(event, "icon-download");
}, true);

// Add expand functionality to the expand icon - or to the gif itself for mobile
constants.elements.SEARCH_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "icon-expand",
        constants.elements.MODAL,
        "data-expand-url",
        "data-expand-username",
        "data-expand-title",
        "data-expand-id"
    );
}, true);

constants.elements.SEARCH_RESULT_CONTAINER.addEventListener("click", (event) => {
    gif.expand(
        event,
        "gif",
        constants.elements.MODAL,
        "data-gif-url",
        "data-gif-username",
        "data-gif-title",
        "data-gif-id"
    );
}, true);

//-------------------------------------------------------------
// MODAL FUNCTIONALITY - FAV, DOWNLOAD
//-------------------------------------------------------------

// add close functionality to the modal X
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
// AUTOCOMPLETE SUGGESTIONS
//-------------------------------------------------------------

// Autocomplete suggestions when the user type something
constants.elements.SEARCH_GIFS_INPUT.addEventListener("input", () => {
    const searchAutocompleteData = searchAutocomplete.get(
        constants.url.SEARCH_AUTOCOMPLETE_URL,
        constants.elements.SEARCH_GIFS_INPUT,
        constants.queryStrings.PARAM_API_KEY,
        constants.queryStrings.API_KEY,
        constants.queryStrings.PARAM_Q
    );

    searchAutocomplete.render(
        searchAutocompleteData,
        constants.elements.AUTOCOMPLETE_BOX,
        constants.elements.SEARCH_BAR_BOTTOM_LINE);

    if (constants.elements.SEARCH_GIFS_INPUT.value === "") {
        searchAutocomplete.clear(
            constants.elements.AUTOCOMPLETE_BOX,
            constants.elements.SEARCH_BAR_BOTTOM_LINE);
    }
}, false);

// Add click functionality to the suggestions so they can fill the input
constants.elements.AUTOCOMPLETE_BOX.addEventListener("click", (event) => {
    trendingSearchTerms.addClickEventListener(
        event,
        constants.elements.SEARCH_GIFS_INPUT,
        "autocomplete-suggestion"
    );

    searchAutocomplete.clear(
        constants.elements.AUTOCOMPLETE_BOX,
        constants.elements.SEARCH_BAR_BOTTOM_LINE);
}, true);

// Clear autocomplete box when searching
constants.elements.SEARCH_GIFS_INPUT.addEventListener("search", () => {
    searchAutocomplete.clear(
        constants.elements.AUTOCOMPLETE_BOX,
        constants.elements.SEARCH_BAR_BOTTOM_LINE);
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