const searchGifs = (function() {
    const _limitToShow = 12;

    // Clear search input
    function clearSearch(inputElement, searchResultSeparator, searchResultTitle, searchToggleIcon, cancelSearchIcon, searchIcon, searchResultContainer) {
        inputElement.value = "";
        searchResultSeparator.style.display = "none";
        searchResultTitle.style.display = "none";
        searchToggleIcon.style.display = "block";
        cancelSearchIcon.style.display = "none";
        searchIcon.style.display = "none";
        searchResultContainer.innerHTML = "";
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
                let username = gifData.username  || "sin definir";
                let title = gifData.title || "sin definir";

                const gif = `
                    <div class="gif-container">
                        <img src=${gifData.images.fixed_height.url} alt=${gifData.images.fixed_height.url} class="gif">
                        <div class="overlay"></div>
                        <div class="icon-container">
                            <i class="icon icon-fav"></i>
                            <a href=${gifData.images.fixed_height.url} class="icon icon-download" onclick="this.click()" download="myGif.gif"></a>
                            <i class="icon icon-max"></i>
                        </div>
                        <p class="gif-user">${username}</p>
                        <p class="gif-title">${title}</p>
                    </div>`;

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
    async function get(url, inputElement, paramApiKey, apiKey, paramQ, paramLimit) {
        try {
            let searchTerm = inputElement.value;
            const endpoint = url + paramApiKey + apiKey + paramQ + searchTerm + paramLimit + _limitToShow;
            const response = await fetch(endpoint);

            if(response.ok) {
                const jsonResponse = await response.json();

                console.log(jsonResponse);
                console.log(jsonResponse.pagination.total_count);
                
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
        clearSearch
    }

})();

export default searchGifs;