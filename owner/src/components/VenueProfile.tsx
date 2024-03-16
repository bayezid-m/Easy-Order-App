import React, { useEffect, useState } from 'react'
import { Container, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { Venue } from '../types/Venue'
import AddItemModal from '../Modals/AddItemModal';
import useAppDispatch from '../hooks/useAppDispatch';
import { getItemOfVeneu } from '../redux/reducers/itemReducer';
import QrModal from '../Modals/QrModal';

interface VenueProfileProps {
  venueInfo: Venue
}


const VenueProfile: React.FC<VenueProfileProps> = ({ venueInfo }) => {
  const { name, image, location, description, _id } = venueInfo;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  console.log(_id)

  useEffect(() => {
    if (_id) {
      console.log("call from venue profile")
      dispatch(getItemOfVeneu(_id as string))
    }
    //dispatch(getItemOfVeneu(_id as string))

  }, [isModalOpen])


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleQrModal = () => {
    setIsQrModalOpen(!isQrModalOpen);
  };

  return (
    <Container>
      <Grid maxWidth="lg"
        lg={12}
        item
        container
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'row',
          border: "1px",
          backgroundColor: "lightBlue",
          padding: "10px 30px",
          borderRadius: "10px",
          justifyContent: "space-between"
        }}>
        <Grid item lg={4} >
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
            style={{ width: '200px', borderRadius: '5px' }}
          />
        </Grid>
        <Grid item lg={4} >
          <CardContent>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography color="text.secondary">
              Location: {location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Grid >
        <Grid item lg={4} xs={12} sx={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <Button variant="contained" onClick={toggleModal}>Add Item</Button>
          <Button variant="contained" onClick={toggleQrModal}>Show Qr Code</Button>
          <Button variant="contained">Manage</Button>
        </Grid>
        <AddItemModal open={isModalOpen} onClose={toggleModal} venueId={_id as string} />
        <QrModal qrOpen={isQrModalOpen} onQrClose={toggleQrModal} code={venueInfo.code as string}/>
      </Grid>
    </Container>

  )
}

export default VenueProfile