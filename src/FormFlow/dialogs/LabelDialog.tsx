import { useReactFlow, Node, Edge } from '@xyflow/react';
import { MouseEventHandler, PropsWithoutRef, useEffect, useRef, useState, MouseEvent, ChangeEventHandler, KeyboardEventHandler } from 'react';

interface LabelDialogProps {
  event: any;
  onClose: MouseEventHandler<HTMLElement>;
  selected: any;
  onLabelChange: ChangeEventHandler<HTMLElement>;
}

export default (props:PropsWithoutRef<LabelDialogProps>) => {
  const {event, onClose, selected, onLabelChange} = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState<any>(null);
  const reactflow = useReactFlow();

  useEffect(() => {
    const inputEl = inputRef.current as HTMLInputElement;
    const {clientWidth, clientHeight} = inputEl;
    const left = event.clientX - Math.round(clientWidth / 2);
    const top = event.clientY - Math.round(clientHeight / 2);
    setStyle({left, top});
    inputEl.focus();
    inputEl.select();
  }, [event, reactflow]);

  const onKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      onLabelChange(event);
      onClose(event);
    }
  }

  return (
    <>
      <div className="label-popup-backdrop" onClick={onClose} />
      <input
        className="label-popup-input"
        placeholder="Enter label"
        defaultValue={selected.data?.label || selected.label}
        ref={inputRef}
        onChange={onLabelChange}
        onKeyDown={onKeyDown}
        style={style}
      />
    </>
  );
};
