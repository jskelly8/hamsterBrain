import { useState } from 'react';
// import Home from './Home';

export default function Home() {
    const [currentPage, setCurrentPage] = useState('Home');


// This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const handlePageChange = (page) => setCurrentPage(page);

  const renderPage = () => {
    // Here, you'd return the component corresponding to currentPage
    // For now, just returning a placeholder based on currentPage for demonstration
    if (currentPage === 'Home') {
        return <Home />;
    }
    return <Home />
};

  

  return (
    <div>
         {/* We are passing the currentPage from state and the function to update it */}
      <PagesNav currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      <main className="mx-3">{renderPage()}</main>
    </div>
  );
  }

