import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Home() {
  const [posts, setPosts] = useState([]);
  const search = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/${search}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [search]);
  // console.log(posts);
  // const postss = [
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
  // ];
  // console.log(postss);
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="single" key={post.id}>
            <div className="right">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="left">
              <div>
                <span>Published Date: {moment(post.date).fromNow()}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <div>
                <Link className="link btn" to={`/post/${post.id}`}>
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
