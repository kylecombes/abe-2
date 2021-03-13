import * as React from 'react';
import { DateTimePicker } from 'react-rainbow-components';
import { useUniqueId } from '../../util/hooks';

import styles from './Inputs.module.css';

interface BaseFormInputProps<T> {
  label: string;
  onChange: (value: T) => void;
  value: T;
}

interface FormFieldWrapperProps {
  children: (args: { inputId: string }) => React.ReactNode;
  label: string;
}

function FormFieldWrapper({ children, label }: FormFieldWrapperProps) {
  const inputId = useUniqueId('FormEditField');
  return (
    <div role="group" className={styles.FormWrapper}>
      <label htmlFor={inputId}>{label}</label>
      {children({ inputId })}
    </div>
  );
}

interface FormInputProps extends BaseFormInputProps<string> {
  type?: string;
}

export function FormInput({ label, onChange, type = 'text', value }: FormInputProps) {
  return (
    <FormFieldWrapper label={label}>
      {({ inputId }) => (
        <input id={inputId} onChange={(e) => onChange(e.target.value)} type={type} value={value} />
      )}
    </FormFieldWrapper>
  );
}

type FormTextareaProps = BaseFormInputProps<string>;

export function FormTextarea({ label, onChange, value }: FormTextareaProps) {
  return (
    <FormFieldWrapper label={label}>
      {({ inputId }) => (
        <textarea id={inputId} onChange={(e) => onChange(e.target.value)} value={value} />
      )}
    </FormFieldWrapper>
  );
}

type DateTimeInputProps = BaseFormInputProps<Date>;

export function DateTimeInput({ label, onChange, value }: DateTimeInputProps) {
  return <DateTimePicker value={value} onChange={onChange} label={label} />;
}
