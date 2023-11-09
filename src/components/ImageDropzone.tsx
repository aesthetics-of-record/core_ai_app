"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { VscSymbolColor } from "react-icons/vsc";
import { PersnalTable } from "./PersnalTable";
import axios from "axios";
import { apiOrigin } from "@/configs/urls";
import { Progress } from "./ui/progress";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";

export function ImageDropzone() {
  const [file, setFile] = useState<File>();
  const [persnals, setPersnals] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const [colors, setColors] = useState<any>(null);
  const [apiLoading1, setApiLoading1] = useState<boolean>(false);
  const [apiLoading2, setApiLoading2] = useState<boolean>(false);
  const { edgestore } = useEdgeStore();

  const Loading1 = () => {
    return (
      <div>
        {progress ? <Progress value={progress} className="" /> : null}
        {progress === 100 ? <div className="h-4" /> : null}
        {progress === 100 ? (
          <div className="font-bold text-center">이미지 업로드 완료</div>
        ) : null}
        {progress === 100 && apiLoading1 ? (
          <div className="">
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
          <div>
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
            height={200}
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
                  .post(apiOrigin + "/api/persnal", { url: res.url })
                  .then((res2) => {
                    setApiLoading1(false);
                    setPersnals(res2.data);
                    setApiLoading2(true);
                    axios
                      .post(apiOrigin + "/api/color", { url: res.url })
                      .then((res3) => {
                        toast.success("성공!");
                        setApiLoading2(false);
                        setColors(res3.data);
                        console.log(res3.data);
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
            업로드
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
            {colors.map((color: any) => {
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
    </div>
  );
}
