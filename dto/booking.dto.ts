export type AuthDto = {
  username: string;
  password: string;
};

export type BookingDatesDto = {
  checkin: string;
  checkout: string;
};

export type CreateBookingDto = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDatesDto;
  additionalneeds: string;
};