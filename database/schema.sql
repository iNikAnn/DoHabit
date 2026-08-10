CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id TEXT NOT NULL,
	order_id TEXT NOT NULL UNIQUE,
	payment_id TEXT NOT NULL UNIQUE, -- External payment gateway transaction ID
    username TEXT NOT NULL,
    amount REAL NOT NULL,
    message TEXT,
	status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL DEFAULT (unixepoch()) -- Unix timestamp in seconds
);