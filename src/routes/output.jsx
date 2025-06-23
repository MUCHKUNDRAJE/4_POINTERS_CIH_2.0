import React, { useRef } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';
import { Typewriter } from 'react-simple-typewriter';

function OutputVedio() {
  const videoRef = useRef(null);

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
            src="/image/bbie9s.mp4"
            className="absolute top-0 left-0 w-full h-full object-conatin rounded-2xl"
            muted
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
    words={['please shut up']}
    typeSpeed={80}
    cursor
    cursorStyle="_"
  />
        </h1>
      </div>
    </div>
  );
}

export default OutputVedio;
