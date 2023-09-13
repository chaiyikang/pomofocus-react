import { Overlay } from "./Overlay";

export function ColorPickerModal({ setColorPickerOpen }) {
	return (
		<>
			<div style={{ zIndex: 20 }} className="color-picker-modal">
				<h3 className="color-picker-title">Pick a color for Pomodoro</h3>
				<div className="choose-color-squares">
					<div className="choose-color-1 choose-color-square active" />
					<div className="choose-color-2 choose-color-square" />
					<div className="choose-color-3 choose-color-square" />
					<div className="choose-color-4 choose-color-square" />
					<div className="choose-color-5 choose-color-square" />
					<div className="choose-color-6 choose-color-square" />
					<div className="choose-color-7 choose-color-square" />
					<div className="choose-color-8 choose-color-square" />
				</div>
			</div>
			<Overlay zIndexValue={15} callback={() => setColorPickerOpen(false)} />
		</>
	);
}
