"use client";

import { createImage } from "@/actions/images";
import ImageDownloader from "@/components/ImageDownloader";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { apiOrigin } from "@/configs/urls";
import { cn, convertURLtoFile } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { RiImageAddFill } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [resultPrompt, setResultPrompt] = useState<string>("");

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <div>
              <RiImageAddFill />
            </div>
            <div>Text To Image</div>
          </CardTitle>
          <CardDescription>
            만들고 싶은 이미지에 대해 설명해 주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="resize-none h-[300px]"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <div className="h-6" />
          <Button
            disabled={apiLoading}
            className={cn("w-full")}
            onClick={async () => {
              if (prompt.length <= 6) {
                toast.error("최소한 7글자 이상의 지시문을 입력 해 주세요.");
                return;
              }

              if (prompt.length >= 500) {
                toast.error("500글자 미만의 지시문을 입력 해 주세요.");
                return;
              }

              setApiLoading(true);
              axios
                .post(apiOrigin + "/api/v1/prompt", {
                  prompt: prompt,
                })
                .then(async (res2) => {
                  // const file = await convertURLtoFile(res2.data.data[0].url);
                  // console.log(file);
                  createImage(res2.data.data[0].url, prompt).then();

                  console.log(res2.data.data[0]);
                  setResultPrompt(prompt);
                  setImageUrl(res2.data.data[0].url);
                  setApiLoading(false);
                  setPrompt("");
                })
                .catch((err) => {
                  toast.error("에러가 발생했습니다.");
                  toast.error("다시 시도해주십시오.");
                });
            }}
          >
            {apiLoading ? <ClipLoader color="#36d7b7" size={16} /> : "전송"}
          </Button>
        </CardContent>
      </Card>
      <div className="h-4" />

      {imageUrl !== "" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <RiImageAddFill />
              </div>
              <div>생성된 이미지</div>
            </CardTitle>
            <CardDescription>지시문 : {resultPrompt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square">
              <Image src={imageUrl} alt="image" fill></Image>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ) : null}
    </div>
  );
};

export default Page;
