import { useEffect, useState } from 'react';

import { getUserById } from '../servicios/getUser';

const useUser = (userID) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const obtenerUser = () => {
		setLoading(true);
		getUserById(userID)
			.then((user) => {
				setUser(user);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error al obtener el usuario:', error);
				setUser(null);
				setLoading(false);
			});
	};

	useEffect(obtenerUser, [userID]);

	return { user, loading };
};

export default useUser;
