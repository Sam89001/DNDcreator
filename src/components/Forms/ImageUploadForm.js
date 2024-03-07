import '../../css/Form.css';
import '../../css/Site.css';

import axios from 'axios';
import {toast} from 'react-hot-toast';
import React, { useState } from 'react';
	

function ImageUploadForm({propId, propAddress}) {

  const characterId = propId.Id
  const address = propAddress

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
				toast.success('Uploaded Image!');
			} else {
				toast.error('Failed to upload image.');
			}
		} catch (error) {
			console.log(error)
		}
	}

  return (
    <div>
      <form onSubmit={{upload}} >
        <input type='file' name='avatar' onChange={handleFileChange}/>
      </form>
    </div>
  )
}

export default ImageUploadForm