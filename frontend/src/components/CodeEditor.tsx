import { useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
}

const CodeEditor = ({ code, setCode }: CodeEditorProps) => {
    const handleEditorMount: OnMount = (editor) => {
        editor.setValue(code);
    };

    useEffect(() => {
        // Any additional side effects can be handled here
    }, [code]);

    return (
        <Editor
            height="60vh"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            onMount={handleEditorMount}
        />
    );
};

export default CodeEditor;
