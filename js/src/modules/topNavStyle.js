const topNavStyle = (function() {

    function changeOnScroll(topNavContainer) {
        if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
            topNavContainer.style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
        } else {
            topNavContainer.style.removeProperty("box-shadow");
        }
    }

    function removeShadow(topNavContainer) {
        topNavContainer.style.removeProperty("box-shadow");
    }

    return {
        changeOnScroll,
        removeShadow
    }

})();

export default topNavStyle;