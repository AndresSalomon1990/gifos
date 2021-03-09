//-------------------------------------------------------------
//IMPORTS
//-------------------------------------------------------------
import constants from "./utils/constants.js";
import renderGifsModule from "./utils/renderGifs.js";

//-------------------------------------------------------------
//VARIABLES
//-------------------------------------------------------------

//-------------------------------------------------------------
//ELEMENTS
//-------------------------------------------------------------

//-----------------------Header elements-----------------------

//-------------------------------------------------------------
//EVENT LISTENERS
//-------------------------------------------------------------

//-----------------------Header listeners----------------------
// Change style of Navbar on scroll


window.onscroll = function() { 
    if(window.screen.width > 980) {
        changeTopNavStyle();
    } };
    
const changeTopNavStyle = () => {
    const topnavContainer = document.getElementById("topnav-container");

    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        topnavContainer.style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
    } else {
        topnavContainer.style.removeProperty("box-shadow");
    }
}