

import axios, { isCancel, AxiosError } from "axios";

export class httpsService {
  

  getHeaders(session: any) {
    return {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    };
  }
  getHeaderss(session: any) {
    return {
      headers: {
        'Content-Type': 'application/json',
        // Add any session-related headers here if needed
      },
    };
  }

  getMultiHeaders(session: any) {
    return {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,

      },
    };
  }

  async post(payload: any, url: string, session: any) {
    console.log("post payload",payload);
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl)
    try {
      const response = await fetch(`${apiUrl}${url}`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any session-related headers here if needed
        },
        body: JSON.stringify(payload), 
      });
      
      console.log("the response",response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // Handle non-JSON responses
        console.error('Non-JSON response:', await response.text());
        return { error: 'Non-JSON response received' };
      }
    } catch (error) {
      console.error('Error:', error);
      return { error: 'An error occurred during the request' };
    }
  }

  

  async postCreateBot(payload: FormData, url: string, session: any) {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("the pi url",apiUrl);
    console.log("the payload entries",payload);
    try {
      const response = await fetch(`${apiUrl}${url}`, {
        method: 'POST',
        // Do not set Content-Type manually for FormData
        headers: {
          // Add any session-related headers here if needed
        },
        body: payload,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Get server error message
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // Handle non-JSON responses
        console.error('Non-JSON response:', await response.text());
        return { error: 'Non-JSON response received' };
      }
    } catch (error) {
      console.error('Error:', error);
      return { error: 'An error occurred during the request' };
    }
  }
  


  async postPayment(payload: any, url: string, session: any) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { data } = await axios.get("/api/auth/tok");
    const accessToken = data.user;
    console.log("+++++++=the access token",accessToken);
    console.log(apiUrl)
    try {
      const response = await fetch(`${apiUrl}${url}`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          // Add any session-related headers here if needed
        },
        body: JSON.stringify(payload), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // Handle non-JSON responses
        console.error('Non-JSON response:', await response.text());
        return { error: 'Non-JSON response received' };
      }
    } catch (error) {
      console.error('Error:', error);
      return { error: 'An error occurred during the request' };
    }
  }
 
  
  
 


  

  
  
  async postImage(payload: any, url: string, session: any) {
    try {
      const response = await axios.post(`${import.meta.env.API_URL}${url}`, payload, this.getHeaders(session));
      if (response.status >= 200 && response.status < 300) {
        // Successful response
        return response.data;
      } else {
        // Handle other status codes
        console.error(`Unexpected response status: ${response.status}`);
        return null; // Or handle it as needed
      }
    } catch (error) {
      console.error("Error:", error);
      return null; // Or handle it as needed
    }
  }
  
  /*  async post(payload: any, url: string, session: any) {
     try {
       const response = await axios.post(`${import.meta.env.API_URL}${url}`, payload, );
       console.log('API Response:', response);
       return response.data;
     } catch (error: any) {
       console.error('API Error:', error);
   
       if (error.response) {
         // If there is a response property, log its data
         console.error('Response Data:', error.response.data);
         return error.response.data;
       }
   
       // If no response property, return a generic error message or handle it as needed
       return { error: 'An unexpected error occurred. now' };
     } finally {
       console.log('API Request Completed');
     }
   }
    */

  async create(payload: any, session: any) {
    try {
      const response = await axios.post(`${import.meta.env.API_URL}call-list/add`, payload, this.getHeaders(session));
      return response.data;
    } catch (error: any) {
      console.error(error?.response?.data);
      return error?.response?.data;
    }
  }


  async get(url: string, ) {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl)
    try {
      const response = await axios.get(`${apiUrl}${url}`);
      return response.data;
    } catch (error: any) {
      console.error(error?.response?.data);
      return error?.response?.data;
    }
  }



}
