INSERT INTO users (name, email, age, role, password)
VALUES (
  'Admin',
  'admin@admin.com',
  30,
  'admin',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
)
ON CONFLICT (email) DO NOTHING;