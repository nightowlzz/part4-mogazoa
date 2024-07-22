export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex items-center justify-center h-screen pt-[70px] md:pt-[80px] lg:pt-[100px]">
      <div className="w-full max-w-[680px] pt-[30px] pb-[40px] px-5">{children}</div>
    </section>
  );
}
