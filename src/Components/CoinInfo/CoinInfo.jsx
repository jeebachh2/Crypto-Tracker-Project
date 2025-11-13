import Alert from "../Alert/Alert";
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import chart from "chart.js/auto";
import { chartDays } from "../../helpers/Constant";


function CoinInfo({ historicData, setDays, setCoinInterval, days, currency }) {
       
  
  

    function handleDayChange(e) {
        console.log(e.target.options[e.target.selectedIndex].value);
        const daySelected = e.target.options[e.target.selectedIndex].value;
        if(daySelected == 1) {
            setCoinInterval('');
        } else {
            setCoinInterval('daily');
        }
        setDays(e.target.options[e.target.selectedIndex].value);
    }

    chart.register(CategoryScale);


    if (!historicData) {
        return <Alert message="No data available" type="info" />
    }
    return (
        <div
            className="flex flex-col items-center justify-center mt-6 p-6 w-full "
        >
            <Line
                data={{
                    labels: historicData.prices.map(coinPrices => {
                        let date = new Date(coinPrices[0]);   // convering unix timestamp to date
                        let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` :
                            `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();

                    }),
                    datasets: [
                        {
                            label: `price (past ${days} ${days === 1 ? 'Day' : 'Days'}) in ${currency?.toUpperCase()}`,
                            data: historicData.prices.map(coinPrice => coinPrice[1]),
                        }
                    ]
                }}
                option={{
                    responsive: true,
                    maintainAspectRatio: false,
                    elements: {
                        point: {
                            radius: 0
                        }
                    }
                }}
            />


            <div className="flex justify-center mt-5 w-full">
                <select className="select select-primary w-full max-w-x5" onChange={handleDayChange}>
                    {chartDays.map((days, index) => {
                        return (
                            <option selected={days == days.value} key={index} value={days.value}  >
                                 {days.label}
                            </option>
                        )

                    })}
                   
                </select>
            </div>
        </div>

    )
}

export default CoinInfo;