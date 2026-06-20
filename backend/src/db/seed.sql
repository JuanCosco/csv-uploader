INSERT INTO users (name, email, age, role)
VALUES ('Admin', 'admin@admin.com', 30, 'admin')
ON CONFLICT (email) DO NOTHING;