import { apiOrigin } from "@/configs/urls";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await axios.post(apiOrigin + "/api/v1/chat", body);

  return Response.json(response.data);
}
