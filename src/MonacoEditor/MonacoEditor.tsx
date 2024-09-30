export default function({value='', theme='vs-dark', language='javascript', required=true}) {
  return (<>
    <x-monaco language={language} theme={theme} required={required} value={value}></x-monaco>
  </>)
}