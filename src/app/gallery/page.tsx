"use client";

import { createImage, getAllImages, getSomeImages } from "@/actions/images";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BeatLoader } from "react-spinners";
import { Image } from "antd";

const Page = () => {
  const length = 6; // 한 번에 불러올 개수
  const [images, setImages] = useState<any>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const onFetchMoreImages = () => {
    getAllImages().then((allImages) => {
      if (images.length + length >= allImages.length) {
        setHasMore(false);
      }
      getSomeImages(images.length + length).then((someImages) => {
        setImages(someImages);
      });
    });
  };

  useEffect(() => {
    // 초기에 한 번 불러오기
    getSomeImages(length).then((images) => {
      setImages(images);
    });
  }, []);
  return (
    <div className="p-4">
      <div>
        <InfiniteScroll
          className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4"
          dataLength={images.length}
          next={onFetchMoreImages}
          hasMore={hasMore}
          loader={
            <div className="text-center">
              <BeatLoader color="#36d7b7" />
            </div>
          }
          endMessage={<div>마지막 이미지 입니다.</div>}
        >
          {images.map((image: any) => {
            return (
              <Card key={image.imageUrl}>
                <CardContent className="p-2">
                  <div className="relative aspect-square">
                    <Image src={image.imageUrl} alt={image.id} />
                  </div>
                </CardContent>
                <CardFooter className="p-2">
                  <HoverCard>
                    <HoverCardTrigger asChild className="truncate">
                      <div className="truncate text-primary-foreground opacity-50 underline-offset-4 hover:underline cursor-pointer">
                        지시문 : {image.prompt}
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent>지시문 : {image.prompt}</HoverCardContent>
                  </HoverCard>
                </CardFooter>
              </Card>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Page;
