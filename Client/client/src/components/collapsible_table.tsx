import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import './table.css';

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

const CollapsibleTable: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/fetch-data'); // Replace with your actual backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Data[] = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleInputChange = (id: number, field: keyof Data, value: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async (id: number) => {
    const updatedItem = data.find((item) => item.id === id);
    if (updatedItem) {
      try {
        const response = await fetch(`/update-data/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
        });
        if (!response.ok) {
          throw new Error('Failed to update data');
        }
        console.log('Data updated successfully');
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  function Row(props: { row: Data }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">{row.group_name}</TableCell>
          <TableCell>{row.call_letters}</TableCell>
          <TableCell>{row.uivr}</TableCell>
          <TableCell>{row.channel_num}</TableCell>
          <TableCell>
            <IconButton
              aria-label="edit row"
              size="small"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Additional Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {Object.entries(row).map(([key, value]) => {
                      if (key === 'id') return null;
                      return (
                        <TableRow key={key}>
                          <TableCell component="th" scope="row">
                            {key.replace(/_/g, ' ')}
                          </TableCell>
                          <TableCell>
                            {isEditing ? (
                              <TextField
                                value={value}
                                onChange={(e) => handleInputChange(row.id, key as keyof Data, e.target.value)}
                                fullWidth
                                variant="outlined"
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {isEditing && (
                  <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleSave(row.id);
                        setIsEditing(false);
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      <TextField
        className='custom-search-bar'
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Group Name</TableCell>
              <TableCell>Call Letters</TableCell>
              <TableCell>UIVR</TableCell>
              <TableCell>Channel Number</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>
                <IconButton>
                  <LibraryAddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CollapsibleTable;
