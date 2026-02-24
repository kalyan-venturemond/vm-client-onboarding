import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email Address is required'],
        },
        companyName: {
            type: String,
            required: [true, 'Company Name is required'],
        },
        services: {
            type: [String],
            default: [],
        },
        budgetRange: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: 'New',
        },
        leadSource: {
            type: String,
            default: 'Website - Pre Onboarding',
        },

        // Additional fields from the form
        companyWebsite: { type: String, default: '' },
        industry: { type: String, default: '' },
        companyAddress: { type: String, default: '' },
        companyDescription: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
        phoneNumber: { type: String, default: '' },
        projectName: { type: String, default: '' },
        primaryGoals: { type: String, default: '' },
        idealStartDate: { type: String, default: '' },
        howDidYouHear: { type: String, default: '' },
        additionalComments: { type: String, default: '' },
    },
    {
        timestamps: true,
        collection: 'vm_onboarding' // Changed to dedicated onboarding collection
    }
);

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
