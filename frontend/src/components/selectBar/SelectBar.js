import React from 'react';
import './SelectBar.scss';

function SelectBar({selectedOption, handleSelectChange}) {
    return (
            <select className='selectBar' value={selectedOption} onChange={handleSelectChange}>
                <option value="" >Sort Images By</option>
                <option value="1">Latest</option>
                <option value="2">Oldest</option>
                <option value="3">Rating</option>
                <option value="4">AI (alphabetical) </option>
            </select>
    );
}

export default SelectBar;