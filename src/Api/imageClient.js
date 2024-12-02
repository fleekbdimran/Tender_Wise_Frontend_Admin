import axios from 'axios';
const ImageClient = axios.create({
 
   PHOTO_BASE_URL_Admin : "http://192.168.0.230:9009",

});

export default ImageClient;