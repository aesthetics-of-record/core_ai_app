"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { ChatDialog } from "./ChatDialog";
import { useRecoilState } from "recoil";
import { RandomAiNameListState } from "@/recoil/store";
import { useEffect } from "react";

export function AiTable({ aiList }: { aiList: any }) {
  // 랜덤화 시켜서 aiList를 서버에서 보내줄 예정.
  const [randomAiNameList, setRandomAiNameList] = useRecoilState<any>(
    RandomAiNameListState
  );
  // 보기를 만들기 위해 받은 리스트를 랜덤화 하여 보기를 만듬
  const popRandomElement = (arr: any[]) => {
    if (arr.length === 0) return; // 배열이 비어있으면 undefined 반환

    let randomIndex = Math.floor(Math.random() * arr.length); // 무작위 인덱스 생성
    let element = arr[randomIndex]; // 요소 선택

    arr.splice(randomIndex, 1); // 배열에서 요소 제거

    return element; // 선택된 요소 반환
  };

  useEffect(() => {
    let randomList = [];
    for (let i = 0; i < aiList.length; i++) {
      let randomElement = popRandomElement([...aiList]);
      randomList.push(randomElement);
    }
    console.log(randomList);
    setRandomAiNameList(randomList);
  }, [aiList]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">
              <div className="text-center mb-4">보기</div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="grid grid-cols-2">
          {randomAiNameList.map((randomAi: any, index: number) => {
            return (
              <TableCell>
                {index + 1}. {randomAi.name}
              </TableCell>
            );
          })}
        </TableBody>
      </Table>

      <div className="h-10" />
      <Table>
        <TableCaption>Ai 들이 누구인지 맞춰보세요.</TableCaption>
        <TableCaption className="text-sm text-zinc-500">
          주의 : ~~~
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">AI</TableHead>
            <TableHead>정답</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aiList.map((row: any) => (
            <TableRow key={row.id} className="w-full">
              <ChatDialog>
                <TableCell className="font-medium cursor-pointer w-[250px]">
                  {row.id}
                </TableCell>
              </ChatDialog>

              <TableCell className="font-medium">
                <Input type="number"></Input>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
