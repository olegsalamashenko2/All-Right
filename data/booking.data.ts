import { AuthDto, CreateBookingDto } from '../dto/booking.dto';

export const authData: AuthDto = {
  username: 'admin',
  password: 'password123'
};

export const invalidAuthData: AuthDto = {
  username: 'wrong',
  password: 'wrong'
};

export const bookingData: CreateBookingDto = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-12-01',
    checkout: '2026-12-05'
  },
  additionalneeds: 'Breakfast'
};

export const updatedBookingData: CreateBookingDto = {
  firstname: 'Michael',
  lastname: 'Smith',
  totalprice: 250,
  depositpaid: false,
  bookingdates: {
    checkin: '2026-12-10',
    checkout: '2026-12-15'
  },
  additionalneeds: 'Lunch'
};