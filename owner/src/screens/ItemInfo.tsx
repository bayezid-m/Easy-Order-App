import React, { useState, useEffect } from 'react';
import { Grid, Typography, IconButton, Container, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Link, useParams, useNavigate } from "react-router-dom";
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelecter';
import { getSingleItem } from '../redux/reducers/itemReducer';
import DeleteItemModal from '../Modals/DeleteItemModal';

const ItemInfo = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleItem } = useAppSelector(state => state.itemReducer)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let [choise, setChoise] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getSingleItem(id as string))
  }, [])

  const handleNextImage = () => {
    if (singleItem?.image && singleItem?.image.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % singleItem?.image.length);
    }
  };

  const handlePrevImage = () => {
    if (singleItem?.image && singleItem?.image.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? singleItem?.image.length - 1 : prevIndex - 1
      );
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //console.log(singleItem?.item)
  console.log(singleItem)
  const handleDelete = () => {
    setIsModalOpen(!isModalOpen);
  }
  return (
    <Container>
      <Grid container spacing={-10} marginTop={10}>
        <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Grid item>
            <IconButton onClick={handlePrevImage}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <img
              src={singleItem?.image[currentImageIndex]}
              alt=""
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={handleNextImage}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
            textAlign: "left"
          }} >
            <div>
              <Typography variant="h2">{singleItem?.name}</Typography>
              <Typography variant="body1">{singleItem?.description}</Typography>
              <Typography variant="body1">Price: ${singleItem?.price}</Typography>
            </div>
            <div style={{ margin: "60px", display: "flex", gap: "30px" }}>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "130px" }}
                onClick={handleDelete} >Delete</Button>
                <DeleteItemModal open={isModalOpen} onClose={handleDelete} itemId={id as string}/>
              <Button variant="contained" color="secondary" sx={{ width: "130px" }}>Edit</Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ItemInfo