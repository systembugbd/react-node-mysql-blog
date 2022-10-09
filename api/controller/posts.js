import { db } from "./../db.js";

export const getPostController = (req, res) => {
  const q = req.query.cat
    ? "SELECT * from posts WHERE cat=?"
    : "SELECT * from posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json("Post not found");

    res.status(200).json(data);
  });
};

export const getSinglePostById = (req, res) => {
  // res.status(200).json(`getting single data `);
  const postId = req.params.id;
  const q = "SELECT * from posts WHERE id=?";

  db.query(q, [postId], (err, data) => {
    if (err) return res.json("Post not found");

    const q2 = `SELECT * from posts WHERE posts.id!=? AND posts.title LIKE '%${data[0].title
      .split(" ")
      .join(" ")}%'`;
    console.log(q2);
    db.query(q2, [postId], (err, posts) => {
      console.log(posts);
      if (err) return res.json(err);
      res.status(200).json({
        post: data[0],
        relatedPost: posts,
      });
    });
  });
};

export const insertPostController = (res, req) => {
  req.json("Insert Posts is working");
};

export const updatePostController = (res, req) => {
  req.json("Update Posts is working");
};

export const deletePostController = (res, req) => {
  req.json("Delete Posts is working");
};
