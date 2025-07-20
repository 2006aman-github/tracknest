const Hero = () => {
  return (
    <section className="bg-gradient-to-br bg-[#5E4B2E] text-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Discover. Learn. Grow.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Explore premium and free courses tailored for your growth. Learn from top instructors and stay ahead.
        </p>
        <a
          href="/courses"
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Explore Courses
        </a>
      </div>
    </section>
  );
};

export default Hero;
