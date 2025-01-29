import React, { useState } from 'react'
import Header from './components/Header'
import MainContent from './components/maincontent'
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <Header 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSort={handleSort}
      />
      <MainContent 
        searchProducts={searchTerm}
        selectedCategory={selectedCategory}
        sortOption={sortOption}
      />
      <Footer />
    </div>
  )
}

export default App