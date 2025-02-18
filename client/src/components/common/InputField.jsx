const InputField = ({
  label,
  icon,
  value,
  onChange,
  type = "text",
  disabled,
  error,
}) => (
  <div className="group relative space-y-1">
    <label className="text-sm font-medium text-gray-500 flex items-center gap-2 transition-transform group-focus-within:-translate-y-1">
      {icon}
      <span className="transition-colors group-focus-within:text-violet-600">
        {label}
      </span>
    </label>

    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full px-4 py-2 
        bg-transparent 
        border-b-2 
        outline-none 
        transition-all
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-text"}
        ${
          error
            ? "border-red-400 focus:border-red-500 animate-shake"
            : "border-violet-200 focus:border-violet-500"
        }
      `}
    />

    {error && (
      <div className="animate-in fade-in slide-in-from-top-1 duration-200">
        <span className="flex items-center gap-1 text-sm text-red-500 mt-1">
          {error}
        </span>
      </div>
    )}
  </div>
);

export default InputField;
