import { useTheme } from "../context/ThemeContext";
import blogImg from "../assets/blogimg.webp";
import profileImg from "../assets/IMG_20230519_214957.jpg";

const About = () => {
  const { theme } = useTheme(); // Get current theme from context

  return (
    <div className={`min-h-screen transition-colors duration-300 py-16 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            About <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}>BlogHive</span>
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            CilliBlog is a modern blogging platform built for creators and readers. 
            We aim to make sharing stories, tutorials, and ideas beautifully simple and accessible to everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className={`text-3xl font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Our <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}>Mission</span>
            </h2>
            <p className={`text-lg leading-relaxed mb-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              We believe everyone has a story worth sharing. Our mission is to empower bloggers and content creators 
              with tools that are intuitive, fast, and beautiful – so you can focus on your words and your audience.
            </p>
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              From tutorials to personal stories, CilliBlog is here to help you connect with the world.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={blogImg}
              alt="About us"
              className={`rounded-xl shadow-lg object-cover w-full h-64 md:h-96 lg:h-[28rem] ${
                theme === 'dark' ? 'shadow-gray-800/50' : ''
              }`}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className={`rounded-xl p-8 shadow-md mb-20 ${
          theme === 'dark' ? 'bg-gray-800 shadow-gray-800/30' : 'bg-white'
        }`}>
          <h2 className={`text-3xl font-semibold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            What Makes Us <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}>Different</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Clean Design",
                desc: "Minimalist interface that puts your content first"
              },
              {
                title: "Seamless Writing",
                desc: "Distraction-free editor with markdown support"
              },
              {
                title: "Advanced Tools",
                desc: "Built-in analytics and SEO optimization"
              },
              {
                title: "Supportive Community",
                desc: "Connect with like-minded creators"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-lg transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <h3 className={`text-xl font-medium mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className={`text-3xl font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Meet The <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}>Creators</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            The passionate team behind CilliBlog
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <img
                  src={profileImg}
                  className={`w-32 h-32 rounded-full object-cover border-4 transition-transform duration-300 group-hover:scale-105 ${
                    theme === 'dark' ? 'border-blue-400' : 'border-blue-500'
                  }`}
                  alt="Parth Singh"
                />
                <div className={`absolute inset-0 rounded-full border-4 border-transparent transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'group-hover:border-gray-800' 
                    : 'group-hover:border-white'
                }`}></div>
              </div>
              <h3 className={`text-xl font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Parth Singh
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                Founder & Developer
              </p>
              <div className="flex space-x-4 mt-3">
                <a href="#" className={`transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-blue-400' 
                    : 'text-gray-500 hover:text-blue-500'
                }`}>
                  {/* Twitter icon */}
                </a>
                <a href="#" className={`transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-blue-400' 
                    : 'text-gray-500 hover:text-blue-700'
                }`}>
                  {/* LinkedIn icon */}
                </a>
                <a href="#" className={`transition-colors ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}>
                  {/* GitHub icon */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;