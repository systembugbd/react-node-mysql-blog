import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const posdId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${posdId}`);
        console.log(res.data.post);
        setPost(res.data.post);
        setPosts(res.data.relatedPost);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [posdId]);

  return (
    <div className="singlePagePost">
      <div className="singlePost">
        <div className="content">
          <img src={post.img} alt={post.title} className="image" />

          <span className="articleInfo">
            <img src={post.img} alt={post.title} width={30} className="user" />
            <div className="info">
              <Link className="link" to={"/post/shaheb"}>
                {post.author}
              </Link>{" "}
              <span>Posted 2 days ago</span>
            </div>
            <span className="editInfo">
              <img
                src="https://cdn-icons-png.flaticon.com/512/32/32355.png"
                alt={post.title}
                width={20}
              />
              <img
                src=" https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                alt={post.title}
                width={20}
              />
            </span>
          </span>
          <h3>{post.title}</h3>
          <p>{post.desc}</p>
        </div>
      </div>
      <div className="relatedPost">
        <h2>Other post you may like...</h2>
        {posts
          .filter((post) => post.id != 6)
          .map((post) => (
            <div className="content" key={post.id}>
              <Link to={`/post/${post.id}`} className="link ">
                <img
                  src={post.img}
                  alt={post.title}
                  width={30}
                  className="image"
                />
              </Link>
              <Link to={`/post/${post.id}`} className="link ">
                <h3>{post.title}</h3>
              </Link>

              <Link to={`/post/${post.id}`} className="link btn">
                Read More
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Single;
