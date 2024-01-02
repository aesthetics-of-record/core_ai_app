"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";

export default function Page() {
  const router = useRouter();

  return (
    <div className="p-4">
      <Card className="w-96 m-auto">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <div>
              <IoMdPersonAdd />
            </div>
            <div>회원가입</div>
          </CardTitle>
          <CardDescription>회원가입을 해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 items-center">
            <Label className="w-24">아이디</Label>
            <Input placeholder="가입할 아이디" />
          </div>
          <div className="h-4" />
          <div className="flex gap-2 items-center">
            <Label className="w-24">비밀번호</Label>
            <Input placeholder="가입할 비밀번호" />
          </div>
          <div className="h-4" />
          <div className="flex gap-2 items-center">
            <Label className="w-24">사업명</Label>
            <Input placeholder="사업명" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>로그인</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
