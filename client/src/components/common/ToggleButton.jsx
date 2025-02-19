const ToggleButton = ({ value, onChange, disabled }) => (
    <button
      onClick={() => !disabled && onChange(!value)}
      type="button"
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-300 ease-in-out
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${value ? "bg-violet-600" : "bg-gray-200"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white
          transition duration-300 ease-in-out
          ${value ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );

  export default ToggleButton