import React from 'react'

function Collection() {
  return (
    <div className='h-screen w-full bg-[#533E6F] p-10 '>

 <div className='h-10 w-50  text-center mb-3 '>
              <img src="./image/text.png" className='h-full w-full object-contain ' alt="" />
        </div>

        <div className=' min-h-[40%] w-full flex flex-wrap p-10'>

            <div className='h-80 w-80 bg-[#2D263C] rounded-2xl overflow-hidden'>
                <div className='h-[80%] w-full bg-pink-200'>
                     <video src="./image/bbaf1n.mp4 " className='h-full w-full object-cover'></video>
                      
                      <div className='p-3 font-bold text-center text-white  '>
                        <h1>
                         Project 1
                      </h1>
                        </div>
                </div>
            </div>        
   
            
        </div>

    </div>
  )
}

export default Collection