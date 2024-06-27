import '../../../css/Form.css';
import '../../../css/Site.css';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import {toast} from 'react-hot-toast'

function CurrencyForm({fetchData}) {

  const { id: urlId } = useParams();
	const [data, setData] = useState({
		id: urlId,
		characterCurrencyName: '',
		characterCurrencyAmount: '',
	})

  const update = async (e) => {
    e.preventDefault();
    const {id, characterCurrencyName, characterCurrencyAmount} = data;
		try {
				const response = await axios.put(`/CreateCharacter/ChangeCurrency/${id}`, {
					id,
					characterCurrencyName,
          characterCurrencyAmount
				});

				if (response.data.error) {
					toast.error(response.data.error);
				} else {
					fetchData();
					toast.success('Updated character details');
				}
		} catch (error) {
				console.log(error);
		}
	};

  return(
    <form onSubmit={update}>
      <div className = "row">

        <div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'> 
           <div className="text-center form-titles">Add New Currency</div>
        </div>

        <div className='col-5 d-flex align-items-center justify-content-center skill-section-margin' style={{paddingRight: '0px'}}>
          <input className='create-character-field multichoice-input-field' placeholder='Amount'
            onChange={(e) =>
							setData((prevData) => ({
								...prevData,
								characterCurrencyAmount: e.target.value,
						}))
					}/>
        </div>

        <div className='col-7 d-flex align-items-center justify-content-center skill-section-margin' style={{paddingLeft: '0px'}}>
          <div className=' create-character-field multichoice-edit-field-small'>
              <select className='edit-character-field' id='characterPersonalityEdit'
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    characterCurrencyName: e.target.value,
                }))}>	

                <option/>
                <option value='Copper Pieces'>Copper Pieces</option>
                <option value='Silver Pieces'>Silver Pieces</option>
                <option value='Electrum Pieces'>Electrum Pieces</option>			
								<option value='Gold Pieces'>Gold Pieces</option>
                <option value='Platinum Pieces'>Platinum Pieces</option>
              </select>
          </div>
        </div>

        <div className='col-12 d-flex align-items-center justify-content-center' style={{marginBottom: '10px'}}> 
  			  <button className='create-character-button' type="submit" > Update</button>
			  </div>

      </div>
    </form>
  )

}

export default CurrencyForm