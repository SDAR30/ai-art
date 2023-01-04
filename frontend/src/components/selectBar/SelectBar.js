import React from 'react';
import './SelectBar.scss';

function SelectBar() {
    return (
            <select className='selectBar' defaultValue={0}>
                <option value="">Sort By</option>
                <option value="1">Rating</option>
                <option value="2">Latest</option>
                <option value="3">Helpful</option>
            </select>
    );
}

export default SelectBar;