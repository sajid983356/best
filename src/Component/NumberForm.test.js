import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NumberForm from "./NumberForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const translation = (key) => key;

describe('NumberForm Component', () => {

    const theme = createTheme();

    const renderWithTheme = (component) => {
        return render(
            <ThemeProvider theme={theme}>
                {component}
            </ThemeProvider>
        )
    }
    test('renders the form with three text fields and a submit button', () => {
        renderWithTheme(<NumberForm translation={translation} />)

        const consumerNumberField = screen.getByLabelText('consumerNumber');
        const monthField = screen.getByLabelText('month');
        const yearField = screen.getByLabelText('year');

        expect(consumerNumberField).toBeInTheDocument();
        expect(monthField).toBeInTheDocument();
        expect(yearField).toBeInTheDocument();  
    });
    test('handle input change for consumer number', () => {
        renderWithTheme(<NumberForm translation={translation} />)
        const consumerNumberField = screen.getByLabelText('consumerNumber');

        fireEvent.change(consumerNumberField, {  target : { value : '12345' }});
        expect(consumerNumberField.value).toBe('12345')
    });
    test('handle input change for month', () => {
        renderWithTheme(<NumberForm translation={translation} />);
        const monthField = screen.getByLabelText('month');
        fireEvent.change(monthField, { target: { value : '04' }});
        expect(monthField.value).toBe('04')
    })
    test('handle input change for year', () => {
        renderWithTheme(<NumberForm translation={translation} />);
        const yearField = screen.getByLabelText('year');
        fireEvent.change(yearField, { target: { value: '2012'}});
        expect(yearField.value).toBe('2012')
    })
    test('should passed when valid form data is provided', () => {
        renderWithTheme(<NumberForm translation={translation} />);
        const consumerNumberField = screen.getByLabelText('consumerNumber');
        const monthField = screen.getByLabelText('month');
        const yearField = screen.getByLabelText('year');
        const submitButton = screen.getByRole('button', { name: 'submit'});

        fireEvent.change(consumerNumberField, {  target : { value : '12345' }});
        fireEvent.change(monthField, {  target : { value : '01' }});
        fireEvent.change(yearField, {  target : { value : '2023' }});

        // Mock window.location.href
        delete window.location;
        window.location = jest.fn();

        fireEvent.click(submitButton);
        const expectedUrl = 'https://dashboard.bestundertaking.net:9595/duplicatebill/DuplicateBill?accno=12345&billingMonth=2301&ward=7&tariff1=LTIB&tariff2=&flag=2';
        expect(window.location.href).toBe(expectedUrl);
    })
    test('shoud fail when empty consumer number pass', () => {
        renderWithTheme(<NumberForm translation={translation}/>)
        const consumerNumberField = screen.getByLabelText('consumerNumber');
        const submitButton = screen.getByRole('button', { name: 'submit'});
        fireEvent.change(consumerNumberField, { target: {value : '' }});
        window.alert = jest.fn();
        fireEvent.click(submitButton);
        expect(window.alert).toHaveBeenCalledWith('pls enter a valid consumer number');
    })
    test('should fail when empty month pass', () => {
        renderWithTheme(<NumberForm translation={translation}/>);
        const consumerNumberField = screen.getByLabelText('consumerNumber');
        const monthField = screen.getByLabelText('month');
        const submitButton = screen.getByRole('button',  { name: 'submit'});

        fireEvent.change(consumerNumberField, { target: { value: '04'}})
        fireEvent.change(monthField, { target : { value: '' }});
        window.alert = jest.fn();

        fireEvent.click(submitButton);
        expect(window.alert).toHaveBeenCalledWith('pls enter a valid month (e.g., 01, 02,..., 11, 12)');
    })
    test('should fail when empty year pass', () => {
        renderWithTheme(<NumberForm translation={translation}/>);
        const consumerNumberField = screen.getByLabelText('consumerNumber');
        const monthField = screen.getByLabelText('month');
        const yearField = screen.getByLabelText('year');
        const submitButton = screen.getByRole('button', { name: 'submit'})

        fireEvent.change(consumerNumberField, { target: { value: '12345' }});
        fireEvent.change(monthField, { target: { value: '04'}});
        fireEvent.change(yearField, { target: { value: '' }});

        window.alert = jest.fn();
        fireEvent.click(submitButton);
        expect(window.alert).toHaveBeenCalledWith('Please enter a valid year (e.g., 2023, 2024).')
    })
})