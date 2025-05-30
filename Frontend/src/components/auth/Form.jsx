import React from 'react';
import Back from '../Back';

const Form = ({ title, fields, onSubmit }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <Back />
      <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {fields.map(({ label, type, name, value, onChange, options }, index) => (
          <div key={index}>
            <label className="block mb-1 text-gray-700">{label}</label>

            {type === 'select' ? (
              <select
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select a role</option>
                {options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          {title}
        </button>
      </form>
    </div>
  );
};

export default Form;
