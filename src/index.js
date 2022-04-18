import './index.css';

window.addEventListener('load', () => {
  let hue = 0;
  const randomizeHue = () => hue = (hue + ((Math.random() * 34) + 1) * 10) % 360;
  const renderHue = () => document.documentElement.setAttribute('style', `background-color: hsl(${hue}, 18%, 43%);`);
  const redraw = () => [randomizeHue, renderHue].forEach((func) => func());
  document.addEventListener('click', redraw);
  document.addEventListener('keydown', redraw);
});
