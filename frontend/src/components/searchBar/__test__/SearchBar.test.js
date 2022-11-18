import { render, screen } from '@testing-library/react';

import SearchBar from '../SearchBar'

describe('Search bar component', () => {
    it('has a default placeholder when no value is provided', () => {
        render(<SearchBar />);
        const placeholderText = screen.queryByPlaceholderText(/search/i);
        expect(placeholderText).toBeInTheDocument();
    })

    // it('Does not have placeholder when search term is provided', () => {
    //     render(<SearchBar searchTerm={"Test search term"}/>);
    //     const placeholderText = screen.queryByPlaceholderText(/search by name/i);
    //     expect(placeholderText).not.toBeInTheDocument();
    // })

    it('shows the search term when we provide a search term', ()=>{
        render(<SearchBar searchTerm={("green apple")}/>)
        const searchBarText = screen.getByDisplayValue(/green apple/i);
        expect(searchBarText).toBeInTheDocument();
        expect(searchBarText.value).toEqual("green apple")
    })
})
