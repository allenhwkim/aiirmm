export default function({value='', theme='vs-dark', language='javascript', required=true}) {
  document.body.addEventListener('text-editor', (e:any) => {
    const editorValue = e.detail; 
    const monacoEditor: any = document.querySelector('x-monaco');
    monacoEditor.setValue(JSON.stringify(editorValue, null, '  '))
  });

  document.body.addEventListener('monaco-change', (e:any) => { // monaco editor change handler
    console.log(e.detail);
  });

  return (<>
    <x-monaco language={language} theme={theme} required={required} value={value}></x-monaco>
  </>)
}