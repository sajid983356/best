import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: red,
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;