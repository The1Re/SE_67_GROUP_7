import React from 'react';
import { Calendar, AlertTriangle, MapPin, CreditCard } from 'lucide-react';

export const CANCELLATION_REASONS = [
  {
    id: 'schedule',
    icon: <Calendar className="w-6 h-6 text-blue-500" />,
    title: 'เปลี่ยนแผนการเดินทาง',
    description: 'ตารางเวลาไม่เหมาะสม'
  },
  {
    id: 'emergency',
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    title: 'เหตุฉุกเฉิน',
    description: 'มีเหตุจำเป็นเร่งด่วน'
  },
  {
    id: 'location',
    icon: <MapPin className="w-6 h-6 text-green-500" />,
    title: 'เปลี่ยนจุดหมาย',
    description: 'ต้องการเปลี่ยนสถานที่'
  },
  {
    id: 'cost',
    icon: <CreditCard className="w-6 h-6 text-purple-500" />,
    title: 'ค่าใช้จ่ายสูง',
    description: 'ราคาเกินงบประมาณ'
  }
];