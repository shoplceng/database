import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '& .MuiCircularProgress-circle': {
        strokeLinecap: 'round',
         // Add glow effect
    },
}));

const ProgressLabel = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    fontSize: '1rem',
    fontWeight: 'bold',
}));

const ProjectManagement = () => {
    return (
        <Container>
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Project Management
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6">Project Dashboard</Typography>
                            <Typography>Summary of ongoing projects, metrics, and key milestones.</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Project 1</Typography>
                            <ProgressContainer>
                                <CircularProgress variant="determinate" value={75} size={80} />
                                <ProgressLabel>75%</ProgressLabel>
                            </ProgressContainer>
                            <Typography>Status: In Progress</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Project 2</Typography>
                            <ProgressContainer>
                                <CircularProgress variant="determinate" value={100} size={80} />
                                <ProgressLabel>100%</ProgressLabel>
                            </ProgressContainer>
                            <Typography>Status: Completed</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Project 3</Typography>
                            <ProgressContainer>
                                <CircularProgress variant="determinate" value={50} size={80} />
                                <ProgressLabel>50%</ProgressLabel>
                            </ProgressContainer>
                            <Typography>Status: Not Started</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <Typography variant="h6">Task Management</Typography>
                            <Typography>Manage tasks within projects, including assignments and statuses.</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <Typography variant="h6">Collaboration Tools</Typography>
                            <Typography>Comments, discussions, and file attachments for projects and tasks.</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Item>
                            <Typography variant="h6">Notifications and Alerts</Typography>
                            <Typography>Notifications for updates, deadlines, and changes in project status.</Typography>
                        </Item>
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                    <Button variant="contained" color="primary">
                        Create New Project
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProjectManagement;
