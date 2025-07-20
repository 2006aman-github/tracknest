import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Home = () => {
  return (
   <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        {/* Other sections like ExploreCourses etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
