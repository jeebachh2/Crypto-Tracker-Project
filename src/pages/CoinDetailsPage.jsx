import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function CoinDetailsPage() {

    const {coinId} = useParams();
    return (
        <div>
           
            <h1>Coin details page {coinId}</h1>
        </div>
    )
}

export default CoinDetailsPage;