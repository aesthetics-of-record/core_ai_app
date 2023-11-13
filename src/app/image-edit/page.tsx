"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiOrigin } from "@/configs/urls";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { RiImageEditFill } from "react-icons/ri";
import { Progress } from "@/components/ui/progress";
import { BeatLoader } from "react-spinners";
import Image from "next/image";

const Page = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const Loading = () => {
    return (
      <div>
        {progress ? <Progress value={progress} className="" /> : null}
        {progress === 100 ? <div className="h-4" /> : null}
        {progress === 100 ? (
          <div className="font-bold text-center">이미지 업로드 완료</div>
        ) : null}
        {progress === 100 && apiLoading ? (
          <div className="text-center">
            <div>이미지 변형 중...</div>
            <BeatLoader color="#36d7b7" />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <div>
              <RiImageEditFill />
            </div>
            <div>Image To Image</div>
          </CardTitle>
          <CardDescription>여러분의 사진을 올려주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <SingleImageDropzone
            height={350}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <div className="h-6" />
          <Button
            className="w-full"
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    console.log(progress);
                    setProgress(progress);
                  },
                });

                console.log(res.url);
                setApiLoading(true);
                axios
                  .post(apiOrigin + "/api/v1/images", { url: res.url })
                  .then((res2) => {
                    console.log(res2);
                    setImageUrl(res2.data.output[0]);
                    toast.success("성공!");
                    setApiLoading(false);
                    setProgress(0);
                  })
                  .catch((err) => {
                    toast.error("에러가 발생했습니다.");
                    toast.error("다시 시도해주십시오.");
                  });
              }
            }}
          >
            업로드
          </Button>
        </CardContent>
      </Card>

      <div className="h-4" />
      {imageUrl === "" ? <Loading /> : null}

      {imageUrl !== "" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <RiImageEditFill />
              </div>
              <div>생성된 이미지</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square">
              <Image src={imageUrl} alt="image" fill></Image>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default Page;
