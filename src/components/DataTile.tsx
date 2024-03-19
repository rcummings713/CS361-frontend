import * as React from 'react';
import {Box, ThemeProvider, createTheme} from '@mui/system';

const theme = createTheme({
    palette: {
        background: {
            paper: '#282c34',
        },
        text: {
            primary: 'white',
            secondary: 'white',
        },
        action: {
            active: '#001E3C',
        },
        success: {
            dark: '#009688',
        },
    },
});

// @ts-ignore
export default function DataTile({count, name}) {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 'auto',
                }}
            >
                <Box sx={{color: 'text.secondary'}}>{name}</Box>
                <Box sx={{color: 'text.primary', fontSize: 34, fontWeight: 'medium'}}>
                    {count}
                </Box>
            </Box>
        </ThemeProvider>
    );
}