import React from 'react';

import Footer from '../../components/Footer';
import MapasPublicos from '../../components/MapasPublicos';

const PublicMapsPage = () => {
	return (
		<div id="main">
			<div className="pr-4 pl-4">
				<h1>Mapas Públicos</h1><br />
				<MapasPublicos />
			</div>
			<Footer />
		</div>
	);
}

export default PublicMapsPage;