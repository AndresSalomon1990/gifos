const searchAutocomplete = (function() {

    async function render(apiData, autocompleteBox, searchBarBottomLine) {
        const suggestions = await apiData;
        autocompleteBox.innerHTML = "";

        let pad = window.screen.width < 980 ? "10px 10px 15px 20px" : "10px 10px 15px 1px";

        autocompleteBox.style.padding = pad;
        searchBarBottomLine.style.display = "block";
    
        suggestions.data.forEach(suggestion => {
            let item = `<li class="autocomplete-suggestion">${suggestion.name}</li>`;
            
            autocompleteBox.insertAdjacentHTML("beforeend", item);
        });
    };

    function clear(autocompleteBox, searchBarBottomLine) {
        autocompleteBox.innerHTML = "";
        autocompleteBox.style.removeProperty("padding");
        searchBarBottomLine.style.display = "none";
    };

    async function get(url, inputElement, paramApiKey, apiKey, paramQ) {
        try {
            let searchTerm = inputElement.value;
            const endpoint = url + paramApiKey + apiKey + paramQ + searchTerm;
            const response = await fetch(endpoint);
    
            if (response.ok) {
                const jsonResponse = await response.json();
    
                return jsonResponse;
            };
    
            throw new Error("Request failed");
        } catch (error) {
            console.log(error);
        }
    };

    // Event capturing for autocomplete suggestions
    function addClickEventListener(event, inputElement, classToSearch) {
        if (event.target.className === classToSearch) {
            inputElement.value = event.target.innerHTML;

            const searchEvent = new Event("search");
            inputElement.dispatchEvent(searchEvent);
        }
    }

    return {
        get,
        render,
        clear,
        addClickEventListener
    }
})();

export default searchAutocomplete;