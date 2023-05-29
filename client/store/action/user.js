import axios from "axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/register");
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    throw error;
  }
};

//post
export const createUsers = async (data) => {
  try {
    const response = await axios
      .post(`http://localhost:5000/register`, { data })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json",
    //     Accept:"application/json",
    //     "Access-Control-Allow-Origin":"*"
    //   },
  } catch (error) {
    throw error;
  }
};
