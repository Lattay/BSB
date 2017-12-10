DROP TABLE IF EXISTS documents;
CREATE TABLE documents (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    type TEXT,
    date TEXT,
    thumbnail TEXT,
    path TEXT
);

DROP TABLE IF EXISTS password;
CREATE TABLE password (
    id INTEGER PRIMARY KEY,
    login UNIQ,
    hash TEXT
);
