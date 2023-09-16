import { useEffect, useRef, useState } from "react";
import {
	SettingsHeader,
	LengthSettings,
	ToggleDiv,
	IntervalSettings,
	ColorPicker,
	ColorPickerSquares,
} from "./Settings";
import { ColorPickerModal } from "./ColorPickerModal";
import { Overlay } from "./Overlay";
import nextWhite from "../img/next-white3.png";
import alarmWood from "../audio/alarm-wood.mp3";
import buttonPress from "../audio/button-press.wav";

export function AppWindow({
	children,
	settings,
	setSettings,
	settingsOpen,
	setSettingsOpen,
	secondsFocused,
	setSecondsFocused,
}) {
	const [secondsLeft, setSecondsLeft] = useState(settings.lengthsSec.pomodoro);
	const secondsLeftRef = useRef(settings.lengthsSec.pomodoro);
	const [timerRunning, setTimerRunning] = useState(false);
	const timerRunningRef = useRef(false);
	const intervalID = useRef(false);
	const [activeType, setActiveType] = useState("pomodoro");
	const activeTypeRef = useRef("pomodoro");
	const [workSetsCompleted, setWorkSetsCompleted] = useState(0);
	const startStopBtn = useRef(null);
	const [pickingColorFor, setPickingColorFor] = useState(null);
	const startAudio = useRef(null);
	const endedAudio = useRef(null);

	const pomodoroCycleDisplay = Math.ceil((workSetsCompleted + 1) / settings.interval);
	const pomodoroRepDisplay = (workSetsCompleted % settings.interval) + 1;
	const breakCycleDisplay =
		workSetsCompleted % settings.interval !== 0 || workSetsCompleted === 0
			? Math.floor(workSetsCompleted / settings.interval) + 1
			: workSetsCompleted / settings.interval;
	const breakRepDisplay =
		workSetsCompleted === 0 ? 1 : workSetsCompleted % 4 === 0 ? 4 : workSetsCompleted % 4;

	useEffect(
		function updateBackgroundColor() {
			document.body.style.backgroundColor = settings.colors[activeType];
			startStopBtn.current.style.color = settings.colors[activeType];
		},
		[activeType, settings.colors]
	);

	function handleToggleTimer(event) {
		if (timerRunningRef.current) {
			return stopTimer();
		}
		if (event) startAudio.current.play();

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
		updateActiveType(clickedType);
		updateSecondsLeft(settings.lengthsSec[clickedType]);
	}

	function countdownAndControlEnded(timeStampEnd) {
		let timeStampCurrent = new Date().getTime();
		let timeLeftSec = Math.round((timeStampEnd - timeStampCurrent) / 1000);
		updateSecondsLeft(timeLeftSec);
		if (activeTypeRef.current === "pomodoro") {
			setSecondsFocused((s) => s + 1);
		}
		if (timeLeftSec > 0) {
			return;
		}
		endedAudio.current.play();
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
		// !!!!!
		updateActiveType(nextType);
		updateSecondsLeft(settings.lengthsSec[nextType]);
		if (nextType === "pomodoro" && settings.togglePomodoro) handleToggleTimer();
		if (nextType !== "pomodoro" && settings.toggleBreak) handleToggleTimer();
	}

	function updateSecondsLeft(seconds, callback) {
		setSecondsLeft(callback || seconds);
		secondsLeftRef.current = seconds;
	}

	function updateActiveType(type) {
		setActiveType(type);
		activeTypeRef.current = type;
	}

	function updateTimerRunning(bool) {
		timerRunningRef.current = bool;
		setTimerRunning(bool);
	}

	function getNextType() {
		const nextIsPomodoro = activeTypeRef.current !== "pomodoro";
		const nextIsLongBreak = (workSetsCompleted + 1) % settings.interval === 0;
		if (nextIsPomodoro) return "pomodoro";
		if (nextIsLongBreak) return "longBreak";
		return "shortBreak";
	}

	function stopTimer() {
		clearInterval(intervalID.current);
		updateTimerRunning(false);
	}

	// ? settings

	const [colorPickerOpen, setColorPickerOpen] = useState(false);
	const { colors, ...omittedColors } = settings;
	const [tempSettings, setTempSettings] = useState({ ...omittedColors });

	function handleChangeSettings(event) {
		const settingName = event.target.name;
		if (settingName === "toggleBreak" || settingName === "togglePomodoro")
			return setTempSettings((old) => ({ ...old, [settingName]: event.target.checked }));

		let input = event.target.value;
		if (input !== "") input = +input;

		if (settingName === "interval") {
			return setTempSettings((old) => ({ ...old, interval: input }));
		}
		const inputMin = input === "" ? "" : input * 60;
		setTempSettings((old) => ({
			...old,
			lengthsSec: { ...old.lengthsSec, [settingName]: inputMin },
		}));
	}

	function submitAndClose() {
		if (validatedAndUpdated()) return setSettingsOpen(false);
		return;
	}

	function validatedAndUpdated() {
		const {
			lengthsSec: { pomodoro, shortBreak, longBreak },
			interval,
		} = tempSettings;
		const inputValuesArr = [pomodoro, shortBreak, longBreak, interval];
		let allValid = true;
		inputValuesArr.forEach((input, index) => {
			if (Math.sign(input) !== 1) allValid = false;
			if (index !== 3) return;
			if (!Number.isInteger(input)) allValid = false;
		});
		if (!allValid) return false;
		const timerWasRunning = timerRunning;
		if (timerWasRunning) stopTimer();
		if (
			settings.lengthsSec[activeTypeRef.current] ===
			tempSettings.lengthsSec[activeTypeRef.current]
		) {
			setSettings((old) => ({ ...tempSettings, colors: { ...old.colors } }));
			return true;
		}
		const elapsed = settings.lengthsSec[activeTypeRef.current] - secondsLeft;
		const updatedSeconds = tempSettings.lengthsSec[activeTypeRef.current] - elapsed;
		if (updatedSeconds < 1) {
			updateSecondsLeft(1);
		} else {
			updateSecondsLeft(tempSettings.lengthsSec[activeTypeRef.current] - elapsed);
		}
		if (timerWasRunning) handleToggleTimer();

		console.log("🚀 ~ file: AppWindow.js:190 ~ validatedAndUpdated ~ settings:", settings);
		setSettings((old) => ({ ...tempSettings, colors: { ...old.colors } }));
		return true;
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
						ref={startStopBtn}
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
			{
				//////////////////////////////////////////////}
			}
			{settingsOpen && (
				<div className="settings">
					<SettingsHeader closeButtonHandler={submitAndClose} />
					<form className="settings-form">
						<LengthSettings
							handleChangeSettings={handleChangeSettings}
							tempSettingsLength={tempSettings.lengthsSec}
						/>
						<ToggleDiv
							handleChangeSettings={handleChangeSettings}
							activeOrNot={tempSettings.toggleBreak}
							name="toggleBreak"
						>
							Auto Start Breaks
						</ToggleDiv>
						<ToggleDiv
							handleChangeSettings={handleChangeSettings}
							activeOrNot={tempSettings.togglePomodoro}
							name="togglePomodoro"
						>
							Auto Start Pomodoros
						</ToggleDiv>
						<IntervalSettings
							handleChangeSettings={handleChangeSettings}
							currentInterval={tempSettings.interval}
						/>
						<ColorPicker>
							<ColorPickerSquares
								setColorPickerOpen={setColorPickerOpen}
								pickingColorFor={pickingColorFor}
								setPickingColorFor={setPickingColorFor}
								settings={settings}
							/>
						</ColorPicker>
					</form>
					<footer className="settings-footer">
						<button onClick={submitAndClose} type="button" className="ok-settings">
							OK
						</button>
					</footer>
				</div>
			)}
			{colorPickerOpen && (
				<ColorPickerModal
					settings={settings}
					setSettings={setSettings}
					setColorPickerOpen={setColorPickerOpen}
					pickingColorFor={pickingColorFor}
				/>
			)}
			{settingsOpen && <Overlay callback={submitAndClose} />}
			{children}
			<audio ref={startAudio} src={buttonPress} />
			<audio ref={endedAudio} src={alarmWood} />
		</>
	);
}
