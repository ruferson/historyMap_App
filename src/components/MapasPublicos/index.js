import Ajax from 'components/Ajax';
import { useState } from 'react';
import { useLocation } from 'wouter';

import useMapList from '../../hooks/useMapList';
import MapaClick from '../MapaClick';
import { auth } from '../../firebase/firebaseConfig';

const MapasPublicos = () => {

	const [location, setLocation] = useLocation();
	const { mapList, loading } = useMapList(false);
	const [pagination, setPagination] = useState(0);

	const moveRight = () => {
		if (!loading) {
			if (mapList.length - 1 > pagination) {
				if (mapList.length - 1 <= pagination + 3) {
					if (mapList.length - 1 === pagination + 3) {
						setPagination(mapList.length - 1)
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
			return <MapaClick key={key} uid={mapa.uid} mapID={mapa.id} mapImage={mapa.imgUrl} mapName={mapa.name} mapDesc={mapa.name}></MapaClick>
		}
	}

	const getMyMaps = () => {
		if (mapList.length) {
			return mapList.map(mapMyMaps)
		} else {
			return (<h4>¡No hay ningún mapa por aquí!</h4>)
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