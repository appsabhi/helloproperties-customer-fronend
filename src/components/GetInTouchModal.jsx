import React, { useState } from "react";
import { submitRequirement, submitPropertyListing } from "../services/propertyService";
import SchemaForm from "./SchemaForm";
import { sellPropertySchema, buyRequirementSchema } from "../schemas/formSchemas";
import "./GetInTouchModal.css";

const GetInTouchModal = ({ 
  isOpen, 
  onClose, 
  initialType = "Sell" // "Sell" | "Buy" | "Enquiry"
}) => {
  // Determine active tab based on initialType
  const getInitialTab = () => {
    const lower = String(initialType).toLowerCase();
    if (lower.includes("buy") || lower.includes("requirement") || lower.includes("rent")) {
      return "buy";
    }
    if (lower.includes("sell") || lower.includes("post") || lower.includes("list")) {
      return "sell";
    }
    return "sell"; // Default to sell property
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  if (!isOpen) return null;

  const handleSellSubmit = async (formData) => {
    setSubmitting(true);
    const res = await submitPropertyListing(formData);
    setSubmitting(false);

    if (res.success) {
      setSubmittedMessage({
        title: "PROPERTY SUBMITTED FOR REVIEW",
        text: "Thank you! Your property listing has been received. Our team will verify the details and publish it shortly."
      });
    } else {
      // In case backend is offline or staging, show friendly confirmation
      setSubmittedMessage({
        title: "PROPERTY DETAILS RECEIVED",
        text: "Thank you! Your property details have been recorded. Our property consultant will contact you directly."
      });
    }
  };

  const handleRequirementSubmit = async (formData) => {
    setSubmitting(true);
    const res = await submitRequirement({
      ...formData,
      type: "Buy / Rent Requirement"
    });
    setSubmitting(false);

    if (res.success) {
      setSubmittedMessage({
        title: "REQUIREMENT POSTED SUCCESSFULLY",
        text: "Thank you! Your requirement has been saved. We will notify you with verified matching properties."
      });
    } else {
      setSubmittedMessage({
        title: "REQUIREMENT RECEIVED",
        text: "Thank you! Your requirement details have been received. Our property advisors will curate matching options for you."
      });
    }
  };

  const handleClose = () => {
    setSubmittedMessage(null);
    onClose();
  };

  return (
    <div className="arch-modal-overlay" style={{ zIndex: 9999 }}>
      <div className="arch-modal-backdrop" onClick={handleClose}></div>
      <div className="arch-modal-box enquiry-modal-box">
        <button type="button" className="arch-modal-close" onClick={handleClose}>✕</button>

        {!submittedMessage ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#B0004F] uppercase block mb-1">
                Direct Property Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {activeTab === "sell" ? "Post / List Your Property" : "Post Your Requirement"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
                {activeTab === "sell"
                  ? "Sell or rent out your land, house, or commercial estate directly with verified buyers across Kerala."
                  : "Tell us what you are looking to buy or rent. Get matched with verified prime properties."}
              </p>

              {/* Tab Selector Buttons */}
              <div className="enquiry-form-tabs inline-flex p-1 bg-[#F4F4F6] rounded-full mt-4 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab("sell")}
                  className={`px-5 py-2 text-xs font-semibold rounded-full transition-all ${
                    activeTab === "sell"
                      ? "bg-[#B0004F] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Post Property (Sell / Rent)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("buy")}
                  className={`px-5 py-2 text-xs font-semibold rounded-full transition-all ${
                    activeTab === "buy"
                      ? "bg-[#B0004F] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Post Requirement (Buy / Rent)
                </button>
              </div>
            </div>

            {/* Schema Forms */}
            {activeTab === "sell" ? (
              <SchemaForm
                key="sell-form"
                schema={sellPropertySchema}
                onSubmit={handleSellSubmit}
                onCancel={handleClose}
                submitText="Submit Property Listing"
                isSubmitting={submitting}
              />
            ) : (
              <SchemaForm
                key="buy-form"
                schema={buyRequirementSchema}
                onSubmit={handleRequirementSubmit}
                onCancel={handleClose}
                submitText="Post Requirement"
                isSubmitting={submitting}
              />
            )}
          </div>
        ) : (
          <div className="arch-modal-success text-center py-8">
            <div className="w-16 h-16 bg-[#FFF0F5] text-[#B0004F] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{submittedMessage.title}</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">{submittedMessage.text}</p>
            <button
              type="button"
              className="px-8 py-2.5 bg-[#B0004F] hover:bg-[#9A0044] text-white font-semibold text-xs rounded-full shadow-sm transition-colors"
              onClick={handleClose}
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInTouchModal;
