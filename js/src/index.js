//-------------------------------------------------------------
//IMPORTS
//-------------------------------------------------------------
import constants from "../helper/constants.js";
import topNavStyle from "../helper/topNavStyle.js";
import trendingSearchTerms from "./modules/trendingSearchTerms.js";

//-------------------------------------------------------------
//VARIABLES
//-------------------------------------------------------------

//-------------------------------------------------------------
//API DATA
//-------------------------------------------------------------
const trendingTermsData = trendingSearchTerms.get(constants.PARAM_API_KEY, constants.API_KEY);

//-------------------------------------------------------------
//ELEMENTS
//-------------------------------------------------------------

//-----------------------Main elements-----------------------
const trendingTermsContainer = document.getElementById("trending-terms-container");
const searchGifsInput = document.getElementById("search-gifs-input");

//-------------------------------------------------------------
//EVENT LISTENERS
//-------------------------------------------------------------

//-----------------------Header listeners----------------------

// Change style of topNavbar on scroll
window.addEventListener("scroll", function() {
    if(window.screen.width > 980) {
        topNavStyle.changeOnScroll();
    } }, false);

//-------------------------------------------------------------
//RENDER API DATA
//-------------------------------------------------------------

//Render trending search terms
trendingSearchTerms.render(trendingTermsData, trendingTermsContainer);

trendingTermsContainer.addEventListener("click", () => {
    trendingSearchTerms.addClickEventListener(event, searchGifsInput, "trending-search-term")}, false);