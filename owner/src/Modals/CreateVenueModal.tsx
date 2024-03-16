// ModalContent.tsx
import React, { useState } from 'react';
import {
  Button,
  Modal,
  Typography,
  Box,
  TextField,
  Container,
  Paper,
  Input,
  Grid,
} from '@mui/material';

import { NewVenue } from '../types/NewVenue';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { createVenue } from '../redux/reducers/venueReducer';

interface ModalContentProps {
  open: boolean;
  onClose: () => void;
}

const CreateVenueModal: React.FC<ModalContentProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<NewVenue>({
    name: '',
    image: '',
    location: '',
    description: '',
  });
  const [imageSender, setImageSender] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const errorHandler = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setErrorMessage('');
    }, 3000);
  }
  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files?.[0];
    if (file) {
      formData.append('file', file);
    }
    formData.append("upload_preset", "ade40fld");
    //console.log("I am here");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dv4j8hjqf/image/upload", formData);
      setImageSender(response.data.public_id);
      console.log(imageSender);
    } catch (error) {
      console.log("Error occurred during user registration:", error);
      console.log("upload error");
    }
  }

  const handleChange = (field: keyof NewVenue) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    // Optional: Reset form fields after submission
    const newFormData = { ...formData, image: imageSender }
    console.log(newFormData)
    if (formData.name === '' || formData.description === '' || formData.location === '') {
      setErrorMessage('Please check all inputs');
      errorHandler();
    } else if (imageSender === null || imageSender === '') {
      setErrorMessage('Please upload an image');
      errorHandler();
    }
    else{
     dispatch(createVenue({venueData:{
      name:formData.name,
      image: imageSender,
      location: formData.location,
      description: formData.description,
     }}))
     .then((action) => {
      if (!createVenue.rejected.match(action)) {
        if (action.payload.status === "okay") {
          onClose()
        } else {
          setErrorMessage('Failled! Something went wrong');
          errorHandler();
        }
      } else {
        console.error('Error occurred during registration:', action.error);
      }
    });
    }
    setFormData({
      name: '',
      image: '',
      location: '',
      description: '',
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "60%", height: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>

        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="div" gutterBottom>
            Create your restaurant
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.name}
            onChange={handleChange('name')}
          />
          <TextField
            label="Location"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.location}
            onChange={handleChange('location')}
          />
          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange('description')}
          />
          <Grid item xs={12}>
            <label>Image </label>
            <input
              required
              name="avater"
              type="file"
              id="avater"
              accept="image/*"
              onChange={handleImageUpload} />
          </Grid>
          <Grid item xs={12}>
            {showMessage ? (
              <p style={{ color: "red" }}>* {errorMessage}</p>
            ) : null}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Create
          </Button>
        </Paper>
        <Button onClick={onClose} sx={{ marginTop: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateVenueModal;
