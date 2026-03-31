import React, { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import { colorPalettes } from "../theme/colorPalettes";
import { applyThemeColors } from "../theme/applyThemeColors";

interface DeviceProps {
  technologies: string[];
  showAll: boolean;
  onToggleAll: (enabled: boolean) => void;
  onGreetClick: () => void;
}

const loadingFrames = [".", ". .", ". . ."];

const Device: React.FC<DeviceProps> = ({
  technologies,
  onToggleAll,
  showAll,
  onGreetClick,
}) => {
  const [screenText, setScreenText] = useState<string>("Loading...");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTech, setCurrentTech] = useState<string>("");
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const getRandomTech = useCallback(
    () => technologies[Math.floor(Math.random() * technologies.length)],
    [technologies],
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getNewRandomTech = useCallback(() => {
    let newTech = getRandomTech();
    while (newTech === currentTech && technologies.length > 1) {
      newTech = getRandomTech();
    }
    return newTech;
  }, [getRandomTech, currentTech, technologies.length]);

  useEffect(() => {
    const tech = getRandomTech();
    setScreenText(tech);
    setCurrentTech(tech);
  }, [getRandomTech]);

  const handleRandom = () => {
    if (isLoading) return;
    setIsLoading(true);

    let frameIndex = 0;
    setScreenText(loadingFrames[frameIndex]);

    intervalRef.current = setInterval(() => {
      frameIndex++;

      if (frameIndex < loadingFrames.length) {
        setScreenText(loadingFrames[frameIndex]);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const newTech = getNewRandomTech();
        setScreenText(newTech);
        setCurrentTech(newTech);
        setIsLoading(false);
      }
    }, 300);
  };

  const handleAllToggle = () => {
    onToggleAll(!showAll);
  };

  const handleThemeSwitch = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const currentPrimary = rootStyles.getPropertyValue("--primary").trim();

    let currentIndex = colorPalettes.findIndex(
      (p) => p.primary === currentPrimary,
    );

    if (currentIndex === -1) currentIndex = 0;

    const nextIndex = (currentIndex + 1) % colorPalettes.length;
    const nextPalette = colorPalettes[nextIndex];

    applyThemeColors(
      nextPalette.primary,
      nextPalette.secondary,
      nextPalette["primary-dark"],
      nextPalette["secondary-dark"],
    );

    localStorage.setItem("selectedPalette", JSON.stringify(nextPalette));
  };

  return (
    <div className="w-full bg-card rounded-2xl shadow-lg p-4 flex flex-col items-center space-y-4">
      <div
        className="w-full text-center text-sm font-mono text-textSecondary rounded px-2 py-1 leading-none"
        style={{ backgroundColor: "rgba(232, 225, 220, 0.05)" }}
      >
        <span className="block">Index of technologies</span>
        <span className="block">I’m proficient in</span>
      </div>

      <div className="w-full h-28 bg-background rounded-xl border border-textSecondary flex items-center justify-center text-text text-xl font-mono">
        {screenText}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <Button onClick={handleRandom}>Random</Button>

        <Button onClick={handleAllToggle}>All</Button>

        <Button onClick={handleThemeSwitch} variant="secondary">
          Color
        </Button>

        <Button onClick={onGreetClick} variant="secondary">
          Greet
        </Button>
      </div>
    </div>
  );
};

export default Device;
