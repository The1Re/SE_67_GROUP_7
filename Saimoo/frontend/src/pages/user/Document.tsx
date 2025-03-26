import React, { useEffect, useState } from 'react';
import api from '@/api';
import Table from '@/components/tableguide/Table';
import TableHeader from '@/components/tableguide/TableHeader';
import TableRow from '@/components/tableguide/TableRow';
import TableCell from '@/components/tableguide/TableCell';
import Header from '@/components/tableguide/Header';

const DocumentPage = () => {
  const [documents, setDocuments] = useState<{ id: number; name: string; date: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('orders/trips/1', { headers: { Authorization: 'Bearer '}}); // ✅ เปลี่ยน tripId ได้ตามต้องการ
        const data = res.data;

        const mapped = data.flatMap((order: any) =>
          order.TripOrderDetail.map((detail: any) => ({
            id: detail.id,
            name: detail.fullName,
            date: new Date(order.createdAt).toLocaleDateString('th-TH'),
          }))
        );

        setDocuments(mapped);
      } catch (err) {
        console.error('❌ โหลดข้อมูลล้มเหลว:', err);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: 'ชื่อ-นามสกุล', align: 'left' },
    { title: 'วันที่จอง', align: 'left' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <Header title="ทริป สังขระบุรี" /> 

      <Table>
        <TableHeader columns={columns} />
        <tbody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DocumentPage;
