//Dependencies
import React, { useState } from 'react';
import {toast} from 'react-hot-toast'

//Images
import dFour from '../../images/d4.png'
import dSix from '../../images/d6.png'
import dEight from '../../images/d8.png'
import dTen from '../../images/d10.png'
import dTwelve from '../../images/d12.png'
import dTwenty from '../../images/d20.png'
import dOneHundred from '../../images/d100.png'

function DiceRoller() {

  //Functions 

  const [diceNumbers, setDiceNumbers] = useState({
    userNumber: '',
    rolledNumbers: [],
    rollOutput: ''
  })
  const [rollLogs, setRollLogs] = useState({
    rollLog: [],
  })
  const rollDice = (userDiceSelection) => {
    const rollAmount = diceNumbers.userNumber.trim();

    if (rollAmount === '' || isNaN(rollAmount)) {
      toast.error('Please input a number')
      return;
    }
    if (rollAmount % 1 !== 0) {
      toast.error('Number must be whole')
      return;
    }
    if (rollAmount > 101) {
      toast.error('Number must be less than 101')
      return;
    }

    setDiceNumbers(prevState => ({
      ...prevState,
      rolledNumbers: [],
      rollOutput: ''
    }));

    let min = 1
    let value = 0
    let stringValue = ''
    const rolledNumbers = []

    for (let i = 0; i < rollAmount; i++) {
      const diceRoll = Math.floor(Math.random() * (userDiceSelection - min + 1)) + min ;
      rolledNumbers.push(diceRoll);
      value += diceRoll;

      if (i === rollAmount - 1) {
        stringValue = stringValue + diceRoll + ' = '
      } else {
        stringValue === '' ? stringValue = diceRoll + ' + ' : stringValue = stringValue + diceRoll + ' + '
      }
    }
    
    setDiceNumbers(prevState => ({
      ...prevState,
      rolledNumbers: rolledNumbers,
      rollOutput: value
    }));

    let rollLogValue = 'd' + userDiceSelection + ' * ' + rollAmount + ' result:   ' + stringValue + value
    
    setRollLogs(prevLogs => {
      let updatedRollLog = [...prevLogs.rollLog, rollLogValue];
      if (updatedRollLog.length > 30) {
          updatedRollLog = updatedRollLog.slice(1);
      }
      return {
          ...prevLogs,
          rollLog: updatedRollLog
      };
    });
  }
  
  return (
    <div className="row d-flex justify-content-center align-items-center">
      {/* Title */}
          <div className='col-12'>
            <header className="form-header text-center">Dice & Damage</header>
          </div>

          {/* Dice Images */}
          <div className='col-12 d-flex flex-column align-items-center justify-content-center' style={{padding: '0px'}}>
              <div className='w-100 d-flex justify-content-between' style={{ flex: '1' }}>
                <div>
                  <div className="text-center form-titles">D4</div>
                  <img className='img-fluid dice-image' src={dFour} onClick={() => rollDice(4)}/>
                </div>

                <div>
                  <div className="text-center form-titles">D6</div>
                  <img className='img-fluid dice-image' src={dSix} onClick={() => rollDice(6)}/>
                </div>

                <div>
                  <div className="text-center form-titles">D8</div>
                  <img className='img-fluid dice-image' src={dEight} onClick={() => rollDice(8)}/>
                </div>

                <div>
                  <div className="text-center form-titles">D10</div>
                  <img className='img-fluid dice-image' src={dTen} onClick={() => rollDice(10)}/>
                </div>
              </div>

              <div className='w-100 d-flex d-flex justify-content-between' style={{ flex: '1', padding: '0px 20px 0px 20px'}}>
                <div>
                  <div className="text-center form-titles">D12</div>
                  <img className='img-fluid dice-image' src={dTwelve} onClick={() => rollDice(12)}/>
                </div>

                <div>
                  <div className="text-center form-titles">D20</div>
                  <img className='img-fluid dice-image' src={dTwenty} onClick={() => rollDice(20)}/>
                </div>

                <div>
                  <div className="text-center form-titles">D100</div>
                  <img className='img-fluid dice-image' src={dOneHundred} onClick={() => rollDice(100)}/>
                </div>
              </div>
          </div>

          {/* No. Rolls Fields */}
          <div className='col-12 row'>

            <div className='col-12 d-flex justify-content-between' style={{paddingBottom: '10px'}}>
                <div style={{flex: '1', marginRight: '10px'}}>
                  <div className="text-center form-titles">No. Of Rolls</div>
                </div>
                <div style={{flex: '1', marginRight: '10px'}}>
                  <div className="text-center form-titles">Total Result</div>
                </div>
                <div style={{flex: '1'}}>
                  <div className="text-center form-titles">Ind. Result</div>
                </div>
            </div>

            <div className='col-12 d-flex justify-content-between' style={{padding: '0px', fontSize: '1.2vw'}}>
                <div style={{flex: '1', marginRight: '10px'}}>
                  <input className='field-style' style={{width: '100%'}} 
                    onChange={(e) => setDiceNumbers((prevData) => ({
                      ...prevData,
                      userNumber: e.target.value
                    }))
                  }/>
                </div>
                
                <div className='field-style' 
                style={{ flex: '1', marginRight: '10px', overflowX: 'auto', overflowY: 'hidden', 
                display: 'flex', paddingBottom: '24px', fontSize: '1vw', color: 'var(--textLightGrey)' }}>

                    <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        {diceNumbers.rolledNumbers.map((number, index) => (
                            <span key={index}>
                                {number}
                                {index !== diceNumbers.rolledNumbers.length - 1 ? ' + ' : ' = '}
                            </span>
                        ))}
                        {diceNumbers.rollOutput}
                    </div>

                </div>

                <div style={{ flex: '1' }}>
                  <div className='field-style' style={{ width: '100%', display: 'flex', alignItems: 'center', color: 'var(--textLightGrey)' }}>{diceNumbers.rollOutput}</div>
                </div>
            </div>

          </div>

          {/* Log */}
          <div className='col-12 row'>
            <div className="text-center form-titles" style={{paddingBottom: '10px'}}>Log</div>
            <textarea className='field-style' 
            style={{width: '100%', overflowY: 'auto', padding: '5px 10px 5px 5px ', lineHeight: '1.2', minHeight: '75px', maxHeight: '200px', color: 'var(--textLightGrey)'}} 
            placeholder="Notes"
            value={rollLogs.rollLog.join('\n\n' )}
            readOnly
            />
          </div>

          {/* Notes */}
          <div className='col-12'>
            <div className="text-center form-titles" style={{paddingBottom: '10px'}}>Notes</div>
            <textarea className='field-style spell-description-field' style={{width: '100%'}} 
              placeholder="Notes"></textarea>
          </div>

    </div>
  )
}

export default DiceRoller