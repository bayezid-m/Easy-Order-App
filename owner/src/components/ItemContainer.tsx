import React from 'react'
import { Container, Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';


import { Item } from '../types/Item'
import ItemCard from './ItemCard';

interface ItemProps {
    itemInfo: Item,
}
const ItemContainer: React.FC<ItemProps> = ({ itemInfo }) => {
    console.log(itemInfo?.items)
    const filteredItem = itemInfo?.items;
    return (
        <Container>
            <Grid maxWidth="lg"
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    border: "1px",
                    padding: "10px 30px",
                    borderRadius: "10px",
                    bottom: 0,
                    width: "100%",
                    height: "60%",
                    backgroundColor: "lightBlue",
                    zIndex: "999"
                     /* Change the color as needed */
            
                }}>

            <Grid container spacing={1.5}>
                {filteredItem?.map((items) => (
                    <Grid item xs={12} md={3} sm={6} lg={3} >
                        <ItemCard singleItem={items} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
        </Container >
    )

}
export default ItemContainer