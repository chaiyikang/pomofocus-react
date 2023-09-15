import { useState } from "react";
import clockBlack from "../img/clock-black.png";
import themeBlack from "../img/theme-black.png";
import { CloseButton } from "./CloseButton";
import { Overlay } from "./Overlay";
import { ColorPickerModal } from "./ColorPickerModal";

export function Settings({ setSettingsOpen, settings, setSettings }) {
	const [colorPickerOpen, setColorPickerOpen] = useState(false);
	function handleChangeSettings(event) {
		const settingName = event.target.name;
		if (settingName === "toggleBreak" || settingName === "togglePomodoro")
			return setSettings((old) => ({ ...old, [settingName]: event.target.checked }));

		const valueSeconds = +event.target.value * 60;
		const validValue = Math.sign(valueSeconds) === 1;
		if (validValue)
			setSettings((old) => ({
				...old,
				lengthsSec: { ...old.lengthsSec, [settingName]: valueSeconds },
			}));
	}

	return (
		<>
			<div className="settings">
				<SettingsHeader closeButtonHandler={() => setSettingsOpen(false)} />
				<form className="settings-form">
					<LengthSettings
						handleChangeSettings={handleChangeSettings}
						settingsLength={settings.lengthsSec}
					/>
					<ToggleDiv
						handleChangeSettings={handleChangeSettings}
						activeOrNot={settings.toggleBreak}
						name="toggleBreak"
					>
						Auto Start Breaks
					</ToggleDiv>
					<ToggleDiv
						handleChangeSettings={handleChangeSettings}
						activeOrNot={settings.togglePomodoro}
						name="togglePomodoro"
					>
						Auto Start Pomodoros
					</ToggleDiv>
					<IntervalSettings
						handleChangeSettings={handleChangeSettings}
						currentInterval={settings.interval}
					/>
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

function LengthSettings({ settingsLength, handleChangeSettings }) {
	return (
		<div className="time-settings-grid">
			<p className="settings-label">Pomodoro</p>
			<p className=" settings-label">Short Break</p>
			<p className="settings-label">Long Break</p>
			<input
				type="number"
				name="pomodoro"
				value={
					settingsLength.pomodoro % 60 === 0
						? settingsLength.pomodoro / 60
						: (settingsLength.pomodoro / 60).toFixed(1)
				}
				onChange={handleChangeSettings}
				min="0.1"
				step="0.1"
				className="pomodoro-input time-input"
				required=""
			/>
			<input
				type="number"
				name="shortBreak"
				value={
					settingsLength.shortBreak % 60 === 0
						? settingsLength.shortBreak / 60
						: (settingsLength.shortBreak / 60).toFixed(1)
				}
				onChange={handleChangeSettings}
				min="0.1"
				step="0.1"
				className="shortBreak-input time-input"
				required=""
			/>
			<input
				type="number"
				name="longBreak"
				value={
					settingsLength.longBreak % 60 === 0
						? settingsLength.longBreak / 60
						: (settingsLength.longBreak / 60).toFixed(1)
				}
				onChange={handleChangeSettings}
				min="0.1"
				step="0.1"
				className="longBreak-input time-input"
				required=""
			/>
		</div>
	);
}

function ToggleDiv({ name, children, activeOrNot, handleChangeSettings }) {
	return (
		<div className="toggle-auto">
			<span className="sec-settings-label">{children}</span>
			<div className="toggleWrapper">
				<input
					checked={activeOrNot}
					name={name}
					onChange={handleChangeSettings}
					className="toggle"
					type="checkbox"
					id={name}
				/>
				<label htmlFor={name}>
					<span className="slider round" />
				</label>
			</div>
		</div>
	);
}

function IntervalSettings({ currentInterval, handleChangeSettings }) {
	return (
		<div className="settings-interval">
			<span className="sec-settings-label long-break-interval">Long Break Interval</span>
			<input
				name="interval"
				type="number"
				value={currentInterval}
				onChange={handleChangeSettings}
				min={0}
				step={1}
				className="long-break-interval-input time-input"
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
