const recordRTC = (function() {
    let _mirror = true;
    let _stream = null;
    let _canvasStream = null;
    let _recorder = null;
    const _constraints = {
        audio: false,
        video: {
            height: { max: 480 },
            facingMode: { exact: "user"} 
        }
    }
    const _config = {
        type: "gif",
        recorderType: GifRecorder,
        frameRate: { ideal: 30, max: 60 },
        videoBitsPerSecond: 128000,
        quality: 60,
        width: 640,
        height: 480
    }
    let _time = 0;
    let _interval;
    
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

    function record(recordButton, stopButton, timerContainer) {
        recordButton.style.display = "none";
        stopButton.style.display = "block";
        timerContainer.style.display = "block";

        _recorder.startRecording();
        _interval = setInterval(() => {
            _showTime(timerContainer)
        }, 1000);
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

    return {
        start,
        record
    }
})();

export default recordRTC;