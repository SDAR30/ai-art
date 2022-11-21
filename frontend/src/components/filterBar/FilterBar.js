import React from 'react';

function FilterBar() {
    return (
        <div>
            <div>Filter by: </div>
            <select>
                <option value="0" disabled defaultValue={1}></option>
                <option value="1">Rating</option>
                <option value="2">AI program</option>
                <option></option>
            </select>

        </div>
    );
}

export default FilterBar;