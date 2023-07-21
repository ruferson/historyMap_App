import React, { useEffect } from 'react';

import useNotificationList from '../../hooks/useNotificationList';
import NotificationComponent from '../NotificationComponent';

const Notifications = (props) => {

	const { notificationList, loading } = useNotificationList();

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