import React from 'react';
import AddOrganization from './components/AddOrganization';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddOrganization />', () => {
    it('renders two <TextInput />components', () => {
        const wrapper = shallow(<AddOrganization />);
        expect(wrapper.find('TextField')).toHaveLength(2);
    });
});

describe('<AddOrganization />', () => {
    it('test onChange', () => {
        const wrapper = shallow(<AddOrganization />)
        const orgNameInput = wrapper.find('TextFeild').get(0);
        orgNameInput.instance().value = 'University of Delhi';
        usernameInput.simulate('change')
       expect(wrapper.state('organizationname')).toEqual('University of Delhi');
    });
});