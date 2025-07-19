import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CourseCard } from "./course-card";

const ProviderCourseCard = (props) => {
    const viewAnalytics = () => {
        console.log("View analytics for course:", props.id);
    };

    return (
        <div className="relative group">
            <CourseCard {...props} />
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    size="icon"
                    variant="outline"
                    onClick={viewAnalytics}
                    title="View Analytics"
                >
                    <BarChart3 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default ProviderCourseCard;
