import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import TaskCard from '../TaskCard';

const mockData = {
    id: 1,
    titulo: 'foo',
    conteudo: 'poo'
}

describe('TaskCard component', () => {
    it('Should call onDeleteCard', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(<TaskCard data={mockData} onDeleteCard={mockCallBack} onEditCard={() => {}}/>);

        wrapper.find(IconButton).at(0).simulate('click');

        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack.mock.calls[0][0]).toEqual(mockData.id);
    });

    it('Should call onEditCard', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow((<TaskCard data={mockData} onDeleteCard={() => {}} onEditCard={mockCallBack}/>));

        wrapper.find(IconButton).at(1).simulate('click');

        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack.mock.calls[0][0]).toEqual(mockData.id);
    });
});
