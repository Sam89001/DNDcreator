import '../../css/Site.css';
import '../../css/Animations.css';

// Dependencies
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function PopUp({ /* your props here */ }) {
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
    </div>
  );
}

export default PopUp;