import React from 'react';
import { Button } from 'reactstrap';
import { useLocation } from 'wouter';

const NotificationComponent = (props) => {

	const [location, setLocation] = useLocation();

	const switchType = () => {
		switch (props.noteName) {
			case "share":
				return "Invitación";
			case "message":
				return "Mensaje";
			default:
				return "ERROR";
		}
	}

	return (
		<div className="col-12 mb-2 text-left">
			<div className="card">
				<div className="card-body">
					{props.noteName === "share" ? <Button className="btn-primary float-right" onClick={() => { setLocation(props.url) }}>Ver</Button> : <></>}
					<h4 className="card-title">{switchType()}</h4>
					<p className="card-text">{props.noteDesc}</p>
				</div>
			</div>
		</div>
	);
}

export default NotificationComponent;
