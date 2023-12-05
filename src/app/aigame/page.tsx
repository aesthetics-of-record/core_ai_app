"use client";

import { AiTable } from "@/components/AiTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aiListState } from "@/recoil/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { useRecoilState } from "recoil";

export default function Component() {
  const [aiList, setAiList] = useRecoilState<any>(aiListState);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/game/start").then((res) => {
      setAiList(res.data);
    });
  }, []);

  return (
    <div className="p-4">
      <div className="max-w-lg m-auto">
        <Card className="">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <BsFillPersonCheckFill />
              </div>
              <div>AI Game</div>
            </CardTitle>
            <CardDescription>
              현재 AI들이 어떤 캐릭터를 연기하고 있는 지 맞춰보세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AiTable aiList={aiList} />
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <div></div>
            <Button
              onClick={() => {
                router.push("/aigame");
              }}
            >
              정답맞추기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
