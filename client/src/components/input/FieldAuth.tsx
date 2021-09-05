import { Form, Input } from 'antd';
import React, { ChangeEvent, FC, FocusEvent } from 'react';

type PropsTypes = {
  name: string;
  placeholder: string;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
  value: string;
  validateStatus: boolean;
  errorText: string;
};

const FieldAuth: FC<PropsTypes> = (props) => {
  const { name, placeholder, type, handleChange, handleBlur, value, validateStatus, errorText } = props;
  return (
    <Form.Item validateStatus={validateStatus ? 'error' : undefined} help={errorText || undefined} hasFeedback>
      <Input
        id={name}
        name={name}
        size="large"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    </Form.Item>
  );
};

export default FieldAuth;
