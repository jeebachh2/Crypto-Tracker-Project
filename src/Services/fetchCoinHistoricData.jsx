// import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";


// export async function fetchCoinHistoricData(id, interval, days = 7, currency = 'usd') {
//     try {
//         // const response = await axiosInstance.get(`/coins/${id}/market_chart?days=${days}&vs_currency=${currency}&interval=${interval}`);
//         // return response.data;

//         // const response = await axios.get(`http://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
//         //     params: {
//         //         vs_currency: "usd",
//         //         days: 7,
//         //         interval: "daily",
//         //     }
//         // });
//         // return response.data;

//         const response = await axiosInstance.get(`/coins/${id}/market_chart`, {
//             params: {
//                 vs_currency: currency,
//                 days: days,
//                 interval: "hourly", // or interval
//             }
//         });





//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }






export async function fetchCoinHistoricData(
  id,
  interval = "hourly",
  days = 7,
  currency = "usd"
) {
  try {
    let safeInterval = interval.replace(":", "");

    if (!["hourly", "daily"].includes(safeInterval)) {
      safeInterval = days <= 1 ? "hourly" : "daily";
    }

    const { data } = await axiosInstance.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
        interval: safeInterval,
      },
    });

    return data;
  } catch (error) {
    console.error("FETCH HISTORIC DATA ERROR → ", error);
    return null;
  }
}





