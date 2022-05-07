import React, { useState } from 'react';
import './styles.css';
import { Button } from 'reactstrap';
import { useLocation } from 'wouter';
import CrearPaso1 from '../../components/CrearPaso1';
import CrearPaso2 from '../../components/CrearPaso2';
import Footer from '../../components/Footer';

function Crear() {

    const [location, setLocation] = useLocation();
    const [mapaID, setMapaID] = useState(1)
    const [paso, setPaso] = useState(1);

    if (localStorage.getItem("userData")!==null && JSON.parse(localStorage.getItem("userData")).rol==="profesor"){

        //const [id, setID] = useState(props.id);
        
        function segunPasos(){
            switch (paso) {
                case 1:
                    return (
                        <CrearPaso1 setPaso={setPaso}/>
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
    } else {
        return (<>
            <div className="pl-4 pr-4 pt-3">
                <div className="jumbotron">¡No tienes permiso para entrar aquí!</div>
                <Button onClick={()=>{setLocation("/")}}>Volver al inicio.</Button>
            </div>
                <div className="footer-abajo">
                    <Footer/>
                </div>
            </>
        )
    }
}

export default Crear;