// import { useParams } from "react-router-dom";
import { currencyStore } from "../state/Store";
import { useQuery } from "@tanstack/react-query";
import fetchCoinDetails from "../Services/fetchCoinDetails";

function useFetchCoin(coinId) {
    // const { coinId } = useParams();
  const { currency } = currencyStore();

  // ✅ Fixed variable name: coinId (not coinid)
  const { isError, isLoading, data: coin } = useQuery(
    ["coin", coinId],
    () => fetchCoinDetails(coinId),
    {
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000 * 60 * 2,
    }
  );
  return {
    currency,
    isError,
    isLoading,
    coin
  }
}
export default useFetchCoin;