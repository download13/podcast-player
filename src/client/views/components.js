import {h} from 'hyperapp';


export function Link(props, children) {
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
