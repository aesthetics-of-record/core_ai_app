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
import { useRouter } from "next/navigation";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { RiImageEditFill } from "react-icons/ri";

export default function Component() {
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <BsFillPersonCheckFill />
              </div>
              <div>Persnal Color</div>
            </CardTitle>
            <CardDescription>
              여러분의 퍼스널컬러와 퍼스널브랜드를 AI를 통해 찾아보세요.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <div></div>
            <Button
              onClick={() => {
                router.push("/persnal");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <RiImageEditFill />
              </div>
              <div>Image To Image</div>
            </CardTitle>
            <CardDescription>
              여러분의 사진을 애니메이션처럼 변화시켜보세요.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <div></div>
            <Button
              onClick={() => {
                router.push("/image-edit");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <RiImageEditFill />
              </div>
              <div>Text To Image</div>
            </CardTitle>
            <CardDescription>
              텍스트를 통해 이미지를 생성해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <div></div>
            <Button
              onClick={() => {
                router.push("/image-create");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <RiImageEditFill />
              </div>
              <div>Gallery</div>
            </CardTitle>
            <CardDescription>
              지금까지 만들어진 이미지들을 확인 해 보세요.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <div></div>
            <Button
              onClick={() => {
                router.push("/gallery");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
