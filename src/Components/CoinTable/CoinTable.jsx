import {   useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { CurrencyContext } from "../../context/CurrencyContext";
// import currencyStore from '../../state/Store';
import { currencyStore } from '/src/state/Store.js';
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoader/PageLoad"



function CoinTable() {
  const {currency} = currencyStore();
  const navigate = useNavigate();
  const [page, setPage] = useState(1)

  const fetchCoins = async (page) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=10&page=${page}`
    )
    if (!res.ok) throw new Error('Network response was not ok')
    return res.json()
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['coins', page, currency], // 👈 unique cache per page
    queryFn: () => fetchCoins(page, currency),
    keepPreviousData: true, // 👈 keeps old data while loading new
    staleTime: 1000 * 60,   // optional: 1 minute
  })


  function handleCoinRedirect(id) {
    navigate(`/details/${id}`);
  };

  if (isLoading) {
    return <PageLoader />;
  }
  if (isError) return <p>Error: {error.message}</p>
  if (!data) return null

  return (
    <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
      <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
        <div className="basis-[35%]">Coin</div>
        <div className="basis-[25%]">Price</div>
        <div className="basis-[20%]">24h Change</div>
        <div className="basis-[20%]">market cap</div>
      </div>

      <div className="flex flex-col w-[80vw] mx-auto">
        {data && data.map((coin) => (
          
          <div onClick={() => handleCoinRedirect(coin.id)}
            key={coin.id}
            className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between cursor-pointer
              hover:bg-gray-800 transition-all duration-200
            "
          >
            <div className="flex items-center justify-start gap-3 basis-[35%]">
              <div className="w-[5rem] h-[5rem]">
                <img src={coin.image} alt={coin.name} className="w-full h-full" loading="lazy"/>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl">{coin.name}</div>
                <div className=" text-xl">{coin.symbol}</div>
              </div>
            </div>

            <div className="basis-[25%]">{coin.current_price}</div>
            <div
              className={`basis-[20%] ${
                coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="basis-[20%]">${coin.market_cap.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* 🔹 Pagination buttons */}
      <div className="flex gap-4 mt-5">
        <button
          disabled={page === 1}
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CoinTable;