import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Viewer } from '@react-pdf-viewer/core';

import '@react-pdf-viewer/core/lib/styles/index.css';

interface ModalExampleProps {
    fileUrl: string;
    fileName: string;
    buttonText?: string;
}

const ModalExample: React.FC<ModalExampleProps> = ({ fileUrl, fileName, buttonText = "Открыть PDF" }) => {
    const [shown, setShown] = useState(false);

    const modalBody = () => (
        <div
            style={{
                backgroundColor: '#fff',
                flexDirection: 'column',
                overflow: 'hidden',
                left: 0,
                position: 'fixed',
                top: 0,
                height: '100%',
                width: '100%',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#000',
                    color: '#fff',
                    display: 'flex',
                    padding: '.5rem',
                }}
            >
                <div style={{ marginRight: 'auto' }}>{fileName}</div>
                <button
                    style={{
                        backgroundColor: '#357edd',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#ffffff',
                        cursor: 'pointer',
                        padding: '8px',
                    }}
                    onClick={() => setShown(false)}
                >
                    Close
                </button>
            </div>
            <div
                style={{
                    flexGrow: 1,
                    overflow: 'auto',
                }}
            >
                <Viewer fileUrl={new URL(fileUrl).href} />
            </div>
        </div>
    );

    return (
        <>
            <button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                onClick={() => setShown(true)}
            >
                {buttonText}
            </button>
            {shown && ReactDOM.createPortal(modalBody(), document.body)}
        </>
    );
};

export default ModalExample;

