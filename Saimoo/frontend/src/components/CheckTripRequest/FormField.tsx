import React from 'react';
const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = ''
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">{label}:</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded"
          rows={3}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );
};

export default FormField;
