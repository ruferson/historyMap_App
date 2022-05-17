import React from "react";
import Footer from "../../components/Footer";
import MapasPublicos from "../../components/MapasPublicos";
import "./styles.css";

function Inicio () {

    return (<>
        <div className="pl-4 pr-4 pt-3">
            <h1 className="text-white">Mapas públicos</h1><br/>
            <MapasPublicos/>
            {/**Aquí iría un mapeo de los mapas públicos pero no todos, unos 15 o así. */}
        </div>
        <div className="footer-abajo"><Footer /></div>
        </>
    );
  }

  export default Inicio;