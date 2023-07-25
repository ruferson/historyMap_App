import React, { useEffect } from 'react';

import useNotifications from '../../hooks/useNotifications';
import NotificationComponent from '../NotificationComponent';

const Notifications = (props) => {

	const { notificationList, loading } = useNotifications();

	useEffect(() => {
		if (!loading) {
			props.setNotificaciones(notificationList.length)
		}
	}, [loading])

	const mapMyNotifications = (notification, key) => {
		return <NotificationComponent url={notification.url} noteName={notification.type} noteDesc={notification.description}></NotificationComponent>
	}

	const getMyNotifications = () => {
		return notificationList.map(mapMyNotifications)
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

export default Notifications;