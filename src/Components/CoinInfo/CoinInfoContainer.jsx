// import { useQuery } from "@tanstack/react-query";
import CoinInfo from "./CoinInfo";
// import { currencyStore } from "../../state/Store";
// import { fetchCoinHistoricData } from "../../Services/fetchCoinHistoricData";
// import { useState } from "react";
import Alert from "../Alert/Alert";
import PageLoad from "../PageLoader/PageLoad";
import useFetchCoinHistory from "../../hooks/useFetchCoinHistory";

function CoinInfoContainer({ coinId }) {

    const {historicData, isError, isLoading, currency, days, setDays, setCoinInterval} = useFetchCoinHistory(coinId);

    if (isLoading) {
        return <PageLoad />
    }

    if (isError) {
        return <Alert message="Error fetching data" type="error" />
    }

    return (
        <div>
            <CoinInfo
                historicData={historicData}
                setDays={setDays}
                setCoinInterval={setCoinInterval}
                days={days}
                currency={currency} />
        </div>
    )
}

export default CoinInfoContainer;