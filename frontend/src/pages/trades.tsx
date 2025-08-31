import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { generateData, processRealUpdate } from "../utils/lib";
import { SubscribtionManager } from "../utils/subscribtionManager";

export default function Trades() {
  const chartRef = useRef(null);

  const backgroundColor = "black";
  const lineColor = "#2962FF";
  const textColor = 'white';
  const areaTopColor = '#2962FF';
  const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

  useEffect(
    () => {

      if (!chartRef.current) {
        return;
      }
      const handleResize = () => {
        //@ts-ignore
        chart.applyOptions({ width: chartRef.current.clientWidth });
      };
      const chart = createChart(chartRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: 900,
        height: 900,
      });
      chart.timeScale().fitContent();

      const main = async () => {
        const candlestickSeries = chart.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
        const startTime = Date.now();
        const endTime = startTime - 10 * 60 * 1000;
        const data1 = await generateData("1m", endTime, startTime, "btc_usdt");
        console.log(data1);
        candlestickSeries.setData(data1);
        window.addEventListener('resize', handleResize);
      }
      main();

      const subscribtionInstance = SubscribtionManager.getInstance();

      subscribtionInstance.registerCallback("BTCUSDT", (trade: any) => {
        console.log("hi there");
        const candle = processRealUpdate(trade);
        console.log("hi there");
        console.log(candle);
        if (candle) {
          candlestickSeries.update(candle);
        }
      });

      subscribtionInstance.subscribe({ type: "subscribe", symbol: "btcusdt_bid_ask" });

      return () => {
        window.removeEventListener('resize', handleResize);
        subscribtionInstance.deregisterCallback("BTCUSDT");
        subscribtionInstance.subscribe({ type: "subscribe", symbol: "btcusdt_bid_ask" });
        chart.remove();
      };
    },

    [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, chartRef]
  );



  return <div className="flex gap-x-4">
    <div>
      trades
    </div>
    <div ref={chartRef}>
    </div>
  </div>

}
