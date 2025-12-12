import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <LoaderCircle className="animate-spin size-10 text-neutral-700" />
        </div>
    )
}