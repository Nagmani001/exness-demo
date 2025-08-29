import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";

import { useEffect, useRef } from "react";
import { generateData } from "../utils/lib";

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

        const data1 = await generateData("1m", 1756457851907, 1756458151907, "btc_usdt");
        console.log(data1);
        candlestickSeries.setData(data1);
        window.addEventListener('resize', handleResize);
      }
      main();




      /*
      function* getNextRealtimeUpdate(realtimeData: any) {
        for (const dataPoint of realtimeData) {
          yield dataPoint;
        }
        return null;
      }

      const streamingDataProvider = getNextRealtimeUpdate(data1.realtimeUpdates);

      const intervalID = setInterval(() => {
        const update = streamingDataProvider.next();
        if (update.done) {
          clearInterval(intervalID);
          return;
        }
        candlestickSeries.update(update.value);
      }, 100);
        */


      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );



  return <div className="flex gap-x-4">
    <div>
      trades
    </div>
    <div ref={chartRef}>
    </div>
  </div>

}
