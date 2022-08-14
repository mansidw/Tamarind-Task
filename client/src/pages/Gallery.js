import React,{useEffect,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import axios from 'axios'
import "../assets/css/Gallery.css"
import Card from "../components/Card"
import Grid from '@mui/material/Grid';


const Gallery = () => {
    const navigate = useNavigate()
    const [img,setImg] = useState([])

    useEffect(()=>{
      setImg([])
      axios.get('http://localhost:8080/allimages')
      .then(response => {
        setImg(response.data["images"]["resources"])
      })
      .catch(err=>console.log(err))
    },[])

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
              <Toolbar>
              <Button variant='contained' style={{backgroundColor:'#002B5B',fontFamily:'Noto Sans JP'}} onClick={()=>navigate('/')}>Home</Button>
              </Toolbar>
          </AppBar>
          </Box>
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="xl">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                style={{fontFamily:'Noto Sans JP'}}
              >
                ALL IMAGES
              </Typography>

              <Grid container spacing={8}>
                {img?img.map((item,index)=>(
                  <>
                    <Grid item xl={4} xs={12} lg={2} sm={6} md={4} key={index}>
                    <Card
                      url={item.url}
                      name={item.asset_id} />
                    </Grid>
                  </>
                )):null}
                
              </Grid>

             
              
          </Container>
          </Box>
        </main>
        
        </>
    );
}

export default Gallery