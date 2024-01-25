const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const fileUpload = require("express-fileupload");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 65000;

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4c1ex.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const database = client.db("fatikSheba");
    const usersCollection = database.collection("users");
    const problemPostsCollection = database.collection("problems");
    const problemCommentsCollection = database.collection("problemComments");
    const questionsCollection = database.collection("questions");
    const answersCollection = database.collection("answers");
    const blogCollection = database.collection("blogs");
    const blogCommentsCollection = database.collection("blogComments");

    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const result = await cursor.toArray();
      res.send(result.reverse());
    });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.json(user);
    });

    app.get("/users/isAdmin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let isAdmin = false;
      if (user?.role === "admin") {
        isAdmin = true;
      }
      res.json({ admin: isAdmin });
    });

    app.get("/patients", async (req, res) => {
      const query = { status: "patient" };
      const cursor = usersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result.reverse());
    });

    app.get("/physicians", async (req, res) => {
      const query = { status: "physician" };
      const cursor = usersCollection.find(query);
      const result = await cursor.toArray();
      res.send(result.reverse());
    });

    app.get("/problems", async (req, res) => {
      const cursor = problemPostsCollection.find({});
      const result = await cursor.toArray();
      res.send(result.reverse());
    });

    app.get("/blogs", async (req, res) => {
      const cursor = blogCollection.find({});
      const result = await cursor.toArray();
      res.send(result.reverse());
    });

    app.get("/questions", async (req, res) => {
      const cursor = questionsCollection.find({});
      const result = await cursor.toArray();
      res.send(result.reverse());
    });

    app.get("/problem-comments/:to", async (req, res) => {
      const to = req.params.to;
      const query = { to: to };
      const cursor = problemCommentsCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    app.get("/blog-comments/:to", async (req, res) => {
      const to = req.params.to;
      const query = { to: to };
      const cursor = blogCommentsCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    app.get("/answers/:to", async (req, res) => {
      const to = req.params.to;
      const query = { to: to };
      const cursor = answersCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const blog = await blogCollection.findOne(query);
      res.json(blog);
    });

    app.get("/blogs/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = blogCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    app.get("/question/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const question = await questionsCollection.findOne(query);
      res.json(question);
    });

    app.get("/questions/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = questionsCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    app.get("/problems/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const cursor = problemPostsCollection.find(query);
      const result = await cursor.toArray();
      res.json(result);
    });

    app.get("/problem/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const problem = await problemPostsCollection.findOne(query);
      res.json(problem);
    });

    app.get("/profile/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const profile = await usersCollection.findOne(query);
      res.json(profile);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.json(result);
    });

    app.post("/problem-share", async (req, res) => {
      const email = req.body.email;
      const date = req.body.date;
      const description = req.body.text;
      const pic = req.files.photo;
      const picData = pic.data;
      const encodedPic = picData.toString("base64");
      const imageBuffer = Buffer.from(encodedPic, "base64");
      const allData = { image: imageBuffer, email, date, description };
      const result = await problemPostsCollection.insertOne(allData);
      res.json(result);
    });

    app.post("/blog", async (req, res) => {
      const email = req.body.email;
      const date = req.body.date;
      const title = req.body.title;
      const category = req.body.category;
      const description = req.body.description;
      const pic = req.files.coverPhoto;
      const picData = pic.data;
      const encodedPic = picData.toString("base64");
      const imageBuffer = Buffer.from(encodedPic, "base64");
      const allData = {
        coverPhoto: imageBuffer,
        email,
        date,
        title,
        category,
        description,
      };
      const result = await blogCollection.insertOne(allData);
      res.json(result);
    });

    app.post("/problem-comment", async (req, res) => {
      const comment = req.body;
      const result = await problemCommentsCollection.insertOne(comment);
      res.json(result);
    });

    app.post("/blog-comment", async (req, res) => {
      const comment = req.body;
      const result = await blogCommentsCollection.insertOne(comment);
      res.json(result);
    });

    app.post("/answer", async (req, res) => {
      const answer = req.body;
      const result = await answersCollection.insertOne(answer);
      res.json(result);
    });

    app.post("/question", async (req, res) => {
      const question = req.body;
      const result = await questionsCollection.insertOne(question);
      res.json(result);
    });

    app.put("/users/profilePic", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const pic = req.files.profilePic;
      const picData = pic.data;
      const encodedPic = picData.toString("base64");
      const imageBuffer = Buffer.from(encodedPic, "base64");
      const updateDoc = { $set: { profilePic: imageBuffer } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    app.put("/physician/approval/:id", async (req, res) => {
      const id = req.params.id;
      const approval = req.body.approval;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          approval,
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    app.put("/users/admin/add", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const updateDoc = { $set: { role: "admin" } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    app.put("/users/admin/remove", async (req, res) => {
      const user = req.body;
      const filter = { email: user.id };
      const updateDoc = { $set: { role: "null" } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.json(result);
    });

    //
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Ema jon server is running and running");
});

app.listen(port, () => {
  console.log("Server running at port", port);
});
