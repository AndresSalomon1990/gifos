const searchAutocomplete = (function() {

    async function render(apiData, autocompleteBox) {
        const suggestions = await apiData;
        autocompleteBox.innerHTML = "";
    
        suggestions.data.forEach(suggestion => {
            let item = `<li>${suggestion.name}</li>`;
            
            autocompleteBox.insertAdjacentHTML("beforeend", item);
        });
    };

    function clear(autocompleteBox) {
        autocompleteBox.innerHTML = "";
    };

    async function get(url, inputElement, paramApiKey, apiKey, paramQ) {
        try {
            let searchTerm = inputElement.value;
            const endpoint = url + paramApiKey + apiKey + paramQ + searchTerm;
            const response = await fetch(endpoint);
    
            if(response.ok) {
                const jsonResponse = await response.json();
    
                // console.log(jsonResponse);
    
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

export default searchAutocomplete;