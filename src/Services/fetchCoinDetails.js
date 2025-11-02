import axiosInstance from '../helpers/axiosInstance';


  async function fetchCoinData(id) {
  
   try {
    const response = await axiosInstance.get(`/coins/${id}`);
    console.log(response);
    return response.data;

   } catch(error) {
    console.error(error);
    return null;

   }
} 
export default fetchCoinData;