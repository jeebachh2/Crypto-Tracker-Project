import { useParams } from "react-router-dom";
// import fetchCoinDetails from '/src/Services/fetchCoinDetails.js';
// import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import {fetchCoinDetails} from "../Services/fetchCoinDetails";
// import { currencyStore } from "../state/Store";
import CoinInfoContainer from "../Components/CoinInfo/CoinInfoContainer";
import useFetchCoin from "../hooks/useFetchCoin";
// import parse from 'html-react-parser';

function CoinDetailsPage() {
  

  const {coinId} = useParams();
  const {isLoading, isError, coin, currency} = useFetchCoin(coinId);


  useEffect(() => {
    console.log(coin);
  }, [coin]);

  if (isLoading) {
    return <div>Downloading coin details...</div>;
  }

  if (isError) {
    return <div>Error: Something went wrong.</div>;
  }

  // ✅ Optional: Safe check for coin data
  if (!coin) {
    return <div>No coin data found.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">

     <div className="md:w-1/3 w-full flex flex-col items-center mt-6 md:mt-0 border-r-2 border-gray-500 pr-6">
      <img  alt={coin?.name}
      src={coin?.image?.large}
      className="h-57 mb-5"
      />

      <h1 className="text-4xl font-bold mb-5">{coin?.name} ({coin?.symbol?.toUpperCase()})</h1>
      <p className="w-full px-6 py-4 text-justify">{coin?.description?.en}</p>
      <div className="w-full flex flex-col md:flex-row md:justify-around">
        <div className="flex items-center m-4 md:mb-0">
          <h2 className="text-xl font-bold">Rank</h2>
          <span className="ml-3 text-xl">
            {coin?.market_cap_rank}
          </span>
        </div>
        <div className="flex items-center m-4 md:mb-0">
           <h2 className="text-xl text-yellow-400 font-bold">Current Price</h2>
          <span className="ml-3 text-xl">
            {coin?.market_data?.current_price?.[currency]}
          </span>
        </div>
      </div>
     </div>

     <div className="md:w-2/3 w-full p-6">
     <CoinInfoContainer coinId={coinId}/>
     </div>
    </div>
  );
}

export default CoinDetailsPage; 