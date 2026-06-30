CREATE TABLE IF NOT EXISTS donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    amount REAL NOT NULL,
    message TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);