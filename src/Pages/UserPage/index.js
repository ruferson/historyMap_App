import React from 'react';

import Footer from '../../components/Footer';
import UserConfig from '../../components/UserConfig';

const UserPage = () => {
	return (
		<div id="main">
			<div className="pl-4 pr-4">
				<UserConfig />
			</div>
			<Footer />
		</div>
	);
}

export default UserPage;