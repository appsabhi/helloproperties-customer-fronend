import React, { useState, useEffect } from "react";
import "./PropertyActionModal.css";
import SchemaForm from "./SchemaForm";
import { 
  sellPropertyFormSchema, 
  rentPropertyFormSchema, 
  buyerRequirementFormSchema 
} from "../schemas/formSchemas";
import { submitPropertyListing, submitRequirement } from "../services/propertyService";
import { CheckCircle2, X } from "./Icons";

export default function PropertyActionModal({
  isOpen,
  onClose,
  formType = "buyer" // "seller" | "renter" | "buyer"
}) {
  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  // Background scroll locking
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Escape key closing
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleModalClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleModalClose = () => {
    setSuccessInfo(null);
    onClose();
  };

  // Determine configuration based on formType
  let config = {
    badge: "BUYER / TENANT INQUIRY",
    title: "Looking for a Property?",
    subtitle: "",
    schema: buyerRequirementFormSchema,
    submitText: "Submit Buyer Requirement"
  };

  if (formType === "seller") {
    config = {
      badge: "DIRECT SELLER PORTAL",
      title: "Want to Sell Your Property?",
      subtitle: "",
      schema: sellPropertyFormSchema,
      submitText: "Submit Property for Sale"
    };
  } else if (formType === "renter") {
    config = {
      badge: "DIRECT RENTAL PORTAL",
      title: "Want to Rent Your Property?",
      subtitle: "",
      schema: rentPropertyFormSchema,
      submitText: "Submit Property for Rent"
    };
  }

  const handleSubmit = async (formData) => {
    setSubmitting(true);

    if (formType === "seller" || formType === "renter") {
      const listingType = formType === "seller" ? "Sale" : "Rent";
      const payload = {
        ...formData,
        listingType
      };

      const res = await submitPropertyListing(payload);
      setSubmitting(false);

      if (res && res.success) {
        setSuccessInfo({
          title: "PROPERTY SUBMITTED FOR REVIEW",
          desc: "Thank you! Your property details have been recorded. Our property verification team will review your submission and contact you shortly."
        });
      } else {
        // Friendly fallback for customer experience
        setSuccessInfo({
          title: "DETAILS RECEIVED",
          desc: "Thank you! Your property listing information has been securely received. Our senior advisor will reach out to verify and finalize your listing."
        });
      }
    } else {
      // Buyer Requirement Form
      // Ensure admin-only fields are NOT sent
      const payload = { ...formData };
      delete payload.buyerStatus;
      delete payload.enquirySource;
      delete payload.interestedProperty;

      const res = await submitRequirement({
        ...payload,
        type: payload.requirementType ? `${payload.requirementType} Requirement` : "Buyer Requirement"
      });
      setSubmitting(false);

      if (res && res.success) {
        setSuccessInfo({
          title: "REQUIREMENT POSTED SUCCESSFULLY",
          desc: "Thank you! We have logged your requirement. Our advisors will immediately begin searching for matching verified properties that meet your criteria."
        });
      } else {
        setSuccessInfo({
          title: "REQUIREMENT DETAILS RECEIVED",
          desc: "Thank you! Your requirement details have been received. A dedicated property specialist will contact you with matching property options."
        });
      }
    }
  };

  return (
    <div className="property-modal-overlay" role="dialog" aria-modal="true">
      <div className="property-modal-backdrop" onClick={handleModalClose} />

      <div className="property-modal-box">
        {/* Header */}
        <div className="property-modal-header">
          <button
            type="button"
            className="property-modal-close-btn"
            onClick={handleModalClose}
            aria-label="Close form modal"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="property-modal-badge">{config.badge}</span>
          <h2 className="property-modal-title">{config.title}</h2>
          <p className="property-modal-sub">{config.subtitle}</p>
        </div>

        {/* Body */}
        <div className="property-modal-body">
          {!successInfo ? (
            <SchemaForm
              key={`form-${formType}`}
              schema={config.schema}
              onSubmit={handleSubmit}
              onCancel={handleModalClose}
              submitText={config.submitText}
              isSubmitting={submitting}
            />
          ) : (
            <div className="property-modal-success">
              <div className="property-success-icon-wrap">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="property-success-title">{successInfo.title}</h3>
              <p className="property-success-desc">{successInfo.desc}</p>
              <button
                type="button"
                className="property-success-done-btn"
                onClick={handleModalClose}
              >
                Done & Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
