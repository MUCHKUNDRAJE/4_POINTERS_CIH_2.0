import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const CameraRecorder = () => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlobUrl, setVideoBlobUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

 const startRecording = () => {
  const stream = webcamRef.current.stream;


  stream.getAudioTracks().forEach(track => {
    track.enabled = true; // enable for recording
  });

  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0; // silence the audio output
  source.connect(gainNode).connect(audioContext.destination);

  chunksRef.current = [];
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm',
  });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunksRef.current.push(e.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setVideoBlobUrl(url);
  };

  mediaRecorderRef.current = mediaRecorder;
  mediaRecorder.start();
  setRecording(true);

  setTimeout(() => {
    mediaRecorder.stop();
    setRecording(false);

  }, 10000); // 10 seconds
};


  return (
    <>
    <div className={` h-screen w-full bg-[#533E6F] text-white flex flex-col items-center p-4 ${videoBlobUrl ? "opacity-75" : "opacity-100"}  `}>
        
        <div className='h-10 w-50  text-center mb-3 '>
              <img src="./image/text.png" className='h-full w-full object-contain' alt="" />
        </div>

      <Webcam
        audio={true}
        muted={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        className="rounded-md shadow-lg "
        style={{ width: "100%", maxWidth: "700px", backgroundColor: "#000" }}
      />

      <div className="my-4">
        <button
          onClick={startRecording}
          disabled={recording}
          className={`h-10 w-10 ${recording ? 'bg-purple-600' : 'bg-[#2C263C] hover:bg-purple-600'} cursor-pointer  rounded-full flex items-center justify-center `}
        >
          {recording ? <i class="ri-pause-line"></i>   :<i class="ri-play-line text-2xl"></i> }
        </button>
      </div>

    </div>
 
  {videoBlobUrl && (
    <div  className="mt-4 text-center absolute top-1/2 left-1/2 -translate-1/2 ">
      <h4 className="mb-2 inter text-white">Recorded Video</h4>
      <video
        src={videoBlobUrl}
        controls
        className="w-full h-[80%]  border-2 border-white"
      ></video>
      <br />
       
         <button className='h-10 w-10 cursor-pointer bg-white text-black rounded-full'>
            <i class="ri-check-line text-2xl"></i>
         </button>
      
    </div>
  )}
    
    </>
    
);
};

export default CameraRecorder;
