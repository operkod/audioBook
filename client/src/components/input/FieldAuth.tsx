import { Form, Input } from 'antd';
import React, { ChangeEvent, FocusEvent } from 'react';

type PropsType = {
  name: string;
  placeholder: string;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
  errors: any;
  values: any;
};

const FormField = (props: PropsType) => {
  const { name, placeholder, type, handleChange, handleBlur, errors, values } = props;
  return (
    <Form.Item
      validateStatus={errors[name].isValid ? 'error' : undefined}
      help={errors[name].isValid ? errors[name].text : undefined}
      hasFeedback
    >
      <Input
        id={name}
        name={name}
        size="large"
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    </Form.Item>
  );
};
export default FormField;
