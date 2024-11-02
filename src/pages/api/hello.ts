// Exemplo de uma rota de API
import { NextApiRequest, NextApiResponse } from 'next';

// Exemplo de uma rota de API
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ message: 'Hello, world!' });
  }