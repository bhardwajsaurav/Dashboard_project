
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Camp from "./campaingn/Campaingn"



const Myroute = () => {

    return (

        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Camp
                                
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )


}



export default Myroute;