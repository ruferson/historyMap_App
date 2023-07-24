import { useEffect, useState } from "react";
import { getNotificaciones } from "../servicios/getNotifications";

const useNotifications = () => {
	const [notificationList, setNotificationList] = useState();
	const [loading, setLoading] = useState(true)

	const obtainNotifications = () => {
		getNotificaciones().then(myNotif => {
			setNotificationList(myNotif);
			setLoading(false)
		});
	}
	useEffect(obtainNotifications, []);

	return { notificationList, loading }
}

export default useNotifications;