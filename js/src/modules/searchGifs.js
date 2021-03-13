const searchGifs = (function() {
    const _limitToShow = 12;

    // Clear search input and load the search icon
    function clearSearch(inputElement, searchToggleIcon, cancelSearchIcon, searchIcon, searchResultContainer) {
        inputElement.value = "";
        searchToggleIcon.style.display = "block";
        cancelSearchIcon.style.display = "none";
        searchIcon.style.display = "none";
        searchResultContainer.innerHTML = "";
    }
    
    // Render API data
    async function render(apiData, containerElement) { 
        const searchResults = await apiData;
        containerElement.innerHTML = "";

        searchResults.data
            .map(gif => gif.images.fixed_height.url)
            .forEach(url => {
                const gif = `
                    <div class="gif-container">
                        <img src=${url} alt=${url} class="gif">
                        <div class="overlay"></div>
                        <div class="icon-container">
                            <i class="icon icon-fav"></i>
                            <a href=${url} class="icon icon-download" onclick="this.click()" download="myGif.gif"></a>
                            <i class="icon icon-max"></i>
                        </div>
                    </div>`;

                    containerElement.insertAdjacentHTML("beforeend", gif);
            });
    };

    // Get API data and render it with the render function
    async function get(url, inputElement, paramApiKey, apiKey, paramQ, paramLimit) {
        // event.preventDefault();

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