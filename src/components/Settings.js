import { useState } from "react";
import clockBlack from "../img/clock-black.png";
import themeBlack from "../img/theme-black.png";
import { CloseButton } from "./CloseButton";
import { Overlay } from "./Overlay";
import { ColorPickerModal } from "./ColorPickerModal";

export function Settings({ setSettingsOpen }) {
	const [colorPickerOpen, setColorPickerOpen] = useState(false);
	return (
		<>
			<div className="settings">
				<SettingsHeader closeButtonHandler={() => setSettingsOpen(false)} />
				<form className="settings-form">
					<ToggleDiv toggleId="toggle1">Auto Start Breaks</ToggleDiv>
					<ToggleDiv toggleId="toggle2">Auto Start Pomodoros</ToggleDiv>
					<IntervalSettings />
					<ColorPicker>
						<ColorPickerSquares setColorPickerOpen={setColorPickerOpen} />
					</ColorPicker>
				</form>
			</div>
			{colorPickerOpen && <ColorPickerModal setColorPickerOpen={setColorPickerOpen} />}
			<Overlay callback={() => setSettingsOpen(false)} />
		</>
	);
}

function SettingsHeader({ closeButtonHandler }) {
	return (
		<>
			<header className="settings-header">
				<h2 className="settings-title">Setting</h2>
				<CloseButton closeButtonHandler={closeButtonHandler} />
			</header>
			<div className="timer-title">
				<img className="timer-img" src={clockBlack} alt="" />
				<h1 className="timer-label">TIMER</h1>
			</div>
			<h3 className="time-minutes">Time (minutes)</h3>
		</>
	);
}

function ToggleDiv({ toggleId, children }) {
	return (
		<div className="toggle-auto">
			<span className="sec-settings-label">{children}</span>
			<div className="toggleWrapper">
				<input name="toggleStartBreaks" className="toggle" type="checkbox" id={toggleId} />
				<label htmlFor={toggleId}>
					<span className="slider round" />
				</label>
			</div>
		</div>
	);
}

function IntervalSettings() {
	return (
		<div className="settings-interval">
			<span className="sec-settings-label long-break-interval">Long Break Interval</span>
			<input
				name="longBreakInterval"
				type="number"
				min={0}
				step={1}
				className="long-break-interval-input time-input"
				defaultValue=""
				required=""
			/>
		</div>
	);
}

function ColorPicker({ children }) {
	return (
		<div className="color-picker">
			<img className="color-picker-img" src={themeBlack} alt="" />
			<h2 className="theme-title">THEME</h2>
			<div className="color-themes-container">
				<h3 className="color-theme-title">Color Themes</h3>
				{children}
			</div>
			<footer className="settings-footer">
				<button type="submit" className="ok-settings">
					OK
				</button>
			</footer>
		</div>
	);
}

function ColorPickerSquares({ setColorPickerOpen }) {
	function handleOpenColorPickerModal() {
		setColorPickerOpen(true);
	}

	return (
		<div className="squares">
			<div
				onClick={handleOpenColorPickerModal}
				className="square pomodoro-square"
				data-interval-type="pomodoro"
			/>
			<div
				onClick={handleOpenColorPickerModal}
				className="square short-break-square"
				data-interval-type="shortBreak"
			/>
			<div
				onClick={handleOpenColorPickerModal}
				className="square long-break-square"
				data-interval-type="longBreak"
			/>
		</div>
	);
}
