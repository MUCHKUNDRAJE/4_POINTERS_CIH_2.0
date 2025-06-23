import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';


function Loading() {
  const textRefs = useRef([]);
  const containerRef = useRef(null); // ✅ for fading the whole content
  const navigate = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate text one-by-one
    textRefs.current.forEach((el) => {
      tl.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      ).to(
        el,
        { opacity: 0, y: -20, duration: 0.8, ease: 'power2.in' },
        '+=0.5'
      );
    });

    // ✅ Fade out whole container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // ✅ Navigate after fade
    tl.call(() => {
      navigate('/output'); // Replace with your route
    });
  }, [navigate]);

// fetch('')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json(); 
//   })
//   .then(data => {
//     console.log(data); 
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });

  

  return (
    <div
      ref={containerRef}
      className='h-screen w-full bg-[#F9F9F9] flex items-center justify-center'
    >
      <div className='mb-20'>
        <div className='h-96 w-80 mt-10 rounded-4xl overflow-hidden '>
          <img
            className='h-full w-full object-contain'
            src='https://i.pinimg.com/originals/f2/01/5d/f2015db9a1aa250d5d9c9c0ed56d9787.gif'
            alt=''
          />
        </div>

        <div className='-mt-20 relative h-10'>
          {['Detecting Face...', 'Detecting Lip...', 'Processing Words...', 'Generating Output...'].map(
            (text, index) => (
              <h1
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className='absolute inset-0 text-center text-2xl font-semibold opacity-0 whitespace-nowrap'
              >
                {text}
              </h1>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Loading;
