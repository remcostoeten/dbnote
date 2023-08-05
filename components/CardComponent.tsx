import React from 'react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;