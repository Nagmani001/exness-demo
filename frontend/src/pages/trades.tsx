import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";

import { useEffect, useRef } from "react";
import { generateData } from "../utils/lib";

export default function Trades({ data }: {
  data: any
}) {
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

      const candlestickSeries = chart.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
      const data1 = generateData(2500, 20, 1000);
      candlestickSeries.setData(data1.initialData);

      window.addEventListener('resize', handleResize);



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


      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );



  return <div className="flex gap-x-4">
    <div>
      trades
    </div>
    <div ref={chartRef}>
    </div>
  </div>

}
