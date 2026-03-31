import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Button from "../components/Button";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const Contact: React.FC = () => {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [honeypot, setHoneypot] = useState("");

  const [lastSubmission, setLastSubmission] = useState<number | null>(null);

  useEffect(() => {
    emailjs.init({
      publicKey: PUBLIC_KEY,
    });
  }, []);

  const validate = () => {
    if (!from.trim() || !subject.trim() || !message.trim()) {
      setError("Please fill out all fields.");
      return false;
    }
    if (!EMAIL_REGEX.test(from.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (lastSubmission && Date.now() - lastSubmission < 60000) {
      setError("Please wait a minute before sending another message.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    if (honeypot.trim() !== "") {
      setError("Bot detected.");
      return;
    }

    setIsSending(true);
    setError(null);
    setSuccess(null);

    const templateParams = {
      from_email: from.trim(),
      subject: `${subject.trim()}`,
      message: message.trim(),
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      setSuccess("Message sent. Thanks!");
      setLastSubmission(Date.now());
      setFrom("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setError(
        "Failed to send message. Try again later or check your EmailJS settings.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col p-8 gap-6 items-center">
      <div
        className="w-full lg:w-1/2 p-6 rounded-xl shadow bg-card 
                   flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-text font-mono mb-2">
          Contact Me
        </h1>

        <label className="text-textSecondary">From</label>
        <input
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-3 rounded bg-background text-text outline-none 
                     border border-secondary/30 focus:border-secondary"
          placeholder="your@email.com"
        />

        <label className="text-textSecondary">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-3 rounded bg-background text-text outline-none
                     border border-secondary/30 focus:border-secondary"
          placeholder="What's this about?"
        />

        <label className="text-textSecondary">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 rounded bg-background text-text outline-none 
                     border border-secondary/30 focus:border-secondary 
                     h-40 resize-none"
          placeholder="Write your message here..."
        />

        <input
          type="text"
          className="hidden"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {success && <p className="text-sm text-green-500 mt-1">{success}</p>}

        <p className="text-sm text-textSecondary mt-2">
          Prefer direct contact? Reach me on{" "}
          <a
            href="https://www.linkedin.com/in/falak-tulsi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <a
            href="https://github.com/Tech13-08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex justify-end">
        <Button
          className="h-12 px-6 disabled:opacity-60"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
