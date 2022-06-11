import React, { useEffect, useState } from "react";
import Image from "next/image";

const PageHeader = ({ imageLoading, imgUrl, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (typeof imageLoading === "function") {
      imageLoading(false);
    }
  }, [imageLoaded, imageLoading]);

  return (
    <div className="coverPhoto">
      {/* dark overlay */}
      <div className="dark" />

      {/* header image */}
      <Image
        src={process.env.PUBLIC_URL + imgUrl}
        alt="header"
        className="cover_image"
        onLoad={
          typeof imageLoading === "function" ? () => setImageLoaded(true) : null
        }
        layout="fill"
      />

      {/* text */}
      <div className="headerTitle">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
