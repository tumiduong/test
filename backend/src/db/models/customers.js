export const createCustomersTable = `
DROP TABLE IF EXISTS customers;
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY NOT NULL,
    file_key VARCHAR(255) NOT NULL,
    left_value VARCHAR(255) NOT NULL,
    right_value VARCHAR(255) NOT NULL,
    score NUMERIC NOT NULL,
    samples TEXT[],
    created_at TIMESTAMP DEFAULT Now()
);
`;