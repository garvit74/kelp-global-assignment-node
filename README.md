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
    git clone https://github.com/garvit74/kelp-global-assignment-node.git
    cd kelp-global-assignment-node
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Environment**
   In the config file please update the variables for your local system.
    ```plaintext
    dbHost="localhost"
    dbUser="your_username"
    dbPassword="your_password"
    dbName="your_database"
    dbPost="5432"
    CSV_FILE_PATH="./path_to_your_csv_file.csv"
    ```

4. **Database Setup**
    Ensure your PostgreSQL database is set up and running. Create the necessary table(s) as per your application schema.

#### Usage

To run the application and upload data from your CSV file to the database:
```bash
node run dev
