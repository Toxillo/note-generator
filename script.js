const start_button = document.querySelector(".start-button");
const stop_button = document.querySelector(".stop-button");
const note_display = document.querySelector(".note-display");
const note_buttons = document.getElementsByClassName("note-button");
const note_selection = document.querySelector(".note-selection");
const note_subscript = document.querySelector(".note-subscript");
const synth = new Tone.Synth().toDestination();
var stopped = true;

for (const button of note_buttons) {
	button.addEventListener("click", function() {
		button.classList.toggle("note-button__selected");
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
			index = Math.floor(Math.random() * selected_buttons.length);
		} else {
			index = (index + 1) % selected_buttons.length;
		}
	}, "1n").start(0);
	Tone.Transport.bpm.value = 100;
	Tone.Transport.start();
}


function stop() {

}