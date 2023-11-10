import React from "react";
import { Button } from "./ui/button";

const ImageDownloader = ({ imageUrl }: { imageUrl: string }) => {
  // 이미지를 다운로드하는 함수
  const downloadImage = async () => {
    console.log(imageUrl);

    // 가상의 a 태그를 생성하여 다운로드를 실행
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "downloadedImage"; // 다운로드될 파일의 이름
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button onClick={downloadImage}>Download Image</Button>
    </div>
  );
};

export default ImageDownloader;
