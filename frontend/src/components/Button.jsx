export function Button({ children, customStyle, onClick, type, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...customStyle, cursor: disabled ? "not-allowed" : "pointer" }}
      disabled={disabled}
      className="group bg-white w-full px-[15px] py-[6px] flex items-center justify-center gap-[5px] rounded-md border-2 border-solid border-[#323232] shadow-[4px_4px_#323232] transition-all duration-[250ms] relative overflow-hidden z-[1] hover:text-[#e8e8e8]"
    >
      <div
        style={{ width: disabled ? "0%" : "" }}
        className="absolute top-0 left-0 h-full w-[0%] group-hover:w-full bg-[#212121] z-[-1] shadow-[4px_8px_19px_-3px_rgba(0, 0, 0, 0.27)] transition-all duration-[250ms]"
      ></div>
      {children}
    </button>
  )
}
