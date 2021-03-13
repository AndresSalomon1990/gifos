const trendingSearchTerms = (function() {

    // Get API data
    async function get(url, paramApiKey, apiKey) {
        try {
            const endpoint = url + paramApiKey + apiKey;

            const response = await fetch(endpoint);

            if(response.ok) {
                const jsonResponse = await response.json();

                return jsonResponse;
            };

            throw new Error("Request failed");
        } catch (error) {
            console.log(error);
        }
    }

    // Render API data
    async function render(apiData, containerElement) {
        const searchTerms = await apiData;

        let termsToRender = "";
        let i = 0;
        for (i; i<5; i++) {
            if (i === 4) {
                termsToRender += `<span class="trending-search-term">${searchTerms.data[i]}</span>`;
                break;
            }
            termsToRender += `<span class="trending-search-term">${searchTerms.data[i]}</span><span>, </span>`;
        }

        containerElement.innerHTML = termsToRender;
    }

    // Event capturing for the trending search terms
    function addClickEventListener(event, inputElement, classToSearch) {
        if (event.target.className === classToSearch) {
            inputElement.value = event.target.innerHTML;

            const changeEvent = new Event("change");
            inputElement.dispatchEvent(changeEvent);
        }
    }

    return {
        get,
        render,
        addClickEventListener
    }

})();

export default trendingSearchTerms;