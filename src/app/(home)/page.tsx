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

export default function Page() {
  const router = useRouter();

  return <div className="p-4">홈페이지</div>;
}
