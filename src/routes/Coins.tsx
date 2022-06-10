import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkThemeState } from "../atom";

export const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Button = styled.button`
  font-size: 20px;
  background-color: ${(props) => props.theme.boxColor};
  border: 0;
  border-radius: 10px;
  padding: 10px 20px;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const ThemeToggleButton = styled(Button)`
  position: absolute;
  right: 0;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: false;
  is_activate: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("coins", fetchCoins);
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkThemeState);
  const onClick = () => setIsDarkTheme((current) => !current);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
        <ThemeToggleButton onClick={onClick}>
          {isDarkTheme ? "🌙" : "🌞"}
        </ThemeToggleButton>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: coin.id,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
