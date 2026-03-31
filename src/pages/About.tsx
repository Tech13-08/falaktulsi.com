import React from "react";
import ProfileImage from "../assets/profile.jpeg";
import FavoriteBadges from "../components/FavoriteBadges";
import EducationTimeline from "../components/EducationTimeline";
import VolunteeringList from "../components/VolunteeringList";

const About: React.FC = () => {
  return (
    <div className="h-full min-h-0 box-border flex justify-center px-4 md:px-8 py-8 overflow-hidden">
      <div className="w-full max-w-5xl flex flex-col gap-8 overflow-y-auto scrollbar-themed pr-1">
        {/* Hero Section */}
        <div className="p-8 rounded-xl shadow bg-gradient-to-br from-card to-background border border-secondary/10">
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
                Software Developer
              </p>
              <p className="text-textSecondary leading-relaxed max-w-xl">
                Passionate about building elegant software solutions, learning new technologies, 
                and actively contributing to the tech community through mentoring and volunteering.
              </p>
            </div>
          </div>
        </div>

        {/* Volunteering - Prominent Section */}
        <div className="p-8 rounded-xl shadow bg-card border-l-4 border-secondary">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <h2 className="text-3xl font-bold text-text font-mono">
              Community Involvement
            </h2>
          </div>
          <p className="text-textSecondary mb-6 leading-relaxed">
            I actively volunteer at tech conferences and conventions, helping organize events, 
            mentor attendees, and foster meaningful connections within the tech community.
          </p>
          <VolunteeringList />
        </div>

        {/* Two Column Section: Education & Favorites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="p-8 rounded-xl shadow bg-card">
            <h2 className="text-2xl font-bold mb-6 text-text font-mono flex items-center gap-2">
              <span className="text-secondary">→</span> Education
            </h2>
            <EducationTimeline />
          </div>

          {/* Favorites */}
          <div className="p-8 rounded-xl shadow bg-card">
            <h2 className="text-2xl font-bold mb-6 text-text font-mono flex items-center gap-2">
              <span className="text-secondary">→</span> Interests
            </h2>
            <FavoriteBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
