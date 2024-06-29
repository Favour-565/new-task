
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'users.json');

interface User {
  email: string;
  password: string;
  fullName: string;
}
export async function POST(req: any, res: any) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const users: User[] = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // Here you might want to create a JWT or session
    res.status(200).json({ message: 'Login successful', user });
   return 
  }