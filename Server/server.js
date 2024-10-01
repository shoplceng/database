import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from 'axios';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cron from 'node-cron';
import QueryStream from 'pg-query-stream';
import {to as copyTo} from 'pg-copy-streams';

// Create Express app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Predefined credentials
const users = {
  engineer: { username: 'engineer', password: 'LCEng@12345' },
  guest: { username: 'guest', password: 'ShopLCGuest' },
};

//const outputDir = __dirname;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Database connection configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "ShoplcEngineers",
  port: 5432,
});

// Connect to the database once when the app starts
db.connect()
  .then(() => console.log('Connected to the database.'))
  .catch(err => console.error('Connection error', err.stack));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(express.static("public"));

let data = [
  { id: 1, group_name: 'Group 1', call_sign: 'ABC', affiliation: 'Affiliation 1', market_city: 'Market City 1', channel_num_streaming: '45', poc_name: 'POC 1', primary_email_noc: 'primary@example.com', secondary_email: 'secondary@example.com', tech_contact: 'Tech Contact 1', poc_phone: '123-456-7890', tech_phone: '098-765-4321', affiliate_address: 'Address 1', shipping_address: 'Shipping Address 1', streaming_ip: '192.168.0.1', streaming_subnet: '255.255.255.0', streaming_gateway: '192.168.0.254', streaming_port: '8080', management_ip: '192.168.1.1', management_subnet: '255.255.255.0', management_gateway: '192.168.1.254', external_ts_ip: 'Public TS IP', external_management_ip: 'Public Management IP', output_type: 'HDMI', signal_format: 'MPEG-4', resolution: '1080p', frame_rate: '60', is_ird_internal: true, need_ird: false, satellite_or_ip: 'Satellite', call_signs_list: 'ABC, DEF', point_to_point: 'Multiple', system_config: 'Login/Password', vendor_equipment_shipped: 'Yes', vendor_ird_shipped_date: '2023-08-01', vendor_configuration_complete: true, vendor_ird_serial_model: 'Serial123', delivery_method: 'GTT', uivr: '123456', active_channel: 'Y' }
  // Add more sample data as needed
];

// Export table to CSV
async function exportTableToCSV(tableName, outputFilePath) {
  try {
    const writableStream = fs.createWriteStream(outputFilePath);

    const query = `COPY( SELECT * FROM ${tableName} ORDER BY id) TO STDOUT WITH CSV HEADER`;

    const stream = db.query(copyTo(query));
    stream.pipe(writableStream);

    writableStream.on('finish', () => {
      console.log('CSV file has been created.');
    });

    writableStream.on('error', (error) => {
      console.error('Error writing CSV file:', error);
      db.end(); // Close the connection on error
    });
  } catch (error) {
    console.error('Error exporting table to CSV:', error);
  }
}

// Function to send an email with CSV file attachments
const sendEmail = (csvFilePaths, recipientEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'DoNotReply.DBBackup@tjc.tv',
      pass: 'Asf@56Tared',
    },
  });

  const mailOptions = {
    from: 'DoNotReply.DBBackup@shoplc.com',
    to: recipientEmail,
    subject: 'PostgreSQL Database Backup',
    text: 'Here are your latest PostgreSQL table backups in CSV format.',
    attachments: [
      {
        path: csvFilePaths
      }
    ]
  };

  return transporter.sendMail(mailOptions);
};

// Schedule the backup and email process to run once a month
cron.schedule('0 2 1 * *', async () => {
  const recipientEmail = 'engineers@shoplc.com'; // The recipient's email address
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const outputFilePath = path.join(outputDir, `${table}.csv`);
  try {
    await exportTableToCSV(table, outputDir);
    console.log(`Exported ${table} to ${outputFilePath}`);

    await sendEmail(outputFilePath, recipientEmail);
    console.log('Monthly backup and email sent successfully!');
  } catch (err) {
    console.error('Error during backup and email process:', err);
  }
});

// Fetch all data from the specified table
async function fetchAllData(tableName) {
  try {
    console.log(`Fetching data from table: ${tableName}`);
    const query = `SELECT * FROM ${tableName} ORDER BY id`;
    const res = await db.query(query);
    console.log('Data fetched successfully:', res.rows);
    return res.rows;
  } catch (err) {
    console.error('Error fetching data:', err.stack);
  }
}

