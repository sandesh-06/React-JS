import React from "react";
import service from "../appwrite/service";
import { Link } from "react-router-dom";
const PostCard = ({ $id, title, featuredImage }) => {
  //NOTE: $id IS THE NAMING CONVENTION OF "APPWRITE"

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={service.getFilePreview(featuredImage)} alt="" 
          className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
