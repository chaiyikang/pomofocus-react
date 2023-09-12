import "./styles/nav.css";
import "./styles/style.css";
import "./styles/button.css";
import "./styles/color-picker.css";
import "./styles/global.css";
import "./styles/report.css";
import "./styles/settings.css";
import "./styles/toggle.css";

import clockBlack from "./img/clock-black.png";
import clockRed from "./img/clock-red.png";
import nextWhite from "./img/next-white3.png";
import removeBlack from "./img/remove-black-sm.png";
import themeBlack from "./img/theme-black.png";

import { useState } from "react";
import { NavBar } from "./components/NavBar";

function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	return (
		<>
			<NavBar setSettingsOpen={setSettingsOpen} />
			<AppWindow />
			{settingsOpen && <Settings closeButtonHandler={() => setSettingsOpen(false)} />}
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

function CloseButton({ closeButtonHandler }) {
	return (
		<button onClick={closeButtonHandler}>
			<img className="close-btn" src={removeBlack} alt="" />
		</button>
	);
}

function Settings({ closeButtonHandler }) {
	return (
		<div className="settings">
			<header className="settings-header">
				<h2 className="settings-title">Setting</h2>
				<CloseButton closeButtonHandler={closeButtonHandler} />
			</header>
			<div className="timer-title">
				<img className="timer-img" src={clockBlack} alt="" />
				<h1 className="timer-label">TIMER</h1>
			</div>
			<h3 className="time-minutes">Time (minutes)</h3>
			<form className="settings-form">
				<div className="time-settings-grid">
					<p className="settings-pomodoro-label settings-label">Pomodoro</p>
					<p className="settings-shortBreak-label settings-label">Short Break</p>
					<p className="settings-longBreak-label settings-label">Long Break</p>
					<input
						type="number"
						name="pomodoroInput"
						min="0.1"
						step="0.1"
						className="pomodoro-input time-input"
						defaultValue=""
						required=""
					/>
					<input
						type="number"
						name="shortBreakInput"
						min="0.1"
						step="0.1"
						className="shortBreak-input time-input"
						defaultValue=""
						required=""
					/>
					<input
						type="number"
						name="longBreakInput"
						min="0.1"
						step="0.1"
						className="longBreak-input time-input"
						defaultValue=""
						required=""
					/>
				</div>
				<div className="settings-toggle">
					<div className="toggle-auto-breaks toggle-auto">
						<span className="sec-settings-label auto-start-breaks">
							Auto Start Breaks
						</span>
						<div className="toggleWrapper">
							<input
								name="toggleStartBreaks"
								className="toggle start-breaks mobileToggle"
								type="checkbox"
								id="toggle1"
							/>
							<label htmlFor="toggle1">
								<span className="slider round" />
							</label>
						</div>
					</div>
					<div className="toggle-auto-pomodoro toggle-auto">
						<span className="sec-settings-label auto-start-pomodoro">
							Auto Start Pomodoros
						</span>
						<div className="toggleWrapper">
							<input
								name="toggleStartPomodoro"
								className="toggle start-pomodoro mobileToggle"
								type="checkbox"
								id="toggle2"
							/>
							<label htmlFor="toggle2">
								<span className="slider round" />
							</label>
						</div>
					</div>
				</div>
				<div className="settings-interval">
					<span className="sec-settings-label long-break-interval">
						Long Break Interval
					</span>
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
				<div className="color-picker">
					<img className="color-picker-img" src={themeBlack} alt="" />
					<h2 className="theme-title">THEME</h2>
					<div className="color-themes-container">
						<h3 className="color-theme-title">Color Themes</h3>
						<div className="squares">
							<div className="square pomodoro-square" data-interval-type="pomodoro" />
							<div
								className="square short-break-square"
								data-interval-type="shortBreak"
							/>
							<div
								className="square long-break-square"
								data-interval-type="longBreak"
							/>
						</div>
					</div>
					<footer className="settings-footer">
						<button type="submit" className="ok-settings">
							OK
						</button>
					</footer>
				</div>
			</form>
		</div>
	);
}

export default App;
