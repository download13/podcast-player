import {h} from 'hyperapp';
import styles from './play-pause-button.scss';


export function ProgressPlayPauseButton({onclick, playing, progress, color = '#000'}) {
  const symbol = playing ?
    <path fill={color} class="pause" d="M30,20 L40,20 40,80 30,80 Z M60,20 70,20 70,80 60,80 Z"/> :
    <path fill={color} class="play" d="M30,20 L80,50 30,80"/>;

  return <button class={styles.progressPlayPauseButton} onclick={onclick}>
      <svg width="100" height="100" viewBox="0 0 100 100">
      <path class="progress" stroke={color} stroke-width="4" fill="transparent" d={describeArc(50, 50, 45, 0, progress * 359.9)}/>
      {symbol}
    </svg>
  </button>
}


function describeArc(x, y, radius, startAngle, endAngle){
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");

  return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
