import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import './table.css';

interface Data {
  id: number;
  group_name_broadcast_name: string;
  call_sign: string;
  channel_number_or_streaming: string;
  market_city_region: string;
  active_channel: boolean;
}

interface ZipCodeData {
  zip_codes: string[];
}

const CollapsibleTable: React.FC = () => {
  const [data, setData] = React.useState<Data[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [zipCode, setZipCode] = React.useState('');
  const [radiusResults, setRadiusResults] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Rows per page state
  const navigate = useNavigate();
  const { role } = useAuth();

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const handleZipCodeSearch = async () => {
    console.log(zipCode);
    try {
      const distance = 100; // 100 miles
      const response = await axios.get<ZipCodeData>(`http://localhost:5000/api/zipcode/${zipCode}/${distance}`);
      setRadiusResults(response.data.zip_codes);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching zip codes:', error);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val ? val.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
    )
  );

  const handleNewData = async () => {
    try {
      const response = await fetch('/add-data'); // Replace with your actual backend endpoint
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
      const data: Data[] = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error add data:', error);
    }
  }

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const uniqueGroupNames = Array.from(new Set(data.map(item => item.group_name_broadcast_name)));

  function Row(props: { row: Data }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const isChannelNotActive = row.active_channel === false;

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: isChannelNotActive ? 'red' : 'inherit' }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.group_name_broadcast_name}</TableCell>
          <TableCell>{row.call_sign}</TableCell>
          <TableCell>{row.channel_number_or_streaming}</TableCell>
          <TableCell>{row.market_city_region}</TableCell>
          {role !== 'guest' && (
            <TableCell>
              <IconButton
                aria-label="edit row"
                size="small"
                onClick={() => navigate(`/edit/${row.id}`)}
              >
                <EditIcon />
              </IconButton>
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Additional Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {Object.entries(row).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {key.replace(/_/g, ' ')}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <><div style={{display: 'flex'}}>
           <TextField
        className="custom-search-bar"
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
    </div>
      {/* <TextField
        className="custom-search-bar"
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
                    <TableCell>
                <IconButton>
                  <LibraryAddIcon />
                </IconButton>
              </TableCell> */}
      {/* <Box sx={{ maxWidth: { xs: 320, sm: 480, md: 900, lg: 1500, xl: 3000 }, bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable">
          <Tab label="All" />
          {uniqueGroupNames.map((groupName, index) => (
            <Tab key={index} label={groupName} />
          ))}
        </Tabs>
      </Box> */}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Group Name</TableCell>
              <TableCell>Call Sign</TableCell>
              <TableCell>Channel Number</TableCell>
              <TableCell>Market City/Region</TableCell>
              
              <TableCell>Edit</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </>
  );
};

export default CollapsibleTable;
