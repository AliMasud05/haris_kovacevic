"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useGetAllUserQuery } from "@/redux/api/authApi";
import { format } from "date-fns";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  role: "USER" | "SUPER_ADMIN";
  status: string;
  createdAt: string;
  updatedAt: string;
  enrollments: {
    id: string;
    userId: string;
    courseId: string;
    Amount: number;
    paymentStatus: string;
    enrolledAt: string;
    course: {
      id: string;
      title: string;
      subtitle: string;
    };
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    courseId: string;
    createdAt: string;
  }[];
};

type UserApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: User[];
  };
};

export default function UsersPage() {
  const { data: userData, isLoading, isError } = useGetAllUserQuery({});
  
  // Define background colors for avatar placeholders
  const bgColors = [
    "bg-amber-100",
    "bg-cyan-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-orange-100",
  ];

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MM/dd/yyyy');
    } catch {
      return "Unknown date";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error loading users. Please try again later.</p>
        </div>
      </div>
    );
  }

  const users = (userData as UserApiResponse)?.data?.data || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Hello, Admin</span>
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Admin's profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-6">All Users</h1>

        {users.length > 0 ? (
          <div className="space-y-4 ">
            {users.map((user, index) => {
              const bgColor = bgColors[index % bgColors.length];
              const latestEnrollment = user.enrollments?.[0];
              
              return (
                <div
                  key={user.id}
                  className="bg-white rounded-lg py-4 px-6 flex flex-row items-center justify-between shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center overflow-hidden`}
                    >
                      <Image
                        src={user.profileImage || "https://avatar.iran.liara.run/public"}
                        alt={`${user.name}'s avatar`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover border border-white shadow-lg rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg md:text-2xl">{user.name}</h3>
                      <p className="text-[13px] md:text-sm text-[#595959] mt-0.5">
                        {latestEnrollment 
                          ? `Enrolled - ${latestEnrollment.course.title}` 
                          : user.role === "SUPER_ADMIN" 
                            ? "Administrator" 
                            : "Not enrolled in any course"}
                      </p>
                      <p className="text-[13px] md:text-sm text-[#595959] mt-0.5">
                        {latestEnrollment 
                          ? `Joined date: ${formatDate(latestEnrollment.enrolledAt)}` 
                          : `Account created: ${formatDate(user.createdAt)}`}
                      </p>
                    </div>
                  </div>

                 <Link href={`/dashboard/user-management/${user.id}`}>
                  <Button
                    size="sm"
                    className="text-sm md:text-base md:px-5 md:py-5 
                     text-gray-700 hover:bg-gray-50 bg-transparent border border-black/40 rounded-full hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    View Details
                  </Button>
                 </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}