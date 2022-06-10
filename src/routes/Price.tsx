import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrices1, fetchCoinPrices2, fetchCoinPrices3 } from "../api";

const OverviewPrice = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
  flex-wrap: wrap;
  row-gap: 20px;
`;

const OverviewItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33%;
  span:first-child {
    font-size: 48px;
  }
  span:nth-child(2) {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
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
          <OverviewItemPrice>
            <span>🇺🇸</span>
            <span>USD</span>
            <span>${prices1?.quotes.USD.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇯🇵</span>
            <span>JPY</span>
            <span>¥{prices1?.quotes.JPY.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇨🇳</span>
            <span>CNY</span>
            <span>¥{prices1?.quotes.CNY.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇪🇺</span>
            <span>EUR</span>
            <span>€{prices2?.quotes.EUR.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇬🇧</span>
            <span>GBP</span>
            <span>£{prices2?.quotes.GBP.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇰🇷</span>
            <span>KRW</span>
            <span>₩{prices2?.quotes.KRW.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇨🇭</span>
            <span>CSF</span>
            <span>CSF{prices3?.quotes.CHF.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇨🇦</span>
            <span>CAD</span>
            <span>${prices3?.quotes.CAD.price.toFixed(3)}</span>
          </OverviewItemPrice>
          <OverviewItemPrice>
            <span>🇭🇰</span>
            <span>HKD</span>
            <span>${prices3?.quotes.HKD.price.toFixed(3)}</span>
          </OverviewItemPrice>
        </OverviewPrice>
      )}
    </div>
  );
}

export default Price;
