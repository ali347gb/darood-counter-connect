
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white islamic-pattern">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 mt-8">
            <h1 className="text-4xl font-bold text-emerald-800 mb-6">
              About Darood-e-Pak Counter
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-emerald-800">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              The Darood-e-Pak Counter is dedicated to encouraging Muslims around the world to increase 
              their recitation of Darood Sharif. By providing a simple way to track individual and 
              collective recitations, we aim to strengthen the connection between the Ummah and our 
              beloved Prophet Muhammad (Peace Be Upon Him).
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-emerald-800">The Importance of Darood</h2>
            <p className="text-gray-700 mb-6">
              Sending Darood (salutations and blessings) upon the Prophet Muhammad (PBUH) is a noble act 
              with immense rewards. The Prophet himself said, "Whoever sends one blessing upon me, Allah 
              will send ten blessings upon him." Through this application, we hope to motivate believers 
              to engage in this blessed practice more regularly.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 text-emerald-800">Our Community</h2>
            <p className="text-gray-700">
              We are building a global community of believers committed to increasing the remembrance 
              of our Prophet (PBUH). Through collective effort, we hope to reach billions of Darood 
              recitations, bringing blessings to the entire Ummah.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-emerald-800">Join Us</h2>
            <p className="text-gray-700">
              Whether you recite one Darood a day or thousands, your contribution matters. 
              Create an account today to start tracking your recitations and join our growing 
              community of dedicated believers.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-emerald-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Darood Counter. All rights reserved.</p>
          <p className="text-emerald-200 text-sm mt-2">
            Designed with love for the Muslim Ummah.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
