import Ajax from 'components/Ajax';
import useMarker from 'hooks/useMarker';
import React from 'react';

const EventComponent = (props) => {

	const { markerData, loadingMarker } = useMarker(props.id);

	if (markerData !== null) {
		props.setMarker(markerData);
	}

	return (
		<>
			{!props.noClicked
				? !loadingMarker && markerData
					? <>
							<p dangerouslySetInnerHTML={{ __html: props.type }} />
							<h1 dangerouslySetInnerHTML={{ __html: markerData.title }} />
							<br />
							<div dangerouslySetInnerHTML={{ __html: markerData.html }} />
						</>
					: <Ajax></Ajax>
				: <></>
			}
		</>
	);
}

export default EventComponent;
