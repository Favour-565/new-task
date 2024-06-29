import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'users.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      const users = JSON.parse(fileContents);
      
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read users data.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
