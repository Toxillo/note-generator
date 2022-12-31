const start_button = document.querySelector(".start-button");
const stop_button = document.querySelector(".stop-button");
const note_display = document.querySelector(".note-display");
const note_buttons = document.getElementsByClassName("note-button");
const note_selection = document.querySelector(".note-selection");
const note_subscript = document.querySelector(".note-subscript");
const error_div = document.querySelector(".error-message");
const input = document.querySelector("#bpm");
const value = document.querySelector("#bpm-label");
const toggle_switch = document.querySelector("#switch-input");
const switch_position = document.querySelector("#switch-position");
var slider_mode = "BPM";


input.addEventListener("input", (event) => {
	value.textContent = slider_mode + ": " + event.target.value
	Tone.Transport.bpm.value = input.value;
})

toggle_switch.addEventListener("input", (event) => {
	if (toggle_switch.checked) {
		switch_position.innerHTML = "BPM"
		slider_mode = "BPM";
	} else {
		switch_position.innerHTML = "BPM"
	}
})

const synth = new Tone.Synth().toDestination();
var stopped = true;

for (const button of note_buttons) {
	button.addEventListener("click", function() {
		button.classList.toggle("note-button__selected");
		error_div.style.visibility = "hidden";
	});
}

//play a middle 'C' for the duration of an 8th note
start_button.addEventListener("click", function() {
	console.log(stopped);
	stopped = false;
	notePlayer(true);
})

stop_button.addEventListener("click", function() {
	if (stopped == true) return;
	stopped = true;
	synth.triggerRelease(Tone.now());
	Tone.Transport.stop();
	note_display.firstElementChild.innerHTML = "Select notes and press Start!"
	note_display.classList.toggle("greeting");
	console.log(stopped);
});

function notePlayer(random) {
	let index = 0;
	let selected_buttons = document.getElementsByClassName("note-button__selected");
	if (selected_buttons.length == 0) {
		stopped = true;
		error_div.innerHTML = "You need to select at least one note";
		error_div.style.visibility = "visible";
		return;
	}

	Tone.start();
	note_display.firstElementChild.innerHTML = "";
	note_display.classList.toggle("greeting");										

	const loopA = new Tone.Loop(time => {
		note_display.firstElementChild.innerHTML = selected_buttons[index].textContent
		+ selected_buttons[index].dataset.octave.sub();
		synth.triggerAttackRelease(selected_buttons[index].textContent + selected_buttons[index].dataset.octave, "1n", time);
		if (random) {
			prev_index = index;
			while (prev_index == index) {
				index = Math.floor(Math.random() * selected_buttons.length);
			}
		} else {
			index = (index + 1) % selected_buttons.length;
		}
	}, "1n").start(0);
	if (slider_mode === "Seconds") {
		Tone.Transport.bpm.value = input.value;

	}
	Tone.Transport.start();
}


function stop() {

}