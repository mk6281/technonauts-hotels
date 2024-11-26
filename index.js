import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
// import "./queries.js";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Technonauts Hotel",
  password: "M.k@28!06!04#",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/receptionlogin", (req, res) => {
  res.render("receptionlogin.ejs");
});

app.get("/reception", (req, res) => {
  res.render("reception.ejs");
});

app.get("/manager", (req, res) => {
  res.render("manager.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});


// var todoDbList = db.getAllItems;
// var itemNames = db.getAllItemNames;

// app.get("/rooms", (req, res) => {
//   res.render("rooms.ejs", {
//     todoDbList: db.getAllItems
//     });
// });

app.use(cors());

// Route to get all users
app.get('/bookings', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM room');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/room_details', async (req, res) => {
  try {
      const result = await db.query('SELECT * FROM room');
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

app.post("/register", async (req, res) => {
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const DOB = req.body.DOB;
  const Number = req.body.Number; 
  const Address = req.body.Address; 
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM employees WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await db.query(
        "INSERT INTO employees (c_id,Fname,Lname,email, password,address,dob) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [Number,Fname,Lname,email, password,Address,DOB]
      );
      console.log(result);
      res.render("reservation.ejs");
    }
  } catch (err) {
    console.log(err);
  }

  
  db.end();
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM employees WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("reservation.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
  
  db.end();
});

app.post("/receptionlogin", async (req, res) => {
  const email = req.body.username;
  // const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM employees WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      // const user = result.rows[0];
      // const storedPassword = user.password;

      // if (password === storedPassword) {
        res.render("reservation.ejs");
      // } 
      // else {
        // res.send("Incorrect Password");
      // }
    } else {
      res.send("User not found");
    }

  } catch (err) {
    console.log(err);
  }
  
  db.end();
});




  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


