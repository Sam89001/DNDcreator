import '../../css/Site.css';
import '../../css/Animations.css';

// Dependencies
import React, { useState } from 'react';

function PopUp({ onClose }) {
  const handleClick = () => {
    // Perform any action you need when the click happens
    // For example, close the popup
    onClose();
  };

  return (
    <div style={{
      zIndex: '10',
      height: '500px',
      width: '500px',
      position: 'absolute',
      backgroundColor: 'red',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}>
      {/* PopUp content */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            cursor: 'pointer',
            marginBottom: '10px',
          }}
          onClick={handleClick}
        >
          Close me
        </div>
        {/* Your other PopUp content goes here */}
        {/* ... */}
      </div>
    </div>
  );
}

export default PopUp;
