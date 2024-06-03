import { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const CodeEditor = dynamic(() => import('../components/CodeEditor'), { ssr: false });
const CodeResult = dynamic(() => import('../components/CodeResult'), { ssr: false });

const Home = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState({ output: '', error: '' });

    const handleTestCode = async () => {
        try {
            const response = await axios.post('/api/test_code', { code });
            setResult(response.data);
        } catch (error) {
            if (error instanceof Error) {
                setResult({ output: '', error: error.message });
            } else {
                setResult({ output: '', error: 'An unknown error occurred' });
            }
        }
    };

    const handleSubmitCode = async () => {
        try {
            const response = await axios.post('/api/submit_code', { code });
            setResult({ output: response.data.output, error: '' });
        } catch (error) {
            if (error instanceof Error) {
                setResult({ output: '', error: error.message });
            } else {
                setResult({ output: '', error: 'An unknown error occurred' });
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Python Code Executor</h1>
            <CodeEditor code={code} setCode={setCode} />
            <div className="flex space-x-4 mt-4">
                <button onClick={handleTestCode} className="px-4 py-2 bg-blue-500 text-white rounded">Test Code</button>
                <button onClick={handleSubmitCode} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
            </div>
            <CodeResult result={result} />
        </div>
    );
};

export default Home;
