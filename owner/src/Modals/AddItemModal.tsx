import React, { useState } from 'react'
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
import axios from 'axios';

import { NewItem } from '../types/NewItem';
import useAppDispatch from '../hooks/useAppDispatch';
import { addItem } from '../redux/reducers/itemReducer';

interface ModalContentProps {
    open: boolean;
    onClose: () => void;
    venueId: string
}


const AddItemModal: React.FC<ModalContentProps> = ({ open, onClose, venueId }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<NewItem>({
        name: '',
        venue_id: '',
        description: '',
        price: 0,
        image: []
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
            setImageSender(response.data.secure_url);
            console.log(imageSender);
            setFormData(prevData => ({
                ...prevData,
                image: [...prevData.image, response.data.secure_url]
              }));
        } catch (error) {
            console.log("Error occurred during user registration:", error);
            console.log("upload error");
        }
    } 
    const handleChange = (field: keyof NewItem) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSubmit = () => {
       const newFormData = { ...formData, venue_id: venueId }
        console.log(newFormData)
        // Optional: Reset form fields after submission
        // const newFormData = { ...formData, image: imageSender }
        // console.log(newFormData)
        if (formData.name === ''|| formData.price === 0) {
            setErrorMessage('Please check all inputs');
            errorHandler();
        } else if (formData.image.length===0) {
            setErrorMessage('Please upload at least an image');
            errorHandler();
        }
        else {
            dispatch(addItem({
                itemData: {
                    name: newFormData.name,
                    image: newFormData.image,
                    price: newFormData.price,
                    description: newFormData.description,
                    venue_id: newFormData.venue_id
                }
            }))
                .then((action) => {
                    if (!addItem.rejected.match(action)) {
                        if (action.payload.status === "okay") {
                            setFormData({
                                name: '',
                                image: [],
                                price: 0,
                                venue_id: '',
                                description: '',
                            });
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
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "60%", height: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>

                <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        Add new Item in your restaurant
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
                        label="Price"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formData.price}
                        onChange={handleChange('price')}
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
                        <label>Image 1:</label>
                        <input
                            required
                            name="avater"
                            type="file"
                            id="avater"
                            accept="image/*"
                            onChange={handleImageUpload} />
                    </Grid>
                    <Grid item xs={12}>
                        <label>Image 2:</label>
                        <input
                            required
                            name="avater"
                            type="file"
                            id="avater"
                            accept="image/*"
                            onChange={handleImageUpload} />
                    </Grid>
                    <Grid item xs={12}>
                        <label>Image 3:</label>
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
                        Add
                    </Button>
                </Paper>
                <Button onClick={onClose} sx={{ marginTop: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    )
}

export default AddItemModal