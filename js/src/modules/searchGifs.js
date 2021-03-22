const searchGifs = (function() {
    const _limitToShow = 12;
    let _offset = 0;
    let _lastSearchTerm = "";

    // Clear search input
    function clear(inputElement, searchResultSeparator, searchResultTitle, searchToggleIcon, cancelSearchIcon, searchIcon, searchResultContainer) {
        inputElement.value = "";
        searchResultSeparator.style.display = "none";
        searchResultTitle.style.display = "none";
        searchToggleIcon.style.display = "block";
        cancelSearchIcon.style.display = "none";
        searchIcon.style.display = "none";
        searchResultContainer.innerHTML = "";
    }

    // check if the gif is a favorite
    function _isFavorite(id) {
        let _favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        return _favGifs.includes(id) ? true : false;
    }
    
    // Render API data
    async function render(apiData, inputElement, searchResultSeparator, searchResultTitle, containerElement) { 
        const searchResults = await apiData;
        containerElement.innerHTML = "";
        searchResultTitle.innerHTML = inputElement.value;
        searchResultSeparator.style.display = "block";
        searchResultTitle.style.display = "block";

        if (searchResults.data.length > 0) {
            searchResults.data
            .forEach(gifData => {
                let username = gifData.username  || "sin-definir";
                let title = gifData.title || "sin-definir";
                let gif = "";
                let isFavorite = _isFavorite(gifData.id);

                isFavorite ? console.log(true) : console.log(false);

                if (isFavorite) {
                    gif = `
                    <div class="gif-container">
                        <img src=${gifData.images.fixed_height.url} alt=${gifData.title} class="gif">
                        <div class="overlay"></div>
                        <div class="icon-container">
                            <i class="icon-fav-true"
                                data-id=${gifData.id}
                                title="Favorito"></i>
                            <i class="icon-download"
                                data-url=${gifData.images.fixed_height.url}
                                data-title=${title}
                                title="Descargar"></i>
                            <i class="icon-expand"
                                data-url=${gifData.images.fixed_height.url}
                                data-username=${username}
                                data-title=${title}
                                title="Expandir"></i>
                        </div>
                        <p class="gif-user">${username}</p>
                        <p class="gif-title">${title}</p>
                    </div>`;
                } else {
                    gif = `
                    <div class="gif-container">
                        <img src=${gifData.images.fixed_height.url} alt=${gifData.title} class="gif">
                        <div class="overlay"></div>
                        <div class="icon-container">
                            <i class="icon-fav-false"
                                data-id=${gifData.id}
                                title="Favorito"></i>
                            <i class="icon-download"
                                data-url=${gifData.images.fixed_height.url}
                                data-title=${title}
                                title="Descargar"></i>
                            <i class="icon-expand"
                                data-url=${gifData.images.fixed_height.url}
                                data-username=${username}
                                data-title=${title}
                                title="Expandir"></i>
                        </div>
                        <p class="gif-user">${username}</p>
                        <p class="gif-title">${title}</p>
                    </div>`;
                }

                containerElement.insertAdjacentHTML("beforeend", gif);
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
    async function get(url, inputElement, paramApiKey, apiKey, paramQ, paramLimit, paramOffset) {
        try {
            let searchTerm = inputElement.value;
            
            if(!searchTerm) return; // return nothing if the input is blank

            // check if the search term change, so it restart the offset
            if(_lastSearchTerm !== searchTerm) {
                _lastSearchTerm = searchTerm;
                _offset = 0;
            }

            const endpoint = url + paramApiKey + apiKey + paramQ + searchTerm + paramLimit + _limitToShow + paramOffset + _offset;
            const response = await fetch(endpoint);

            if(response.ok) {
                const jsonResponse = await response.json();

                console.log(jsonResponse);
                console.log(jsonResponse.pagination.total_count);

                _offset++;
                console.log("Offset: " + _offset);
                
                return jsonResponse;
            };

            throw new Error("Request failed");
        } catch (error) {
            console.log(error);
        }
    };

    

    return {
        get,
        render,
        clear
    }

})();

export default searchGifs;