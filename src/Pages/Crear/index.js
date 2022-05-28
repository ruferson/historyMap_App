import Footer from 'components/Footer';
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import CrearPaso1 from '../../components/CrearPaso1';
import CrearPaso2 from '../../components/CrearPaso2';

function Crear() {

    const [location, setLocation] = useLocation();
    const [mapaID, setMapaID] = useState(1)
    const [paso, setPaso] = useState(1);

    if (localStorage.getItem("isLoggedIn") === "false") {
        setLocation("/session")
    }

    function segunPasos() {
        switch (paso) {
            case 1:
                return (<div id="main">
                    <CrearPaso1 setPaso={setPaso} setMapaID={setMapaID} />
                    <br/>
                    <Footer />
                </div>
                )
            case 2:
                return (<div id="main">
                    <CrearPaso2
                        setPaso={setPaso}
                        mapaID={mapaID}
                    /> <br/>
                    <Footer />
                </div>
                )
        }
    }

    return (<>
        {segunPasos()}
    </>
    );
}

export default Crear;