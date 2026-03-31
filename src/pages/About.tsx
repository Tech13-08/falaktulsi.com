import React from "react";
import ProfileImage from "../assets/profile.jpeg";
import FavoriteBadges from "../components/FavoriteBadges";
import EducationTimeline from "../components/EducationTimeline";
import VolunteeringList from "../components/VolunteeringList";

const About: React.FC = () => {
  return (
    <div className="h-full min-h-0 box-border flex justify-center px-3 md:px-6 py-8 overflow-hidden">
      <div className="w-full max-w-6xl overflow-y-auto scrollbar-themed pr-1">
        {/* Hero Section - Full Width */}
        <div className="p-8 mb-12 rounded-xl shadow bg-gradient-to-br from-card to-background border border-secondary/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={ProfileImage}
              alt="Profile"
              className="w-32 h-32 rounded-lg object-cover shadow-lg flex-shrink-0"
            />
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="text-4xl font-bold text-text font-mono">
                Falak Tulsi
              </h1>
              <p className="text-xl text-secondary font-semibold">
                Software Engineer
              </p>
              <p className="text-textSecondary leading-relaxed max-w-2xl">
                Passionate about building elegant software solutions, learning new technologies, 
                and actively contributing to the tech community through mentoring and volunteering.
              </p>
            </div>
          </div>
        </div>

        {/* Asymmetric Creative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Education - Left Column, Tall */}
          <div className="md:col-span-1 lg:col-span-1 p-8 rounded-xl shadow bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-6 text-text font-mono flex items-center gap-2">
              <span className="text-secondary">→</span> Education
            </h2>
            <EducationTimeline />
          </div>

          {/* Volunteering - Center/Right, Large, Static Height */}
          <div className="md:col-span-2 lg:col-span-2 p-8 rounded-xl shadow bg-card border-l-4 border-secondary hover:shadow-lg transition-shadow h-[480px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <h2 className="text-2xl font-bold text-text font-mono">
                Community Involvement
              </h2>
            </div>
            <p className="text-textSecondary mb-6 leading-relaxed">
              I actively volunteer at tech conferences and conventions, organizing events, 
              mentoring attendees, and fostering connections in the tech community.
            </p>
            <div className="flex-1 min-h-0">
              <VolunteeringList />
            </div>
          </div>

          {/* Interests - Right Column */}
          <div className="md:col-span-1 lg:col-span-1 p-6 rounded-xl shadow bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-5 text-text font-mono flex items-center gap-2">
              <span className="text-secondary">✦</span> Interests
            </h2>
            <FavoriteBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
