import React, { useRef, useState, useEffect } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';
import { Typewriter } from 'react-simple-typewriter';

function OutputVedio() {
  const videoRef = useRef(null);
  let result = localStorage.getItem('result');
  const match = result.match(/"result":"(.*?)"/);
  result = match ? match[1] : null;
  console.log(result); // "bin blue in n nine soon"

  const [gifURL, setgifURL] = useState();
  const filename = localStorage.getItem('filename');
  console.log(filename)


  useEffect(() => {
    fetch('http://192.168.187.154:5000/output')
      .then(res => {
        const ct = res.headers.get('content-type') || '';
        if (ct.includes('application/json')) return res.json();
        if (ct.startsWith('image/') || ct.includes('octet-stream')) return res.blob();
        throw new Error(`Unexpected content-type: ${ct}`);
      })
      .then(data => {
        if (data instanceof Blob) {
          const url = URL.createObjectURL(data);
          setgifURL(url);
        } else {
          console.log('JSON:', data);
        }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []); // ✅ Empty dependency array = run once on mount


  /* React snippet */


  return (

    <div className="min-h-screen w-full bg-gradient-to-br from-[#2c2446] via-[#3f2b63] to-[#1e1a32] flex items-center justify-center p-6">
      <div className="flex flex-col items-center space-y-6 max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-white tracking-wide animate-pulse drop-shadow-lg">
          🎥 LipSync Vision
        </h1>

        {/* Video Container */}
        <div className="relative w-full max-w-[720px] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-500 hover:border-pink-500 transition-all duration-300">
          <video
            ref={videoRef}
            src={`/image/${filename}`}
            className="absolute top-0 left-0 w-full h-full object-conatin rounded-2xl"
            muted
            loop
            autoPlay
            playsInline
          />
          {/* Future Canvas or Overlay */}
          {/* <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" /> */}
        </div>

        {/* Footer or Instructions */}
        <p className="text-sm text-gray-300 italic text-center px-4">
          Detecting faces and syncing lips using AI 🤖. Please stay still and face the camera 🎯.
        </p>

        <h1 className='text-3xl text-white font-bold '>
          <Typewriter
            words={[result]}
            typeSpeed={80}
            cursor
            cursorStyle="_"
          />
        </h1>
      </div>


<div className='flex flex-col'>
<div className='h-[150px] w-[300px] border-3 rounded-2xl overflow-hidden '>
  
      {gifURL && <img src={gifURL} className='h-full w-full bg-red-200' alt="Prediction result" />}
</div >
<div className='text-white w-64 text-center text-md ml-2 leading-5 mt-3 '>
  <div></div>
   visual representation of the input data as seen by the machine learning model during Prediction
</div>
     
</div>

    </div>
  );
}

export default OutputVedio;
