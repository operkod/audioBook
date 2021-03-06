import './Style.scss';
import React from 'react';
import { Input } from 'antd';
import cn from 'classnames';

const { TextArea } = Input;

type Props = {
  name?: string;
  value?: string;
  error?: boolean;
  textError?: string;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  label?: string;
  styleProp?: any;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const InputText = (props: Props) => {
  const {
    name,
    value,
    placeholder,
    error,
    minRows = 1,
    maxRows = 1,
    label,
    styleProp,
    onChange,
    onBlur,
    textError,
  } = props;
  return (
    <>
      <label
        id={name}
        className={cn('input__label', {
          'input__label-error': error,
        })}
      >
        {error ? textError : label}
      </label>
      <TextArea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoSize={{ minRows, maxRows }}
        onBlur={onBlur}
        style={styleProp}
      />
    </>
  );
};

export default InputText;
