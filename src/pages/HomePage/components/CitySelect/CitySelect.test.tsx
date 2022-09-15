import React from 'react';
import { CitySelect } from './';
import { mount } from 'enzyme';

test('<CitySelect />', () => {
    // default state
    let component = mount(<CitySelect onChange={() => {}} />);

    expect(component).toMatchSnapshot();
});
