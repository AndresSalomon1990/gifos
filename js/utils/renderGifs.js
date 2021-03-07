const renderGifsModule = (function() {
    
    function renderGifs(res, gifContainer) { 
        res.data
            .map(gif => gif.images.fixed_height.url)
            .forEach(url => {
                // <a href=${url} class="icon icon-download" onclick="this.click()" downloadurl="application/octet-stream:gif:${url}"></a>

                const gif = `
                        <div class="container">
                            <img src=${url} alt=${url} class="image">
                            <div class="overlay"></div>
                            <div class="icon-container">
                                <i class="icon icon-fav"></i>
                                <a href=${url} class="icon icon-download" onclick="this.click()" download="myGif.gif"></a>
                                <i class="icon icon-max"></i>
                            </div>
                        </div>`;

                gifContainer.insertAdjacentHTML('beforeend', gif);
            });
    }

    return {
        renderGifs
    }
})();

export default renderGifsModule;