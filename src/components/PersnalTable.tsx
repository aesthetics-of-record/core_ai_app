import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PersnalTable({ persnals }: { persnals: any }) {
  return (
    <Table>
      <TableCaption>당신의 퍼스널 컬러</TableCaption>
      <TableCaption className="text-sm text-zinc-500">
        주의 : 환경의 색감에 영향을 받을 수 있습니다.
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">항목</TableHead>
          <TableHead>설명</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {persnals.map((row: any) => (
          <TableRow key={row.title}>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.content}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
