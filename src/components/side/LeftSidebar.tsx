"use client";

import { useMemo } from "react";
import Box from "../Box";
import { HiHome } from "react-icons/hi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { RiImageEditFill, RiImageAddFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "홈",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: BsFillPersonCheckFill,
        label: "퍼스널컬러",
        active: pathname === "/persnal",
        href: "/persnal",
      },
      {
        icon: RiImageEditFill,
        label: "이미지변형",
        active: pathname === "/image-edit",
        href: "/image-edit",
      },
      {
        icon: RiImageAddFill,
        label: "이미지생성",
        active: pathname === "/image-create",
        href: "/image-create",
      },
    ],
    [pathname]
  );

  return (
    <div className={cn("flex", className)}>
      <div className="flex flex-col gap-y-2 h-screen w-[250px] border-r">
        <Box className="h-full px-5">
          <div className="flex flex-col gap-y-2 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item}></SidebarItem>
            ))}
          </div>
          <Separator />
        </Box>
      </div>
    </div>
  );
};

export default LeftSidebar;
