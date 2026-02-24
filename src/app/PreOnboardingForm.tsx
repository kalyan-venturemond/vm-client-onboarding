"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function PreOnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    industry: '',
    companyAddress: '',
    companyDescription: '',
    fullName: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    projectName: '',
    servicesInterestedIn: [] as string[],
    primaryGoals: '',
    idealStartDate: '',
    estimatedBudget: '',
    howDidYouHear: '',
    additionalComments: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => {
      const current = prev.servicesInterestedIn;
      if (current.includes(service)) {
        return { ...prev, servicesInterestedIn: current.filter(s => s !== service) };
      } else {
        return { ...prev, servicesInterestedIn: [...current, service] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMsg(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.successMessage}>
        <CheckCircle2 className={styles.successIcon} />
        <h2 className={styles.successTitle}>Thank You!</h2>
        <p className={styles.successDesc}>
          Your information has been successfully submitted. Our team will review your details and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 1. Company Information */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Company Information</h3>

        <div className={`${styles.grid} ${styles.gridTwo}`}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Company Name <span className={styles.required}>*</span></label>
            <input
              type="text"
              name="companyName"
              className={styles.input}
              placeholder="Your Company Inc."
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Company Website</label>
            <input
              type="url"
              name="companyWebsite"
              className={styles.input}
              placeholder="https://yourcompany.com"
              value={formData.companyWebsite}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Industry</label>
            <input
              type="text"
              name="industry"
              className={styles.input}
              placeholder="e.g., E-commerce, SaaS, Healthcare"
              value={formData.industry}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Company Address</label>
            <input
              type="text"
              name="companyAddress"
              className={styles.input}
              placeholder="123 Main St, Anytown, USA 12345"
              value={formData.companyAddress}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.formGroup} style={{ marginTop: '1.25rem' }}>
          <label className={styles.label}>Company Description</label>
          <textarea
            name="companyDescription"
            className={styles.textarea}
            placeholder="What does your company do?"
            value={formData.companyDescription}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      {/* 2. Primary Point of Contact */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Primary Point of Contact</h3>

        <div className={`${styles.grid} ${styles.gridTwo}`}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name <span className={styles.required}>*</span></label>
            <input
              type="text"
              name="fullName"
              className={styles.input}
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              className={styles.input}
              placeholder="e.g., Marketing Manager"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address <span className={styles.required}>*</span></label>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="jane.doe@yourcompany.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              className={styles.input}
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* 3. Project Details */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Project Details</h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>Project Name / Title</label>
          <input
            type="text"
            name="projectName"
            className={styles.input}
            placeholder="e.g., Website Redesign, Q4 Marketing Campaign"
            value={formData.projectName}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup} style={{ marginTop: '1.25rem' }}>
          <label className={styles.label}>Services You're Interested In</label>
          <div className={styles.checkboxGroup}>
            {[
              'Design & Development (Web, App, AI)',
              'Digital Marketing (SEO, SEM)',
              'Branding & Identity',
              'Strategy & Consulting'
            ].map(service => (
              <label key={service} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={formData.servicesInterestedIn.includes(service)}
                  onChange={() => handleCheckboxChange(service)}
                />
                <span className={styles.checkboxLabel}>{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup} style={{ marginTop: '1.25rem' }}>
          <label className={styles.label}>What are the primary goals for this project?</label>
          <textarea
            name="primaryGoals"
            className={styles.textarea}
            placeholder="e.g., Increase website traffic by 20%, generate 50 new leads per month, improve brand perception."
            value={formData.primaryGoals}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className={`${styles.grid} ${styles.gridTwo}`} style={{ marginTop: '1.25rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Ideal Project Start Date</label>
            <input
              type="date"
              name="idealStartDate"
              className={styles.input}
              value={formData.idealStartDate}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Estimated Budget</label>
            <select
              name="estimatedBudget"
              className={styles.select}
              value={formData.estimatedBudget}
              onChange={handleInputChange}
            >
              <option value="">Select a range</option>
              <option value="Under $5,000">Under $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000 - $25,000">$10,000 - $25,000</option>
              <option value="$25,000+">$25,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Final Details */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Final Details</h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>Brand Assets & Guidelines</label>
          <div className={styles.uploadBox}>
            <UploadCloud className={styles.uploadIcon} />
            <p className={styles.uploadText}>
              <span className={styles.uploadLink}>Upload a file</span> or drag and drop<br />
              <span style={{ fontSize: '0.8rem' }}>Logo, brand guide, etc. (ZIP, PDF, PNG, JPG up to 10MB)</span>
            </p>
          </div>
        </div>

        <div className={styles.formGroup} style={{ marginTop: '1.25rem' }}>
          <label className={styles.label}>How did you hear about us?</label>
          <input
            type="text"
            name="howDidYouHear"
            className={styles.input}
            placeholder="e.g., Google, a colleague, LinkedIn"
            value={formData.howDidYouHear}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup} style={{ marginTop: '1.25rem' }}>
          <label className={styles.label}>Any additional comments or questions?</label>
          <textarea
            name="additionalComments"
            className={styles.textarea}
            placeholder="Is there anything else we should know?"
            value={formData.additionalComments}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Information'}
      </button>
    </form>
  );
}
