// LoadingSkeleton.js
import React from "react"

const LoadingSkeleton = () => (
  <>
    {/* Replicate the structure of your form with placeholder elements */}
    <div className="card expense p-8 animate-pulse">
      {/* Placeholder for Add Income */}
    </div>
    <div className="card expense p-8 animate-pulse">
      {/* Placeholder for Add Expense */}
    </div>
    <div className="card expense p-8 animate-pulse">
      {/* Placeholder for Add Savings */}
    </div>
    <div className="card expense p-8 animate-pulse">
      {/* Placeholder for Total Income, Total Expense, Net Worth */}
    </div>
  </>
)

export default LoadingSkeleton
