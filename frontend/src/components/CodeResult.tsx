interface CodeResultProps {
    result: {
        output: string;
        error: string;
    };
}

const CodeResult = ({ result }: CodeResultProps) => {
    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">Output:</h2>
            <pre className="bg-gray-100 p-4 rounded">{result.output || 'No output'}</pre>
            <h2 className="text-xl font-bold">Error:</h2>
            <pre className="bg-red-100 p-4 rounded">{result.error || 'No error'}</pre>
        </div>
    );
};

export default CodeResult;
