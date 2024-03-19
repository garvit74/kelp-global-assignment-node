### Getting Started
This Node.js application efficiently parses large CSV files with complex, deeply nested properties and uploads the processed data into a PostgreSQL database. It utilizes streaming for parsing to handle large files and batch processing for efficient database insertion.

#### Features

1. **Streaming CSV Parsing:** Handles large CSV files without overwhelming memory resources.
2. **Nested Property Support:** Parses CSV columns with infinite depth nested properties (e.g., a.b.c...z).
3. **Efficient Database Upload:** Utilizes batch inserts for better performance with large datasets.
4. **Flexible Data Handling:** Supports a mix of flat and nested data, suitable for various CSV formats.

#### Prerequisites

- Node.js (Version 14 or later recommended)
- PostgreSQL (Version 10 or later recommended) 
- Accessible PostgreSQL database setup
- CSV files conforming to the application's expected format

#### Setup

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-repository/large-csv-parser.git
    cd large-csv-parser
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Environment**
    Create a `.env` file in the root of the project with the following content, adjusted to match your database configuration:
    ```plaintext
    DB_HOST=localhost
    DB_USER=your_username
    DB_PASS=your_password
    DB_NAME=your_database
    DB_PORT=5432
    CSV_FILE_PATH=./path_to_your_csv_file.csv
    ```

4. **Database Setup**
    Ensure your PostgreSQL database is set up and running. Create the necessary table(s) as per your application schema.

#### Usage

To run the application and upload data from your CSV file to the database:
```bash
node app.js
