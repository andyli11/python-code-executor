import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { code } = req.body;

        try {
            const result = await runCode(code);
            res.status(200).json({ output: result });
        } catch (error) {
            res.status(500).json({ error: 'Code execution failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function runCode(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`python3 -c "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr || 'Execution failed');
            } else {
                resolve(stdout || 'No output');
            }
        });
    });
}
