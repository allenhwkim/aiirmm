/**
 * custom element <x-formflow> fires these event
 *  - init:     {action: 'init', event: <chart instance>}
 *  - selected: {action: 'selected', type: 'node' | 'edge', nodes: Node[], edges: Edge[] }
 *  - change: 
 */
export default function() {
  return (
    <>
      <x-formflow></x-formflow>
    </>
  )
}