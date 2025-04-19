import { Skeleton } from "@/components/ui/skeleton"

export const EditUserSkeleton = () => {
    return (
        <div className="w-full h-full flex justify-center mt-5">
            <div className="w-full flex flex-col gap-4 p-4">
                <div className="w-full flex items-center gap-4">
                    <Skeleton className="rounded-full w-40 h-40" />
                    <Skeleton className="h-12 w-72 rounded-none" />
                </div>
                <div className="w-full gap-4 flex">
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="w-10 h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded-none" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="w-9 h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded-none" />
                    </div>                </div>
                <div className="w-full gap-4 flex">
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="w-20 h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded-none" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="w-24 h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded-none" />
                    </div>                </div>
                <div className="w-full gap-4 flex">
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="w-16 h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded-none" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="w-28 h-4 rounded-none" />
                        <Skeleton className="w-full h-12 rounded-none" />
                    </div>                </div>

                <Skeleton className="w-28 h-10 rounded-none ml-auto" />

            </div>

        </div>
    )
}