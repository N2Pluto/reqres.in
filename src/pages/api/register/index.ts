import axios from 'axios';

export const register = async (email: string, password: string) => {
  if (!password) {
    return { error: "Missing password" };
  }

  try {
    const response = await axios.post('https://reqres.in/api/register', {
      email,
      password,
    });
    console.log('data',response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};