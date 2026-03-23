
const axios = require('axios');

async function testBackend() {
    try {
        console.log('Sending request to backend...');
        const res = await axios.post('http://localhost:5001/api/ai/generate', {
            prompt: 'Test message',
            tool: 'brand'
        });
        console.log('Backend response status:', res.status);
        console.log('Backend response data:', JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.info('Backend call failed:');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.error('Message:', err.message);
        }
    }
}

testBackend();
