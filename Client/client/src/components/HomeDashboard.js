import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HomeDashboard = () => {
    return (
        <Container>
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Home Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Content Box 1</Typography>
                            <Typography>Placeholder content for box 1</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Content Box 2</Typography>
                            <Typography>Placeholder content for box 2</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Content Box 3</Typography>
                            <Typography>Placeholder content for box 3</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Content Box 4</Typography>
                            <Typography>Placeholder content for box 4</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Content Box 5</Typography>
                            <Typography>Placeholder content for box 5</Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item>
                            <Typography variant="h6">Content Box 6</Typography>
                            <Typography>Placeholder content for box 6</Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default HomeDashboard;
