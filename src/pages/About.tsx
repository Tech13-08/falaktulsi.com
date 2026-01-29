import React from "react";
import ProfileImage from "../assets/profile.jpeg";
import FavoriteBadges from "../components/FavoriteBadges";
import EducationTimeline from "../components/EducationTimeline";
import VolunteeringList from "../components/VolunteeringList";

const About: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        <div className="flex flex-col gap-8">
          <div className="p-6 rounded-xl shadow bg-card">
            <div className="flex items-center gap-4">
              <img
                src={ProfileImage}
                alt="Profile"
                className="w-24 h-24 rounded-md object-cover"
              />

              <div>
                <p className="text-text text-2xl font-bold">Falak Tulsi</p>
                <p className="text-textSecondary">Software Developer</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-xl shadow bg-card">
            <h2 className="text-2xl font-bold mb-4 text-text font-mono">
              Favorite Things
            </h2>
            <FavoriteBadges />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="p-6 rounded-xl shadow bg-card">
            <h2 className="text-2xl font-bold mb-4 text-text font-mono">
              Education
            </h2>
            <EducationTimeline />
          </div>
          <div className="p-6 rounded-xl shadow bg-card max-h-lg">
            <h2 className="text-2xl font-bold mb-4 text-text font-mono">
              Volunteering
            </h2>
            <VolunteeringList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
