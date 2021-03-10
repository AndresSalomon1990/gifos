const trendingSearchTerms = (function() {
    const _trendingUrl = "https://api.giphy.com/v1/trending/searches?";

    async function get(paramApiKey, apiKey) {
        try {
            const endpoint = _trendingUrl + paramApiKey + apiKey;

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

    async function render(apiTerms, containerElement) {
        const searchTerms = await apiTerms;

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

    // Event capturing
    function addClickEventListener(event, inputElement, classToSearch) {
        if (event.target.className === classToSearch) {
            inputElement.value = event.target.innerHTML;
        }
    }

    return {
        get,
        render,
        addClickEventListener
    }

})();

export default trendingSearchTerms;