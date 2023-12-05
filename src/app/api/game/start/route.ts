import { apiOrigin } from "@/configs/urls";
import axios from "axios";

export async function GET(req: Request) {
  const response: any = await axios.get(apiOrigin + "/api/game/start");

  return Response.json(response.data);
}
