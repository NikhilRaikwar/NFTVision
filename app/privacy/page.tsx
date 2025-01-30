"use client";

import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <Layout showBackButton>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <Card className="max-w-4xl mx-auto shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle>NFTVision Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
              <p>
                We collect information that you provide directly to us, including but not limited to wallet addresses,
                email addresses, and usage data to provide you with our NFT analytics services.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">2. How We Use Your Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
                <li>To monitor the usage of our Service</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">3. Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information. However, please note
                that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">4. Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">5. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:raikwarnikhil16@gmail.com" className="text-blue-500 hover:underline">
                  raikwarnikhil16@gmail.com
                </a>
                .
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
