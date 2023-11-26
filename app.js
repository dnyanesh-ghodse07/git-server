import express from "express";
import mongoose from "mongoose";
import Blog from "./models/blogSchema.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send({
      message: error,
    });
  }
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Couldn't connect to MongoDB");
  });

app.post("/create-blog", async (req, res) => {
  console.log(res.body);
  const newBlog = new Blog({
    title: "Sample Blog",
    content: "This is the content of the blog post.",
    author: "John Doe",
    tags: ["tag1", "tag2"],
    comments: [
      {
        text: "Great post!",
        author: "Jane Doe",
      },
      {
        text: "I enjoyed reading this.",
        author: "Bob Smith",
      },
    ],
  });

  try {
    await newBlog
      .save()
      .then(() => {
        res.status("200").send({
          message: "Blog created",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: err,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Running on port 4000 ${PORT}`);
});
