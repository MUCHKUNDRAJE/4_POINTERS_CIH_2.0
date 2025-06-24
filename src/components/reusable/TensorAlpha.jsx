import React from 'react';

// Converts numbers to characters
const numberToChar = (num) => {
  if (num === 39) return ' ';
  if (num >= 1 && num <= 26) return String.fromCharCode(96 + num);
  return ''; // skip invalids
};

const TensorViewer = ({ tensor }) => {
  // Clean and flatten the tensor
  const cleaned = tensor.flat().filter(n => n > 0 && n !== 0 && n !== -1 || n === 39);

  const boxStyle = {
    display: 'inline-block',
    minWidth: '3ch',       // wider box
    marginRight: '2ch',    // extra space between items
    textAlign: 'center'
  };

  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.5rem',
      fontFamily: 'monospace',
      overflowX: 'auto'
    }}>
      {/* Number row */}
      <div style={{ whiteSpace: 'nowrap' }}>
        {cleaned.map((num, index) => (
          <div  className='text-lg' key={`num-${index}`} style={boxStyle}>
            {num}
          </div>
        ))}
      </div>

      {/* Character row */}
      <div style={{ whiteSpace: 'nowrap', marginTop: '0.5rem' }}>
        {cleaned.map((num, index) => (
          <div className='text-lg' key={`char-${index}`} style={boxStyle}>
            {numberToChar(num)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TensorViewer;
