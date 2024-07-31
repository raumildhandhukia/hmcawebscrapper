# H&M Scraper

The objective of this project is to develop a web scraper to extract data from H&M Canada's website. The scraper focuses on **sale items** and **new drops**. The extracted data is stored in a database for easy access and analysis, with the scraper set up to run automatically on a weekly schedule.

## Data Points To Extract:
1) Product Name
2) Product Category
3) Product Price (Discounted price for sale items)
4) Product Colors 
5) Stock Availibility 
6) Product Is Coming Soon
7) Product URL

## Setup 
1) Using terminal, navigate to project's root directory and install packages.
    ```
    npm install
    ```
3) Initiate Prisma and sync with server.
    ```
    npx prisma init
    npx prisma generate
    npx prisma db push
    ```
4) Create a database on MySQL server and store the Database URL in **.env file** in this format.
`DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DB_NAME`

5) For email notification, get your Gmail App Password. [Click on this link to get instructions on how to create Gmail App Password](https://knowledge.workspace.google.com/kb/how-to-create-app-passwords-000009237). Store sender credentials and reviever email in **.env file**.
`SENDER_GMAIL=example@gmail.com`
`SENDER_GMAIL_APP_PASSWORD=jlkjglhjksdfghas`
`RECEIVER_GMAIL=example2@gmail.com`



6) Scraper is scheduled to run on every Monday 3:00 AM. Run the program to start the cron.
    ```
    node index
    ```

## Technologies Used
Scraper script is developed using **Node.js** and scraped data is being stored on **MySQL** databse using **Prisma ORM**. Data is fetched using H&M's hidden API. Email notifications are supported through **Nodemailer** & **Gmail**. Cron Job is supported by **node-cron**.

## Overview Of Code

1) index.js
Root file of the project to start the scraping cron job. 
    ```
    // From node-cron documentation. In our case we will not use seconds.
    //  ┌────────────── second (optional)
    //  │ ┌──────────── minute
    //  │ │ ┌────────── hour
    //  │ │ │ ┌──────── day of month
    //  │ │ │ │ ┌────── month
    //  │ │ │ │ │ ┌──── day of week
    //  │ │ │ │ │ │
    //  │ │ │ │ │ │
    //  * * * * * *
    
    //  Schedule the task to run every week at 3:00 AM on Sunday (WEEKLY)
    cron.schedule("0 3 * * 1", async () => {
      await main();
    });
    ```
    
2) scraper.js
Handling data scraping, pushing to DB and sending email notifications.

3) product.js
Handling fetching products from H&M website using predefined data endpoints.

4) mail.js
Handling the email notification function.

5) data.js
Predefined endpoints which are subset of **New Drop Items** and **Sale Items**

## Database Dump:

`/hmcawebscrapper/DB_DUMP/HMProducts.sql` file contains some products scraped from H&M. 

