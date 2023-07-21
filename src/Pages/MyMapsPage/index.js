import Ajax from 'components/Ajax';
import { useState } from 'react';
import { useLocation } from 'wouter';

import Footer from '../../components/Footer';
import MapaClick from '../../components/MapaClick';
import useMapList from 'hooks/useMapList';

const MyMapsPage = () => {

	const [location, setLocation] = useLocation();
	const { mapList: privateMapList, loading } = useMapList(true);
	const [pagination, setPagination] = useState(0);

	const moveRight = () => {
		if (!loading) {
			if (privateMapList.length - 1 > pagination) {
				if (privateMapList.length - 1 <= pagination + 3) {
					if (privateMapList.length - 1 === pagination + 3) {
						setPagination(privateMapList.length - 1)
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


	const mappingMaps = (mapa, key) => {
		if (key < (pagination + 3) && key >= pagination) {
			return <MapaClick key={key} mapID={mapa.id} uid={mapa.uid} mapImage={mapa.imgUrl} mapName={mapa.name} mapDesc={mapa.name}></MapaClick>
		}
	}

	const getPrivateMaps = () => {
		if (privateMapList.length) {
			return privateMapList.map(mappingMaps)
		} else {
			return (<h4>¡No hay ningún mapa por aquí!</h4>)
		}
	}

	return (
		<div id="main">
			<div className="pr-4 pl-4">
				<h1>Mis Mapas</h1><br />
				{!loading
					? <>
						<div className="row">
							{getPrivateMaps()}
						</div> <br />
						<button className="d-none d-md-inline" onClick={() => setLocation("/crear")}>Crear Mapa Nuevo</button>
						<button className="d-md-none button" onClick={() => setLocation("/crear")}>Crear Mapa Nuevo</button>
						{privateMapList && privateMapList.length > 3
							?
							<>
								<button className="float-right button" onClick={() => moveRight()}>Siguiente</button>
								<button className="float-right button" onClick={() => moveLeft()}>Anterior</button>
							</>
							: <></>} <br />
					</>
					: <Ajax />}
			</div>
			<div className=""><Footer /></div>
		</div>
	);

}

export default MyMapsPage;