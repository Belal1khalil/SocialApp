export default function ProfileSkeleton() {
  return (
    <>
      <div className="min-h-screen bg-gray-50/50 pb-20 animate-pulse">
        <div className="relative h-64 md:h-80 w-full bg-gray-200" />
        <div className="container mx-auto px-4 -mt-20 relative z-20">
          <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-sm border border-white/60 overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16 border-b border-gray-100/50">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2.2rem] bg-gray-200" />
                <div className="flex-1 space-y-4">
                  <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto md:mx-0" />
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="h-10 w-40 bg-gray-100 rounded-2xl" />
                    <div className="h-10 w-40 bg-gray-100 rounded-2xl" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <div className="h-12 w-40 bg-gray-200 rounded-2xl" />
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-50/30">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-[2rem] border border-gray-100/50 h-32"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
