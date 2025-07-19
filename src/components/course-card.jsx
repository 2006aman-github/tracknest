import { Star, Clock, Users, Award, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const CourseCard = ({
    title,
    description,
    instructor,
    image,
    duration,
    students,
    rating,
    totalRatings,
    price,
    level,
    category,
    isFeatured = false,
    isPremium = false,
    progress,
    bought = false,
}) => {
    const formatStudents = (count) => {
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };

    const getLevelColor = (level) => {
        switch (level) {
            case "Beginner":
                return "bg-green-100 text-green-800 border border-green-200";
            case "Intermediate":
                return "bg-yellow-100 text-yellow-800 border border-yellow-200";
            case "Advanced":
                return "bg-red-100 text-red-800 border border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-200";
        }
    };

    const getButtonLabel = () => {
        if (progress !== 0) return "Continue";
        if (bought) return "Start Now";
        return "Enroll Now";
    };

    return (
        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer bg-white">
            {(isFeatured || isPremium) && (
                <div className="absolute top-4 left-4 z-10">
                    <Badge
                        className={`font-semibold px-3 py-1 ${isFeatured
                                ? "bg-blue-600 text-white"
                                : "bg-purple-600 text-white"
                            }`}
                    >
                        {isFeatured ? "Featured" : "Premium"}
                    </Badge>
                </div>
            )}

            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4"
                    >
                        <PlayCircle className="h-6 w-6" />
                    </Button>
                </div>
                {progress !== undefined && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <Badge className="text-xs font-medium bg-gray-200 text-gray-800">
                        {category}
                    </Badge>
                    <Badge className={`text-xs ${getLevelColor(level)}`}>{level}</Badge>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-blue-800">
                            {instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </span>
                    </div>
                    <span className="text-sm text-gray-700">{instructor}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-800">{rating}</span>
                        <span>({formatStudents(totalRatings)})</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{formatStudents(students)}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{duration}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                            ${price.current}
                        </span>
                        {price.original && (
                            <span className="text-sm text-gray-500 line-through">
                                ${price.original}
                            </span>
                        )}
                    </div>

                    <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                    >
                        {getButtonLabel()}
                    </Button>
                </div>
            </div>
        </Card>
    );
};
