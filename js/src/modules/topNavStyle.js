const topNavStyle = (function() {
    const _topnavContainer = document.getElementById("topnav-container");

    function changeOnScroll() {
        if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
            _topnavContainer.style.boxShadow = "0 2px 4px 1px rgba(156,175,195,0.55)";
        } else {
            _topnavContainer.style.removeProperty("box-shadow");
        }
    }

    return {
        changeOnScroll
    }

})();

export default topNavStyle;