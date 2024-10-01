import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Grid, Paper, Typography, Button } from '@mui/material';


const Form = () => {

  const [inputValues, setInputValues] = useState({
    group_name_broadcast_name:'',
    call_sign:'',
    affiliation:'',
    market_city_region:''
  })

  const[isRequiredFilled, setIsRequiredFilled] = useState ({
    group_name_broadcast_name: true,
    call_sign: true,
    affiliation: true,
    market_city_region: true
  })

  const [formData, setFormData] = useState({
    group_name_broadcast_name: '',
    call_sign: '',
    affiliation: '',
    market_city_region: '',
    channel_number_or_streaming: '',
    poc_name: '',
    primary_email_noc: '',
    secondary_email_contact: '',
    technical_contact_email: '',
    poc_phone_number: '',
    technical_phone_number: '',
    affiliate_address: '',
    shipping_address: '',
    streaming_ip_address: '',
    streaming_subnet_mask: '',
    streaming_gateway: '',
    streaming_port: '',
    management_ip_address: '',
    management_subnet_mask: '',
    management_gateway: '',
    external_public_ts_ip_subnet_mask_gateway_port2: '',
    external_public_management_ip_subnet_mask_gateway_port2: '',
    output_type: '',
    signal_format: '',
    resolution: '',
    frame_rate: '',
    is_ird_on_internal_network: '',
    need_ird: '',
    satellite_or_ip: '',
    list_of_call_signs_if_applicable: '',
    point_to_point_or_multiple_stations: '',
    system_config_delivery_management_login_password: '',
    ird_playout_vendor_equipment_shipped: '',
    ird_playout_vendor_ird_shipped_out_date: '',
    ird_playout_vendor_configuration_completed: '',
    ird_playout_vendor_ird_serial_and_model: '',
    shop_lc_delivery_method: '',
    uivr: '',
    active_channel: ''
  });

  const requiredFields = {
    group_name_broadcast_name: true,
    call_sign: true,
    affiliation: true,
    market_city_region: true,
  };

  const navigate = useNavigate();
  
  // Handler for form submission
  const handleNewData = async () => {
    console.log(isRequiredFilled);
    console.log(inputValues)
    const allFieldsFilled = Object.keys(requiredFields).every((field) => formData[field].trim() !== '');

    

    if (!allFieldsFilled) {
      // If not all fields are filled, set isRequiredFilled state accordingly
      setIsRequiredFilled({
        group_name_broadcast_name: formData.group_name_broadcast_name.trim() !== '',
        call_sign: formData.call_sign.trim() !== '',
        affiliation: formData.affiliation.trim() !== '',
        market_city_region: formData.market_city_region.trim() !== '',
      });

      alert('Please fill out all required fields');
      return;
    }

    try {
      const response = await fetch('/add-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add data');
      }
  
      console.log('Data added successfully');
      navigate('/affiliates')
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setIsRequiredFilled((prevState) => ({
      ...prevState,
      [name]: value.trim() !== '',
    }));
  };
  
  return (
    <Paper style={{ padding: 20, margin: 'auto', maxWidth: 1600 }}>
      <Typography variant="h6" gutterBottom>
        Information Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} >
          <TextField
            fullWidth
            label="Group Name / Broadcast Name"
            name="group_name_broadcast_name"
            variant="outlined"
            required
            onChange={handleInputChange}
            style={{border: !isRequiredFilled.group_name_broadcast_name ? '1px solid red' : 'none', borderRadius: '4px' 
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Call Sign"
            name="call_sign"
            variant="outlined"
            required
            onChange={handleInputChange}
            style={{
              border: !isRequiredFilled.call_sign ? '1px solid red' : 'none',
              borderRadius: '4px'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Affiliation"
            name="affiliation"
            variant="outlined"
            required
            onChange={handleInputChange}
            style={{
              border: !isRequiredFilled.affiliation ? '1px solid red' : 'none',
              borderRadius: '4px'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Market City / Region"
            name="market_city_region"
            variant="outlined"
            required
            onChange={handleInputChange}
            style={{
              border: !isRequiredFilled.market_city_region ? '1px solid red' : 'none',
              borderRadius: '4px'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Channel Number or Streaming"
            name="channel_number_or_streaming"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="POC Name"
            name="poc_name"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Primary Email / NOC"
            name="primary_email_noc"
            variant="outlined"
            type="email"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Secondary Email Contact"
            name="secondary_email_contact"
            variant="outlined"
            type="email"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Technical Contact Email"
            name="technical_contact_email"
            variant="outlined"
            type="email"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="POC Phone Number"
            name="poc_phone_number"
            variant="outlined"
            type="tel"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Technical Phone Number"
            name="technical_phone_number"
            variant="outlined"
            type="tel"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Affiliate Address"
            name="affiliate_address"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Shipping Address"
            name="shipping_address"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Streaming IP Address"
            name="streaming_ip_address"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Streaming Subnet Mask"
            name="streaming_subnet_mask"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Streaming Gateway"
            name="streaming_gateway"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Streaming Port"
            name="streaming_port"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Management IP Address"
            name="management_ip_address"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Management Subnet Mask"
            name="management_subnet_mask"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Management Gateway"
            name="management_gateway"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="External Public TS IP, Subnet Mask, Gateway, Port"
            name="external_public_ts_ip_subnet_mask_gateway_port2"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="External Public Management IP, Subnet Mask, Gateway, Port"
            name="external_public_management_ip_subnet_mask_gateway_port2"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Output Type"
            name="output_type"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Signal Format"
            name="signal_format"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Resolution"
            name="resolution"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Frame Rate"
            name="frame_rate"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Is IRD on Internal Network?"
            name="is_ird_on_internal_network"
            variant="outlined"
            required
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Need IRD?"
            name="need_ird"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Satellite or IP?"
            name="satellite_or_ip"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="List of Call Signs if Applicable"
            name="list_of_call_signs_if_applicable"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Point to Point or Multiple Stations"
            name="point_to_point_or_multiple_stations"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="System Config: Delivery Management Login/Password"
            name="system_config_delivery_management_login_password"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="IRD Playout Vendor Equipment Shipped"
            name="ird_playout_vendor_equipment_shipped"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="IRD Playout Vendor IRD Shipped Out Date"
            name="ird_playout_vendor_ird_shipped_out_date"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="IRD Playout Vendor Configuration Completed"
            name="ird_playout_vendor_configuration_completed"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="IRD Playout Vendor IRD Serial and Model"
            name="ird_playout_vendor_ird_serial_and_model"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Shop LC Delivery Method"
            name="shop_lc_delivery_method"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="UIVR"
            name="uivr"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Active Channel"
            name="active_channel"
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid> */}
      </Grid>
      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={() => handleNewData()}>
        Submit
      </Button>
    </Paper>
  );
};

export default Form;
