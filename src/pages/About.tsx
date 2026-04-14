import React from "react";
import ProfileImage from "../assets/profile.jpeg";
import FavoriteBadges from "../components/FavoriteBadges";
import EducationTimeline from "../components/EducationTimeline";
import VolunteeringList from "../components/VolunteeringList";

const About: React.FC = () => {
  return (
    <div className="h-full min-h-0 box-border flex justify-center px-3 md:px-6 py-8 overflow-y-auto lg:overflow-hidden scrollbar-themed">
      <div className="w-full max-w-6xl h-auto lg:h-full min-h-0 lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 h-auto lg:h-full min-h-0">
          {/* Favorites Column - 30% */}
          <div className="lg:col-span-3 p-6 rounded-xl shadow bg-card hover:shadow-lg transition-shadow h-[320px] lg:h-full lg:min-h-0 flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold mb-5 text-text font-mono flex items-center gap-2">
              <span className="text-secondary">★</span> Favorites
            </h2>
            <div className="flex-1 min-h-0">
              <FavoriteBadges />
            </div>
          </div>

          {/* Main Column - 70% */}
          <div className="lg:col-span-7 h-auto lg:h-full lg:min-h-0 lg:overflow-y-auto scrollbar-themed lg:pr-1 flex flex-col gap-8">
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
                    Software Engineer
                  </p>
                  <p className="text-textSecondary leading-relaxed max-w-2xl">
                    Passionate about building elegant software solutions, learning new technologies,
                    and actively contributing to the tech community through mentoring and volunteering.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl shadow bg-card hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-4 text-text font-mono flex items-center gap-2">
                <span className="text-secondary">∑</span> Education
              </h2>
              <EducationTimeline />
            </div>

            <div className="p-8 rounded-xl shadow bg-card border-l-4 border-secondary hover:shadow-lg transition-shadow h-[480px] flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <h2 className="text-2xl font-bold text-text font-mono">
                  Community Involvement
                </h2>
              </div>
              <div className="flex-1 min-h-0">
                <VolunteeringList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
