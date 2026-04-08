import { db } from "./wakil-ai/frontend/src/lib/backbone";

async function setup() {
  console.log("Setting up Admin User...");
  try {
    // Check if admin exists
    const res = await db.execute({
        sql: "SELECT * FROM users WHERE email = 'admin@wakil-ai.com'",
        args: []
    });

    if (res.rows.length === 0) {
        console.log("Admin not found. Creating...");
        await db.execute({
            sql: "INSERT INTO users (id, name, email, password, role, is_verified, created_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
            args: [
                'wakil_admin_root',
                'Wakil Admin',
                'admin@wakil-ai.com',
                '$2b$12$cgFjRDsseWNlZy3M0RRX4u8tv0L/nKUiqh2GmdXPgRzC5e2qh7fLG', // wakil-admin-2026
                'admin',
                1
            ]
        });
        console.log("Admin created successfully.");
    } else {
        console.log("Admin already exists. Ensuring role is 'admin'...");
        await db.execute({
            sql: "UPDATE users SET role = 'admin', is_verified = 1 WHERE email = 'admin@wakil-ai.com'",
            args: []
        });
        console.log("Admin role verified.");
    }
  } catch (e) {
    console.error("Setup failed:", e);
  }
}

setup();
