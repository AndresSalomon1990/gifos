const trendingGifs = (function(){
    const _limitToShow = 12;

    async function get(url, paramApiKey, apiKey, paramLimit) {
        try {
            const endpoint = url + paramApiKey + apiKey + paramLimit + _limitToShow;
            const response = await fetch(endpoint);

            if(response.ok) {
                const jsonResponse = await response.json();
                
                return jsonResponse;
            };

            throw new Error("Request failed");
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    // check if the gif is a favorite
    function _isFavorite(id) {
        let _favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        return _favGifs.includes(id) ? true : false;
    }

    async function render(apiData, containerElement) {
        const trendingResults = await apiData;

        let i = 0;
        for (i; i < _limitToShow; i++) {
            let username = trendingResults.data[i].username || "sin-definir";
            let title = trendingResults.data[i].title || "sin-definir";
            title = title.split(" ").join("-");
            let gif = "";
            let isFavorite = _isFavorite(trendingResults.data[i].id);

            if (isFavorite) {
                gif = `
                <div class="gif-container">
                    <img src=${trendingResults.data[i].images.fixed_height.url}
                        alt=${title}
                        class="gif"
                        data-gif-url=${trendingResults.data[i].images.fixed_height.url}
                        data-gif-username=${username}
                        data-gif-title=${title}
                        data-gif-id=${trendingResults.data[i].id}>
                    <div class="overlay"></div>
                    <div class="icon-container">
                        <i class="icon-fav-true"
                            data-fav-id=${trendingResults.data[i].id}
                            title="Favorito"></i>
                        <i class="icon-download"
                            data-download-url=${trendingResults.data[i].images.fixed_height.url}
                            data-download-title=${title}
                            title="Descargar"></i>
                        <i class="icon-expand"
                            data-expand-url=${trendingResults.data[i].images.fixed_height.url}
                            data-expand-username=${username}
                            data-expand-title=${title}
                            data-expand-id=${trendingResults.data[i].id}
                            title="Expandir"></i>
                    </div>
                    <p class="gif-user">${username}</p>
                    <p class="gif-title">${title}</p>
                </div>`;
            } else {
                gif = `
                <div class="gif-container">
                    <img src=${trendingResults.data[i].images.fixed_height.url}
                        alt=${title}
                        class="gif"
                        data-gif-url=${trendingResults.data[i].images.fixed_height.url}
                        data-gif-username=${username}
                        data-gif-title=${title}
                        data-gif-id=${trendingResults.data[i].id}>
                    <div class="overlay"></div>
                    <div class="icon-container">
                        <i class="icon-fav-false"
                            data-fav-id=${trendingResults.data[i].id}
                            title="Favorito"></i>
                        <i class="icon-download"
                            data-download-url=${trendingResults.data[i].images.fixed_height.url}
                            data-download-title=${title}
                            title="Descargar"></i>
                        <i class="icon-expand"
                            data-expand-url=${trendingResults.data[i].images.fixed_height.url}
                            data-expand-username=${username}
                            data-expand-title=${title}
                            data-expand-id=${trendingResults.data[i].id}
                            title="Expandir"></i>
                    </div>
                    <p class="gif-user">${username}</p>
                    <p class="gif-title">${title}</p>
                </div>`;
            }

            containerElement.insertAdjacentHTML("beforeend", gif);
        }
    };

    function scrollToLeft(slider) {
        slider.scrollLeft += 300;
    };

    function scrollToRight(slider) {
        slider.scrollLeft -= 300;
    };

    return {
        get,
        render,
        scrollToLeft,
        scrollToRight
    }
})();

export default trendingGifs;