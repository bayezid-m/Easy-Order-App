import React, { useState } from 'react'
import useAppDispatch from '../hooks/useAppDispatch';
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
import { deleteItem } from '../redux/reducers/itemReducer';
import { useNavigate } from 'react-router-dom';

interface ModalContentProps {
    open: boolean;
    onClose: () => void;
    itemId: string
}

const DeleteItemModal: React.FC<ModalContentProps> = ({ open, onClose, itemId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const errorHandler = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            setErrorMessage('');
        }, 3000);
    }
    const handleDelete = () => {
        dispatch(deleteItem(itemId))
        .then((action) => {
            if (!deleteItem.rejected.match(action)) {
                if (action.payload.status as string === "okay") {
                    navigate('/')
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
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "40%", height: 200, bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: "center" }}>
                <p>{itemId}</p>
                <h2>Confirm deleting the item?</h2>
                <div style={{ marginTop: "60px", marginLeft: "50%", display: "flex", gap: "30px", transform: "translate(-50%, -50%)" }}>
                    <Button variant="contained" color="error" sx={{ width: "130px"}} onClick={handleDelete}>Confirm</Button>
                    <Button variant="contained" color="secondary" onClick={onClose} sx={{ width: "130px" }}>
                        Cancel
                    </Button>
                </div>
                <Grid item xs={12}>
                    {showMessage ? (
                        <p style={{ color: "red" }}>* {errorMessage}</p>
                    ) : null}
                </Grid>
            </Box>
        </Modal>
    )
}

export default DeleteItemModal