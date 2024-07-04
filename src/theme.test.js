import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import theme from "./theme";

describe('MUI theme configuration', () => {
    test('creates a valid theme objects', () => {
        expect(theme).toBeDefined()
        expect(theme.palette.primary).toBeDefined()
        expect(theme.palette.secondary).toBeDefined()
        expect(theme.typography.fontFamily).toBe('Roboto, sans-serif')
    })
})