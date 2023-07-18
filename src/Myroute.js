
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Camp from "./campaingn/Campaingn"
import NewCamp from "./newcampaign/page"

import logo from "./assets/images/logo6_edited.png"



const Myroute = () => {

    return (
        
        <>
           <div className="p-3 ">
           
                    <img src={logo}/>
            
           </div>
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

                    <Route
                        exact
                        path="/newcampaign"
                        element={
                            <NewCamp
                                
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    )


}



export default Myroute;