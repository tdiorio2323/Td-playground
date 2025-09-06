import React from 'react';

interface CreatorLandingPageProps {
  socialLink: string;
  creatorName: string;
}

const CreatorLandingPage: React.FC<CreatorLandingPageProps> = ({ socialLink, creatorName }) => {
  return (
    <div>
      <h1>Creator Landing Page for {creatorName}</h1>
      <p>Social Link: <a href={socialLink} target="_blank" rel="noopener noreferrer">{socialLink}</a></p>
      <p>This is a stub component. Please replace with actual content.</p>
    </div>
  );
};

export default CreatorLandingPage;
