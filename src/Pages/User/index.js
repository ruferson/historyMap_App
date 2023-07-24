import React from 'react';
import { useLocation } from 'wouter';

import UserConfig from '../../components/UserConfig';
import Footer from '../../components/Footer';

const User = () => {
	return (
		<div id="main">
			<div className="pl-4 pr-4">
				<UserConfig />
			</div>
			<Footer />
		</div>
	);
}

export default User;