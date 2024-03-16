import React from 'react'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from "react-router-dom";

interface ItemProps {
    singleItem: any
}

const ItemCard: React.FC<ItemProps> = ({ singleItem }) => {
    //console.log(singleItem)
    const name = singleItem.name as string
    return (
        <Card sx={{
            height: "300px",


        }}>
            <CardMedia
                component="img"
                alt={name}
                height="150"
                image={singleItem?.image[0]}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: €{singleItem?.price}
                </Typography>
                <Link to={`itemInfo/${singleItem?._id}`}><Button variant='contained' >Manage</Button>
                </Link>
                {/* <Button variant='contained' >Manage</Button> */}
            </CardContent>
        </Card>
    )
}

export default ItemCard