import DashboardHeader from '@/components/layout/dashboard/common/DashboardHeader/DashboardHeader';
import React from 'react';

const page = () => {
    return (
        <section className="space-y-6 p-4 md:p-6">
            <DashboardHeader
                title="Update Technician Profile"
                description="Update your professional information, expertise, experience, and other profile details."
            />
        </section>
    );
};

export default page;