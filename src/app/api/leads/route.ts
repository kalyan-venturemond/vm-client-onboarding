import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';

const RATE_LIMIT_MINUTES = 5;

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { email } = body;

        // Preventive measure against duplicate submissions
        if (email) {
            const existingLead = await Lead.findOne({
                email,
                createdAt: { $gte: new Date(Date.now() - RATE_LIMIT_MINUTES * 60 * 1000) }
            });

            if (existingLead) {
                return NextResponse.json(
                    { error: 'You have already submitted a form recently. Please try again later.' },
                    { status: 429 }
                );
            }
        }

        // Map frontend fields to backend schema
        const newLead = new Lead({
            companyName: body.companyName,
            companyWebsite: body.companyWebsite,
            industry: body.industry,
            companyAddress: body.companyAddress,
            companyDescription: body.companyDescription,
            fullName: body.fullName,
            jobTitle: body.jobTitle,
            email: body.email,
            phoneNumber: body.phoneNumber,
            projectName: body.projectName,

            // Mapping servicesInterestedIn to services
            services: body.servicesInterestedIn || [],

            primaryGoals: body.primaryGoals,
            idealStartDate: body.idealStartDate,

            // Mapping estimatedBudget to budgetRange
            budgetRange: body.estimatedBudget,

            howDidYouHear: body.howDidYouHear,
            additionalComments: body.additionalComments,

            // Metadata automatically set by schema defaults/timestamps: 
            // status: "New", 
            // leadSource: "Website - Pre Onboarding", 
            // createdAt/updatedAt
        });

        await newLead.save();

        return NextResponse.json({ success: true, message: 'Lead saved successfully' }, { status: 201 });
    } catch (error: any) {
        console.error('API /leads error:', error);
        return NextResponse.json(
            { error: 'Failed to process lead submission', details: error.message },
            { status: 500 }
        );
    }
}
