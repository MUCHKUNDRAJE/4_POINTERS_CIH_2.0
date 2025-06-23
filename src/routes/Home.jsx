import { ArrowLeft, ArrowRight, ArrowRightToLine, HomeIcon, LucideHome } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
  return (
      
    <>
      <div className='min-h-screen w-full p-2 py-7 bg-[#533e6f] relative'>
       
       <div className='  w-96 top-8 right-2 absolute h-96'>
           <div className='h-12 w-40 mr-2 bg-[#2E263C] mb-3 rounded-md flex justify-center items-center absolute right-18  top-1 '>
            </div>
            <div className='h-13 w-40 bg-[#2E263C] mb-3 rounded-md flex justify-center items-center  absolute -right-9 top-29 rotate-90  '> </div>
               <div className='h-13 w-12 bg-[#2E263C] mb-3 rounded-md flex justify-center items-center  absolute right-6 top-1  '> </div>
       </div>

        <div className='  w-96 -bottom-10 left-2 absolute  h-96 z-10'>
           <div className='h-12 w-40  bg-[#2E263C] mb-3 rounded-md flex justify-center items-center absolute left-25  bottom-8 '></div>
           <div className='h-12 w-40  bg-[#2E263C] mb-3 rounded-md flex justify-center items-center absolute -left-8  rotate-90  bottom-36 '></div>
           <div className='h-12 w-19  bg-[#2E263C] mb-3 rounded-md flex justify-center items-center absolute left-5  bottom-8 '></div>
       </div>

      <div className='  w-15 top-70  right-5 absolute   h-96 z-30 flex items-center justify-start flex-col gap-3'>
            <div className='bg-[#2C263C] h-10 w-10 rounded-full' ></div>
            
            <Link to={'/select'}>
            
             <div className='bg-[#2C263C] h-10 w-10 rounded-full flex items-center justify-center  text-[#533E6F] hover:text-[#2C263C]  hover:border-[1px] border-[#2C263C] hover:border-[#2C263C] transition-all cursor-pointer hover:bg-[#533E6F]' >
                 <i class="ri-home-9-line text-2xl"></i>
             </div>
            </Link>
              <div className='bg-[#2C263C] h-10 w-10 rounded-full flex items-center justify-center  text-[#533E6F] hover:text-[#2C263C]  hover:border-[1px] border-[#2C263C] hover:border-[#2C263C] transition-all cursor-pointer hover:bg-[#533E6F]' >
             <i class="ri-menu-line text-2xl"></i>
             </div>

             <Link to={"/camera"}>
                 <div className='bg-[#2C263C] h-10 w-10 rounded-full flex items-center justify-center  text-[#533E6F] hover:text-[#2C263C]  hover:border-[1px] border-[#2C263C] hover:border-[#2C263C] transition-all cursor-pointer hover:bg-[#533E6F]' >
          <i class="ri-mic-line text-2xl"></i>
             </div>
             </Link>
       </div>



        <div className='w-full px-20  relative z-20 '>
          <div className='flex items-center justify-between'>
            <div className='h-13 w-96 bg-[#2C263C] mb-3 rounded-md flex justify-center items-center '>
               <img src="./image/text.png" className='h-full w-full object-contain'  alt="" /> 
              
            </div>
      
          </div>
            <div className='h-[36rem] w-full bg-[#2C263C] rounded-4xl '>
                    <video className='h-full w-full object-contain' src="./image/LipSync.mp4" autoPlay muted loop ></video>
            </div>
            <div className='h-10 w-40  absolute bottom-3 right-30 rounded xl bg-[#533e6f] flex items-center justify-center text-white cursor-pointer'>
              Get Started <ArrowRight/>
            </div>
        </div>

      </div>
    
      <div className='min-h-screen w-full p-2 py-7 bg-[#533e6f] relative'>
      
      </div>
    </>
  )
}

export default Home