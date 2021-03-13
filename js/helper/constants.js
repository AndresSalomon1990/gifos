const constants = {
    queryStrings: {
        PARAM_API_KEY: "api_key=",
        API_KEY: "h9rU0t10h8b8FDT82SNaRvOa7VISl1Io",
        PARAM_LIMIT: "&limit=",
        PARAM_Q: "&q="
    },

    url: {
        TRENDING_SEARCH_TERMS_URL: "https://api.giphy.com/v1/trending/searches?",
        SEARCH_URL: "https://api.giphy.com/v1/gifs/search?"
    },

    elements: {
        TRENDING_TERMS_CONTAINER: document.getElementById("trending-terms-container"),
        SEARCH_GIFS_INPUT: document.getElementById("search-gifs-input"),
        SEARCH_ICON: document.getElementById("search-icon"),
        SEARCH_TOGGLE_ICON: document.getElementById("search-toggle-icon"),
        CANCEL_SEARCH_ICON: document.getElementById("cancel-search-icon"),
        SEARCH_RESULT_CONTAINER: document.getElementById("search-result-container")
    }
}

export default constants;