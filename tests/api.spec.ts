import { test, expect } from '@playwright/test';
import { authData, invalidAuthData, bookingData, updatedBookingData } from '../data/booking.data';

const baseUrl = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker API Tests', () => {
  test('should authorize successfully', async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth`, {
      data: authData
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('token');
  });

  test('should create a booking successfully', async ({ request }) => {
    const response = await request.post(`${baseUrl}/booking`, {
      data: bookingData
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.booking.firstname).toBe(bookingData.firstname);
    expect(responseBody.booking.lastname).toBe(bookingData.lastname);
  });

  test('should update and delete a booking successfully', async ({ request }) => {
    const authResponse = await request.post(`${baseUrl}/auth`, {
      data: authData
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody.token;

    const createResponse = await request.post(`${baseUrl}/booking`, {
      data: bookingData
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;

    const updateResponse = await request.put(`${baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: updatedBookingData
    });

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody.firstname).toBe(updatedBookingData.firstname);
    expect(updateBody.lastname).toBe(updatedBookingData.lastname);
    expect(updateBody.totalprice).toBe(updatedBookingData.totalprice);
    expect(updateBody.depositpaid).toBe(updatedBookingData.depositpaid);

    const deleteResponse = await request.delete(`${baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(deleteResponse.status()).toBe(201);

    const getResponse = await request.get(`${baseUrl}/booking/${bookingId}`);

    expect(getResponse.status()).toBe(404);
  });

  test('should reject invalid credentials', async ({ request }) => {
    const response = await request.post(`${baseUrl}/auth`, {
      data: invalidAuthData
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.reason).toBe('Bad credentials');
  });

  test('should reject booking update without authorization', async ({ request }) => {
    const response = await request.put(`${baseUrl}/booking/1`, {
      data: bookingData
    });

    expect(response.status()).toBe(403);
  });
});