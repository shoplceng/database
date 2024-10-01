import React from 'react';
import { Container, Box } from '@mui/material';

const Multviewer = () => {
    return (
        <Container>
            <Box my={4}>
                <iframe
                    src="http://192.168.6.236/#!/multiviewer/"
                    title="External Viewer"
                    style={{ width: '100%', height: '80vh', border: 'none' }}
                ></iframe>
            </Box>
        </Container>
    );
};



export default Multviewer;
