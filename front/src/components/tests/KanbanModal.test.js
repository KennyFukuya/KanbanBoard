import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import KanbanModal from '../KanbanModal';

const mockData = {
    id: 1,
    titulo: 'foo',
    conteudo: 'poo'
}

describe('KanbanModal component', () => {
    it('Should call onCloseModal', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(
            <KanbanModal 
                cardData={mockData} 
                onCloseModal={mockCallBack} 
                onSaveCard={() => {}}
                enqueueSnackBar={() => {}}
                isModalOpen
            />);

        wrapper.find(Modal).simulate('close');

        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('Should have edit label', () => {
        const wrapper = shallow(
            <KanbanModal 
                cardData={mockData} 
                onCloseModal={() => {}} 
                onSaveCard={() => {}}
                enqueueSnackBar={() => {}}
                isModalOpen
            />);

        expect(wrapper.find(Typography).text()).toEqual('Edit task');
    });

    it('Should have add label', () => {
        const wrapper = shallow(
            <KanbanModal 
                cardData={{
                    titulo: '',
                    conteudo: ''
                }} 
                onCloseModal={() => {}} 
                onSaveCard={() => {}}
                enqueueSnackBar={() => {}}
                isModalOpen
            />);

        expect(wrapper.find(Typography).text()).toEqual('Add a task');
    });

    it('Should call onSaveCard', () => {
        const mockCallBack = jest.fn();
        const wrapper = shallow(
            <KanbanModal 
                cardData={mockData} 
                onCloseModal={() => {}} 
                onSaveCard={mockCallBack}
                enqueueSnackBar={() => {}}
                isModalOpen
            />);

        wrapper.find(TextField).at(0).simulate('change', { target: { value: 'mock' }});
        wrapper.find(TextField).at(1).simulate('change', { target: { value: 'card' }});

        wrapper.find(Button).simulate('click');

        expect(mockCallBack.mock.calls.length).toEqual(1);
        expect(mockCallBack.mock.calls[0][0]).toEqual({
            ...mockData,
            titulo: 'mock',
            conteudo: 'card'
        });
    });
});
