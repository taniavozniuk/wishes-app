import React, { useState } from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  value?: string | number;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  clearable,
  value: propValue,
  onChange: propOnChange,
  ...props
}) => {
  const [value, setValue] = useState(propValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    propOnChange?.(e);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.Box}>
        <input
          {...props}
          type={type}
          className={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />

        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
          >
            &#10006;
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
