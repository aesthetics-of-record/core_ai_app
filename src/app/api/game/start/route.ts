import { apiOrigin } from "@/configs/urls";
import axios from "axios";

export async function GET(req: Request) {
  const response: any = await axios.get(apiOrigin + "/api/game_start?count=4");
  // api/game_start 쿼리파라미터 count

  return Response.json(response.data);
}
