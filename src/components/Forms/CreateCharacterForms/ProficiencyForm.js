import '../../../css/Form.css';
import '../../../css/Site.css';

//States
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//Dependencies
import axios from 'axios';
import {toast} from 'react-hot-toast'

//Images
import DownArrowImage from '../../../images/Down Arrow.png'

function ProficiencyForm({fetchData}) {
  
  const [savingThrowDropdownCheck, setSavingThrowDropdownCheck] = useState(false);
  const savingThrowToggleDropdown = () => {
    setSavingThrowDropdownCheck(prevState => !prevState);
  };
  const [skillsDropdownCheck, setSkillsDropdownCheck] = useState(false);
  const skillsToggleDropdown = () => {
    setSkillsDropdownCheck(prevState => !prevState);
  };


  const { id: urlId } = useParams();
  const [data, setData] = useState({
    id: urlId,
    characterSavingThrowProficiencys: [],
    characterSkillProficiencys: []
  });
  
  const handleCheckboxChange = (e, proficiencyId, fieldName) => {
    const { checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [fieldName]: checked
        ? [...prevData[fieldName], proficiencyId]
        : prevData[fieldName].filter((id) => id !== proficiencyId),
    }));
  };

  //Post Request
  const updateProficiencys = async (e) => {
    e.preventDefault();
    const { id, characterSavingThrowProficiencys } = data;

    try {
      const response = await axios.put(`http://localhost:4000/CreateCharacter/SavingThrows/${id}`, {
        id, characterSavingThrowProficiencys
      })

      if (response.error) {
        toast.error(response.data.error);
      } else {
        fetchData();
        toast.success('Updated character details');
      }
    } catch (error) {
      console.log(error)
    }
  };

 return (
    <div className="row">
      <div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-right' style={{marginBottom: '25px'}}> 
				<div className="text-center form-titles">Skills</div>
			</div>    

			<div className='col-6 d-flex align-items-center justify-content-center skill-section-margin form-title-border-left' style={{marginBottom: '25px'}}> 
				<div className="text-center form-titles" >Saving Throws</div>
			</div>

      {/* Skills List */}

      <div className='col-6' >
        <div className='row'>
          <form>

            <div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
              <div className='multichoice-edit-field' style={{zIndex: '4'}}>
                <ul className={`list-dropdown ${skillsDropdownCheck ? 'active' : ''}`}>
                    <li className='down-arrow-container' style={{ position: 'relative' }}>
                      <img
                        className={`img-fluid down-arrow ${skillsDropdownCheck ? 'active' : ''}`}
                        src={DownArrowImage}
                        alt="Character Image"
                        onClick={skillsToggleDropdown}
                      />
                    </li>
                    <li className='list-item list-item-header '> Strength</li>

                    <li className='list-item'>
                      <input type="checkbox" id="athletics" name="athletics" />
                      <label htmlFor="athletics">Athletics</label>
                    </li>

                    <li className='list-item list-item-header '> Dexterity</li>

                    <li className='list-item'>
                      <input type="checkbox" id="acrobatics" name="acrobatics" />
                      <label htmlFor="acrobatics">Acrobatics</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="sleightOfHand" name="sleightOfHand" />
                      <label htmlFor="sleightOfHand">Sleight of Hand</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="stealth" name="stealth" />
                      <label htmlFor="stealth">Stealth</label>
                    </li>

                    <li className='list-item list-item-header '> Intelligence</li>

                    <li className='list-item'>
                      <input type="checkbox" id="arcana" name="arcana" />
                      <label htmlFor="arcana">Arcana</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="history" name="history" />
                      <label htmlFor="history">History</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="investigation" name="investigation" />
                      <label htmlFor="investigation">Investigation</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="nature" name="nature" />
                      <label htmlFor="nature">Nature</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="religion" name="religion" />
                      <label htmlFor="religion">Religion</label>
                    </li>

                    <li className='list-item list-item-header '> Wisdom</li>

                    <li className='list-item'>
                      <input type="checkbox" id="animalHandling" name="animalHandling" />
                      <label htmlFor="animalHandling">Animal Handling</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="insight" name="insight" />
                      <label htmlFor="insight">Insight</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="medicine" name="medicine" />
                      <label htmlFor="medicine">Medicine</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="perception" name="perception" />
                      <label htmlFor="perception">Perception</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="survival" name="survival" />
                      <label htmlFor="survival">Survival</label>
                    </li>

                    <li className='list-item list-item-header '> Charisma</li>

                    <li className='list-item'>
                      <input type="checkbox" id="deception" name="deception" />
                      <label htmlFor="deception">Deception</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="intimidation" name="intimidation" />
                      <label htmlFor="intimidation">Intimidation</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="performance" name="performance" />
                      <label htmlFor="performance">Performance</label>
                    </li>
                    <li className='list-item'>
                      <input type="checkbox" id="persuasion" name="persuasion" />
                      <label htmlFor="persuasion">Persuasion</label>
                    </li>
                    
                </ul>
              </div>
            </div>
            <button className='create-character-button' type="submit" > Update</button>

          </form>
        </div>
      </div>

      {/* Saving Throws */}

      <div className='col-6 '>
        <div className='row'>
          <form onSubmit={updateProficiencys}>

            <div className='col-12 d-flex align-items-center justify-content-center skill-section-margin'>
              <div className='multichoice-edit-field' style={{zIndex: '4'}}>
                <ul className={`list-dropdown ${savingThrowDropdownCheck ? 'active' : ''}`}>
                      <li className='down-arrow-container' style={{position: 'relative'}}>
                        <img className={`img-fluid down-arrow ${savingThrowDropdownCheck ? 'active' : ''}`} src={DownArrowImage} 
                        alt="Character Image" onClick={savingThrowToggleDropdown}/>
                      </li>
                      <li className='list-item'>
                        <input type="checkbox" id="strength" name="strength" 
                        onChange={(e) => handleCheckboxChange(e, e.target.id, 'characterSavingThrowProficiencys')} />
                        <label htmlFor="strength">Strength</label>
                      </li>
                      <li className='list-item'>
                        <input type="checkbox" id="dexterity" name="dexterity" 
                        onChange={(e) => handleCheckboxChange(e, e.target.id, 'characterSavingThrowProficiencys')} />
                        <label htmlFor="dexterity">Dexterity</label>
                      </li>
                      <li className='list-item'>
                        <input type="checkbox" id="constitution" name="constitution" 
                        onChange={(e) => handleCheckboxChange(e, e.target.id, 'characterSavingThrowProficiencys')} />
                        <label htmlFor="constitution">Constitution</label>
                      </li>
                      <li className='list-item'>
                        <input type="checkbox" id="intelligence" name="intelligence" 
                        onChange={(e) => handleCheckboxChange(e, e.target.id, 'characterSavingThrowProficiencys')} />
                        <label htmlFor="intelligence">Intelligence</label>
                      </li>
                      <li className='list-item'>
                        <input type="checkbox" id="wisdom" name="wisdom" 
                        onChange={(e) => handleCheckboxChange(e, e.target.id, 'characterSavingThrowProficiencys')} />
                        <label htmlFor="wisdom">Wisdom</label>
                      </li>
                      <li className='list-item'>
                        <input type="checkbox" id="charisma" name="charisma" 
                        onChange={(e) => handleCheckboxChange(e, e.target.id, 'characterSavingThrowProficiencys')} />
                        <label htmlFor="charisma">Charisma</label>
                      </li>
                </ul>
              </div>
            </div>

            <button className='create-character-button' type="submit" > Update</button>

          </form>
        </div>
      </div>

    </div>
  
 )
}

export default ProficiencyForm