import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Select() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('video', file); 
    console.log(formData);

    try {
      const response = await fetch('http://192.168.187.154:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Upload successful:', result);
  
     localStorage.setItem('result', JSON.stringify(result));
      navigate('/loader'); 
    } catch (error) {
      console.error('Upload failed ', error);
         
    }
  };

  return (
    <div className='h-screen w-full bg-[#533E6F] flex items-center justify-center gap-10 edu text-white flex-col'>
      <div className='h-20 w-40 bg-[#533E6F] text-center mb-3'>
        <img src="./image/text.png" className='h-full w-full object-contain' alt="Logo" />
      </div>

      <div className='flex gap-30'>
      

        
        <div
          className='h-80 w-80 flex items-center justify-center bg-[#2C263C] hover:scale-110 transition-all rounded-2xl border-dashed border-2 cursor-pointer'
          onClick={handleUploadClick}
        >
          <div className='h-40 w-40 flex items-center justify-center flex-col'>
            <i className="ri-upload-2-fill text-6xl text-[#533E6F]"></i>
            <h1>Upload</h1>
          </div>
        </div>
      </div>

    
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default Select;
