import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Settings } from "./components/Settings";
import { Report } from "./components/Report";

import "./styles/nav.css";
import "./styles/style.css";
import "./styles/button.css";
import "./styles/color-picker.css";
import "./styles/global.css";
import "./styles/report.css";
import "./styles/settings.css";
import "./styles/toggle.css";
import nextWhite from "./img/next-white3.png";

function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [reportOpen, setReportOpen] = useState(false);
	const [colorPickerOpen, setColorPickerOpen] = useState(false);

	return (
		<>
			<NavBar setSettingsOpen={setSettingsOpen} setReportOpen={setReportOpen} />
			<AppWindow />
			{settingsOpen && (
				<Settings
					closeSettings={() => {
						setSettingsOpen(false);
					}}
					setColorPickerOpen={setColorPickerOpen}
				/>
			)}
			{reportOpen && (
				<Report
					closeReport={() => {
						setReportOpen(false);
					}}
				/>
			)}
			{colorPickerOpen && <ColorPickerModal />}
		</>
	);
}

function AppWindow() {
	return (
		<main className="container">
			<div className="app-window">
				<div className="buttons types">
					<button className="pomodoro types">Pomodoro</button>
					<button className="short-break types">Short Break</button>
					<button className="long-break types">Long Break</button>
				</div>
				<time className="timer">25:00</time>
				<button className="start-stop">START</button>
				<button className="skip-timer-btn">
					<img className="skip-timer-img" src={nextWhite} alt="" />
				</button>
			</div>
			<div className="app-info">
				<p className="counter">#1</p>
				<p className="message">Time to Focus!</p>
			</div>
		</main>
	);
}

function ColorPickerModal() {
	return (
		<div className="color-picker-modal">
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
	);
}

export default App;
