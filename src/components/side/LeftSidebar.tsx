"use client";

import { useMemo } from "react";
import Box from "../Box";
import { HiHome } from "react-icons/hi";
import { BsFillPersonCheckFill, BsImages } from "react-icons/bs";
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
        label: "AI맞추기",
        active: pathname === "/aigame",
        href: "/aigame",
      },
      // {
      //   icon: BsImages,
      //   label: "갤러리",
      //   active: pathname === "/gallery",
      //   href: "/gallery",
      // },
    ],
    [pathname]
  );

  return (
    <div className={cn("flex", className)}>
      <div className="flex flex-col gap-y-2 h-screen w-[250px] border-r">
        <Box className="h-full px-5">
          <div className="flex flex-col gap-y-2 px-5 py-4">
            {routes.map((item: any) => {
              return (
                <>
                  <SidebarItem key={item.label} {...item}></SidebarItem>
                  {item.href === "/image-create" ? <Separator /> : null}
                </>
              );
            })}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default LeftSidebar;
