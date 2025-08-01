const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported here

let adminToken, userToken, userId;

beforeAll(async () => {
  // Assuming you have a function to create a test admin and a test user
  const adminRes = await request(app)
    .post('/register')
    .send({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'adminPass123',
      role: 'admin',
    });
  adminToken = adminRes.body.token;

  const userRes = await request(app)
    .post('/register')
    .send({
      name: 'Test User',
      email: 'user@example.com',
      password: 'userPass123',
      role: 'user',
    });
  userToken = userRes.body.token;
  userId = userRes.body._id;
});

// Test for unauthorized access
it('should return 401 for invalid JWT token', async () => {
  const res = await request(app)
    .get('/profile')
    .set('Authorization', 'Bearer invalidToken');
  expect(res.status).toBe(401);
  expect(res.body.message).toBe('Not authorized, token failed');
});

// Test for valid authentication
it('should return 200 for valid JWT token', async () => {
  const res = await request(app)
    .get('/profile')
    .set('Authorization', `Bearer ${userToken}`);
  expect(res.status).toBe(200);
  expect(res.body.email).toBe('user@example.com');
});

// Test role-based access control (RBAC)
it('should return 403 if user tries to access admin route', async () => {
  const res = await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${userToken}`);
  expect(res.status).toBe(403); // Regular user shouldn't have access
});

it('should return 200 if admin accesses admin route', async () => {
  const res = await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${adminToken}`);
  expect(res.status).toBe(200); // Admin can delete user
  expect(res.body.message).toBe('User removed');
});

// Test for invalid user input (SQL/NoSQL Injection)
it('should return 400 for invalid email input', async () => {
  const res = await request(app)
    .post('/register')
    .send({
      name: 'Malicious User',
      email: "' OR 1=1 --",
      password: 'password123',
      role: 'user',
    });
  expect(res.status).toBe(400);
  expect(res.body.message).toBe('Invalid user data');
});

// Test for password hashing
it('should hash password before storing', async () => {
  const res = await request(app)
    .post('/login')
    .send({
      email: 'user@example.com',
      password: 'userPass123',
    });
  const user = await User.findOne({ email: 'user@example.com' });
  expect(user.password).not.toBe('userPass123'); // Password should be hashed
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

// Test for email sending function (simulating unusual spending alert)
it('should send an email for unusual spending', async () => {
  const res = await request(app)
    .post('/notifyUnusualSpending')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      userId,
      message: 'Unusual spending detected in your account.',
    });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Notification sent successfully');
});

// Test for scheduling notifications
it('should schedule bill reminder', async () => {
  const cronTime = '0 9 * * *'; // Schedule for every day at 9 AM
  const res = await request(app)
    .post('/scheduleBillReminder')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      userId,
      cronTime,
      message: 'Your bill payment is due soon.',
    });
  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Reminder scheduled successfully');
});
