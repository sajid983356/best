import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FooterData from "./FooterData";
import { Padding } from "@mui/icons-material";
import { colors } from "@mui/material";



describe('Footer component', () => {

    test('renders footer with text and heart icons', () => {
        render(<FooterData />)
    
        const linkElement = screen.getByRole('link', { name: /Sajid/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'https://www.linkedin.com/in/mohd-sajid-shaikh-b69a16146/');
    
    
        const heartIcon = screen.getByTestId('favorite-icon');
        expect(heartIcon).toBeInTheDocument();
    
        // Check if the icon has the correct class applied
        const iconClassName =  heartIcon.className.baseVal || heartIcon.className;
    
        expect(iconClassName).toMatch(/MuiSvgIcon-root/);
        expect(iconClassName).toMatch(/MuiSvgIcon-colorError/);
        expect(iconClassName).toMatch(/MuiSvgIcon-fontSizeInherit/)
    })

    test('renders box with correct styles', () => {
        render(<FooterData />)

        const boxElement = screen.getByRole('presentation');
        expect(boxElement).toBeInTheDocument()

        expect(boxElement).toHaveStyle('position: static');
        expect(boxElement).toHaveStyle('margin-top: auto');
        expect(boxElement).toHaveStyle('text-align: center');
        expect(boxElement).toHaveStyle('padding-top: 16px');
        expect(boxElement).toHaveStyle('padding-bottom: 16px');

        expect(boxElement).toHaveStyle({
            position: 'static',
            marginTop: 'auto',
            textAlign: 'center',
            paddingTop: '16px',
            paddingBottom: '16px',
        });
    })

    test('renders typography with correct text', () => {
        render(<FooterData />)

        const typographyElememt = screen.getByText(/Love from/i)
        expect(typographyElememt).toBeInTheDocument();
        expect(typographyElememt).toHaveTextContent('Love from Sajid')
        expect(typographyElememt).toHaveStyle({
            fontSize: '1rem',
            color: 'rgba(0, 0, 0, 0.6)', // Corresponds to textSecondary color
        })
    })
})