export function TextInput({ placeholder, name, type, customStyle }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      style={customStyle}
      className="bg-white w-full px-[15px] py-[6px] flex items-center justify-center gap-[5px] rounded-md border-2 border-solid border-[#323232] shadow-[4px_4px_#323232] overflow-hidden"
    />
  )
}
