DROP TABLE IF EXISTS documents;
CREATE TABLE documents (
    id ROWID,
    title TEXT,
    description TEXT,
    type TEXT,
    date TEXT,
    thumbnail TEXT,
    path TEXT
);

DROP TABLE IF EXISTS password;
CREATE TABLE password (
    id ROWID,
    login UNIQ,
    password TEXT
);
