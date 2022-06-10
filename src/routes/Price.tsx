import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrices1, fetchCoinPrices2, fetchCoinPrices3 } from "../api";
import { OverviewItem } from "./Coin";

const OverviewPrice = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
  flex-wrap: wrap;
  row-gap: 20px;
`;

interface IPriceData1 {
  quotes: {
    USD: {
      price: number;
    };
    JPY: {
      price: number;
    };
    CNY: {
      price: number;
    };
  };
}
interface IPriceData2 {
  quotes: {
    EUR: {
      price: number;
    };
    GBP: {
      price: number;
    };
    KRW: {
      price: number;
    };
  };
}

interface IPriceData3 {
  quotes: {
    CHF: {
      price: number;
    };
    CAD: {
      price: number;
    };
    HKD: {
      price: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading: prices1IsLoading, data: prices1 } = useQuery<IPriceData1>(
    ["prices1", coinId],
    () => fetchCoinPrices1(coinId),
    { refetchInterval: 5000 }
  );
  const { isLoading: prices2IsLoading, data: prices2 } = useQuery<IPriceData2>(
    ["prices2", coinId],
    () => fetchCoinPrices2(coinId),
    { refetchInterval: 5000 }
  );
  const { isLoading: prices3IsLoading, data: prices3 } = useQuery<IPriceData3>(
    ["prices3", coinId],
    () => fetchCoinPrices3(coinId),
    { refetchInterval: 5000 }
  );
  const isLoading = prices1IsLoading || prices2IsLoading || prices3IsLoading;
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <OverviewPrice>
          <OverviewItem>
            <span>USD 🇺🇸</span>
            <span>${prices1?.quotes.USD.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>JPY 🇯🇵</span>
            <span>¥{prices1?.quotes.JPY.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>CNY 🇨🇳</span>
            <span>¥{prices1?.quotes.CNY.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>EUR 🇪🇺</span>
            <span>€{prices2?.quotes.EUR.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>GBP 🇬🇧</span>
            <span>£{prices2?.quotes.GBP.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>KRW 🇰🇷</span>
            <span>₩{prices2?.quotes.KRW.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>CSF 🇨🇭</span>
            <span>₩{prices3?.quotes.CHF.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>CAD 🇨🇦</span>
            <span>₩{prices3?.quotes.CAD.price.toFixed(3)}</span>
          </OverviewItem>
          <OverviewItem>
            <span>HKD 🇭🇰</span>
            <span>₩{prices3?.quotes.HKD.price.toFixed(3)}</span>
          </OverviewItem>
        </OverviewPrice>
      )}
    </div>
  );
}

export default Price;
