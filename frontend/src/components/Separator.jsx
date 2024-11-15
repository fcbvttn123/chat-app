export function Separator({ children }) {
  return (
    <div className="mt-[20px] mb-[14px] flex justify-center items-center gap-[5px] w-full">
      <div className="h-[3px] grow rounded-lg bg-[#666]"></div>
      <span className="text-xl text-[#555] font-extrabold">{children}</span>
      <div className="h-[3px] grow rounded-lg bg-[#666]"></div>
    </div>
  )
}
