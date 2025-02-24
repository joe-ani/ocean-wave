'use client';

const ActualComponent = () => {
  // Here you can safely use window-related code
  // For example:
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      {/* Your component content */}
    </div>
  );
};

export default ActualComponent;
