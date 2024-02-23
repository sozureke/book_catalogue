#### 1. Project Objective

The goal of this project is to develop a web application for a book catalog. The user of the web application (hereinafter referred to as the application) will be able to find the desired textual material (books, magazines, scientific articles, etc.) and save them as collections. Thus, the application serves as a kind of repository to which the user can refer when necessary.

#### 2. System Description

The application stores the following main functionalities:

- Registration, authorization (hereinafter Authentication);

- Search;
- Cataloging;
- Collecting;
- Newsletter

##### 2.1 User Types

The application will be able to accommodate two types of agents: **guest** and **user**.

- A guest is a person who has not passed the registration or authorization stage in the application. Their capabilities are limited compared to a user;
- A user is a person who has successfully passed the authorization or registration stage. They have full functionality of the application.

##### 2.2 Authentication

The application should contain a page with a form for authentication. The input fields will be as follows:

Registration:

1. First Name - required field;
2. Last Name - required field;
3. E-mail - required field;
4. Password - required field;

After registering a user, they are redirected to the main page of the application. At this time, the user should already be authorized (i.e., they should not have to go through the authorization stage).

Authorization:

1. E-mail - required field
2. Password - required field

After user authorization, they are redirected to the main page of the application.

##### 2.3 Search

The main function of the application is to search for textual content (hereinafter referred to as content) within the site. When a query is entered by the user, the search should display the necessary or similar content. At the moment, it is unknown how this will be implemented.

##### 2.4 Cataloging

This feature of the application allows users to find the content they need through categories. At the moment, the categories will be the genres of books, articles, etc.

##### 2.5 Collecting

A feature of the application - allowing the user to store materials in an organized manner. By structuring, it means the ability to store a certain number of books in separately created user collections. Thus, the user has the opportunity to conveniently store the content they need, without mixing it all together.

##### 2.6 Newsletter

The newsletter is an experimental feature, meaning it will not have much practical sense. It will be implemented for learning purposes. Subscription to the newsletter will be done using a form that includes the user's name and their email address on which they want to receive the news newsletter. What kind of newsletter will be implemented is unknown at this time.

#### 3. Technology Stack

Front-End:

- The application will be developed using the React library in the TypeScript programming language.

Back-End:

- Database - PostgreSQL, Prisma, Next, Argon

API:

- [Google Books](https://developers.google.com/books?hl=en)
- [Amazon Product Advertising](https://webservices.amazon.com/paapi5/documentation/search-items.html)

#### 4. Design

The design of the application should be calm, unobtrusive, and intuitively understandable for the user. The design should be created for 4 types of devices: computers, laptops, tablets, phones. The accent color should be blue.

Link to the design project - [here](https://www.figma.com/file/E1vP8hEmbBsyfY6kRHz4ej/book_catalogue_design?type=design&node-id=0%3A1&mode=design&t=wssePjjuoPnsE6Eo-1)
