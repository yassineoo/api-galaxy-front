"use client";
import { getSettings } from "@/actions/admin";
import Navbar from "@/components/HubXs/navbar";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Vetrine/footer";
import { useEffect, useState } from "react";
import About from "../api/about";
import { Alert } from "@/components/ui/alert"; // Optional error alert component
import { RingLoader } from "react-spinners";

const TermsAndConditionsPage = () => {
  const [termsAndConditions, setTermsAndConditions] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // State to manage error if fetch fails

  useEffect(() => {
    setLoading(true);
    getSettings()
      .then((data) => {
        setTermsAndConditions(data.termsAndConditions);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      <Navbar />

      {/* Header Section */}
      <header className="space-y-4 text-center mb-8">
        <h1 className="text-4xl mt-8 font-extrabold text-gray-900 dark:text-white">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Please read these terms and conditions carefully before using our
          services.
        </p>
      </header>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto mb-12">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <RingLoader /> {/* Show a loading spinner */}
          </div>
        )}

        {error && (
          <Alert defaultValue="Failed to load the Terms & Conditions. Please try again later." />
        )}

        {!loading && !error && termsAndConditions && (
          <Card className="shadow-lg">
            <CardContent className="p-8 space-y-8">
              <About
                apiDocs={{
                  Content: termsAndConditions,
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
