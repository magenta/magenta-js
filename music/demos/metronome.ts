import * as mm from '../src/index';

const metronome =
    new mm.Metronome({click: onClick, quarter: onQuarter, bar: onBar});
const output = document.getElementById('output') as HTMLElement;

document.getElementById('btn').addEventListener('click', (event) => {
  const btn = event.target as HTMLButtonElement;
  if (metronome.isTicking()) {
    metronome.stop();
    btn.textContent = 'start';
    document.getElementById('controls').removeAttribute('disabled');
  } else {
    btn.textContent = 'stop';
    document.getElementById('output').innerHTML = '';
    document.getElementById('controls').setAttribute('disabled', 'true');
    const tempoSlider = document.getElementById('tempo') as HTMLInputElement;
    const clicksInput =
        document.getElementById('clicksPerQuarter') as HTMLInputElement;

    metronome.clicksPerQuarter = Number(clicksInput.value);
    metronome.start(Number(tempoSlider.value));
  }
});

document.getElementById('muteClick')
    .addEventListener('change', (event: MouseEvent) => {
      const checkbox = event.target as HTMLInputElement;
      metronome.muted = checkbox.checked;
    });

function onClick(time: number, click: number) {
  logEvent('Click', `${click + 1}/${metronome.clicksPerQuarter * 4}`, time);
}
function onQuarter(time: number, quarter: number) {
  logEvent('Quarter', `${quarter + 1}/4`, time);
}
function onBar(time: number, bar: number) {
  logEvent('Bar', `${bar + 1}`, time);
}
function logEvent(type: string, text: string, time: number) {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${type}</td><td>${text}</td><td>${time.toFixed(5)}</td>`;
  tr.classList.add(type.toLowerCase());
  output.appendChild(tr);
}
