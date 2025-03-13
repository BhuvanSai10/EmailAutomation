import React, { useState } from "react";
import axios from "axios";
import HeroSection from "./HeroSection";
import { BACKEND_URL } from '../env.js';

const Form = ({ senderEmail }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [sendNow, setSendNow] = useState(true);
  const [showHeroSection, setShowHeroSection] = useState(false);

  const handleButtonClick = () => {
    setShowHeroSection(true);
  };

  const clearForm = () => {
    setEmail("");
    setSubject("");
    setBody("");
    setScheduledTime("");
    setSendNow(true);
  };

  const handleSubmit = async () => {
    try {
      if (sendNow) {
        await axios.post(`${BACKEND_URL}/api/automateMail`, {
          senderEmail: senderEmail,
          userEmail: email,
          subject: subject,
          body: body,
        });
        alert("Email sent successfully!");
      } else {
        await axios.post(`${BACKEND_URL}/api/schedule`, {
          senderEmail: senderEmail,
          userEmail: email,
          subject: subject,
          body: body,
          scheduledTime: scheduledTime,
        });
        alert("Email scheduled successfully!");
      }
      clearForm(); 
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send/schedule email.");
    }
  };

  return (
    <>
      {!showHeroSection && (
        <div className="flex flex-col items-center mt-6 lg:mt-10 max-sm:mt-15 m-10 ">
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1"
                  htmlFor="grid-email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1"
                  htmlFor="grid-subject"
                >
                  Subject
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-subject"
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1"
                  htmlFor="grid-body"
                >
                  Message
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-body"
                  rows="5"
                  placeholder="Enter Message"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-1"
                  htmlFor="grid-datetime"
                >
                  Date and Time
                </label>
                <input
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-datetime"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  disabled={sendNow}
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="send-now"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={sendNow}
                onChange={() => setSendNow(!sendNow)}
              />
              <label
                htmlFor="send-now"
                className="ml-2 block uppercase tracking-wide text-gray-700 text-s font-bold "
              >
                Send Email Now
              </label>
            </div>

            <div className="flex justify-center max-sm:flex-col items-center">
              <button
                className="mt-4 mb-10 mr-4 text-2xl bg-orange-500 text-[#E2E8CE] px-4 py-2 rounded hover:bg-amber-700 cursor-pointer max-sm:mb-4"
                type="button"
                onClick={handleSubmit}
              >
                {sendNow ? "Send Email" : "Schedule Email"}
              </button>
              <button
                className="mt-4 mb-10 text-2xl bg-orange-500 text-[#E2E8CE] px-4 py-2 rounded hover:bg-amber-700 cursor-pointer max-sm:mt-0"
                type="button"
                onClick={handleButtonClick}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}

      {showHeroSection && <HeroSection />}
    </>
  );
};

export default Form;