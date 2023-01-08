import React from 'react';

function CreateImage(props) {
    return (
        <form> 
            <input id='prompt' placeholder='prompt' maxLength="50" required />
            <button>Generate</button>
        </form>
    );
}

export default CreateImage;