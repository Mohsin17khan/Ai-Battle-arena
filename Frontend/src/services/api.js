import axios from "axios";


export const fetchBattleResult = async (problem) => {
  try {
    const response = await axios.post('http://localhost:3000/invoke', {
      input: problem  
    }); 
    return response.data;
  } catch (error) {
    console.error('Error fetching battle result:', error);
    throw error;
  }
};