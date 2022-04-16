import React, { ComponentProps } from 'react';

type Props = {
  onChange?: ComponentProps<'input'>['onChange']
  onBlur?: ComponentProps<'input'>['onBlur']
  value: number
}

export function TableItemInput({ onChange, value, onBlur }: Props) {
  return (
    <input 
      onChange={onChange}
      // value={value}
      defaultValue={value}
      type="number"
      min={0}
      onBlur={onBlur}
      className="tableItemInput"/>
  );
}
