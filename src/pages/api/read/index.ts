export default async function handler(req : any, res : any) {
  if (req.method === 'GET') {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const data = await response.json();
      res.status(200).json(data.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}