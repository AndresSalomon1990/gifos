const gif = (function() {
    let _favGifs;

    // check if the gif is a favorite
    function _isFavorite(id) {
        _favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        return _favGifs.includes(id) ? true : false;
    }

    // Event capturing for the favorite icon with the functionality
    function favorite(event, classToAdd, classToRemove) {
        // check if there are favorites in the localStorage
        _favGifs = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

        const gifId = event.target.getAttribute("data-fav-id");

        if (event.target.className === classToAdd) {
            if (!_favGifs.includes(gifId) && gifId !== null) _favGifs.push(gifId); // check if the gif is already a favorite
            
            localStorage.setItem("favorites", JSON.stringify(_favGifs));

            event.target.className = classToRemove;
        } else if (event.target.className === classToRemove) {
            const index = _favGifs.indexOf(gifId);

            _favGifs.splice(index, 1); // if it is a favorite, remove it when clicking again

            localStorage.setItem("favorites", JSON.stringify(_favGifs));

            event.target.className = classToAdd;
        }
    }

    // transform the url into blob so it can be downloaded
    async function _downloadBlob(url, title) {
        const a = document.createElement("a");
        const response = await fetch(url); // HTTP response by the browser
        const file = await response.blob();

        // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
        a.download = title;
        a.href = window.URL.createObjectURL(file);

        // store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
        a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(":");
        
        a.click(); // autoclick on element to start download
    }

    // Event capturing for the download icon with the functionality
    function download(event, classToSearch) {
        if (event.target.className === classToSearch) {
            const url = event.target.getAttribute("data-download-url"); // get custom attribute with data from the API
            const title = event.target.getAttribute("data-download-title");
            _downloadBlob(url, title);
        }
    }

    function closeModal(event, classToSearch, modal) {
        if (event.target.className === classToSearch) {
            modal.style.display="none";
            modal.innerHTML = "";
        }
    }

    // Event capturing for the expand icon with the functionality
    function expand(event, classToSearch, modal, attrUrl, attrTitle, attrUsername, attrId) {
        if (event.target.className === classToSearch) {
            const url = event.target.getAttribute(attrUrl); // get custom attribute with data from the API
            const title = event.target.getAttribute(attrTitle);
            const username = event.target.getAttribute(attrUsername);
            const id = event.target.getAttribute(attrId);

            let modalHtml = "";
            const isFavorite = _isFavorite(id);
            console.log(isFavorite);

            if (isFavorite) {
                modalHtml = `
                    <i class="close-modal-icon"></i>
                    <img src=${url}
                        alt=${title}
                        class="modal-img">
                    <div class="modal-footer">
                        <div class="modal-titles-container">
                            <p class="modal-username">${username}</p>
                            <p class="modal-title">${title}</p>
                        </div>
                        <div class="modal-icons-container">
                            <i class="icon-fav-true"
                                data-fav-id=${id}
                                title="Favorito"></i>
                            <i class="icon-download"
                                data-download-url=${url}
                                data-download-title=${title}
                                title="Descargar"></i>
                        </div>
                    </div>`;
            } else {
                modalHtml = `
                    <i class="close-modal-icon"></i>
                    <img src=${url}
                        alt=${title}
                        class="modal-img">
                    <div class="modal-footer">
                        <div class="modal-titles-container">
                            <p class="modal-username">${username}</p>
                            <p class="modal-title">${title}</p>
                        </div>
                        <div class="modal-icons-container">
                            <i class="icon-fav-false"
                                data-fav-id=${id}
                                title="Favorito"></i>
                            <i class="icon-download"
                                data-download-url=${url}
                                data-download-title=${title}
                                title="Descargar"></i>
                        </div>
                    </div>`;
            }
            
            modal.insertAdjacentHTML("beforeend", modalHtml);
            
            modal.style.display="flex";
        }
    }

    return {
        favorite,
        download,
        expand,
        closeModal
    }
})();

export default gif;