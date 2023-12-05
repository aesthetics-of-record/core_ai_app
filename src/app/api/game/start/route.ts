import { apiOrigin } from "@/configs/urls";
import axios from "axios";

export async function GET(req: Request) {
  const response: any = await fetch(apiOrigin + "/api/game_start?count=4", {
    cache: "no-store",
  });
  const data = await response.json();

  // await axios.get(apiOrigin + "/api/game_start?count=4", {
  //   headers: {
  //     "Cache-Control": "no-cache, no-store, must-revalidate",
  //     Pragma: "no-cache",
  //     Expires: "0",
  //   },
  // });
  // api/game_start 쿼리파라미터 count

  return Response.json(data);
}
