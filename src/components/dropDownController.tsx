import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {DisplayError} from './createNewCharacterComponents';
import DropDown from './dropDown';
import {SignUpFormSchema} from '../schemas/CreateNewCharacterSchema';

interface TextControllerProps {
  methods: UseFormReturn<SignUpFormSchema>;
  name: keyof SignUpFormSchema;
  // options: Readonly<Array<string>>;
  // options: Array<Readonly<string>>;
  options: any;
}
const DropDownController = (props: TextControllerProps) => {
  const {methods, name, options} = props;

  return (
    <Controller
      control={methods.control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        return (
          <>
            <DropDown
              options={options}
              label={'Select a ' + name}
              onChange={onChange}
              value={value}
              onBlur={onBlur}></DropDown>
            {error && <DisplayError error={error} />}
          </>
        );
      }}
    />
  );
};

export default DropDownController;
