import React from "react";
import Skeleton from "react-loading-skeleton";
import { usePhotos } from "../hooks/usePhotos";
import Post from "./post/Index.jsx";

const Timeline = () => {
  const { photos } = usePhotos();
  console.log(photos); // Verifica la estructura

  if (!photos) {
    return <Skeleton count={1} height={150} />;
  }

  return (
      <div className="container col-span-2">
        {photos.length > 0 ? (
            photos.map((photo) => <Post key={photo.docId} content={photo} />)
        ) : (
            <p className="text-center text-2xl">Follow people to see the photos</p>
        )}
      </div>
  );
};

export default Timeline;