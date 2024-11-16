////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from "express";
// import cors from "cors";
import cors from "cors";
import "dotenv/config";
import pg from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // replace with the exact origin of your frontend
    credentials: true, // allow credentials (cookies, HTTP authentication)
  })
);

// PostgreSQL connection
const pool = new pg.Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DBPORT,
});

// Connect to PostgreSQL
async function connectToPostgres() {
  try {
    await pool.connect();
    console.log("Successfully connected to PostgreSQL!");
  } catch (error) {
    console.error("Error connecting to PostgreSQL", error);
    process.exit(1);
  }
}

connectToPostgres().catch(console.dir);

(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);
})();

const JWT_SECRET = "your_secret_key";

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});


// Define routes
app.post("/post-job", async (req, res) => {
  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    skills,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO jobs ("jobTitle", "companyName", "minPrice", "maxPrice", "salaryType", 
    "jobLocation", "postingDate", "experienceLevel", "companyLogo", "employmentType", 
    "description", "postedBy", "skills") 
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
   RETURNING id`,
      [
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        postingDate,
        experienceLevel,
        companyLogo,
        employmentType,
        description,
        postedBy,
        JSON.stringify(skills),
      ]
    );

    if (result.rows[0].id) {
      return res.status(200).send(result.rows[0]);
    } else {
      return res.status(404).send({
        message: "Cannot insert! Try again",
        status: false,
      });
    }
  } catch (error) {
    console.error("Error inserting job:", error);
    res.status(500).send({
      message: "Internal server error",
      status: false,
    });
  }
});

app.get("/all-jobs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs");
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send({
      message: "Internal server error",
      status: false,
    });
  }
});

app.get("/all-jobs/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({
        message: "Job not found",
        status: false,
      });
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).send({
      message: "Internal server error",
      status: false,
    });
  }
});

// app.patch("/update-job/:id", async (req, res) => {
//   const id = req.params.id;
//   const jobData = req.body;

//   const setClause = Object.keys(jobData)
//     .map((key, index) => `${key} = $${index + 1}`)
//     .join(", ");
//   const values = Object.values(jobData);

//   try {
//     const result = await pool.query(
//       `UPDATE jobs SET ${setClause} WHERE id = $${
//         values.length + 1
//       } RETURNING *`,
//       [...values, id]
//     );

//     if (result.rows.length > 0) {
//       res.send(result.rows[0]);
//     } else {
//       res.status(404).send({
//         message: "Job not found",
//         status: false,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating job:", error);
//     res.status(500).send({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// });
app.patch("/update-job/:id", async (req, res) => {
  const { id } = req.params;
  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    skills,
  } = req.body;

  try {
    // Ensure skills is properly formatted for JSON in PostgreSQL
    const parsedSkills = JSON.stringify(skills);

    const result = await pool.query(
      `UPDATE jobs SET 
        "jobTitle" = $1,
        "companyName" = $2,
        "minPrice" = $3,
        "maxPrice" = $4,
        "salaryType" = $5,
        "jobLocation" = $6,
        "postingDate" = $7,
        "experienceLevel" = $8,
        "companyLogo" = $9,
        "employmentType" = $10,
        description = $11,
        "postedBy" = $12,
        skills = $13
      WHERE id = $14 RETURNING *`,
      [
        jobTitle,
        companyName,
        minPrice,
        maxPrice,
        salaryType,
        jobLocation,
        postingDate,
        experienceLevel,
        companyLogo,
        employmentType,
        description,
        postedBy,
        parsedSkills, // Use the JSON-stringified skills here
        id,
      ]
    );

    if (result.rows.length > 0) {
      res.json({ acknowledged: true, result: result.rows[0] });
    } else {
      res.status(404).json({ message: "Job not found", status: false });
    }
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
});

app.get("/myJobs/:email", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM jobs WHERE "postedBy" = $1',
      [req.params.email]
    );
    res.send(result.rows);
  } catch (error) {
    console.error("Error fetching jobs by email:", error);
    res.status(500).send({
      message: "Internal server error",
      status: false,
    });
  }
});

app.delete("/job/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM jobs WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({
        message: "Job not found",
        status: false,
      });
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).send({
      message: "Internal server error",
      status: false,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal");
});

app.listen(port, () => {
  console.log(`Successfully running on port ${port}`);
});
