"use client";

import { CategoryMenu } from "@/components/CategoryMenu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";

const Page = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const router = useRouter();

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
            <CardDescription>게임 설정을 해주세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                <div>
                  <Label className="w-32 mr-2">카테고리</Label>
                </div>

                <CategoryMenu value={value1} setValue={setValue1} />
              </div>
              <div className="h-6" />
              <div className="">
                <Label className="w-32" htmlFor="count">
                  AI수
                </Label>
                <Input
                  type="number"
                  id="count"
                  className="w-32"
                  value={value2}
                  onChange={(e) => {
                    setValue2(e.target.value);
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                router.push(`/aigame/game?count=${value2}&category=${value1}`);
              }}
            >
              게임시작
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
