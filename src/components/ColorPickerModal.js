import { useEffect, useRef } from "react";
import { Overlay } from "./Overlay";

export function ColorPickerModal({ setColorPickerOpen, pickingColorFor, settings, setSettings }) {
	function formatIntervalString(camelCase) {
		const spacedString = camelCase.replace(/([A-Z])/g, " $1");
		const displayType = spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
		return displayType;
	}

	function handlePickColor(color) {
		setSettings((old) => ({ ...old, colors: { ...old.colors, [pickingColorFor]: color } }));
		setColorPickerOpen(false);
	}

	return (
		<>
			<div style={{ zIndex: 20 }} className="color-picker-modal">
				<h3 className="color-picker-title">
					Pick a color for {formatIntervalString(pickingColorFor)}
				</h3>
				<div className="choose-color-squares">
					<div
						className={`choose-color-1 choose-color-square ${
							"rgb(186, 73, 73)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(186, 73, 73)")}
					/>
					<div
						className={`choose-color-2 choose-color-square ${
							"rgb(56, 133, 138)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(56, 133, 138)")}
					/>
					<div
						className={`choose-color-3 choose-color-square ${
							"rgb(57, 112, 151)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(57, 112, 151)")}
					/>
					<div
						className={`choose-color-4 choose-color-square ${
							"rgb(164, 137, 60)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(164, 137, 60)")}
					/>
					<div
						className={`choose-color-5 choose-color-square ${
							"rgb(125, 83, 162)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(125, 83, 162)")}
					/>
					<div
						className={`choose-color-6 choose-color-square ${
							"rgb(175, 78, 145)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(175, 78, 145)")}
					/>
					<div
						className={`choose-color-7 choose-color-square ${
							"rgb(81, 138, 88)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(81, 138, 88)")}
					/>
					<div
						className={`choose-color-8 choose-color-square ${
							"rgb(84, 87, 100)" === settings.colors[pickingColorFor] ? "active" : ""
						}`}
						onClick={handlePickColor.bind(null, "rgb(84, 87, 100)")}
					/>
				</div>
			</div>
			<Overlay zIndexValue={15} callback={() => setColorPickerOpen(false)} />
		</>
	);
}
