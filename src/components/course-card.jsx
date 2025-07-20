import { Star, Clock, Users, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";

export const CourseCard = (course) => {
  const {
    id,
    title,
    description,
    instructor,
    image = "",
    duration,
    rating,
    enrolledCount,
    totalRatings,
    price,
    level,
    category,
    isFeatured = false,
    isPremium = false,
    progress,
    bought = false,
  } = course;
  const location = useLocation();
  const isEnr = location.pathname.includes("enrolled");

  const formatStudents = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count?.toString();
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-200 text-green-900 border border-green-300";
      case "Intermediate":
        return "bg-yellow-200 text-yellow-900 border border-yellow-300";
      case "Advanced":
        return "bg-red-200 text-red-900 border border-red-300";
      default:
        return "bg-gray-300 text-gray-900 border border-gray-400";
    }
  };

  const getButtonLabel = () => {
    if (progress !== 0) return "Continue";
    if (bought) return "Start Now";
    return "Enroll Now";
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer bg-[#4a3e2c] text-white w-full max-w-md mx-auto">
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

      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="bg-gray-400 w-full h-40 flex items-center justify-center text-black">
            <span>No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4"
          >
            <PlayCircle className="h-6 w-6" />
          </Button>
        </div>

        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="text-xs font-medium bg-white/10 text-white border border-white/20">
            {category}
          </Badge>
          <Badge className={`text-xs ${getLevelColor(level)}`}>{level}</Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-yellow-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/80 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-white">
              {instructor
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <span className="text-sm text-white/90">{instructor}</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-white">{rating}</span>
            <span>({formatStudents(totalRatings)})</span>
          </div>

          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{enrolledCount}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2 border-t border-white/10">
          <Link to={`/courses/${id}`} state={{ course }} className="flex-shrink-0">
            <Button
              size="sm"
              className="bg-yellow-600 hover:bg-yellow-700 text-white mt-2 transition-all duration-200 hover:scale-105"
            >
              {getButtonLabel()}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
