import Ajax from 'components/Ajax';
import { useState } from 'react';
import { useLocation } from 'wouter';

import useMaps from '../../hooks/useMaps';
import MapaClick from '../MapaClick';

const MapasPublicos = () => {

	const [location, setLocation] = useLocation();
	const { mapList, loading } = useMaps(false);
	const [pagination, setPagination] = useState(0);

	const moveRight = () => {
		if (!loading) {
			if (mapList.data.length - 1 > pagination) {
				if (mapList.data.length - 1 <= pagination + 3) {
					if (mapList.data.length - 1 === pagination + 3) {
						setPagination(mapList.data.length - 1)
					}
				} else {
					setPagination(pagination + 3)
				}
			}
		}
		return null;
	}

	const moveLeft = () => {
		if (!loading) {
			if (0 < pagination) {
				if (0 >= pagination - 3) {
					setPagination(0)
				} else {
					setPagination(pagination - 3)
				}
			}
		}
		return null;
	}

	const mapMyMaps = (mapa, key) => {
		if (key < (pagination + 3) && key >= pagination) {
			return <MapaClick key={key} mapID={mapa.id} mapImage={mapa.link_imagen} mapName={mapa.name} mapDesc={mapa.name}></MapaClick>
		}
	}

	const getMyMaps = () => {
		if (mapList.data) {
			return mapList.data.map(mapMyMaps)
		}
	}

	return (
		<>
			{
				!loading
					? <>
							<div className="row"> {getMyMaps()} </div>
							<br />
							<button className="d-none d-md-inline" onClick={() => setLocation("/crear")}>Crear Mapa Nuevo</button>
							<button className="d-md-none button" onClick={() => setLocation("/crear")}>Crear Mapa Nuevo</button>
							{mapList.length > 3
								?
									<>
										<button className="float-right button" onClick={() => moveRight()}>Siguiente</button>
										<button className="float-right button" onClick={() => moveLeft()}>Anterior</button>
									</>
								: <></>}
						</>
					: <Ajax />
			}
		</>
	);

}

export default MapasPublicos;