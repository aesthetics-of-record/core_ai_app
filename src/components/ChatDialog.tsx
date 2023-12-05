"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChatDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chat</DialogTitle>
          <DialogDescription>
            어떤 캐릭터일지 대화를 하며 맞춰보세요.
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col w-full">
          <header className="border-b dark:border-zinc-700 p-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <div>
                <span>???</span>
                <span className="text-xs text-green-600 block">Online</span>
              </div>
            </h2>
          </header>
          <main className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="rounded-lg bg-zinc-700 p-2">
                  <p className="text-sm">안녕</p>
                </div>
              </div>
              <div className="flex items-end gap-2 justify-end">
                <div className="rounded-lg bg-primary p-2">
                  <p className="text-sm">반가워 !</p>
                </div>
              </div>
            </div>
          </main>
          <footer className="border-t dark:border-zinc-700 p-4">
            <div className="flex items-center gap-2">
              <Input className="flex-1" placeholder="메시지를 입력하세요..." />
              <Button>Send</Button>
            </div>
          </footer>
        </section>
      </DialogContent>
    </Dialog>
  );
}
