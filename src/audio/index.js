// Courtesy www/0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk
const getMicSoundLevel = (cb) => {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    if (navigator.getUserMedia) {
        navigator.getUserMedia(
        {
                audio: true,
            },
            function (stream) {
                audioContext = new AudioContext()
                analyser = audioContext.createAnalyser()
                microphone = audioContext.createMediaStreamSource(stream)
                javascriptNode = audioContext.createScriptProcessor(2048, 1, 1)

                analyser.smoothingTimeConstant = 0.8
                analyser.fftSize = 1024

                microphone.connect(analyser)
                analyser.connect(javascriptNode)
                javascriptNode.connect(audioContext.destination)

                javascriptNode.onaudioprocess = () => {
                    let array = new Uint8Array(analyser.frequencyBinCount)
                    analyser.getByteFrequencyData(array)
                    let values = 0

                    let length = array.length
                    for (let i = 0; i < length; i++) {
                        values += array[i]
                    }
                    if (typeof cb === 'function') cb(values)
                }
            },
            function (err) {
                console.log('The following error occured: ' + err.name)
            }
        )
    }
    else {
        console.log('getUserMedia not supported')
    }
}

getMicSoundLevel()
module.exports = getMicSoundLevel
