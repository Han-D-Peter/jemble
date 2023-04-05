import { NetworkResult, TimeattckResponse } from "@/interface/network";
import ky from "ky";

class GameRepository {
  requestTimeattack({
    result,
    amount,
  }: {
    result: "win" | "lose";
    amount: number;
  }): Promise<NetworkResult<TimeattckResponse>> {
    return ky
      .get(`/api/game/timeattack?result=${result}&amount=${amount}`)
      .json();
  }
}

export default new GameRepository();
