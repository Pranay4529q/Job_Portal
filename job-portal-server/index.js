// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import { MongoClient, ServerApiVersion } from "mongodb";
// const app = express();
// const port = process.env.PORT || 3000; // Use || instead of |
// //console.log(process.env.DB_PASSWORD);
// //middle ware
// app.use(express.json());
// app.use(cors());

// //user:bollikondapranay8
// //password:rMK7hT4FKRQgOs1a

// //const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DB_PASSWORD}@job-portal-demo.wccfmep.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     //create Database
//     const db = client.db("mernJobPortal");
//     const jobsCollections = db.collection("demoJobs");

//     // //posting a job

//     // app.post("/post-job", async (req, res) => {
//     //   const body = req.body;
//     //   body.createAt = new Date();
//     //   // console.log(body);
//     //   const result = await jobsCollections.insertOne(body);
//     //   if (result.insertedId) {
//     //     return res.status(200).send(result);
//     //   } else {
//     //     return res.status(404).send({
//     //       message: "cannot insert! try again",
//     //       status: false,
//     //     });
//     //   }
//     // });

//     // // get all jobs

//     // app.get("/all-jobs", async (req, res) => {
//     //   const jobs = await jobsCollections.find({}).toArray();
//     //   res.send(jobs);
//     // });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// app.post("/post-job", async (req, res) => {
//   const body = req.body;
//   body.createAt = new Date();
//   // console.log(body);
//   try {
//     const result = await jobsCollections.insertOne(body);
//     if (result.insertedId) {
//       return res.status(200).send(result);
//     } else {
//       return res.status(404).send({
//         message: "Cannot insert! Try again",
//         status: false,
//       });
//     }
//   } catch (error) {
//     console.error("Error inserting job:", error);
//     res.status(500).send({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// });

