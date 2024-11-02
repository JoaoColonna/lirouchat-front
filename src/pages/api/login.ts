import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Aqui você pode adicionar a lógica para verificar as credenciais do usuário
    // Por exemplo, você pode verificar as credenciais em um banco de dados

    if (username === 'admin' && password === 'admin') {
      // Sucesso no login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Falha no login
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    // Método não permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}