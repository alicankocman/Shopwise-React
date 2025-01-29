import React, { useState, useRef, useEffect } from 'react'
import '../App.css'

function Header({ onSearch, onCategoryChange, onSort }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Tüm Ürünler')
  const [selectedSort, setSelectedSort] = useState('Varsayılan')
  
  const categoryRef = useRef(null)
  const sortRef = useRef(null)

  const categories = [
    "Tüm Ürünler",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ]

  const sortOptions = [
    { label: "Varsayılan", value: "default" },
    { label: "Fiyat (Artan)", value: "price-asc" },
    { label: "Fiyat (Azalan)", value: "price-desc" },
    { label: "İsim (A-Z)", value: "name-asc" },
    { label: "İsim (Z-A)", value: "name-desc" }
  ]

  // Dropdown dışına tıklandığında kapanma
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false)
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    onCategoryChange(category === "Tüm Ürünler" ? "" : category)
    setShowCategoryDropdown(false)
  }

  const handleSortSelect = (option) => {
    setSelectedSort(option.label)
    onSort(option.value)
    setShowSortDropdown(false)
  }

  return (
    <div className='header'>
      <img 
        src='https://previews.123rf.com/images/ikalvi/ikalvi1712/ikalvi171200242/92412982-smiling-shopping-cart-vector-logo-design-shopping-mart-or-app-vector-logo.jpg' 
        alt='shopping-cart' 
        className='shopping-cart-icon' 
      />
      <h1 style={{marginRight: "200px"}}>Shopping App</h1>
      <input 
        type="text" 
        className='search-input' 
        placeholder='Ürün Ara'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button style={{marginRight: "150px"}} onClick={handleSearch}>Ara</button>
      
      <div className="dropdown-container" ref={categoryRef}>
        <button onClick={() => {
          setShowCategoryDropdown(!showCategoryDropdown)
          setShowSortDropdown(false)
        }}>
          {selectedCategory}
        </button>
        {showCategoryDropdown && (
          <div className="dropdown-menu">
            {categories.map((category) => (
              <div
                key={category}
                className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown-container" ref={sortRef}>
        <button onClick={() => {
          setShowSortDropdown(!showSortDropdown)
          setShowCategoryDropdown(false)
        }}>
          {selectedSort}
        </button>
        {showSortDropdown && (
          <div className="dropdown-menu">
            {sortOptions.map((option) => (
              <div
                key={option.value}
                className={`dropdown-item ${selectedSort === option.label ? 'active' : ''}`}
                onClick={() => handleSortSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header