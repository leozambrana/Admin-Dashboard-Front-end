export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/login-bg.png")' }}
      >
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4 py-12">
        <div className="animate-in fade-in zoom-in duration-700">
          {children}
        </div>
      </div>
    </div>
  );
}
