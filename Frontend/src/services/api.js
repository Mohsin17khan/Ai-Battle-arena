import axios from "axios";


export const fetchBattleResult = async (problem) => {
  try {
    const response = await axios.post('http://localhost:3000/invoke', {
      input: problem  
    }); 
    // Extract the actual result from the response wrapper
    console.log('API Full Response:', response.data);
    const result = response.data.result || response.data;
    console.log('API Extracted Result:', result);
    
    // Validate structure
    if (!result.problem || !result.solution_1 || !result.solution_2 || !result.judge) {
      console.warn('Incomplete battle result received:', result);
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching battle result:', error);
    throw error;
  }
};