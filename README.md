### Your project idea

> I am proposing a social media community app that creates a space for travel enthusiasts to post pictures of travel adventures. This will be a full CRUD application.

![traveLR Home Route](https://user-images.githubusercontent.com/90514977/147183253-fe52c1b0-5191-4377-b492-366688f9059f.png)

### MVP

As a user, I would like the functionality of the app to be intuitive.
As a user, I would like to be able to create an account.
As a user, I would like to be able to log in and out of the application.
As a user, I would like to be able to post pictures.
As a user, I would like to be able to add captions to my pictures before posting.
As a user, I would like to be able to edit a picture posted.
As a user, I would like to be able to delete a picture posted.

### Stretch Goals

As a user, I would like the app to be aesthetically pleasing.
As a user, I would like the app to have flashy features and cool responsive elements.
As a user, I would like to see the date a picture was posted.
As a user, I would like to be able to comment under other pictures.
As a user, I would like the ability to interact with a posted picture (i.e like, love, etc.).
As a user, I would like to invite friends to the application so we can enjoy the service together.  
As a user, I would like the upload of my travel image to be simple. (Note: I will attempt this using the NPM Package called Multer)

### Front-end

> I plan on using EJS for my HTML rendering.

### List of Mongoose models and their properties

**User Model**

Name: {type: String, required: true},
Email: {type: String, required: true}

**Post Model**

Title: {type: String},
Img: {type: String, required: true},
Description: {type: String},
createdAT: {type: Date, default: Date.now}

### List of Routes

**Route:** / **Method:** GET **Descripion:** Application home page that shows user login form
**Route:** /login **Method:** GET/POST **Description:** for user login
**Route:** /logout **Method:** GET **Description:** for user logout (using destroy method on route)
**Route:** /show/:id **Method:** GET **Description:** show page once user is logged in.
**Route:** /register **Method:** GET/POST **Description:** for creating an account
**Route:** /traverlr/new **Method:** GET/POST **Description:** request for creating a picture post
**Route:** /traverlr/:id **Method:** Delete **Description:** request for deleting a picture post
**Route:** /traverlr/:id/edit **Method:** GET **Description:** request for updating a picture/post
**Route:** /:id **Method:** PUT **Description:** request for posting the edit to the picture/post

### Wireframes

![Initial_Landing_Display](https://media.git.generalassemb.ly/user/38698/files/962f7680-634c-11ec-93c5-d329707aba3d)

![Home_Page_Afte_r_Log_In](https://media.git.generalassemb.ly/user/38698/files/8dd73b80-634c-11ec-9763-0e83dc3d5560)

![Image_Upload_Page](https://media.git.generalassemb.ly/user/38698/files/929bef80-634c-11ec-8ac4-6c005f2d235e)
