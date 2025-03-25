import React, { useState } from 'react';
import Table from '@/components/tableguide/Table';
import TableHeader from '@/components/tableguide/TableHeader';
import TableRow from '@/components/tableguide/TableRow';
import TableCell from '@/components/tableguide/TableCell';
import Button from '@/components/tableguide/Button';
import Header from '@/components/tableguide/Header';
import SubmitPopup from "./SubmitPopup";

// Define button type to enforce type safety
type ButtonType = 'refresh' | 'form-code';

const DocumentPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  // Sample data for the table
  const documents: { id: number; name: string; date: string; buttonType: ButtonType }[] = [
    { id: 1, name: 'นางสาว XXXXX YYYYYYYY', date: '32/13/9999', buttonType: 'refresh' },
    { id: 2, name: 'นางสาว XXXXX YYYYYYYY', date: '32/13/9999', buttonType: 'form-code' },
    { id: 3, name: 'นางสาว XXXXX YYYYYYYY', date: '30/02/9999', buttonType: 'form-code' },
    { id: 4, name: 'นางสาว XXXXX YYYYYYYY', date: '30/02/9999', buttonType: 'form-code' },
    { id: 5, name: 'นางสาว XXXXX YYYYYYYY', date: '30/02/9999', buttonType: 'form-code' }
  ];

  const columns = [
    { title: 'ชื่อ-นามสกุล', align: 'left' },
    { title: 'วันที่', align: 'left' },
    { title: 'เช็คชื่อ', align: 'center' }
  ];

  const handleFormCodeClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupSubmit = () => {
    if (inputCode.trim() === '') {
      setError('กรุณากรอกโค้ดก่อน');
      return;
    }
    console.log('Submitted code:', inputCode);
    setIsPopupOpen(false);
    setIsConfirmationOpen(true); // Show confirmation popup
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setInputCode('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setInputCode(value);
      if (value.trim() !== '') setError('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <Header title="ลูกทริป - ทริป XXXXX" />

      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.date}</TableCell>
              <TableCell align="center">
                <Button
                  type={doc.buttonType}
                  onClick={doc.buttonType === 'form-code' ? handleFormCodeClick : undefined}
                >
                  {doc.buttonType === 'refresh' ? 'เช็คชื่อแล้ว' : 'กรอก Code'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">กรอกโค้ด</h2>
            <input
              type="text"
              value={inputCode}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="กรุณากรอกโค้ด"
              maxLength={4}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => { setIsPopupOpen(false); setError(''); }}
              >
                ยกเลิก
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePopupSubmit}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Confirmation Popup */}
      <SubmitPopup 
        isOpen={isConfirmationOpen}
        onClose={handleConfirmationClose}
      />
    </div>
  );
};

export default DocumentPage;