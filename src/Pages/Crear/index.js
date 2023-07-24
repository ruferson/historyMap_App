import Footer from 'components/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

import Creating1st from '../../components/Creating1st';
import Creating2nd from '../../components/Creating2nd';
import { auth } from '../../firebase/firebaseConfig';

const Crear = () => {
	const [mapID, setMapID] = useState(1)
	const [paso, setPaso] = useState(1);

	const segunPasos = () => {
		switch (paso) {
			case 1:
				return (<div id="main">
					<Creating1st setPaso={setPaso} setMapID={setMapID} />
					<br />
					<Footer />
				</div>
				)
			case 2:
				return (<div id="main">
					<Creating2nd
						setPaso={setPaso}
						mapID={mapID}
					/> <br />
					<Footer />
				</div>
				)
		}
	}

	return (
		<>
			{segunPasos()}
		</>
	);
}

export default Crear;