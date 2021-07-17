const Layout = ({ children }) => {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-200 text-white">
      {children}
    </div>
  );
};

export default Layout;
