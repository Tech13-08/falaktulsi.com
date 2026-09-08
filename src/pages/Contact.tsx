import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Button from "../components/Button";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const CONTACT_EMAIL = "falaktulsi@gmail.com";
const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hello Falak — opportunity")}`;

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
  const [copied, setCopied] = useState(false);

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
        "Failed to send message. Use Email me directly above, or try again later.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="h-full min-h-0 box-border flex justify-center px-4 py-6 md:p-8 overflow-y-auto scrollbar-themed">
      <form
        onSubmit={handleSend}
        className="w-full max-w-xl h-fit p-6 rounded-xl shadow bg-card flex flex-col gap-3"
      >
        <h1 className="text-3xl font-bold text-text font-mono">
          Contact Me
        </h1>
<div className="flex flex-wrap items-center gap-2">
          <a href={MAILTO_HREF}>
            <Button type="button" variant="primary" size="sm">
              Email me directly
            </Button>
          </a>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopyEmail}
          >
            {copied ? "Copied" : "Copy email address"}
          </Button>
        </div>

        <label className="text-textSecondary">From</label>
        <input
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-3 rounded bg-background text-text outline-none 
                     border border-secondary/30 focus:border-secondary"
          placeholder="your@email.com"
          autoComplete="email"
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
          className="p-3 rounded bg-background text-text outline-none border border-secondary/30 focus:border-secondary h-24 md:h-28 resize-none"
          placeholder="Write your message here..."
        />

        <input
          type="text"
          className="hidden"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
        />

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {success && <p className="text-sm text-green-500 mt-1">{success}</p>}

        <div className="flex justify-end mt-2">
          <Button
            type="submit"
            className="h-12 px-6 disabled:opacity-60"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>

        <p className="text-sm text-textSecondary mt-2">
          Prefer social?{" "}
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
      </form>
    </div>
  );
};

export default Contact;
