declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-sidebar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function() {

  function showData() {
    document.dispatchEvent(new CustomEvent('sidebar-message', {bubbles: true, detail: 'show-data'}));
  }

  return (
    <x-sidebar>
      <button className="btn btn-light" onClick={showData}>Show data</button>
    </x-sidebar>
  );

}