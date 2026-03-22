const fs = require('fs');
const path = 'c:\\Users\\locko\\OneDrive\\Desktop\\Wakil ai\\backend\\db.json';
const db = JSON.parse(fs.readFileSync(path, 'utf8'));

db.users.forEach(user => {
    if (user.history) {
        user.history = user.history.map(item => {
            if (item.result && item.result.includes('data:image')) {
                item.result = item.result.replace(/data:image\/[^;]+;base64,[^)]+/, 'IMAGE_DATA_REMOVED_FOR_PERFORMANCE');
            }
            return item;
        }).slice(0, 5); // Keep only last 5 items
    }
});

fs.writeFileSync(path, JSON.stringify(db, null, 2));
console.log('Database cleaned and shrunk.');
