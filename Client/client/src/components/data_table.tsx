import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableComponents, TableVirtuoso } from 'react-virtuoso';

interface Data {
  id: number;
  group_name: string;
  call_letters: string;
  affiliation: string;
  provider_name: string;
  uivr: string;
  channel_num: string;
  poc_name: string;
  primary_email: string;
  secondary_email: string;
  eng_email: string;
  poc_num: string;
  noc_num: string;
  market: string;
  address: string;
}

const VirtuosoTableComponents: TableComponents<Data> = {
  Table,
  TableHead,
  TableRow,
  TableBody,
  Scroller: Paper, // You can use Paper directly for Scroller
};

export default function ReactVirtualizedTable() {
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/fetch-data'); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Data[] = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Paper style={{ height: 400, width: '100%', padding: 20 }} elevation={3}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={renderHeader}
        itemContent={renderRow}
      />
    </Paper>
  );
}

const renderHeader = () => (
  <TableRow>
    <TableCell>Group Name</TableCell>
    <TableCell>Call Letters</TableCell>
    <TableCell>Affiliation</TableCell>
    <TableCell>Provider Name</TableCell>
    <TableCell>UIVR</TableCell>
    <TableCell>Channel Number</TableCell>
    <TableCell>POC Name</TableCell>
    <TableCell>Primary Email</TableCell>
    <TableCell>Secondary Email</TableCell>
    <TableCell>ENG Email</TableCell>
    <TableCell>POC Number</TableCell>
    <TableCell>NOC Number</TableCell>
    <TableCell>Market</TableCell>
    <TableCell>Address</TableCell>
  </TableRow>
);

const renderRow = (index: number, row: Data) => (
  <TableRow key={row.id}>
    <TableCell>{row.group_name}</TableCell>
    <TableCell>{row.call_letters}</TableCell>
    <TableCell>{row.affiliation}</TableCell>
    <TableCell>{row.provider_name}</TableCell>
    <TableCell>{row.uivr}</TableCell>
    <TableCell>{row.channel_num}</TableCell>
    <TableCell>{row.poc_name}</TableCell>
    <TableCell>{row.primary_email}</TableCell>
    <TableCell>{row.secondary_email}</TableCell>
    <TableCell>{row.eng_email}</TableCell>
    <TableCell>{row.poc_num}</TableCell>
    <TableCell>{row.noc_num}</TableCell>
    <TableCell>{row.market}</TableCell>
    <TableCell>{row.address}</TableCell>
  </TableRow>
);
