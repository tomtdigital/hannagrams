const Page = ({ children }) => (
  <div className="flex justify-center w-screen">
    <div className="w-[100%] sm:w-[375px] sm:shadow-z1">{children}</div>
  </div>
);

export default Page;
