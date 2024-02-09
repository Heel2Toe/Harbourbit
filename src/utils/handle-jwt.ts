import axios from "axios";
import toast from "react-hot-toast";


export const handleJwt= async (refreshToken: any) => {
   try {
    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/refresh`,{headers :{
    'x-refresh-token' : refreshToken }});
    return result.data.accessToken;
}
 catch(error : any) {

    if(error.response.data == 'Invalid token' || error.response.data == 'Token does not exist'){
      toast.error('Unauthorized');
    }
    else{
        console.log('Error at handleJwt : \n', error);
        toast.error('Internal server error');
    }
    return false;
   }

}
