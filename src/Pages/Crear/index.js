import React, { useState } from 'react';
import './styles.css';
import { Button } from 'reactstrap';
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
                return (
                    <CrearPaso1 setPaso={setPaso} setMapaID={setMapaID} />
                )
            case 2:
                return (
                    <CrearPaso2
                        setPaso={setPaso}
                        mapaID={mapaID}
                    />
                )
        }
    }

    return (<>
        {segunPasos()}
    </>
    );
}

export default Crear;