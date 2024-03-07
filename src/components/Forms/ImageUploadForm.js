import '../../css/Form.css';
import '../../css/Site.css';

import axios from 'axios';
import {toast} from 'react-hot-toast';
import React, { useState } from 'react';
	

function ImageUploadForm({ propId, propAddress }) {
  const characterId = propId.Id;
  const address = propAddress;

  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  
  const maxWidth = 1000;
  const maxHeight = 1000;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {

      const reader = new FileReader();
      reader.onloadend = () => {

        const img = new Image();
        img.onload = () => {

          if (img.width > maxWidth || img.height > maxHeight) {
            setFile(null);
            setPreviewURL('');
            toast.error(`Please select an image with dimensions less than ${maxWidth} x ${maxHeight} pixels.`);
          } else {
            setFile(selectedFile);
            setPreviewURL(reader.result);
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreviewURL('');
    }
  };

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(`http://localhost:4000/CreateCharacter/${address}/${characterId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setFile(null);
        setPreviewURL('');
        toast.success('Uploaded Image!');
      } else {
        toast.error('Failed to upload image.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <form onSubmit={upload} style={{ height: '100%' }}>
        <input type='file' name='avatar' onChange={handleFileChange} />
        <div className='d-flex flex-grow-1' style={{ maxHeight: 'calc(100% - 40px)', overflowY: 'auto' }}>
          {previewURL && (
            <img className='img-fluid' src={previewURL} alt="Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
          )}
        </div>
        <button className='image-upload-button' type="submit">Upload</button>
      </form>
    </div>

  );
}

export default ImageUploadForm;