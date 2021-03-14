//-------------------------------------------------------------
//IMPORTS
//-------------------------------------------------------------
import constants from "../helper/constants.js";
import topNavStyle from "./modules/topNavStyle.js";
import trendingSearchTerms from "./modules/trendingSearchTerms.js";
import searchGifs from "./modules/searchGifs.js";
import searchAutocomplete from "./modules/searchAutocomplete.js";

//-------------------------------------------------------------
//API DATA
//-------------------------------------------------------------
const trendingTermsData = trendingSearchTerms.get(
    constants.url.TRENDING_SEARCH_TERMS_URL,
    constants.queryStrings.PARAM_API_KEY,
    constants.queryStrings.API_KEY);

//-------------------------------------------------------------
//EVENT LISTENERS
//-------------------------------------------------------------

//-----------------------Header listeners----------------------

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

//-----------------------Main listeners----------------------

// Add click functionality to the terms so they can fill the input
constants.elements.TRENDING_TERMS_CONTAINER.addEventListener("click", (event) => {
    trendingSearchTerms.addClickEventListener(
        event,
        constants.elements.SEARCH_GIFS_INPUT,
        "trending-search-term"
    );
}, true);

// Change search icon to X when the input is filled on KEYUP
constants.elements.SEARCH_GIFS_INPUT.addEventListener("keyup", () => {
    if (constants.elements.SEARCH_GIFS_INPUT.value === "") {

        constants.elements.SEARCH_TOGGLE_ICON.style.display = "block";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "none";
        constants.elements.SEARCH_ICON.style.display = "none";

        constants.elements.CANCEL_SEARCH_ICON.removeEventListener("click", () => {
            searchGifs.clearSearch(
                constants.elements.SEARCH_GIFS_INPUT,
                constants.elements.SEARCH_RESULT_SEPARATOR,
                constants.elements.SEARCH_RESULT_TITLE,
                constants.elements.SEARCH_TOGGLE_ICON,
                constants.elements.CANCEL_SEARCH_ICON,
                constants.elements.SEARCH_ICON,
                constants.elements.SEARCH_RESULT_CONTAINER
            );
        }, false);

        searchGifs.clearSearch(
            constants.elements.SEARCH_GIFS_INPUT,
            constants.elements.SEARCH_RESULT_SEPARATOR,
            constants.elements.SEARCH_RESULT_TITLE,
            constants.elements.SEARCH_TOGGLE_ICON,
            constants.elements.CANCEL_SEARCH_ICON,
            constants.elements.SEARCH_ICON,
            constants.elements.SEARCH_RESULT_CONTAINER
        );
    } else {
        
        constants.elements.SEARCH_TOGGLE_ICON.style.display = "none";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "block";
        constants.elements.SEARCH_ICON.style.display = "block";

        constants.elements.CANCEL_SEARCH_ICON.addEventListener("click", () => {
            searchGifs.clearSearch(
                constants.elements.SEARCH_GIFS_INPUT,
                constants.elements.SEARCH_RESULT_SEPARATOR,
                constants.elements.SEARCH_RESULT_TITLE,
                constants.elements.SEARCH_TOGGLE_ICON,
                constants.elements.CANCEL_SEARCH_ICON,
                constants.elements.SEARCH_ICON,
                constants.elements.SEARCH_RESULT_CONTAINER
            );
        }, false);
    }
}, false);

// Change search icon to X when the input is filled on CHANGE
constants.elements.SEARCH_GIFS_INPUT.addEventListener("change", () => {
    if (constants.elements.SEARCH_GIFS_INPUT.value === "") {

        constants.elements.SEARCH_TOGGLE_ICON.style.display = "block";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "none";
        constants.elements.SEARCH_ICON.style.display = "none";

        constants.elements.CANCEL_SEARCH_ICON.removeEventListener("click", () => {
            searchGifs.clearSearch(
                constants.elements.SEARCH_GIFS_INPUT,
                constants.elements.SEARCH_RESULT_SEPARATOR,
                constants.elements.SEARCH_RESULT_TITLE,
                constants.elements.SEARCH_TOGGLE_ICON,
                constants.elements.CANCEL_SEARCH_ICON,
                constants.elements.SEARCH_ICON,
                constants.elements.SEARCH_RESULT_CONTAINER
            );
        }, false);
    } else {
        constants.elements.SEARCH_TOGGLE_ICON.style.display = "none";
        constants.elements.CANCEL_SEARCH_ICON.style.display = "block";
        constants.elements.SEARCH_ICON.style.display = "block";

        constants.elements.CANCEL_SEARCH_ICON.addEventListener("click", () => {
            searchGifs.clearSearch(
                constants.elements.SEARCH_GIFS_INPUT,
                constants.elements.SEARCH_RESULT_SEPARATOR,
                constants.elements.SEARCH_RESULT_TITLE,
                constants.elements.SEARCH_TOGGLE_ICON,
                constants.elements.CANCEL_SEARCH_ICON,
                constants.elements.SEARCH_ICON,
                constants.elements.SEARCH_RESULT_CONTAINER
            );
        }, false);
    }
}, false);

// Render gifs on input change
constants.elements.SEARCH_GIFS_INPUT.addEventListener("change", () => {

    let searchData = searchGifs.get(
        constants.url.SEARCH_URL,
        constants.elements.SEARCH_GIFS_INPUT,
        constants.queryStrings.PARAM_API_KEY,
        constants.queryStrings.API_KEY,
        constants.queryStrings.PARAM_Q,
        constants.queryStrings.PARAM_LIMIT
    );

    searchGifs.render(
        searchData,
        constants.elements.SEARCH_GIFS_INPUT,
        constants.elements.SEARCH_RESULT_SEPARATOR,
        constants.elements.SEARCH_RESULT_TITLE,
        constants.elements.SEARCH_RESULT_CONTAINER
    );
}, false);

// Autocomplete suggestions when searching
constants.elements.SEARCH_GIFS_INPUT.addEventListener("keyup", () => {
    
    let searchAutocompleteData = searchAutocomplete.get(
        constants.url.SEARCH_AUTOCOMPLETE_URL,
        constants.elements.SEARCH_GIFS_INPUT,
        constants.queryStrings.PARAM_API_KEY,
        constants.queryStrings.API_KEY,
        constants.queryStrings.PARAM_Q
    );

    searchAutocomplete.render(searchAutocompleteData, constants.elements.AUTOCOMPLETE_BOX);
}, false);

constants.elements.SEARCH_GIFS_INPUT.addEventListener("search", () => {
    searchAutocomplete.clear(constants.elements.AUTOCOMPLETE_BOX) 
}, false);

//-------------------------------------------------------------
//RENDER API DATA
//-------------------------------------------------------------

// Render trending search terms
trendingSearchTerms.render(trendingTermsData, constants.elements.TRENDING_TERMS_CONTAINER);