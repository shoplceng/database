import React from 'react';
import { Container, Typography, TextField, Button, Grid, Box, List, ListItem, ListItemText, Paper } from '@mui/material';

const DocumentationPage = () => {
    return (
        <Container>
            <Header />
            <Box my={4}>
                <SearchBar />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <DocumentationCategories />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <DocumentationList />
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Container>
    );
};

const Header = () => (
    <Box py={2} textAlign="center" bgcolor="primary.main" color="white">
        <Typography variant="h4">Broadcast Engineering Documentation</Typography>
    </Box>
);

const SearchBar = () => (
    <Box my={2}>
        <TextField fullWidth variant="outlined" placeholder="Search documentation..." />
        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Search
        </Button>
    </Box>
);

const DocumentationCategories = () => (
    <Paper elevation={3}>
        <Box p={2}>
            <Typography variant="h6">Categories</Typography>
            <List>
                <ListItem button component="a" href="#rf-engineering">
                    <ListItemText primary="RF Engineering" />
                </ListItem>
                <ListItem button component="a" href="#audio-engineering">
                    <ListItemText primary="Audio Engineering" />
                </ListItem>
                <ListItem button component="a" href="#video-engineering">
                    <ListItemText primary="Video Engineering" />
                </ListItem>
                <ListItem button component="a" href="#networking">
                    <ListItemText primary="Networking" />
                </ListItem>
                <ListItem button component="a" href="#general-guides">
                    <ListItemText primary="General Guides" />
                </ListItem>
            </List>
        </Box>
    </Paper>
);

const DocumentationList = () => (
    <Paper elevation={3}>
        <Box p={2}>
            <Typography variant="h6">All Documents</Typography>
            <List>
                <ListItem button component="a" href="/docs/rf-engineering-guide.pdf">
                    <ListItemText primary="RF Engineering Guide" />
                </ListItem>
                <ListItem button component="a" href="/docs/audio-setup-manual.pdf">
                    <ListItemText primary="Audio Setup Manual" />
                </ListItem>
                <ListItem button component="a" href="/docs/video-transmission-guide.pdf">
                    <ListItemText primary="Video Transmission Guide" />
                </ListItem>
                <ListItem button component="a" href="/docs/networking-basics.pdf">
                    <ListItemText primary="Networking Basics" />
                </ListItem>
                <ListItem button component="a" href="/docs/general-guides.pdf">
                    <ListItemText primary="General Guides" />
                </ListItem>
            </List>
        </Box>
    </Paper>
);

const Footer = () => (
    <Box py={2} textAlign="center" bgcolor="primary.main" color="white" mt={4}>
        <Typography variant="body2">&copy; 2024 Company Name. All rights reserved.</Typography>
        <Typography variant="body2"><a href="/privacy" style={{ color: 'white' }}>Privacy Policy</a> | <a href="/terms" style={{ color: 'white' }}>Terms of Service</a></Typography>
        <Typography variant="body2">Contact us: info@company.com</Typography>
    </Box>
);

export default DocumentationPage;
