import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import { Form, Input, Label } from 'reactstrap';

const Writer = (props) => {

	const [state, setState] = useState(props.html !== undefined ? RichTextEditor.createValueFromString(props.html, "html") : RichTextEditor.createEmptyValue());
	const [html, setHTML] = useState(props.html !== undefined ? props.html : "");
	const [type, setTipo] = useState(props.type !== undefined ? props.type : "default")
	const [title, setTitle] = useState(props.title !== undefined ? props.title : "")

	useEffect(() => {
		if (props.html !== undefined) {
			setState(RichTextEditor.createValueFromString(props.html, "html"))
		}
	}, [props.html]);

	useEffect(() => {
		if (props.type !== undefined) {
			setTipo(props.type)
		}
	}, [props.type]);

	useEffect(() => {
		if (props.title !== undefined) {
			setTitle(props.title)
		}
	}, [props.title]);


	const onChangeHTML = (value) => {
		setState(value);
		setHTML(value.toString('html'));
	};

	// The toolbarConfig object allows you to specify custom buttons, reorder buttons and to add custom css classes.
	// Supported inline styles: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Inline-Styles.md
	// Supported block types: https://github.com/facebook/draft-js/blob/master/docs/Advanced-Topics-Custom-Block-Render.md#draft-default-block-render-map
	const toolbarConfig = {
		// Optionally specify the groups to display (displayed in the order listed).
		display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'IMAGE_BUTTON', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
		INLINE_STYLE_BUTTONS: [
			{ label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
			{ label: 'Italic', style: 'ITALIC' },
			{ label: 'Underline', style: 'UNDERLINE' }
		],
		BLOCK_TYPE_DROPDOWN: [
			{ label: 'Normal', style: 'unstyled' },
			{ label: 'Heading Large', style: 'header-one' },
			{ label: 'Heading Medium', style: 'header-two' },
			{ label: 'Heading Small', style: 'header-three' }
		],
		BLOCK_TYPE_BUTTONS: [
			{ label: 'UL', style: 'unordered-list-item' },
			{ label: 'OL', style: 'ordered-list-item' }
		],
		IMAGE_BUTTON: [
			{ label: 'Image', style: 'img' },
		]
	};

	const sendHTML = () => {
		let title = document.getElementById("title").value;
		let type = document.getElementById("type").value;
		props.sendHTML(title, html, type);
	}

	const onChangeTitle = (event) => {
		setTitle(event.target.value);
	}

	return (
		<div>
			<Form className="" onSubmit={(event) => { event.preventDefault() }} name="formulario">
				<Label for="title"><h3>Título:</h3></Label>
				<Input
					type="text"
					name="title"
					id="title"
					placeholder="título"
					value={title}
					onChange={onChangeTitle}
				/>
				<br />
				<Label for="text"><h3>Texto:</h3></Label>
				<RichTextEditor toolbarConfig={toolbarConfig}
					value={state}
					onChange={onChangeHTML}
				/>
				<br />
				<label for="type"><h3>Tipo:</h3></label>
				<br />
				<select name="type" id="type">
					{type === "default" ? <option value="default" selected>--Elige un type--</option> : <option value="default">--Elige un type--</option>}
					{type === "war" ? <option value="war" selected>Guerra</option> : <option value="war">Guerra</option>}
					{type === "death" ? <option value="death" selected>Muerte</option> : <option value="death">Muerte</option>}
					{type === "birth" ? <option value="birth" selected>Nacimiento</option> : <option value="birth">Nacimiento</option>}
					{type === "discovery" ? <option value="discovery" selected>Descubrimiento</option> : <option value="discovery">Descubrimiento</option>}
					{type === "construction" ? <option value="construction" selected>Construcción</option> : <option value="construction">Construcción</option>}
				</select> {/*ponerIconoEvento*/}
				<br /><br />
				<button onClick={sendHTML}>Enviar</button>
			</Form>
		</div>
	);

}


export default Writer;
