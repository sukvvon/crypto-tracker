import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinOhlcv } from "../api";
import { isDarkThemeState } from "../atom";

export interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDarktheme = useRecoilValue(isDarkThemeState);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinOhlcv(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      price.open.toFixed(2),
                      price.high.toFixed(2),
                      price.low.toFixed(2),
                      price.close.toFixed(2),
                    ],
                  };
                }),
              },
            ] as any
          }
          options={{
            theme: {
              mode: isDarktheme ? "dark" : "light",
            },
            chart: {
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
