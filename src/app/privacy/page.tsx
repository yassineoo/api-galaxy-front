"use client";
import { getSettings } from "@/actions/admin";
import Navbar from "@/components/HubXs/navbar";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Vetrine/footer";
import { useEffect, useState } from "react";
import About from "../api/about";
import { Alert } from "@/components/ui/alert"; // Optional error alert component
import { RingLoader } from "react-spinners";

const PrivacyPolicyPage = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // State to manage error if fetch fails

  useEffect(() => {
    setLoading(true);
    getSettings()
      .then((data) => {
        setPrivacyPolicy(data.privacyPolicy);
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
          Privacy Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Your privacy is critically important to us. Please review our privacy
          practices carefully.
        </p>
      </header>

      {/* Privacy Policy Content */}
      <div className="max-w-5xl mx-auto mb-12">
        {loading && <RingLoader />}

        {error && (
          <Alert defaultValue="Failed to load the Privacy Policy. Please try again later." />
        )}

        {!loading && !error && privacyPolicy && (
          <Card className="shadow-lg">
            <CardContent className="p-8 space-y-8">
              <About
                apiDocs={{
                  Content: privacyPolicy,
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

export default PrivacyPolicyPage;
