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
const trendingTerms = trendingSearchTerms.get(constants.PARAM_API_KEY, constants.API_KEY);

//-------------------------------------------------------------
//ELEMENTS
//-------------------------------------------------------------

//-----------------------Main elements-----------------------
const trendingTermsContainer = document.getElementById("trending-terms-container");

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
trendingSearchTerms.render(trendingTerms, trendingTermsContainer);