import React, { useEffect, useRef } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import '@tensorflow/tfjs';

function OutputVedio() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const setupFaceDetection = async () => {
      const model = await blazeface.load();
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set canvas size when video metadata is ready
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.play();
        detectFace();
      };

      // Face detection loop
      const detectFace = async () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const predictions = await model.estimateFaces(video, false);

        if (predictions.length > 0) {
          predictions.forEach((prediction) => {
            const start = prediction.topLeft;
            const end = prediction.bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];

            ctx.beginPath();
            ctx.strokeStyle = 'lime';
            ctx.lineWidth = 2;
            ctx.rect(start[0], start[1], size[0], size[1]);
            ctx.stroke();
          });
        }

        requestAnimationFrame(detectFace);
      };
    };

    setupFaceDetection();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#533E6F] p-4">
      <h1 className="text-white text-3xl font-bold mb-4">LipSync</h1>
      
      <div className="relative w-[640px] h-[480px] bg-black rounded-xl overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src="/image/test.mp4"
          className="absolute top-0 left-0 w-full h-full object-contain"
          muted
          autoPlay
          playsInline
        />
        {/* Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
}

export default OutputVedio;
