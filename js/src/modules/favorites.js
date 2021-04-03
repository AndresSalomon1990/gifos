const favorites = (function() {
    let _totalCount;
    let _currentPage = 1;
    let _offset = 0;
    let _limitToShow = 12;

    async function get(url, paramApiKey, apiKey, paramIds) {
        let favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
        
        if (favGifs.length > 1) {
            try {
                favGifs = favGifs.join(", ");

                const endpoint = url + paramApiKey + apiKey + paramIds + favGifs;
                const response = await fetch(endpoint);

                if(response.ok) {
                    const jsonResponse = await response.json();

                    console.log(jsonResponse);

                    return jsonResponse;
                };
                throw new Error("Request failed");
            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        } else {
            return;
        }
    };

    async function render(apiData, containerElement, showMoreFavorites) {
        const favGifs = await apiData;

        if (favGifs) {
            _totalCount = favGifs.data.length;

            favGifs.data.slice(_offset, (_offset + 12))
            .forEach(gifData => {
                let username = gifData.username || "sin-definir";
                let title = gifData.title || "sin-definir";
                title = title.split(" ").join("-");
                let gif = "";

                gif = `
                <div class="gif-container">
                    <img src=${gifData.images.fixed_height.url}
                        alt=${title}
                        class="gif"
                        data-gif-url=${gifData.images.fixed_height.url}
                        data-gif-username=${username}
                        data-gif-title=${title}
                        data-gif-id=${gifData.id}>
                    <div class="overlay"></div>
                    <div class="icon-container">
                        <i class="icon-fav-true"
                            data-fav-id=${gifData.id}
                            title="Favorito"></i>
                        <i class="icon-download"
                            data-download-url=${gifData.images.fixed_height.url}
                            data-download-title=${title}
                            title="Descargar"></i>
                        <i class="icon-expand"
                            data-expand-url=${gifData.images.fixed_height.url}
                            data-expand-username=${username}
                            data-expand-title=${title}
                            data-expand-id=${gifData.id}
                            title="Expandir"></i>
                    </div>
                    <p class="gif-user">${username}</p>
                    <p class="gif-title">${title}</p>
                </div>`;

                containerElement.insertAdjacentHTML("beforeend", gif);
                showMoreFavorites.style.display = "block";
            });
        } else {
            const noResults = `
                <div class="no-results-container">
                    <img src="../../../assets/images/icon/icon-fav-sin-contenido.svg" alt="Sin favoritos">
                    <p>¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</p>
                </div>`;

                containerElement.innerHTML = noResults;
        }
    };

    function showMore(showMoreButton) {
        _currentPage++;

        const totalPages = Math.ceil(_totalCount / _limitToShow);

        if (_currentPage >= totalPages) {
            _offset += _limitToShow;
            _limitToShow += (_totalCount - _offset);
            showMoreButton.disabled = true;
        } else {
            _offset += _limitToShow;
            showMoreButton.disabled = false;
        }
    };

    return {
        get,
        render,
        showMore
    }
})();

export default favorites;