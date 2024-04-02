import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databaseConfig from "../utils/database.utils";
import fileService from "../utils/files.utils";

export default function Post() {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseConfig.getSinglePost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseConfig.deletePost(post.$id).then((status) => {
      if (status) {
        fileService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (post !== null) {
      console.log("hello");
      console.log(post.featuredImage);
      fileService
        .getFilePreview(post.featuredImage)
        .then((response) => setImage(response.href));
      console.log(image);
    }
  }, [post, image]);

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={image}
            onClick={() => console.log(post.title)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
