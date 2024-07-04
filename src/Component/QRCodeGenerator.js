import React from "react";
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({url, consumerNumber }) => {
    console.log("url ->", url);
    console.log("name ->", consumerNumber);

    return (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <QRCode value={url} />
            <p style={{ marginTop: '1rem', fontSize: '1rem' }}>{consumerNumber}</p>
        </div>
    );
};

export default QRCodeGenerator;
