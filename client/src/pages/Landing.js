import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import "../assets/css/Landing.css"
import { Navigate } from "react-router-dom"
import ImageUploader from 'react-images-upload';
import axios from 'axios'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';


class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pictures: [],show:true,open:false };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
      this.setState({
          pictures: pictureFiles
      });
  }

  confirmUpload=()=>{
    let formData = new FormData()
    for(var i=0;i<this.state.pictures.length;i++){
      
      formData.append('file', this.state.pictures[i])
    }
    axios.post('http://localhost:8080/image',formData)
    .then(response => {
      this.setState({pictures:[],show:false})
      this.handleClick()
    })
    .catch(err=>console.log(err))
    
  }

  handleNav=(event)=>{
    event.preventDefault();
    this.setState({ user:'yes' });
  }

  handleClick = () => {
    this.setState({open:true})
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open:false})
  };

  render() {
  
  
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={this.handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    return (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant='contained' style={{backgroundColor:'#002B5B',fontFamily:'Noto Sans JP'}} onClick={(event) => this.handleNav(event)}>Gallery</Button>
                </Toolbar>
            </AppBar>
            </Box>
            {this.state.user && (
                <Navigate to="/gallery" replace={true} />
            )}
          <main>
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="lg">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  style={{fontFamily:'Noto Sans JP'}}
                >
                  UPLOAD PICTURE
                </Typography>
                
    
                <ImageUploader
                  withIcon={false}
                  withLabel={false}
                  withPreview={this.state.show}
                  buttonText='CHOOSE IMAGES'
                  buttonClassName='butt1'
                  labelClass={"lab1"}
                  labelStyles={{'font-family':'Noto Sans JP'}}
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
              />

              {this.state.pictures.length>0?
              <Button variant='contained' style={{backgroundColor:'#002B5B',fontFamily:'Noto Sans JP'}} onClick={this.confirmUpload}>Upload</Button>:null}
              <Snackbar
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message="Images added successfully !"
                action={action}
                sx={{fontFamily:'Noto Sans JP',backgroundColor:'#002B5B',color:'white'}}
              />

            </Container>
            </Box>
          </main>
          
          </>
      );
  }
}

export default Landing;

