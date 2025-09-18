import { ZodUUID } from "zod";

interface UserData {
  id: string,
  email: string,
  password: string,
  balance: {
    [key: string]: number
  }
}

interface Order {
  id: ZodUUID,
  userID: string
  type: "Buy" | "Sell",
  asset: string,
  price: number,
  quantity: number

  openPrice?: number,
  closePrice?: number,
  pnl?: number
  margin?: number,
  leverage?: number
}

export const OPEN_ORDER: Order[] = [];
export const IN_MEMORY_USER: UserData[] = [];

export const JWT_SECRET = "nagmani";


export function buyAsset(userBalance: number, asset: string) {

}
