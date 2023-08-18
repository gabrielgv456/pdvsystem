import { useDarkMode } from "../../contexts/DarkMode/DarkModeProvider"
import Box from '@mui/material/Box';
import { padding } from "polished";
import { ReactNode } from 'react'

interface MuiBoxProps {
    children: ReactNode,
    mobileWidthPercent: string,
    desktopWidth: number,
    padding?: string 
}

export const MuiBox = (props: MuiBoxProps) => {
    const Theme = useDarkMode()
    return (
        <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {
                xs: props.mobileWidthPercent, // phone
                sm: props.mobileWidthPercent, // tablets
                md: props.desktopWidth, // small laptop
                lg: props.desktopWidth, // desktop
                xl: props.desktopWidth // large screens
            },
            //width: '80%',
            bgcolor: Theme.DarkMode ? 'var(--backgroundDarkMode2)' : 'background.paper',
            color: Theme.DarkMode ? '#ffffff' : '#000',
            border: Theme.DarkMode ? '1px solid silver' : '',
            boxShadow: 24, p: 4,
            borderRadius: '6px',
            padding: props.padding ?? ''
        }}
        >
            {props.children}
        </Box>
    )
} 