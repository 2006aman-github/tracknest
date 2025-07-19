import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CourseCard } from "./course-card";

const AdminCourseCard = (props) => {
    const handleEdit = () => {
        // Placeholder: open modal or navigate
        console.log("Edit course:", props.id);
    };

    const handleDelete = () => {
        // Placeholder: dispatch delete
        console.log("Delete course:", props.id);
    };

    return (
        <div className="relative group">
            <CourseCard {...props} />
            <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="outline" onClick={handleEdit}>
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};

export default AdminCourseCard;
