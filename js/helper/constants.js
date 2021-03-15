const constants = {
    queryStrings: {
        PARAM_API_KEY: "api_key=",
        API_KEY: "h9rU0t10h8b8FDT82SNaRvOa7VISl1Io",
        PARAM_LIMIT: "&limit=",
        PARAM_Q: "&q="
    },

    url: {
        TRENDING_SEARCH_TERMS_URL: "https://api.giphy.com/v1/trending/searches?",
        SEARCH_URL: "https://api.giphy.com/v1/gifs/search?",
        SEARCH_AUTOCOMPLETE_URL: "https://api.giphy.com/v1/gifs/search/tags?"
    },

    elements: {
        TOPNAV_CONTAINER: document.getElementById("topnav-container"),
        TRENDING_TERMS_CONTAINER: document.getElementById("trending-terms-container"),
        SEARCH_BAR: document.getElementById("search-bar"),
        SEARCH_GIFS_INPUT: document.getElementById("search-gifs-input"),
        SEARCH_BAR_BOTTOM_LINE: document.getElementById("search-bar-bottom-line"),
        SEARCH_ICON: document.getElementById("search-icon"),
        SEARCH_TOGGLE_ICON: document.getElementById("search-toggle-icon"),
        CANCEL_SEARCH_ICON: document.getElementById("cancel-search-icon"),
        AUTOCOMPLETE_BOX: document.getElementById("autocomplete-box"),
        SEARCH_RESULT_SEPARATOR: document.getElementById("search-result-separator"),
        SEARCH_RESULT_TITLE: document.getElementById("search-result-title"),
        SEARCH_RESULT_CONTAINER: document.getElementById("search-result-container"),
        NO_RESULTS_CONTAINER: document.getElementById("no-results-container")
    }
}

export default constants;