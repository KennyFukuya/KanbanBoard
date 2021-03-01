import React from 'react';
import { shallow } from 'enzyme';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from '../SearchBar';

describe('SearchBar component', () => {
    it('On Click should return InputBase value', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow((<SearchBar onClick={mockCallBack}/>));

        wrapper.find(InputBase).simulate('change', { target: { value: 'foo' }});

        wrapper.find(IconButton).simulate('click');

        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack.mock.calls[0][0]).toEqual('foo');
    });

    it('On KeyDown (ENTER) should return InputBase value', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow((<SearchBar onClick={mockCallBack}/>));

        wrapper.find(InputBase).simulate('change', { target: { value: 'foo' }});

        wrapper.find(InputBase).simulate('keydown', { key: 'Enter' });

        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack.mock.calls[0][0]).toEqual('foo');
    });
});
