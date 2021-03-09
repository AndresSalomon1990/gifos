const trendingSearchTerms = (function() {
    const _trendingUrl = "https://api.giphy.com/v1/trending/searches?";

    async function get(paramApiKey, apiKey) {
        try {
            const endpoint = _trendingUrl + paramApiKey + apiKey;

            const response = await fetch(endpoint);

            if(response.ok) {
                const jsonResponse = await response.json();

                console.log(jsonResponse);

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
            termsToRender += searchTerms.data[i] +", ";
        }

        const p = `<p>${ termsToRender.slice(0, -2) }</p>`;

        containerElement.innerHTML = p;
    }

    return {
        get,
        render
    }

})();

export default trendingSearchTerms;