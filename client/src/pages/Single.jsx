import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import moment from "moment";
import { AuthContext } from "./../context/authContext";
import Breadcrumb from "./../component/breadcrumb";

function Single() {
  // const posts = [
  //   {
  //     id: 1,
  //     title: "কড়া নিরাপত্তায় এক হলেন শাকিব-বুবলী",
  //     desc: "Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description ",
  //     author: "Shaheb",
  //     img: "https://img.freepik.com/free-photo/view-famous-palombaggia-beach_268835-3736.jpg?w=1380&t=st=1664623744~exp=1664624344~hmac=cb8ac250619ece484ed8598d1b45efa8b104e252dd26ae21aca732acde749a05",
  //   },
  //   {
  //     id: 2,
  //     title: "lorem ipsum 2",
  //     desc: "Lorem ipsum 2 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description ",
  //     author: "Shaheb",
  //     img: "https://img.freepik.com/free-photo/beautiful-sunset-view-historic-sites-by-river-valletta-malta_181624-49420.jpg?w=1380&t=st=1664623756~exp=1664624356~hmac=c5733e4662f68e63e8cd8c685b5f32d2296d385e44501e4ed9be5aa06cc465fa",
  //   },
  //   {
  //     id: 3,
  //     title: "lorem ipsum 3",
  //     desc: "Lorem ipsum 3 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description ",
  //     author: "Shaheb",
  //     img: "https://img.freepik.com/free-photo/ha-long-bay-vietnam_181624-49065.jpg?w=1380&t=st=1664623756~exp=1664624356~hmac=35f335b38add44973189c2ab1b72e8106a67ea37e644289b3cdbeddb4ad57cb3",
  //   },
  //   {
  //     id: 4,
  //     title:
  //       "House among rocks next to a beautiful lake castel meur le gouffre de plougrescant",
  //     desc: "Lorem ipsum 4 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description ",
  //     author: "Shaheb",
  //     img: "https://img.freepik.com/free-photo/house-among-rocks-beautiful-lake-castel-meur-le-gouffre-de-plougrescant_242111-15547.jpg?w=1380&t=st=1664623752~exp=1664624352~hmac=62617e0f17cf20a6216074cd55f8bbd7622aea6234ac92fef4f0ac4ec9cd006f",
  //   },
  //   {
  //     id: 5,
  //     title: "lorem ipsum 5",
  //     desc: "Lorem ipsum 5 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description ",
  //     author: "Shaheb",
  //     img: "https://img.freepik.com/free-photo/house-among-rocks-beautiful-lake-castel-meur-le-gouffre-de-plougrescant_242111-15549.jpg?w=1380&t=st=1664623752~exp=1664624352~hmac=1591e54460bdc16d2e3a9bc6a333e9a59c542b039726b4aa891a0f9d832cbb95",
  //   },
  //   {
  //     id: 6,
  //     title: "lorem ipsum 6",
  //     desc: "Lorem ipsum 6 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description ",
  //     author: "Shaheb",
  //     img: "https://img.freepik.com/free-photo/bathing-site-jardim-mar-east-madeira-praia-jardim-mar-portugal_242111-21039.jpg?w=1380&t=st=1664623745~exp=1664624345~hmac=109f65f8974df8759e9882bdaace5d8c8494fd605bcc9fb8601e9620f933cbaf",
  //   },
  // ];

  // const post = {
  //   id: 6,
  //   title: "lorem ipsum 6",
  //   desc: "Lorem ipsum 6 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description Lorem ipsum 1 description ",
  //   author: "Shaheb",
  //   img: "https://img.freepik.com/free-photo/bathing-site-jardim-mar-east-madeira-praia-jardim-mar-portugal_242111-21039.jpg?w=1380&t=st=1664623745~exp=1664624345~hmac=109f65f8974df8759e9882bdaace5d8c8494fd605bcc9fb8601e9620f933cbaf",
  // };

  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const posdId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${posdId}`);
        // console.log(res.data);
        setPost(res.data.post[0]);
        setPosts(res.data.relatedPost);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [posdId]);

  let splitSearch =
    location.search && location.search.includes("cat")
      ? location.search.split("=")[1]
      : location.search.split("&")[0].split("=")[1];

  const deleteHandler = async (e, postId, userId) => {
    const deletePost = await axios.delete(`/posts/${postId}`);
    navigate(`/?author=${currentUser.username}&authorId=${userId}`);
  };

  return (
    <>
      <Breadcrumb
        posts={posts}
        splitSearch={splitSearch}
        search={location.search}
      />

      {
        <div className="singlePagePost">
          <div className="singlePost">
            <div className="content">
              <div>
                <img src={post.img} alt={post.title} className="image" />

                <span className="articleInfo">
                  <img
                    src={post.userImg}
                    alt={post.username}
                    width={30}
                    className="user"
                  />

                  <div className="info">
                    <Link
                      className="link"
                      to={`/?author=${post.username}&authorId=${post.uid}`}
                    >
                      {post.username}
                    </Link>{" "}
                    <span>Posted {moment(post.date).fromNow()}</span>
                  </div>

                  {currentUser?.username === post?.username && (
                    <span className="editInfo">
                      <Link to={`/write/${post.id}`} state={post}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/32/32355.png"
                          alt="Edit Post"
                          width={20}
                        />
                      </Link>
                      <img
                        src=" https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                        alt="Delete Post"
                        width={20}
                        onClick={(e) =>
                          deleteHandler(e, Number(posdId), post.uid)
                        }
                      />
                    </span>
                  )}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
            </div>
          </div>
          <div className="relatedPost">
            {posts.length !== 0 ? (
              <h3>Other post you may like...</h3>
            ) : (
              <h3>There is no related post</h3>
            )}
            {posts.map((post) => (
              <div className="content" key={post.id}>
                <Link
                  to={`/post/${post.id}/?cat=${post.cat}`}
                  className="link "
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    width={30}
                    className="image"
                  />
                </Link>
                <Link
                  to={`/post/${post.id}/?cat=${post.cat}`}
                  className="link "
                >
                  <h3>{post.title}</h3>
                </Link>

                <Link
                  to={`/post/${post.id}/?cat=${post.cat}`}
                  className="link btn"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}

export default Single;
