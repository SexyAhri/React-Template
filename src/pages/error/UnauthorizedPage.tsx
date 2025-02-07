// src/pages/UnauthorizedPage.tsx
import React from 'react';

const UnauthorizedPage: React.FC = () => {
  return (
    <div>
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default UnauthorizedPage;
