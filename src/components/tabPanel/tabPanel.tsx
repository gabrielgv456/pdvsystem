
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

export const TabPanel = memo((props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
});

