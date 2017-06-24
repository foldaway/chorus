document.cookie = "user_id=1; path=/"; // Fake cookie

const socket = new WebSocket("ws://localhost:8080/api/channels/1/stream", "GET");

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const convertToArrayBuffer = (data) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      resolve(this.result);
    };
    fileReader.readAsArrayBuffer(data);
  });
}

const audio = document.createElement('audio');
const mediaSource = new MediaSource();

mediaSource.addEventListener('sourceopen', () => {
  const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
  
  socket.onmessage = (event) => {
    console.log('Got stuff');

    convertToArrayBuffer(event.data).then((arrayBuffer) => {
      sourceBuffer.appendBuffer(arrayBuffer);
    });
  };
});

audio.src = URL.createObjectURL(mediaSource);
audio.play();

socket.onopen = (event) => {
  socket.send('Hello, this is JS!');
};

