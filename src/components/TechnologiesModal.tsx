import React from "react";
import { X } from "lucide-react";

interface TechnologiesModalProps {
  technologies: string[];
  onClose: () => void;
}

const TechnologiesModal: React.FC<TechnologiesModalProps> = ({
  technologies,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card w-[90%] max-w-3xl max-h-[85vh] rounded-2xl shadow-xl p-6 flex flex-col border border-textSecondary">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text">Full Index</h2>
          <button
            className="text-textSecondary hover:text-text transition"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto pr-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="p-3 bg-background rounded-lg border border-textSecondary text-center text-textSecondary hover:text-text hover:border-primary transition"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologiesModal;
