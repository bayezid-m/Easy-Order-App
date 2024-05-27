import React from 'react'
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
    Button,
    Modal,
    Typography,
    Box,
    TextField,
    Container,
    Paper,
    Input,
    Grid,
} from '@mui/material';

interface ModalContentProps {
    qrOpen: boolean;
    onQrClose: () => void;
    code: string
}

const QrModal: React.FC<ModalContentProps> = ({ qrOpen, onQrClose, code }) => {
    const downloadPDF = () => {
        const qrContainer = document.getElementById('qr-container');

        if (!qrContainer) {
            console.error("QR container not found.");
            return;
        }

        html2canvas(qrContainer).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgHeight = canvas.height * 208 / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
            pdf.save("qr_code.pdf");
        });
    };
    
    return (
        <Modal
            open={qrOpen}
            onClose={onQrClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "40%", height: 200, bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: "center" }}>
                <div id="qr-container">
                    <QRCode value={code} />
                </div>
                <Button onClick={downloadPDF}>Download as PDF</Button>
                <Button color="primary" onClick={onQrClose} sx={{ width: "130px" }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    )
}

export default QrModal