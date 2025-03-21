// src/interfaces/Reservations.ts
export interface Reservation {
  reservation_id: number;
  student_id: string;
  seat_id: number;
  timeslot_id: number;
  reservation_date: string; // 預約日期
  create_time: string;
}

