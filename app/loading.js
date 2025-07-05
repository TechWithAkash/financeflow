import { LoadingSpinner } from '@/components/ui/loading';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <LoadingSpinner size="lg" className="text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          FinanceFlow
        </h1>
        <p className="text-gray-500 animate-pulse">Loading your financial dashboard...</p>
      </div>
    </div>
  );
}
