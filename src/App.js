import { useEffect, useRef, useState } from "react";
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

const defaultSettings = {
	lengthsSec: {
		pomodoro: 25,
		shortBreak: 5,
		longBreak: 15,
	},
	interval: 4,
	toggleBreak: true,
	togglePomodoro: false,
};

function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [reportOpen, setReportOpen] = useState(false);
	const [settings, setSettings] = useState(defaultSettings);

	return (
		<>
			<NavBar setSettingsOpen={setSettingsOpen} setReportOpen={setReportOpen} />
			<AppWindow settings={settings} setSettings={setSettings}>
				{settingsOpen && (
					<Settings
						setSettingsOpen={setSettingsOpen}
						settings={settings}
						setSettings={setSettings}
					/>
				)}
				{reportOpen && (
					<Report
						closeReport={() => {
							setReportOpen(false);
						}}
					/>
				)}
			</AppWindow>
		</>
	);
}

function AppWindow({ children, settings, setSettings }) {
	const [secondsLeft, setSecondsLeft] = useState(settings.lengthsSec.pomodoro);
	const secondsLeftRef = useRef(settings.lengthsSec.pomodoro);
	const [timerRunning, setTimerRunning] = useState(false);
	const timerRunningRef = useRef(false);
	const intervalID = useRef(false);
	const [activeType, setActiveType] = useState("pomodoro");
	const [workSetsCompleted, setWorkSetsCompleted] = useState(0);

	const pomodoroCycleDisplay = Math.ceil((workSetsCompleted + 1) / settings.interval);
	const pomodoroRepDisplay = (workSetsCompleted % settings.interval) + 1;
	const breakCycleDisplay =
		workSetsCompleted % settings.interval !== 0 || workSetsCompleted === 0
			? Math.floor(workSetsCompleted / settings.interval) + 1
			: workSetsCompleted / settings.interval;
	const breakRepDisplay =
		workSetsCompleted === 0 ? 1 : workSetsCompleted % 4 === 0 ? 4 : workSetsCompleted % 4;

	function handleToggleTimer() {
		// stop
		if (timerRunningRef.current) {
			return stopTimer();
		}

		// start
		updateTimerRunning(true);
		const timeStampStart = new Date().getTime();
		const timeStampEnd = timeStampStart + secondsLeftRef.current * 1000;

		intervalID.current = setInterval(() => {
			countdownAndControlEnded(timeStampEnd);
		}, 1000);
	}

	function handleToggleType(click) {
		if (timerRunningRef.current) {
			stopTimer();
		}
		const clickedType = click.target.dataset.type;
		setActiveType(clickedType);
		updateSecondsLeft(settings.lengthsSec[clickedType]);
	}

	function countdownAndControlEnded(timeStampEnd) {
		let timeStampCurrent = new Date().getTime();
		let timeLeftSec = Math.round((timeStampEnd - timeStampCurrent) / 1000);
		updateSecondsLeft(timeLeftSec);
		if (timeLeftSec > 0) {
			return;
		}
		stopTimer();
		controlTimerEnded();
	}

	function handleSkip() {
		stopTimer();
		controlTimerEnded();
	}

	function controlTimerEnded() {
		const nextType = getNextType();
		if (nextType !== "pomodoro") {
			setWorkSetsCompleted((sets) => sets + 1);
		}
		setActiveType(nextType);
		updateSecondsLeft(settings.lengthsSec[nextType]);
		if (nextType === "pomodoro" && settings.togglePomodoro) handleToggleTimer();
		if (nextType !== "pomodoro" && settings.toggleBreak) handleToggleTimer();
	}

	function updateSecondsLeft(seconds, callback) {
		setSecondsLeft(callback || seconds);
		secondsLeftRef.current = seconds;
	}

	function updateTimerRunning(bool) {
		timerRunningRef.current = bool;
		setTimerRunning(bool);
	}

	function getNextType() {
		const nextIsPomodoro = activeType !== "pomodoro";
		const nextIsLongBreak = (workSetsCompleted + 1) % settings.interval === 0;
		if (nextIsPomodoro) return "pomodoro";
		if (nextIsLongBreak) return "longBreak";
		return "shortBreak";
	}

	function stopTimer() {
		clearInterval(intervalID.current);
		updateTimerRunning(false);
	}
	return (
		<>
			<main className="container">
				<div className="app-window">
					<div className="buttons types">
						<button
							onClick={handleToggleType}
							data-type="pomodoro"
							className={`types ${activeType === "pomodoro" ? "button-active" : ""}`}
						>
							Pomodoro
						</button>
						<button
							onClick={handleToggleType}
							data-type="shortBreak"
							className={`types ${
								activeType === "shortBreak" ? "button-active" : ""
							}`}
						>
							Short Break
						</button>
						<button
							onClick={handleToggleType}
							data-type="longBreak"
							className={`types ${activeType === "longBreak" ? "button-active" : ""}`}
						>
							Long Break
						</button>
					</div>
					<time className="timer">
						{Math.floor(secondsLeft / 60)
							.toString()
							.padStart(2, 0)}
						:{(secondsLeft % 60).toString().padStart(2, 0)}
					</time>
					<button
						onClick={handleToggleTimer}
						className={`start-stop ${timerRunning ? "pressToStop" : ""}`}
					>
						{timerRunning ? "STOP" : "START"}
					</button>
					{timerRunning && (
						<button onClick={handleSkip} className="skip-timer-btn">
							<img className="skip-timer-img" src={nextWhite} alt="" />
						</button>
					)}
				</div>
				<div className="app-info">
					<p className="counter">
						{activeType === "pomodoro"
							? `Cycle: #${pomodoroCycleDisplay} Rep: #${pomodoroRepDisplay}`
							: `Cycle: #${breakCycleDisplay} Rep: #${breakRepDisplay}`}
					</p>
					<p className="message">Time to Focus!</p>
				</div>
			</main>
			{children}
		</>
	);
}

export default App;
