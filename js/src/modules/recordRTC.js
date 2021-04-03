const recordRTC = (function() {
    let _mirror = true;
    let _stream = null;
    let _canvasStream = null;
    let _recorder = null;
    const _constraints = {
        audio: false,
        video: {
            height: { max: 320 },
            facingMode: { exact: "user"} 
        }
    }
    const _config = {
        type: "gif",
        recorderType: GifRecorder,
        frameRate: { ideal: 30, max: 60 },
        videoBitsPerSecond: 128000,
        quality: 60,
        width: 400,
        height: 320
    }
    let _time = 0;
    let _interval;
    let _form = new FormData();
    let _blob;
    let _myGifos;

    // check if the gif is in myGifos
    function _isInMyGifos(id) {
        _myGifos = localStorage.getItem("myGifos") ? JSON.parse(localStorage.getItem("myGifos")) : [];

        return _myGifos.includes(id) ? true : false;
    }
    
    // ask for permissions
    async function start(event, createGifTitle, createGifMessage, startButton, recordButton, video, canvas, step1, step2) {
        event.preventDefault();

        createGifTitle.innerHTML = "¿Nos das acceso <br> a tu cámara?";
        createGifMessage.innerHTML = "El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.";
        step1.classList.toggle("active");

        const ctx = canvas.getContext('2d');

        try {
            _stream = await navigator.mediaDevices.getUserMedia(_constraints);

            createGifTitle.style.display = "none";
            createGifMessage.style.display = "none";
            canvas.style.display = "block";
            startButton.style.display = "none";
            recordButton.style.display = "block";
            step1.classList.toggle("active");
            step2.classList.toggle("active");

            video.srcObject = _stream;
            video.play();

            let i;
            video.addEventListener('play', () => {
                i = window.setInterval(() => {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                    }, 10);
                }, false);
            
            // logic to mirror the camera
            if(_mirror === true) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            } else {
                _mirror = true;
            }
            _mirror = false;

            _canvasStream = canvas.captureStream(120);

            _recorder = new RecordRTCPromisesHandler(_canvasStream, _config);

        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    function _toHHMMSS(time) {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time - hours * 3600) / 60);
        let seconds = time - hours * 3600 - minutes * 60;

        hours = `${hours}`.padStart(2, '0');
        minutes = `${minutes}`.padStart(2, '0');
        seconds = `${seconds}`.padStart(2, '0');

        return hours + ':' + minutes + ':' + seconds;
    }

    function _showTime(timerContainer) {
        _time += 1;
        timerContainer.innerHTML = _toHHMMSS(_time);
    }

    // start recording
    function record(recordButton, stopButton, timerContainer) {
        recordButton.style.display = "none";
        stopButton.style.display = "block";
        timerContainer.style.display = "block";

        _recorder.startRecording();
        _interval = setInterval(() => {
            _showTime(timerContainer)
        }, 1000);
    };

    // stop recording
    async function stop(canvas, recordingVideoContainer, stopButton, uploadButton, timerContainer, repeatCaption) {
        try {
            await _recorder.stopRecording();
            _blob = await _recorder.getBlob();

            let img = document.createElement("img");
            img.src = URL.createObjectURL(_blob);
            img.alt = "Recorded gif";
            img.id = "recorded-gif";

            canvas.style.display = "none";

            recordingVideoContainer.appendChild(img);

            _form.append("file", _blob, "myGif.gif");
            console.log(_form.get("file"));

            stopButton.style.display = "none";
            uploadButton.style.display = "block";
            timerContainer.style.display = "none";
            repeatCaption.style.display = "block";

            clearInterval(_interval);
            timerContainer.innerHTML = "00:00:00";

        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    // upload gif
    async function upload(uploadOverlay, uploadLoader, uploadOk, uploadMessage, step2, step3, uploadButton, repeatCaption, url, paramApiKey, apiKey) {
        try {
            const endpoint = url + paramApiKey + apiKey;

            uploadOverlay.style.display = "block";
            uploadOverlay.style.opacity = "0.6";
            uploadLoader.style.display = "block";
            uploadMessage.style.display = "block";
            step2.classList.toggle("active");
            step3.classList.toggle("active");
            uploadButton.style.display = "none";
            repeatCaption.style.display = "none";

            const response = await fetch(endpoint, {
                method: "POST",
                body: _form
            });

            if (response.ok) {
                const jsonResponse = await response.json();

                uploadLoader.style.display = "none";
                uploadOk.style.display = "block";
                uploadMessage.innerHTML = "GIFO subido con éxito";

                console.log(jsonResponse);

                let myGifoId = jsonResponse.data.id
			    console.log(myGifoId);

                return jsonResponse;
            }

            throw new Error("Request failed");
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    function repeatCaption(canvas, repeatCaption, uploadButton, recordButton) {
        _recorder.clearRecordedData();
        
        document.getElementById("recorded-gif").remove();

        canvas.style.display = "block";
        repeatCaption.style.display = "none";
        uploadButton.style.display = "none";
        recordButton.style.display = "block";

        clearInterval(_interval);
        timerContainer.innerHTML = "00:00:00";
    };

    return {
        start,
        record,
        stop,
        upload,
        repeatCaption
    }
})();

export default recordRTC;