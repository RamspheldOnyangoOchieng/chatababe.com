import { Suspense } from "react";

import Results, { ResultsSkeleton } from "./_components/results";

export default function RootPage() {
  return (
    <div className="h-full">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results/>
      </Suspense>
    </div>
  );
}
