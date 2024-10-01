import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface Data {
  id: number;
  group_name: string;
  call_letters: string;
  uivr: string;
  channel_num: string;
  affiliation: string;
  provider_name: string;
  poc_name: string;
  primary_email: string;
  secondary_email: string;
  eng_email: string;
  poc_num: string;
  noc_num: string;
  market: string;
  address: string;
}

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<Data | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/fetch-data/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/update-data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      navigate('/affiliates');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{mt: 4}}>
      <form
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={4}>
          {Object.keys(data).map((key) => {
            if (key === 'id') return null;
            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Paper>
                  <TextField
                    label={key.replace(/_/g, ' ')}
                    name={key}
                    value={(data as any)[key]}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={() => navigate('/affiliates')} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditPage;
