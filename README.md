# Superhero Database Platform

A full-stack web application for managing a superhero database. Users can view, create, edit, and delete heroes, as well as upload images. The project demonstrates a **Monorepo architecture** with a focus on robust testing (Unit & Integration) and clean UI/UX.

---

### Stack

* **Frontend:** React (Vite), CSS Modules, React-Toastify, SweetAlert2
* **Backend:** Node.js, Express.js, MongoDB (Mongoose ODM), Multer
* **Testing:**
    * *Frontend:* Vitest, React Testing Library
    * *Backend:* Jest, Supertest
* **Architecture:** Monorepo (Client-Server), REST API
* **Tools:** Concurrently, Nodemon, Git

---

### How to Start

###  Docker Start

The easiest way to run the application .

1. Ensure you have **Docker** and **Docker Compose** installed.
2. Run the following command in the root directory:

```bash
docker-compose up --build
```

3. Open your browser:

* Frontend (App): http://localhost:5173
* Backend (API): http://localhost:5000

---

### Manual Start

**WARNING:** You must have Node.js and MongoDB installed (or use a MongoDB Atlas connection string).

#### 1. Clone the repository
```
git clone https://github.com/Shiw4se/superhero-app.git
cd superhero-app 
```
#### 2. Install dependencies

This project is configured as a Monorepo. Running install in the root will automatically install dependencies for both Backend and Frontend.

```
npm install
```

#### 3. Setup Environment Variables

Create a .env file in the backend directory. You can copy the structure below:

```
PORT=5000
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/myFirstDatabase
```
Note: _No manual SQL table creation is required. Mongoose will automatically create the collections upon the first write operation._

#### 4. Start the Application

Run both the Backend server and Frontend client with a single command:

```
npm run dev
```

* Frontend: http://localhost:5173;
* Backend: http://localhost:5000.

#### Running Tests

To run ALL tests (Backend Integration + Frontend Unit):

```npm run test```

#### API Usage

The backend exposes a RESTful API. Below are the main endpoints:

Get a list of heroes
**GET**	    _/api/heroes_    

Get details of a specific hero
**GET**	_/api/heroes/:id_

Create a new hero (Form-Data required for images)
**POST** _/api/heroes_

Update hero details
**PUT** _/api/heroes/:id_

Remove a hero from the database
**DELETE**	_/api/heroes/:id_

#### Contact

For any questions or issues, reach out to me on Telegram ([@shiw4se](https://t.me/shiw4se))
or via email ([ausenko476@gmail.com](mailto:ausenko476@gmail.com))

