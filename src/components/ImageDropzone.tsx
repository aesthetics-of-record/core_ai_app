"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BsFillPersonCheckFill, BsPersonBoundingBox } from "react-icons/bs";
import { VscSymbolColor } from "react-icons/vsc";
import { PersnalTable } from "./PersnalTable";
import axios from "axios";
import { apiOrigin } from "@/configs/urls";
import { Progress } from "./ui/progress";
import { BeatLoader, ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { RiImageAddFill } from "react-icons/ri";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

export function ImageDropzone() {
  const [file, setFile] = useState<File>();
  const [persnals, setPersnals] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const [colors, setColors] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiLoading1, setApiLoading1] = useState<boolean>(false);
  const [apiLoading2, setApiLoading2] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();
  const [apiLoading3, setApiLoading3] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const Loading1 = () => {
    return (
      <div>
        {progress ? <Progress value={progress} className="" /> : null}
        {progress === 100 ? <div className="h-4" /> : null}
        {progress === 100 ? (
          <div className="font-bold text-center">이미지 업로드 완료</div>
        ) : null}
        {progress === 100 && apiLoading1 ? (
          <div className="text-center">
            <div>퍼스널 컬러 분석 중...</div>
            <BeatLoader color="#36d7b7" />
          </div>
        ) : null}
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div>
        {apiLoading2 ? (
          <div className="text-center">
            <div>맞춤 4가지 색상 분석 중...</div>
            <BeatLoader color="#36d7b7" />
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2">
            <div>
              <BsFillPersonCheckFill />
            </div>
            <div>Persnal Color</div>
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
            disabled={apiLoading}
            className="w-full"
            onClick={async () => {
              if (!file) {
                toast.error("파일을 업로드 해 주세요.");
                return;
              }

              if (file) {
                setApiLoading(true);
                setPersnals(null);
                setColors(null);

                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    console.log(progress);
                    setProgress(progress);
                  },
                });

                console.log(res.url);
                setApiLoading1(true);
                axios
                  .post(apiOrigin + "/api/v1/personal-branding", {
                    url: res.url,
                  })
                  .then((res2) => {
                    setApiLoading1(false);
                    setPersnals(res2.data);
                    setApiLoading2(true);
                    axios
                      .post(apiOrigin + "/api/v1/personal-color", {
                        url: res.url,
                      })
                      .then((res3) => {
                        toast.success("성공!");
                        setApiLoading2(false);
                        setColors(res3.data);
                        console.log(res3.data);
                        setApiLoading(false);
                      })
                      .catch((err) => {
                        toast.error("에러가 발생했습니다.");
                        toast.error("다시 시도해주십시오.");
                      });
                  })
                  .catch((err) => {
                    toast.error("에러가 발생했습니다.");
                    toast.error("다시 시도해주십시오.");
                  });
              }
            }}
          >
            {apiLoading ? <ClipLoader color="#36d7b7" size={16} /> : "업로드"}
          </Button>
        </CardContent>
      </Card>
      <div className="h-4" />
      {!persnals ? <Loading1 /> : null}

      {persnals ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <VscSymbolColor />
              </div>
              <div>당신의 퍼스널 컬러는 ?</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PersnalTable persnals={persnals} />
          </CardContent>
        </Card>
      ) : null}
      <div className="h-4" />

      {!colors ? <Loading2 /> : null}

      {colors ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <VscSymbolColor />
              </div>
              <div>당신에게 어울리는 4가지 색상은 ?</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            {colors.map((color: string) => {
              const regex = /^\#/;
              if (!regex.test(color)) {
                color = "#" + color;
              }
              return (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className="rounded-full w-24 h-24"
                ></div>
              );
            })}
          </CardContent>
        </Card>
      ) : null}

      <div className="h-4" />

      {colors ? (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            let prompt = `성별은 ${e.target.gender.value} 나이는 ${e.target.age.value}살 이다.`;
            for (let i = 0; i < 4; i++) {
              prompt += persnals[i].title;
              prompt += " : ";
              prompt += persnals[i].content;
              prompt += "\n";
            }
            prompt += "이 내용들을 바탕으로 이미지를 만들어줘.";

            setApiLoading3(true);
            axios
              .post(apiOrigin + "/api/v1/prompt", {
                prompt: prompt,
              })
              .then((res) => {
                setImageUrl(res.data.data[0].url);
                setApiLoading3(false);
              });
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <div>
                  <BsPersonBoundingBox />
                </div>
                <div>퍼스널 이미지 생성</div>
              </CardTitle>
              <CardDescription>
                퍼스널 컬러 진단 결과를 바탕으로 이미지를 생성합니다. 좀 더
                정확한 이미지 생성을 위해 추가적인 정보를 입력 해 주세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select name="gender">
                <SelectTrigger>
                  <SelectValue placeholder="성별을 선택 해 주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>성별</SelectLabel>
                    <SelectItem value="male">남자</SelectItem>
                    <SelectItem value="female">여자</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="h-4" />
              <Input
                name="age"
                placeholder="나이를 입력 해 주세요."
                type="number"
              />
            </CardContent>
            <CardFooter>
              <Button disabled={apiLoading3} className="w-full" type="submit">
                {apiLoading3 ? (
                  <ClipLoader color="#36d7b7" size={16} />
                ) : (
                  "퍼스널 컬러를 바탕으로 이미지 생성하기"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      ) : null}

      {imageUrl !== "" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <RiImageAddFill />
              </div>
              <div>생성된 이미지</div>
            </CardTitle>
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
}
