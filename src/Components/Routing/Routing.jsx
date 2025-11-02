import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from 'react';
import MainLayout from "../../pages/Layout";

const Home = lazy(() => import('../../pages/Home'));
const CoinDetailsPage = lazy(() => import('../../pages/CoinDetailsPage'));


function Routing() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
            
               <Route index element={
                 <Suspense fallback={<div>Loading Home...</div>}>
                    <Home/>
                </Suspense>
               } />
               <Route path="/details/:coinId" element={
                 <Suspense fallback={<div>Loading details...</div>}>
                    <CoinDetailsPage />
                </Suspense>
               } />

            </Route>
            
        </Routes>
    );

}

export default Routing;