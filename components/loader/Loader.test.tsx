import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';
import '@testing-library/jest-dom/extend-expect';


describe('Loader', () => {
    test('renders loader component', () => {
        const { getByText } = render(<Loader />);
        const loadingText = getByText('Chargement');
        expect(loadingText).toBeInTheDocument();
    });
});