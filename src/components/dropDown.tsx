import React from 'react';
import {ControllerRenderProps, FieldError} from 'react-hook-form';
import {SelectList} from 'react-native-dropdown-select-list';

interface DropDownProps {
  options: Array<string>;
  label: string;
  onChange: ControllerRenderProps['onChange'];
  value: string;
  onBlur: ControllerRenderProps['onBlur'];
}

const DropDown = (props: DropDownProps) => {
  const {options, label, onChange, value, onBlur} = props;

  const list = options.map((item: string, index: number) => {
    return {key: index, value: item};
  });

  return (
    <SelectList
      placeholder={label}
      setSelected={onChange}
      data={list}
      save="value"
      search={false}
      onSelect={onBlur}
    />
  );
};

export default DropDown;
