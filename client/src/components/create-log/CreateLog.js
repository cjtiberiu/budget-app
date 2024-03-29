import React, { useState } from 'react';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { getData } from '../../actions';

import history from '../../history';

import axios from 'axios';

const CreateLog = props => {

    const [description, setDescription] = useState('');
    const [type, setType] = useState('income');
    const [date, setDate] = useState(new Date());
    const [sum, setSum] = useState(0);
    const [currency, setCurrency] = useState('RON');



    const onSubmit = e => {

        e.preventDefault();

        const createLog = {
            email: props.email,
            type,
            description,
            sum,
            date,
            currency
        }

        axios.post(`http://localhost:5000/logs/add/`, createLog, { headers: {'x-auth-token': localStorage.getItem('token')}})
            .then(result => {
                props.getData(props.email);

                history.push('/logs');
            })
            .catch(err => console.log(err));

    }

    return (
        <div className='exercise-form-container'>
            <h2 className='exercise-form-title'>Create Log</h2>
            <form className='exercise-form' onSubmit={onSubmit}>


                <div className="form-group">
                    <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={e => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input className='form-control' type='text' name='description' autoComplete='off' value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor='duration'>Value</label>
                    <input className='form-control' type='text' name='duration' autoComplete='off' value={sum} onChange={e => setSum(e.target.value)} />
                </div>

                <div className='form-group'>
                    <div className='currency-buttons'>
                        <div className='currency-div'>Currency: </div>
                        <button type='button' className={`ui black basic button ${currency === 'USD' ? 'active-currency' : null}`} onClick={() => setCurrency('USD')}>USD</button>
                        <button type='button' className={`ui black basic button ${currency === 'RON' ? 'active-currency' : null}`} onClick={() => setCurrency('RON')}>RON</button>
                    </div>
                </div>
                

                <div className='form-group'>
                    <label htmlFor='date'>Date</label>
                    <DatePicker
                        className='form-control date-input'
                        onChange={newDate => setDate(newDate)}
                        selected={date}
                        name='date'
                    />    
                </div>
                <br />
                <button className='btn btn-secondary' type='submit'>Submit</button>
            </form>
        </div>
    )
};

const mapStateToProps = state => {
    return { 
        email: state.auth.user.email,
        userID: state.auth.user._id,
    };
}

export default connect(mapStateToProps, { getData } )(CreateLog);