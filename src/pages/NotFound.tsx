import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col p-20 gap-6 items-center">
      <div className="justify-center text-center w-full lg:w-1/2 p-6 rounded-xl shadow bg-card">
        <h1 className="text-6xl font-bold mb-4 text-text">404</h1>
        <p className="text-lg mb-6 text-textSecondary">
          The page you're looking for doesn't exist.
        </p>

        <Link key="Home" to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
