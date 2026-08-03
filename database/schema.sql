CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id TEXT NOT NULL,
	order_id TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    amount REAL NOT NULL,
    message TEXT,
	is_anonymous INTEGER NOT NULL DEFAULT 0,
	status TEXT NOT NULL DEFAULT 'pending',
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);