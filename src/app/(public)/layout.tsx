import Header from "@/components/user/Header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="min-h-screen flex flex-col">
        <Header />

        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
