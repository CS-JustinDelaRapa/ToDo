import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F6C900', // Yellow color
    },
    text: {
      primary: '#F6C900',
      secondary: '#F9F6EE'
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#1e1d1d'
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#F9F6EE'
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', // Example of overriding AppBar background color
          color: '#FFFF00', // Set AppBar text color to yellow
        },
      },
    },
    MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#A9A9A9',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: '#F9F6EE', // Optional: Set menu item text color to a lighter shade of gray
            '&:hover': {
              backgroundColor: '#A9A9A9', // Optional: Set hover background color for menu items
            },
          },
        },
      },
  },
});

export default theme;
