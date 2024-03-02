import { createTheme } from '@mui/material/styles'
import rubik from '@fontsource/rubik';

const rubikFont = {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 400,
    src: `
    local('Rubik'),
    url(${rubik}) format('woff2')
  `,
};

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#393d47'
                    }
                }
            }
        }
    },
    typography: {
        fontFamily: 'Rubik, sans-serif'
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [rubikFont],
            },
        },
    },
});

export default theme;