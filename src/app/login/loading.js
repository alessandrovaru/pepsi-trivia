export default function Loading() {
  // Or a custom loading skeleton component
  return <div className="flex items-center justify-center h-[96vh] p-8 bg-black font-[family-name:var(--font-pepsi-owners-2-compressed)] relative">
    <div className="w-full max-w-md p-8 rounded-lg relative overflow-hidden bg-white text-center z-10">
      <h1 className="text-black text-lg">
        Cargando...
      </h1>
    </div>
  </div>
}