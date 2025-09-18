import { DropDownMarket } from "@/components/dropdown";
import Chart from "../components/chart";

export default function Trade() {
  return <div>
    <DropDownMarket />
    <Chart interval="1m" market="btc_usdt" />
  </div>
}
