import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default SharedLayout;
