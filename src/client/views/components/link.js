import {h} from 'hyperapp';


export default function Link(props, children) {
  return <a
    {...props}
    onclick={e => {
      e.preventDefault();
      props.go(props.href);
    }}
  >
    {children}
  </a>
}
