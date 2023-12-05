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

export default function Page() {
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="hover:opacity-80">
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
          <CardContent></CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <div></div>
            <Button
              onClick={() => {
                router.push("/aigame");
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
