# 1. Quick Start

1. Launch frontend:  open file 'Project/rat-web' and run 'npm start'

2. Launch backend: open file 'Project/backend/rat_rs' and run 'python manage.py runserver'

3. Launch MySQL and connect it with backend in Django setting file by editing database information in the following codes

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'your database name',
           'HOST': 'your databse host address',
           'PORT': 3306, # your database port
           'USER': 'your database username',
           'PASSWORD': 'your database password'
       }
   }
   ```

4. Create an admin user for your Django and database by running the following commands in your terminal

   ```python
   python manage.py createsuperuser
   ```

5. After doing all above actions, you are way to go

# 2. Directory Tree

## 2.1 Frontend Directory Tree

```json
── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.css
│   └── index.html
└── src
    ├── App.css
    ├── App.jsx          // Main/Entry component
    ├── components       // web component
    │   ├── InfoForm
    │   ├── ProfileCard
    │   ├── Question
    │   ├── Questionnaire
    │   └── TopBar
    ├── font
    │   ├── Anton-Regular.ttf
    │   ├── Praise-Regular.ttf
    │   └── Rubik-Light.ttf
    ├── img
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   ├── 3.jpg
    │   ├── 4.jpg
    │   ├── file-check.svg
    │   ├── prof.jpeg
    │   ├── rat.jpg
    │   └── writer.png
    ├── index.jsx
    ├── pages               // all the web pages
    │   ├── Home
    │   ├── Login
    │   └── SignUp
    ├── redux								// State management
    │   ├── actions
    │   ├── constant.js
    │   ├── reducers
    │   └── store.js
    └── setupProxy.js
```

## 2.2 Backend Directory Tree

```json
.
├── db.sqlite3
├── manage.py
├── rat
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   ├── 0001_initial.py
│   │   ├── 0002_remove_question_question_type.py
│   │   ├── 0003_stock.py
│   │   ├── 0004_alter_question_answer.py
│   │   └── __init__.py
│   ├── models.py								// database entity model
│   ├── permission.py						// customized permission
│   ├── scripts
│   │   ├── __init__.py
│   │   ├── insert_data.py
│   │   └── jasss_paper_v1.csv
│   ├── serializers.py						// serilize model 
│   ├── tests.py
│   ├── utils
│   │   └── PaperRec.py
│   └── views.py							// define backend response logic
└── rat_rs
    ├── __init__.py
    ├── asgi.py
    ├── settings.py								// Django configuration
    ├── urls.py										// set request url
    └── wsgi.py
```

# 3. Backend API Guide

## 2.1 Request API

| Method           | API                      | Name                | Intro                                                        |
| ---------------- | ------------------------ | ------------------- | ------------------------------------------------------------ |
| POST             | /users                   | USer Register       | Create a new account                                         |
| GET/PATCH        | /users/user_id           | User Info Edit      | Get/Update existing account info                             |
| POST             | /login                   | User login          | Authorize user and give user permission to access internal content |
| GET              | /models                  | View Models         | Get all the models                                           |
| GET/POST         | /models/user_id          | View Owner's Models | Get all allowed models from the user & Create a new Model of the current user |
| GET/PATCH/DELETE | /models/user_id/model_id | Model Detail        | Read/Update/Delete Model of the user's own                   |

## 2.2 Response JSON Data Structure

### 2.2.1 /login

- Method: POST

- Request Data:

  ```js
  {
    "username": string,
  	"password": string
  }
  ```

- Response Data:

  ```js
  {
    "refresh": sttring,
    "access": string
  }
  ```

### 2.2.2 /models

- Method: GET

- Request Data: None

- Response Data:

  ```js
  [
    {
      "id": int,
    	"model_name": string,
    	"public": boolean,
  	  "user_obj": int
    },
   	...
  ]
  ```

### 2.2.3 /models/user_id

- Method: GET

- Request Data: None

- Response Data:

  ```js
  [
    {
      "id": int,
     	"model_name": string,
     	"public": boolean,
     	"user_obj": int
    },
    ...
  ]
  ```

### 2.2.4 /models/user_id/model_id

- Method: GET

- Request Data: None

- Response Data:

  ```js
  {
    "question": [
      {
        "id": int,
        "question_name": string,
        "answer": string,
        "model_obj": int
      },
      ...
    ],
    "model": {
      "id": int,
      "model_name": string,
      "public": boolean,
      "user_obj": int
     }
  }
  ```

# 4. Common Used Packages

1. React Package
2. Django RESTful Package
3. Data Analysis Packages in Python: Numpy, Pandas, ...
4. BootStrap Package
5. JSON Web Token Package
