const About = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center border border-white/20">
        <h1 className="sm:text-5xl text-2xl md:text-7xl font-extrabold text-white tracking-wide uppercase">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Tech Square
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-md mx-auto">
          Your one-stop hub for the latest and greatest gadgets.
        </p>
      </div>
    </div>
  );
};

export default About;