app.put('/update-data/:id', async (req, res) => {
  const { id } = req.params;
  const {
    group_name_broadcast_name, call_sign, affiliation, market_city_region,
    channel_number_or_streaming, poc_name, primary_email_noc, secondary_email_contact,
    technical_contact_email, poc_phone_number, technical_phone_number, affiliate_address,
    shipping_address, streaming_ip_address, streaming_subnet_mask, streaming_gateway,
    streaming_port, management_ip_address, management_subnet_mask, management_gateway,
    external_public_ts_ip_subnet_mask_gateway_port2, external_public_management_ip_subnet_mask_gateway_port2,
    output_type, signal_format, resolution, frame_rate, is_ird_on_internal_network,
    need_ird, satellite_or_ip, list_of_call_signs_if_applicable, point_to_point_or_multiple_stations,
    system_config_delivery_management_login_password, ird_playout_vendor_equipment_shipped,
    ird_playout_vendor_ird_shipped_out_date, ird_playout_vendor_configuration_completed,
    ird_playout_vendor_ird_serial_and_model, shop_lc_delivery_method, uivr, active_channel
  } = req.body;

  try {
    const query = `
      UPDATE affiliates_id
      SET group_name_broadcast_name = $1, call_sign = $2, affiliation = $3, market_city_region = $4,
          channel_number_or_streaming = $5, poc_name = $6, primary_email_noc = $7, secondary_email_contact = $8,
          technical_contact_email = $9, poc_phone_number = $10, technical_phone_number = $11, affiliate_address = $12,
          shipping_address = $13, streaming_ip_address = $14, streaming_subnet_mask = $15, streaming_gateway = $16,
          streaming_port = $17, management_ip_address = $18, management_subnet_mask = $19, management_gateway = $20,
          external_public_ts_ip_subnet_mask_gateway_port2 = $21, external_public_management_ip_subnet_mask_gateway_port2 = $22,
          output_type = $23, signal_format = $24, resolution = $25, frame_rate = $26, is_ird_on_internal_network = $27,
          need_ird = $28, satellite_or_ip = $29, list_of_call_signs_if_applicable = $30, point_to_point_or_multiple_stations = $31,
          system_config_delivery_management_login_password = $32, ird_playout_vendor_equipment_shipped = $33,
          ird_playout_vendor_ird_shipped_out_date = $34, ird_playout_vendor_configuration_completed = $35,
          ird_playout_vendor_ird_serial_and_model = $36, shop_lc_delivery_method = $37, uivr = $38, active_channel = $39
      WHERE id = $40
    `;
    const values = [
      group_name_broadcast_name, call_sign, affiliation, market_city_region,
      channel_number_or_streaming, poc_name, primary_email_noc, secondary_email_contact,
      technical_contact_email, poc_phone_number, technical_phone_number, affiliate_address,
      shipping_address, streaming_ip_address, streaming_subnet_mask, streaming_gateway,
      streaming_port, management_ip_address, management_subnet_mask, management_gateway,
      external_public_ts_ip_subnet_mask_gateway_port2, external_public_management_ip_subnet_mask_gateway_port2,
      output_type, signal_format, resolution, frame_rate, is_ird_on_internal_network,
      need_ird, satellite_or_ip, list_of_call_signs_if_applicable, point_to_point_or_multiple_stations,
      system_config_delivery_management_login_password, ird_playout_vendor_equipment_shipped,
      ird_playout_vendor_ird_shipped_out_date, ird_playout_vendor_configuration_completed,
      ird_playout_vendor_ird_serial_and_model, shop_lc_delivery_method, uivr, active_channel, id
    ];
    const result = await db.query(query, values);
    if (result.rowCount > 0) {
      res.status(200).send({ message: 'Data updated successfully' });
    } else {
      res.status(404).send({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send({ message: 'Failed to update data' });
  }
});

app.post('/add-data', async (req, res) => {
  const {
    group_name_broadcast_name, call_sign, affiliation, market_city_region,
    channel_number_or_streaming, poc_name, primary_email_noc, secondary_email_contact,
    technical_contact_email, poc_phone_number, technical_phone_number, affiliate_address,
    shipping_address, streaming_ip_address, streaming_subnet_mask, streaming_gateway,
    streaming_port, management_ip_address, management_subnet_mask, management_gateway,
    external_public_ts_ip_subnet_mask_gateway_port2, external_public_management_ip_subnet_mask_gateway_port2,
    output_type, signal_format, resolution, frame_rate, is_ird_on_internal_network,
    need_ird, satellite_or_ip, list_of_call_signs_if_applicable, point_to_point_or_multiple_stations,
    system_config_delivery_management_login_password, ird_playout_vendor_equipment_shipped,
    ird_playout_vendor_ird_shipped_out_date, ird_playout_vendor_configuration_completed,
    ird_playout_vendor_ird_serial_and_model, shop_lc_delivery_method, uivr, active_channel
  } = req.body;

  const query = `
    INSERT INTO affiliates_id (
      group_name_broadcast_name, call_sign, affiliation, market_city_region,
      channel_number_or_streaming, poc_name, primary_email_noc, secondary_email_contact,
      technical_contact_email, poc_phone_number, technical_phone_number, affiliate_address,
      shipping_address, streaming_ip_address, streaming_subnet_mask, streaming_gateway,
      streaming_port, management_ip_address, management_subnet_mask, management_gateway,
      external_public_ts_ip_subnet_mask_gateway_port2, external_public_management_ip_subnet_mask_gateway_port2,
      output_type, signal_format, resolution, frame_rate, is_ird_on_internal_network,
      need_ird, satellite_or_ip, list_of_call_signs_if_applicable, point_to_point_or_multiple_stations,
      system_config_delivery_management_login_password, ird_playout_vendor_equipment_shipped,
      ird_playout_vendor_ird_shipped_out_date, ird_playout_vendor_configuration_completed,
      ird_playout_vendor_ird_serial_and_model, shop_lc_delivery_method, uivr, active_channel
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
      $31, $32, $33, $34, $35, $36, $37, $38, $39
    ) RETURNING *;
  `;

  const values = [
    group_name_broadcast_name, call_sign, affiliation, market_city_region,
    channel_number_or_streaming, poc_name, primary_email_noc, secondary_email_contact,
    technical_contact_email, poc_phone_number, technical_phone_number, affiliate_address,
    shipping_address, streaming_ip_address, streaming_subnet_mask, streaming_gateway,
    streaming_port, management_ip_address, management_subnet_mask, management_gateway,
    external_public_ts_ip_subnet_mask_gateway_port2, external_public_management_ip_subnet_mask_gateway_port2,
    output_type, signal_format, resolution, frame_rate, is_ird_on_internal_network === '' ? null : is_ird_on_internal_network,
    need_ird, satellite_or_ip, list_of_call_signs_if_applicable, point_to_point_or_multiple_stations,
    system_config_delivery_management_login_password, ird_playout_vendor_equipment_shipped,
    ird_playout_vendor_ird_shipped_out_date, ird_playout_vendor_configuration_completed,
    ird_playout_vendor_ird_serial_and_model, shop_lc_delivery_method, uivr, active_channel === 'false' ? false : true
  ];

  try {
    const result = await db.query(query, values);
    console.log(result);
    res.status(201).json({ message: 'Data added successfully', data: result.rows[0] });
  } catch (err) {
    console.error('Error adding data:', err);
    res.status(500).send('Failed to add data');
  }
});

app.post('/test-email', async (req, res) => {
  const recipientEmail = 'engineers@shoplc.com'; // The recipient's email address
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  const outputFilePath = path.join(outputDir, `${table}.csv`);

  try {
    await exportTableToCSV(table, outputFilePath);
    console.log(`Exported ${table} to ${outputFilePath}`);
    
    await sendEmail(outputFilePath, recipientEmail);
    console.log('Test email sent successfully!');

    fs.unlinkSync(outputFilePath);

    res.status(200).send('Test email sent successfully!');
  } catch (err) {
    console.error('Error during test email process:', err);
    res.status(500).send('Failed to send test email');
  }
});

const table = 'affiliates_id';
const outputDir = path.join(__dirname, 'exports'); // Directory where the CSV files will be saved
const outputFilePath = path.join(outputDir, `${table}.csv`);

app.post('/makeCopy', async (req, res) => {
  try {
    await exportTableToCSV(table, outputFilePath)
    console.log(`created ${table}.csv`)
  } catch (error) {
    console.error('Error while creating csv copy', err);
    res.status(500).send('Failed to create csv copy');
  }
})

// Authentication endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
      return res.status(200).json({ message: 'Login successful', role: username });
  } else {
      return res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.get('/fetch-data', async (req, res) => {
  const tableName = 'affiliates_id';
  try {
    const data = await fetchAllData(tableName);
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching data');
    console.log(err);
  }
});

app.get('/api/zipcode/:zip/:distance', async (req, res) => {
  const { zip, distance } = req.params;
  const apiKey = 'yRxIKtqeLIl8S8TW6n1gvuecHBObxDujzNc2WukeDDWRSfkKfL5TLcBf4wSPsAyU';
  const baseUrl = 'https://www.zipcodeapi.com';

  try {
    const response = await axios.get(`${baseUrl}/rest/${apiKey}/radius.json/78666/100/mile`);
    const data = response.data;
    const jsonData = res.json(data);
    console.log(jsonData)
  } catch (error) {
    console.error('Error fetching data from Zipcode API:', error);
    res.status(500).send('Failed to fetch data');
  }
});

// Example route to fetch data based on ID
app.get('/fetch-data/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const query = `SELECT * FROM affiliates_id WHERE id = $1`;
    const result = await db.query(query, [id]);
    
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    res.status(500).send('Error fetching data');
    console.error('Error executing query', err.stack);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
