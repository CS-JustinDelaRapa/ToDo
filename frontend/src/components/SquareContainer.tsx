import React from 'react';
import { Box } from '@mui/material';

const SquareContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        height: '90vh',
        width: '60vw',
        backgroundColor: '#1e1d1d',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};

export default SquareContainer;
