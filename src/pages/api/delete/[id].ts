import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      res.status(204).json(response.data);
     
      return 'deleted'
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    // res.status(405).json({ error: 'Method not allowed' });
  }
}