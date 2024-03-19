import * as React from 'react';
import {Box, ThemeProvider, createTheme} from '@mui/system';
import {Tooltip} from "@mui/material";

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
export default function DataTileProfile({profile}) {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 300,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyItems: 'center',
                }}
            >
                <h2 style={{color: 'white'}}>UberFit Info</h2>
                <Box sx={{pl: 3}}>
                    <Box sx={{color: 'text.secondary', fontWeight: 'bold'}}>User Name</Box>
                    <Box sx={{color: 'text.primary', fontSize: 15, pt: 1}}>
                        {profile.username}
                    </Box>
                </Box>
                <Box sx={{pl: 3}}>
                    <Box sx={{color: 'text.secondary', fontWeight: 'bold'}}>Profile Type</Box>
                    <Box sx={{color: 'text.primary', fontSize: 15, fontWeight: 'medium', pt: 1}}>
                        {profile.typemenu}
                    </Box>
                </Box>
                <Box sx={{pl: 3}}>
                    <Box sx={{color: 'text.secondary', fontWeight: 'bold'}}>Training Level</Box>
                    <Box sx={{color: 'text.primary', fontSize: 15, fontWeight: 'medium', pt: 1}}>
                        {profile.levelmenu}
                    </Box>
                </Box>
                <Box sx={{pl: 3}}>
                    <Box sx={{color: 'text.secondary', fontWeight: 'bold'}}>Goals</Box>
                    <Box sx={{color: 'text.primary', fontSize: 15, fontWeight: 'medium', pt: 1}}>
                        {profile.goalsmenu}
                    </Box>
                </Box>
                <Box sx={{pl: 3}}>
                    <Box sx={{color: 'text.secondary', fontWeight: 'bold'}}>Preferred Training Time</Box>
                    <Box sx={{color: 'text.primary', fontSize: 15, fontWeight: 'medium', pt: 1}}>
                        {profile.TODmenu}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}