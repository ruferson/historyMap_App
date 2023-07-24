import React, { useEffect } from 'react';

import useNotifications from '../../hooks/useNotifications';
import Notificacion from '../Notificacion';

const MisNotificaciones = (props) => {

	const { notificationList, loading } = useNotifications();

	useEffect(() => {
		if (!loading) {
			props.setNotificaciones(notificationList.data.length)
		}
	}, [loading])

	const mapMyNotifications = (notification, key) => {
		return <Notificacion url={notification.url} noteName={notification.type} noteDesc={notification.description}></Notificacion>
	}

	const getMyNotifications = () => {
		return notificationList.data.map(mapMyNotifications)
	}

	return (
		<div className="notificaciones">
			<h1 className="text-white">Mis Notificaciones</h1><br />
			<div className="row">
				{!loading ? getMyNotifications() : <></>}
			</div>
		</div>
	);
}

export default MisNotificaciones;