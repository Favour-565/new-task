import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'users.json');

interface User {
  email: string;
  password: string;
  fullName: string;
}

export async function POST(req: any, res: any) {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk: any) => {
      body += chunk.toString(); // Accumulate request body data
    });

    req.on('end', async () => {
      const { email, password, fullName } = JSON.parse(body);

      if (!email || !password || !fullName) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'All fields are required.' }));
        return;
      }

      try {
        let users: User[] = [];

        if (fs.existsSync(dataFilePath)) {
          const data = fs.readFileSync(dataFilePath, 'utf-8');
          users = JSON.parse(data);
        }

        if (users.find((user) => user.email === email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email already exists.' }));
          return;
        }

        users.push({ email, password, fullName });
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User registered successfully.' }));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  } else {
    res.writeHead(405, { 'Allow': 'POST' });
    res.end(`Method ${req.method} Not Allowed`);
  }
}
