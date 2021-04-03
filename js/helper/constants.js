const constants = {
    queryStrings: {
        PARAM_API_KEY: "api_key=",
        API_KEY: "h9rU0t10h8b8FDT82SNaRvOa7VISl1Io",
        PARAM_LIMIT: "&limit=",
        PARAM_Q: "&q=",
        PARAM_OFFSET: "&offset=",
        PARAM_IDS: "&ids="
    },

    url: {
        TRENDING_SEARCH_TERMS_URL: "https://api.giphy.com/v1/trending/searches?",
        SEARCH_URL: "https://api.giphy.com/v1/gifs/search?",
        SEARCH_AUTOCOMPLETE_URL: "https://api.giphy.com/v1/gifs/search/tags?",
        TRENDING_GIFS_URL: "https://api.giphy.com/v1/gifs/trending?",
        GIF_BY_ID_URL: "https://api.giphy.com/v1/gifs/",
        GIFS_BY_ID_URL: "https://api.giphy.com/v1/gifs?",
        UPLOAD_URL: "https://upload.giphy.com/v1/gifs?"
    },

    elements: {
        TOPNAV_CONTAINER: document.getElementById("topnav-container"),
        NOCTURNE_MODE_MOBILE: document.getElementById("nocturne-mode-mobile"),
        NOCTURNE_MODE_DESKTOP: document.getElementById("nocturne-mode-desktop"),
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
        NO_RESULTS_CONTAINER: document.getElementById("no-results-container"),
        MODAL: document.getElementById("modal"),
        SHOW_MORE_HOME: document.getElementById("show-more-home"),
        TRENDING_GIFOS_SLIDER: document.getElementById("trending-gifos-slider"),
        PREV_BUTTON: document.getElementById("prev-button"),
        NEXT_BUTTON: document.getElementById("next-button"),
        FAVORITES_RESULT_CONTAINER: document.getElementById("favorites-result-container"),
        SHOW_MORE_FAVORITES: document.getElementById("show-more-favorites"),
        MY_GIFOS_RESULT_CONTAINER: document.getElementById("my-gifos-result-container"),
        SHOW_MORE_MY_GIFOS: document.getElementById("show-more-my-gifos"),
        CREATE_GIF_TITLE: document.getElementById("create-gif-title"),
        CREATE_GIF_MESSAGE: document.getElementById("create-gif-message"),
        RECORDING_VIDEO_CONTAINER: document.getElementById("recording-video-container"),
        RECORD_VIDEO: document.getElementById("record-video"),
        CANVAS_CONTAINER: document.getElementById("canvas-container"),
        STEP_1: document.getElementById("step-1"),
        STEP_2: document.getElementById("step-2"),
        STEP_3: document.getElementById("step-3"),
        TIMER: document.getElementById("timer"),
        REPEAT_CAPTION: document.getElementById("repeat-caption"),
        START_BUTTON: document.getElementById("start-button"),
        RECORD_BUTTON: document.getElementById("record-button"),
        STOP_BUTTON: document.getElementById("stop-button"),
        UPLOAD_BUTTON: document.getElementById("upload-button"),
        RESET_BUTTON: document.getElementById("reset-button"),
        UPLOAD_OVERLAY: document.getElementById("upload-overlay"),
        UPLOAD_LOADER: document.getElementById("upload-loader"),
        UPLOAD_OK: document.getElementById("upload-ok"),
        UPLOAD_MESSAGE: document.getElementById("upload-message")
    }
}

export default constants;