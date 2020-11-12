import React, {useState} from 'react';
import { connect, useSelector } from 'react-redux';

import './CurrencyButtons.css';

import { setCurrency } from '../actions';

const CurrencyButtons = props => {

    const currency = useSelector(state => state.exchange.preferredCurrency);
    const email = useSelector(state => state.auth.user.email);
    const [activeButton, setActiveButton] = useState(currency);

    const handleCurrencyChange = curr => {
        setActiveButton(curr);
        props.setCurrency(email, curr);
    }

    return (
        <div className='currency-buttons'>
            <div className='currency-div'>Currency: </div>
            <button class={`ui black basic button ${activeButton === 'USD' ? 'active-currency' : null}`} onClick={() => handleCurrencyChange('USD')}>USD</button>
            <button class={`ui black basic button ${activeButton === 'RON' ? 'active-currency' : null}`} onClick={() => handleCurrencyChange('RON')}>RON</button>
        </div>
    )
};

export default connect(null, { setCurrency })(CurrencyButtons);