// app.get("/all-jobs", async (req, res) => {
//   try {
//     const jobs = await jobsCollections.find({}).toArray();
//     res.send(jobs);
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     res.status(500).send({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Hello FUcknm");
// });

// app.listen(port, () => {
//   console.log(`Successfully running on port ${port}`);
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB connection URI
// const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DB_PASSWORD}@job-portal-demo.wccfmep.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// let jobsCollections;

// // Connect to MongoDB and setup collections
// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     const db = client.db("mernJobPortal");
//     jobsCollections = db.collection("demoJobs");

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } catch (error) {
//     console.error("Error connecting to MongoDB", error);
//     process.exit(1); // Exit the process with an error
//   }
// }

// connectToMongoDB().catch(console.dir);

// // Define routes
// app.post("/post-job", async (req, res) => {
//   const body = req.body;
//   body.createAt = new Date();
//   try {
//     const result = await jobsCollections.insertOne(body);
//     if (result.insertedId) {
//       return res.status(200).send(result);
//     } else {
//       return res.status(404).send({
//         message: "Cannot insert! Try again",
//         status: false,
//       });
//     }
//   } catch (error) {
//     console.error("Error inserting job:", error);
//     res.status(500).send({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// });

// app.get("/all-jobs", async (req, res) => {
//   try {
//     const jobs = await jobsCollections.find({}).toArray();
//     res.send(jobs);
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     res.status(500).send({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// });

// ///get a job by single id
// app.get("/all-jobs/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const job = await jobsCollections.findOne({
//       _id: new ObjectId(id),
//     });
//     if (!job) {
//       return res.status(404).send({ message: "Job not found" });
//     }
//     res.send(job);
//   } catch (error) {
//     console.error("Error fetching job:", error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

// ///UPDATE A JOB
// app.patch("/update-job/:id", async (req, res) => {
//   const id = req.params.id;
//   const jobData = req.body;
//   const filter = { _id: new ObjectId(id) };
//   const options = { upsert: true }; // Fixed typo from upset to upsert
//   const updateDoc = {
//     $set: {
//       ...jobData,
//     },
//   };
//   try {
//     const result = await jobsCollections.updateOne(filter, updateDoc, options);
//     res.send(result);
//   } catch (error) {
//     console.error("Error updating job:", error);
//     res.status(500).send({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// });

// ////get jobs by email
// app.get("/myJobs/:email", async (req, res) => {
//   try {
//     if (!jobsCollections) {
//       throw new Error("jobsCollections is not initialized");
//     }
//     const jobs = await jobsCollections
//       .find({ postedBy: req.params.email })
//       .toArray();
//     res.send(jobs);
//   } catch (error) {
//     console.error("Error fetching jobs by email:", error);
//     res.status(500).send({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// });

// ////Delete A job
// app.delete("/job/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const filter = { _id: new ObjectId(id) };
//     const result = await jobsCollections.deleteOne(filter);
//     if (result.deletedCount === 0) {
//       return res.status(404).send({ message: "Job not found" });
//     }
//     res.status(200).send({ message: "Job deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting job:", error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.listen(port, () => {
//   console.log(`Successfully running on port ${port}`);
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DB_PASSWORD}@job-portal-demo.wccfmep.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let jobsCollections;

// Connect to MongoDB and setup collections
async function connectToMongoDB() {
  try {
    await client.connect();
    const db = client.db("mernJobPortal");
    jobsCollections = db.collection("demoJobs");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process with an error
  }
}

connectToMongoDB().catch(console.dir);

// Define routes
app.post("/post-job", async (req, res) => {
  const body = req.body;
  body.createAt = new Date();
  // console.log(body);
  try {
    const result = await jobsCollections.insertOne(body);
    if (result.insertedId) {
      return res.status(200).send(result);
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
/// Route to get all jobs
app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await jobsCollections.find({}).toArray();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send({
      message: "Internal server error",
      status: false,
    });
  }
});

///get a job by single id
app.get("/all-jobs/:id", async (req, res) => {
  const id = req.params.id;
  const job = await jobsCollections.findOne({
    _id: new ObjectId(id),
  });
  res.send(job);
});

///UPDATE A JOB
app.patch("/update-job/:id", async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upset: true };
  const updateDoc = {
    $set: {
      ...jobData,
    },
  };
  const result = await jobsCollections.updateOne(filter, updateDoc, options);
  res.send(result);
});

////get jobs by email

// app.get("/myJobs/:email", async (req, res) => {
//   //console.log(req.params.email);
//   const jobs = await jobsCollections
//     .find({ postedBy: req.params.email })
//     .toArray();
//   res.send(jobs);
// });

app.get("/myJobs/:email", async (req, res) => {
  // console.log(req.params.email);
  try {
    if (!jobsCollections) {
      throw new Error("jobsCollections is not initialized");
    }
    //console.log(req.params.email);
    const jobs = await jobsCollections
      .find({ postedBy: req.params.email })
      .toArray();
    res.send(jobs);
  } catch (error) {
    console.error("Error fetching jobs by email:", error);
    res.status(500).send({
      message: "Internal server error",
      status: false,
    });
  }
});

////Delete A job
app.delete("/job/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await jobsCollections.deleteOne(filter);
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal");
});

app.listen(port, () => {
  console.log(`Successfully running on port ${port}`);
});

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import pg from "pg";

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // PostgreSQL connection setup
// const { Pool } = pg;

// const pool = new Pool({
//   user: process.env.DBUSER,
//   host: process.env.DBHOST,
//   database: process.env.DBNAME,
//   password: process.env.DBPASSWORD,
//   port: process.env.DBPORT || 5432,
// });

// console.log("Database Password:", process.env.DBPASSWORD); // Debug log

// // Connect to PostgreSQL
// async function connectToPostgreSQL() {
//   try {
//     await pool.query("SELECT NOW()"); // Simple query to check connection
//     console.log("Connected to PostgreSQL successfully!");

//     // Define routes
//     app.post("/post-job", async (req, res) => {
//       const body = req.body;
//       body.createAt = new Date();
//       const query = `
//         INSERT INTO demoJobs (jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, skills, companyLogo, employmentType, description, postedBy, createAt)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
//         RETURNING *;
//       `;
//       const values = [
//         body.jobTitle,
//         body.companyName,
//         body.minPrice,
//         body.maxPrice,
//         body.salaryType,
//         body.jobLocation,
//         body.postingDate,
//         body.experienceLevel,
//         JSON.stringify(body.skills),
//         body.companyLogo,
//         body.employmentType,
//         body.description,
//         body.postedBy,
//         body.createAt,
//       ];
//       try {
//         const result = await pool.query(query, values);
//         res.status(200).send(result.rows[0]);
//       } catch (error) {
//         console.error("Error inserting job:", error);
//         res.status(500).send({
//           message: "Internal server error",
//           status: false,
//         });
//       }
//     });

//     app.get("/all-jobs", async (req, res) => {
//       try {
//         const result = await pool.query("SELECT * FROM demoJobs");
//         res.send(result.rows);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         res.status(500).send({
//           message: "Internal server error",
//           status: false,
//         });
//       }
//     });

//     app.get("/", (req, res) => {
//       res.send("Hello, World!");
//     });

//     app.listen(port, () => {
//       console.log(`Successfully running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Error connecting to PostgreSQL", error);
//     process.exit(1); // Exit the process with an error
//   }
// }

// connectToPostgreSQL();
