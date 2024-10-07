import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import { useState, useEffect } from 'react';

const columns = [
  {
    width: 100,
    label: 'Channel&Resolution',
    dataKey: 'Channel&Resolution',
  },
  {
    width: 100,
    label: 'Call sign',
    dataKey: 'Call sign',
  },
  {
    width: 50,
    label: 'Location',
    dataKey: 'Location',
    numeric: true,
  },
  {
    width: 110,
    label: 'Station operator',
    dataKey: 'Station operator',
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add search query state

  // Fetch the data from the backend
  useEffect(() => {
    fetch('/getrabbitears')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      val ? val.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
    )
  );

  return (
    <Paper style={{ height: "85vh", width: '100%', margin: "20px" }}>
      {/* Add search input */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <TableVirtuoso
        data={filteredData}  // Use the filtered data
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

