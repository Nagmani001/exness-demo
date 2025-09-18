import { useEffect, useRef } from "react";
import { CandlestickSeries, ColorType, createChart } from "lightweight-charts";
import axios from "axios";
import { SubscribtionManager } from "../utils/subscribtionManager";
import { BASE_URL } from "@/utils/utils";


const config = {
  backgroundColor: "black",
  lineColor: "#2962FF",
  textColor: "white",
  areaTopColor: "#2962FF",
  areaBottomColor: "rgba(41, 98, 255, 0.28)",
};

export default function Chart({ interval, market }: {
  interval: string,
  market: string
}) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!chartRef.current) {
      return;
    }

    const chart = createChart(chartRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: config.backgroundColor,
        },
        textColor: config.textColor,
      },
      height: 900,
      width: 900,
    });
    const handleResize = () => {
      chart.applyOptions({ width: chartRef.current?.clientWidth });
    };
    const main = async () => {
      const endTime = Date.now();
      const startTime = endTime - 10 * 60 * 1000;
      const data = await axios.get(`${BASE_URL}/api/v1/kline/?interval=${interval}&market=${market}&startTime=${startTime}&endTime=${endTime}`);
      const newData = data.data.map((x: any) => {
        return {
          open: Number(x.open) / 10000,
          high: Number(x.high) / 10000,
          low: Number(x.low) / 10000,
          close: Number(x.close) / 10000,
          time: new Date(x.time).getTime() / 1000,
        }
      });

      if (!chartRef.current) {
        return;
      }


      const signallingManager = SubscribtionManager.getInstance();

      signallingManager.registerCallback("BTCUSDT", (trade: any) => {
        console.log("nagmani", trade);
      });

      signallingManager.subscribe({
        symbol: "btcusdt_bid_ask",
        type: "subscribe"
      });



      chart.timeScale().fitContent();

      const newSeries = chart.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });

      newSeries.setData(newData);

      window.addEventListener("resize", handleResize);

    }
    main();

    return () => {
      SubscribtionManager.getInstance().subscribe({
        symbol: "btcusdt_bid_ask",
        type: "unsubscribe"
      });
      window.removeEventListener("resize", handleResize)
      chart.remove();
    }

  }, [chartRef, market, interval]);


  return <div >
    <div>hi there</div>
    <div ref={chartRef}></div>
  </div>
}
