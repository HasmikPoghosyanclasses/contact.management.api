const http = require('http');

const API_BASE = 'http://localhost:3000';

// Test 1: Health Check
function testHealthCheck() {
  return new Promise((resolve, reject) => {
    const req = http.get(`${API_BASE}/`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('✓ Health Check:', res.statusCode === 200 ? 'PASS' : 'FAIL');
        if (res.statusCode === 200) {
          console.log('  Response:', data);
        }
        resolve(res.statusCode === 200);
      });
    });
    req.on('error', (err) => {
      console.log('✗ Health Check: FAIL - Server not running');
      reject(err);
    });
    req.setTimeout(2000, () => {
      req.destroy();
      console.log('✗ Health Check: FAIL - Timeout');
      reject(new Error('Timeout'));
    });
  });
}

// Test 2: Register User
function testRegister() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: 'Test User',
      email: `test${Date.now()}@test.com`,
      password: '123456'
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    const req = http.request(`${API_BASE}/api/auth/register`, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        console.log('✓ Register:', res.statusCode === 201 ? 'PASS' : 'FAIL');
        if (res.statusCode === 201) {
          console.log('  User ID:', parsed._id);
          console.log('  Token received:', !!parsed.token);
          resolve(parsed.token);
        } else {
          console.log('  Error:', parsed.message);
          reject(new Error(parsed.message));
        }
      });
    });

    req.on('error', (err) => {
      console.log('✗ Register: FAIL -', err.message);
      reject(err);
    });

    req.setTimeout(2000, () => {
      req.destroy();
      console.log('✗ Register: FAIL - Timeout');
      reject(new Error('Timeout'));
    });

    req.write(postData);
    req.end();
  });
}

// Test 3: Get Contacts (requires auth)
function testGetContacts(token) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const req = http.get(`${API_BASE}/api/contacts`, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        console.log('✓ Get Contacts:', res.statusCode === 200 ? 'PASS' : 'FAIL');
        if (res.statusCode === 200) {
          console.log('  Contacts count:', Array.isArray(parsed) ? parsed.length : 'N/A');
          resolve(true);
        } else {
          console.log('  Error:', parsed.message);
          reject(new Error(parsed.message));
        }
      });
    });

    req.on('error', (err) => {
      console.log('✗ Get Contacts: FAIL -', err.message);
      reject(err);
    });

    req.setTimeout(2000, () => {
      req.destroy();
      console.log('✗ Get Contacts: FAIL - Timeout');
      reject(new Error('Timeout'));
    });
  });
}

// Run all tests
async function runTests() {
  console.log('\n🧪 Testing API Endpoints...\n');
  
  try {
    await testHealthCheck();
    const token = await testRegister();
    await testGetContacts(token);
    console.log('\n✅ All tests passed!\n');
    process.exit(0);
  } catch (error) {
    console.log('\n❌ Tests failed. Make sure the server is running.\n');
    console.log('Start the server with: npx nodemon server.js\n');
    process.exit(1);
  }
}

runTests();
