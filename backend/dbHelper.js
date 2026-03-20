const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'db.json');

const readDb = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading DB:', err);
        return { users: [] };
    }
}

const writeDb = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (err) {
        console.error('Error writing DB:', err);
        return false;
    }
}

module.exports = { readDb, writeDb };
