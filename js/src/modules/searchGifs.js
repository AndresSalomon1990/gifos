const searchGifs = (function() {
    let _limitToShow = 12;
    let _offset = 0;
    let _lastSearchTerm = "";
    let _paginationTotalCount;
    let _currentPage = 1;

    // Clear search input
    function clear(inputElement, searchResultSeparator, searchResultTitle, searchToggleIcon, cancelSearchIcon, searchIcon, searchResultContainer, showMoreHome) {
        inputElement.value = "";
        searchResultSeparator.style.display = "none";
        searchResultTitle.style.display = "none";
        searchToggleIcon.style.display = "block";
        cancelSearchIcon.style.display = "none";
        searchIcon.style.display = "none";
        searchResultContainer.innerHTML = "";
        showMoreHome.style.display = "none";
    }

    // check if the gif is a favorite
    function _isFavorite(id) {
        let _favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        return _favGifs.includes(id) ? true : false;
    }
    
    // Render API data
    async function render(apiData, inputElement, searchResultSeparator, searchResultTitle, containerElement, showMoreHome) { 
        const searchResults = await apiData;
        searchResultTitle.innerHTML = inputElement.value;
        searchResultSeparator.style.display = "block";
        searchResultTitle.style.display = "block";

        if (searchResults.data.length > 0) {
            searchResults.data
            .forEach(gifData => {
                let username = gifData.username || "sin-definir";
                let title = gifData.title || "sin-definir";
                title = title.split(" ").join("-");
                let gif = "";
                let isFavorite = _isFavorite(gifData.id);

                if (isFavorite) {
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
                } else {
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
                            <i class="icon-fav-false"
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
                }

                containerElement.insertAdjacentHTML("beforeend", gif);
                showMoreHome.style.display = "block";
            });
        } else {
            const noResults = `
                <div class="no-results-container">
                    <img src="../../../assets/images/icon/icon-busqueda-sin-resultado.svg" alt="Sin resultados">
                    <p>Intenta con otra búsqueda</p>
                </div>`;

                containerElement.innerHTML = noResults;
        }
    };

    // Get API data
    async function get(url, inputElement, containerElement, showMoreHome, paramApiKey, apiKey, paramQ, paramLimit, paramOffset) {
        try {
            let searchTerm = inputElement.value;
            
            if(!searchTerm) return; // return nothing if the input is blank

            // check if the search term change, so it restart the variables and clear the search container
            if(_lastSearchTerm !== searchTerm) {
                _lastSearchTerm = searchTerm;
                containerElement.innerHTML = "";
                _limitToShow = 12;
                _offset = 0;
                _currentPage = 1;
                showMoreHome.disabled = false;
            }

            const endpoint = url + paramApiKey + apiKey + paramQ + searchTerm + paramLimit + _limitToShow + paramOffset + _offset;
            const response = await fetch(endpoint);

            if(response.ok) {
                const jsonResponse = await response.json();

                _paginationTotalCount = jsonResponse.pagination.total_count;
                
                return jsonResponse;
            };

            throw new Error("Request failed");
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    function showMore(showMoreButton) {
        _currentPage++;

        const totalPages = Math.ceil(_paginationTotalCount / _limitToShow);

        if (_currentPage >= totalPages) {
            _offset += _limitToShow;
            _limitToShow += (_paginationTotalCount - _offset);
            showMoreButton.disabled = true;
        } else {
            _offset += _limitToShow;
            showMoreButton.disabled = false;
        }
    }

    return {
        get,
        render,
        clear,
        showMore
    }

})();

export default searchGifs;