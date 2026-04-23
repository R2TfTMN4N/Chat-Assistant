"use client";

import { Button } from "@workspace/ui/components/button";
import { InfoIcon, Code2Icon, ExternalLinkIcon } from "lucide-react";

export const WidgetInfoScreen = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <InfoIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chat Assistant Widget
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Embeddable Customer Support Widget
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
              Organization ID Required
            </h2>
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              This widget requires an{" "}
              <code className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded text-xs font-mono">
                organizationId
              </code>{" "}
              parameter to function properly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Code2Icon className="w-5 h-5" />
              How to Use
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  1. Add the organizationId query parameter to the URL:
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200">
                    {window.location.origin}/?organizationId=YOUR_ORG_ID
                  </code>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  2. Or embed this widget on your website:
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200 whitespace-pre">
                    {`<script src="${window.location.origin}/widget.js"></script>
<script>
  ChatWidget.init({
    organizationId: "YOUR_ORG_ID"
  });
</script>`}
                  </code>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  3. Get your Organization ID from the dashboard
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Log in to your dashboard to find your unique organization ID
                  in the integrations section.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            className="flex-1"
            onClick={() =>
              window.open(
                "https://github.com/yourusername/Chat-Assistants",
                "_blank",
              )
            }
          >
            <ExternalLinkIcon className="w-4 h-4 mr-2" />
            View Documentation
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              const testOrgId = prompt("Enter your Organization ID:");
              if (testOrgId) {
                window.location.href = `${window.location.origin}/?organizationId=${testOrgId}`;
              }
            }}
          >
            Test with Organization ID
          </Button>
        </div>

        {/* Example Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Need help? Check the{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Please refer to the main application dashboard for setup instructions.",
                );
              }}
            >
              integration guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
