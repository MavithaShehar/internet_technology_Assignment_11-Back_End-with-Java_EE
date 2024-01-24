# POS System API

## Project Description

The POS System API serves as the backend support for the Point of Sale system's frontend. Developed in Java EE, the API utilizes Servlet, JSON, and JNDI to seamlessly handle various functionalities.

## Included Features

- CRUD operations for managing products, orders, and customers.
- Efficient data access through storage.
- JSON format for data exchange.
- JNDI for resource lookup and connection pooling.

## Prerequisites

Before starting, ensure you have the following:

1. Java Development Kit (JDK) 11 or a later version.
2. Apache Tomcat version 10.0 servlet container.
3. Maven for building and managing dependencies.
4. Postman for data sharing and testing the POS backend.
5. MySQL database system.

## Execution

To use the POS System API, follow these steps:

1. Start your servlet container (ensure it uses port 8080).
2. Access the API using the base URL "http://localhost:8080/scope/".
3. Create a MySQL database named pos_system.
4. Apply the MySQL queries provided in the `querie_statement` file to set up the database.

## Postman Usage

### Customer

1. **POST - Save Customer**
    - Endpoint: `http://localhost:8080/scope/customer`
    - Body:
      ```json
      {
        "c_id": "C001",
        "c_name": "shehar",
        "c_address": "galle",
        "c_contact": "0778314711"
      }
      ```

2. **PUT - Update Customer**
    - Endpoint: `http://localhost:8080/scope/customer`
    - Body:
      ```json
      {
        "c_id": "C001",
        "c_name": "mavitha",
        "c_address": "panadura",
        "c_contact": "0778314711"
      }
      ```

3. **GET - Get Customer**
    - Endpoint: `http://localhost:8080/scope/customer?c_id=C001`

4. **DELETE - Delete Customer**
    - Endpoint: `http://localhost:8080/scope/customer?c_id=C001`

### Items

1. **POST - Save Item**
    - Endpoint: `http://localhost:8080/scope/item`
    - Body:
      ```json
      {
        "item_id": "I001",
        "item_name": "Laptop",
        "item_price": 1200.00,
        "item_quantity": 10
      }
      ```

2. **PUT - Update Item**
    - Endpoint: `http://localhost:8080/scope/item`
    - Body:
      ```json
      {
        "item_id": "I001",
        "item_name": "Desktop",
        "item_price": 1000.00,
        "item_quantity": 15
      }
      ```

3. **GET - Get Item**
    - Endpoint: `http://localhost:8080/scope/item?item_id=I001`

4. **DELETE - Delete Item**
    - Endpoint: `http://localhost:8080/scope/item?item_id=I001`

### order

1. **POST - Order and Order items**
    - Endpoint: `http://localhost:8080/scope/order`
    -    - Body:
      ```json 
      {
      "o_id": "O001",
      "o_date": "2024-01-22",
      "c_id": "C001",
      "discount": 5,
      "amount": 500,
      "itemsDTO": [
      {
      "i_id": "I001",
      "i_name": "Apple",
      "i_qty":1,
      "i_price":100

      },
      {
      "i_id": "I002",
      "i_name": "Banana",
      "i_qty":2,
      "i_price":200

      }
      ]
      }
      ```
2**GET - Get all orders to fill the table**
    - Endpoint: `http://localhost:8080/scope/order`
3. **GET - Get order**
    - Endpoint: `http://localhost:8080/scope/order?o_id=O001`
    

## Technologies Used

- TomcatEE version 10
- SQL Database with JNDI
- Simple Logging Facade for Java (SLF4J)

## License

This project is licensed under the MIT License.