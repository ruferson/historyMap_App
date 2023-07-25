import Ajax from 'components/Ajax';
import { useState } from 'react';
import { useLocation } from 'wouter';

import Footer from '../../components/Footer';
import MapaClick from '../../components/MapaClick';
import useMaps from 'hooks/useMaps';

const MyMapsPage = () => {

	const [location, setLocation] = useLocation();
	const { mapList: privateMapList, loading } = useMaps(true);
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
			console.log(mapa)
			return <MapaClick key={key} mapID={mapa.id} mapImage={mapa.imgUrl} mapName={mapa.name} mapDesc={mapa.name}></MapaClick>
		}
	}

	const getPrivateMaps = () => {
		console.log(privateMapList)
		if (privateMapList) {
			return privateMapList.map(mappingMaps)
		}
	}

	return (
		<div id="main">
			<div className="pr-4 pl-4">
				<h1>Mapas Privados</h1><br />
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