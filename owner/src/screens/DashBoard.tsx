import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'
import { authenticate } from '../redux/reducers/userReducer';
import { User } from '../types/User';
import { getVenueByToken } from '../redux/reducers/venueReducer';
import CreateVenueModal from '../Modals/CreateVenueModal';
import VenueProfile from '../components/VenueProfile'
import { getItemOfVeneu } from '../redux/reducers/itemReducer';
import ItemContainer from '../components/ItemContainer';

const DashBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.userReducer)
  const token: any = localStorage.getItem("token" || "")
  const [userInfo, setUserInfo] = useState<any>()
  const { venue } = useAppSelector(state => state.venueReducer)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { item } = useAppSelector(state => state.itemReducer)
  const [venueID, setVenueId] = useState<any>('')

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (token) {
      //console.log("I have token")
      dispatch(authenticate())
        .then((action) => {
          if (!authenticate.rejected.match(action)) {
            if (action.payload) {
              //console.log(action.payload)
              setUserInfo(action.payload)
            } else {
              console.log('no data')
            }
          } else {
            console.error('Error occurred during registration:', action.error);
          }
        });
      dispatch(getVenueByToken())
    }
    else {
      navigate('/login')
    }
  }, [isModalOpen])

  useEffect(()=>{
    if(token){
      if(venue!==null){
        dispatch(getItemOfVeneu(venue._id as string))
      }
    }  
  },[venue])

  const logOutHandler = () => {
    localStorage.setItem("token", "")
    navigate('/login')
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {venue?.owner ? <div><h4>{venue?.name}</h4></div> : <div><h4>Restaurant</h4></div>}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={toggleDrawer}
          >
            <Button>
              <Typography component="div" sx={{ color: 'white', marginRight: "10px" }}>
                {userInfo?.userInfo.first_name}
              </Typography>
              <Avatar alt="Remy Sharp" src={userInfo?.userInfo.image} />
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
          style={{ width: "300px" }}
        >
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            sx={{ alignSelf: 'flex-end', marginRight: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" sx={{ margin: 2 }}>
            Drawer Content
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => logOutHandler()} // Replace with your logout logic
          >
            Logout
          </Button>
        </div>
      </Drawer>
      <main>
        {venue !== null ? <div>
          <VenueProfile venueInfo={venue} />
        </div> : <div style={{ marginLeft: "20px" }}>
          <Typography variant="h4" sx={{ margin: 2 }}>
            You do not have any restaurant. Create one first.
          </Typography>
          <Button variant="contained" onClick={toggleModal}>
            Create Restaurant
          </Button>
        </div>}
        <ItemContainer itemInfo={item} />
      </main>
      <CreateVenueModal open={isModalOpen} onClose={toggleModal} />
    </div>
  );
}

export default DashBoard