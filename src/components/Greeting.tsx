import { useEffect, useState, useRef } from "react";

const greetings = [
  "Hello!",
  "¡Hola!",
  "Sat Sri Akaal!",
  "Namaste!",
  'print("Hello, world!")',
  'fmt.Println("Hello World!")',
];

interface GreetingProps {
  trigger: string;
}

export default function Greeting({ trigger }: GreetingProps) {
  const [displayed, setDisplayed] = useState("Hello!");
  const [, setFullText] = useState("Hello!");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const initialTrigger = useRef(trigger);
  const fullTextRef = useRef("Hello!");

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    let speed = isDeleting ? 50 : 75;

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      return;
    }

    if (!isDeleting && displayed === fullTextRef.current) {
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayed((prev) => prev.slice(0, -1));
      } else {
        setDisplayed(fullTextRef.current.slice(0, displayed.length + 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting]);

  useEffect(() => {
    if (trigger === initialTrigger.current) return;
    initialTrigger.current = trigger;

    let next = fullTextRef.current;
    while (next === fullTextRef.current) {
      next = greetings[Math.floor(Math.random() * greetings.length)];
    }

    fullTextRef.current = next;
    setFullText(next);
    setIsDeleting(true);
  }, [trigger]);

  return (
    <>
      {displayed}
      <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
    </>
  );
}
