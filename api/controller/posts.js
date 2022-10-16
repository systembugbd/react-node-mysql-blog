import { db } from "./../db.js";
import jwt from "jsonwebtoken";

export const getPostController = (req, res) => {
  const query = req.query.cat
    ? `cat='${req.query.cat}'`
    : req.query.authorId
    ? `uid='${req.query.authorId}'`
    : "";

  const q = query
    ? `SELECT * from posts WHERE ${query}`
    : "SELECT * from posts";
  // console.log(q, query);
  db.query(q, (err, data) => {
    if (err) return res.json("Post not found");

    res.status(200).json(data);
  });
};

export const getSinglePostById = (req, res) => {
  const postId = req.params.id;

  let likeQueryString = "";

  const q =
    "SELECT  `username`, `userImg`, `title`, `desc`,  `uid`, `img`, `date`, `cat`, p.id from users u JOIN posts p ON u.id = p.uid WHERE p.id=?";

  db.query(q, [postId], (err, post) => {
    if (err) return res.json(err);

    post &&
      post[0].title.split(" ").reduce((prev, word) => {
        likeQueryString += `id!=${postId} AND title LIKE '%${word}%' OR `;
      });

    //GET Related post
    const q2 = `SELECT * from posts WHERE ${likeQueryString.slice(0, -3)} `; //removing last operand or

    db.query(q2, (err, data) => {
      if (err) return res.status(500).json(err);

      res.status(200).json({
        post,
        relatedPost: data,
      });
    });
  });
};

// export const getPostByAuthor = (req, res) => {
//   // res.status(200).json(`getting single data `);
//   const postId = req.params.id;
//   console.log(postId);
//   const q = "SELECT * from posts WHERE username=?";

//   db.query(q, [postId], (err, singlePost) => {
//     if (err) return res.json(err);

//     let likeSearch = "";
//     console.log(singlePost[0].title);

//     const q2 = `SELECT * from posts WHERE posts.id!=? AND posts.title LIKE '%${singlePost[0].title}%'`;

//     db.query(q2, [postId], (err, relatedPost) => {
//       // console.log(posts);
//       if (err) return res.json(err);
//       res.status(200).json({
//         post: singlePost[0],
//         relatedPost,
//       });
//     });
//   });
// };

export const insertPostController = (req, res) => {
  const { title, desc, img, date, uid, cat } = req.body;

  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json("You are not loged in user, Please login first");
  }

  jwt.verify(token, "maryamKey", (err, userInfo) => {
    if (err) return res.status(401).json("You are not Authenticated");

    const q =
      "INSERT INTO posts (`title`, `desc`, `img`, `date`, `uid`, `cat`) VALUES(?)";

    db.query(q, [title, desc, img, date, uid, cat], (err, data) => {
      if (err) return res.status(401).json("Can't insert post");

      return res.status(201).json("Post Successfully added");
    });
  });
};

export const updatePostController = (req, res) => {
  req.json("Update Posts is working");
};

/**
 * DELETE POST
 * @param {request} req
 * @param {response} res
 * @returns json
 */
export const deletePostController = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json("You are not authenticated");
    return;
  }

  jwt.verify(token, "maryamKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;

    const q = "DELETE from posts WHERE `id`=? AND `uid`=?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your own post");

      return res.status(200).json("Post Deleted Successfully");
    });
  });
};
