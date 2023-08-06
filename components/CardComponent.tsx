import React from 'react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card">
      <div className="card__inner space-y-2">
        <div className="card-icon">{icon}</div>
        <h3 className="white font-bold">{title}</h3>
        <p className="white text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;