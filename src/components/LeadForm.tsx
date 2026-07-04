"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowRight, ArrowLeft, CheckCircle, Loader } from "lucide-react";

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "AI/ML Tools",
    budget: "$25,000 - $50,000",
    message: "",
  });

  const categories = [
    "AI/ML Tools",
    "Enterprise Software",
    "Full-Stack Development",
    "AI Automation",
    "SaaS Products",
  ];

  const budgets = [
    "Less than $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const selectCategory = (cat: string) => {
    setFormData({ ...formData, projectType: cat });
  };

  const selectBudget = (b: string) => {
    setFormData({ ...formData, budget: b });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.company)) {
      setError("Please fill in all contact details.");
      return;
    }
    setError("");
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError("");
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message) {
      setError("Please write a brief description of your project scope.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-[#05060A] overflow-hidden z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 xl:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Get In Touch</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Let&apos;s Build Something Intelligent
            </h2>
            <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Answer a few questions to initiate your project onboard. We will review and connect with a design layout within 24 hours.
            </p>
          </div>

          {/* Form Wizard Container */}
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
            {/* Step Progress indicators */}
            {!submitted && (
              <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                {[1, 2, 3].map(num => (
                  <div key={num} className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-display text-sm font-bold border transition-all duration-300 ${
                        step === num
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-500 text-white shadow-md shadow-blue-500/10"
                          : step > num
                          ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
                          : "bg-white/5 border-white/10 text-gray-500"
                      }`}
                    >
                      {num}
                    </div>
                    <span
                      className={`hidden sm:inline font-sans text-xs tracking-wider uppercase font-semibold ${
                        step === num ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {num === 1 ? "Details" : num === 2 ? "Scope & Budget" : "Briefing"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Error alerts */}
            {error && (
              <div className="bg-red-500/15 border border-red-500/20 text-red-300 text-sm p-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-cyan-500/25 blur-xl animate-pulse" />
                    <CheckCircle className="w-20 h-20 text-cyan-400 relative z-10" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">
                    Consultation Requested
                  </h3>
                  <p className="font-sans text-gray-400 max-w-md leading-relaxed mb-8">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your pipeline request has been logged. An Aetheric systems architect will connect with you via <span className="text-cyan-400">{formData.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStep(1);
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        projectType: "AI/ML Tools",
                        budget: "$25,000 - $50,000",
                        message: "",
                      });
                    }}
                    className="bg-white/5 hover:bg-white/10 text-white font-sans font-medium px-6 py-3 rounded-xl border border-white/10"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} key={step}>
                  {/* STEP 1: Basic Info */}
                  {step === 1 && (
                    <motion.div
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Sarah Jenkins"
                            className="input-field"
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="sarah@vortex.com"
                            className="input-field"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Vortex FinTech LLC"
                          className="input-field"
                          required
                        />
                      </div>

                      <div className="flex flex-col space-y-3">
                        <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans">
                          Primary Product Category
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {categories.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => selectCategory(cat)}
                              className={`px-4 py-2.5 rounded-xl border text-sm font-sans tracking-wide transition-all duration-300 ${
                                formData.projectType === cat
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400"
                                  : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5 flex justify-end">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-blue-500/10 hover:scale-[1.02] transition-transform duration-300"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Budget */}
                  {step === 2 && (
                    <motion.div
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="flex flex-col space-y-4">
                        <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans">
                          Approximate Project Budget
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {budgets.map(b => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => selectBudget(b)}
                              className={`p-4 rounded-xl border text-sm font-sans text-center transition-all duration-300 ${
                                formData.budget === b
                                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 font-semibold"
                                  : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white px-4 py-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-blue-500/10 hover:scale-[1.02] transition-transform duration-300"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Description & Submit */}
                  {step === 3 && (
                    <motion.div
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="flex flex-col space-y-2">
                        <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans">
                          Project Description & Goals
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          placeholder="Outline the core targets, constraints, or datasets you have available..."
                          className="input-field resize-none"
                          required
                        />
                      </div>

                      <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white px-4 py-2"
                          disabled={loading}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white px-8 py-3.5 rounded-xl font-medium shadow-md shadow-purple-500/10 hover:scale-[1.02] transition-transform duration-300 disabled:opacity-55 disabled:hover:scale-100"
                        >
                          {loading ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Request</span>
                              <Send className="w-4 h-4 text-cyan-300" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
