import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

import "./index.css"

const OutlinedCard = ({post, theme}) => {

    const navigate = useNavigate()

    const viewBlogHandler = () => {
        navigate(`/post/${post.id}`)
    }

    const truncateTextByCharacters = (text) => {
        if (text.length > 40) {
          return text.substring(0, 40) + '...';
        }
        return text;
      }

      const truncateContentByCharacters = (text) => {
        if (text.length > 60) {
          return text.substring(0, 150) + '...';
        }
        return text;
      }

    const truncatedText = truncateContentByCharacters(post.content);

    const card = (
    <React.Fragment>
        <CardContent sx={{paddingTop: '20px'}}>
        <Typography sx={{ fontSize: 14, color: "#9e15b6" }} color="text.secondary" gutterBottom>
            {post.user_name}
        </Typography>
        <Typography variant="h5" component="div" sx={{color: "#480052"}}>
            {truncateTextByCharacters(post.title)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"  style={{color: "#d33ef7"}}>
            {post.created_at}
        </Typography>
        <Typography variant="body2" style={{color: "#831395"}}>
            {truncatedText}
        </Typography>
        </CardContent>
        <CardActions sx={{paddingBottom: '20px'}}>
        <Button size="small" onClick={viewBlogHandler} style={{color: "#480052", fontWeight: 600}} endIcon={<ArrowForwardIosIcon />}>Learn more</Button>
        </CardActions>
    </React.Fragment>
    );
    return (
        <Box sx={{ minWidth: 355, maxWidth: 500}}>
        <Card variant="outlined" sx={{borderRadius: '12px'}} className='card'>{card}</Card>
        </Box>
    );
}

export default OutlinedCard