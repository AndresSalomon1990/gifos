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
                        <img src=${gifData.images.fixed_height.url} alt=${gifData.title} class="gif">
                        <div class="overlay"></div>
                        <div class="icon-container">
                            <i class="icon icon-fav"></i>
                            <i class="icon icon-download" data-url=${gifData.images.fixed_height.url} data-title=${title}></i>
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

    // transforming the url into blob so it can be downloaded
    async function _downloadBlob(url, title) {
        const a = document.createElement("a");
        const response = await fetch(url);
        const file = await response.blob();

        // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
        a.download = title;
        a.href = window.URL.createObjectURL(file);

        //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
        a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");
        
        a.click(); // autoclick on element to start download
    }

    // Event capturing for the download icon with the functionality
    function downloadFunctionality(event, classToSearch) {
        if (event.target.className === classToSearch) {
            const url = event.target.getAttribute("data-url"); // get custom attribute with data from the API
            const title = event.target.getAttribute("data-title"); // get custom attribute with data from the API
            _downloadBlob(url, title);
        }
    }

    return {
        get,
        render,
        clear,
        downloadFunctionality
    }

})();

export default searchGifs;