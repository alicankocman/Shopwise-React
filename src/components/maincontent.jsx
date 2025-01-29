import React, { useEffect, useState } from "react";

function MainContent({ searchProducts, selectedCategory, sortOption }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const colors = {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    secondary: "#f97316",
    background: "white",
    cardBg: "#ffffff",
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      light: "#ffffff",
    },
    border: "#e2e8f0",
    shadow: "rgba(0, 0, 0, 0.1)"
  };

  const typography = {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    heading: {
      fontFamily: "'Montserrat', sans-serif",
      weight: 600
    }
  };

  const adContent = [
    {
      image: "https://picsum.photos/200/200?random=1",
      message: "Yeni Sezon Ürünleri Keşfedin! %50'ye Varan İndirimler"
    },
    {
      image: "https://picsum.photos/200/200?random=2",
      message: "Kış Koleksiyonu Şimdi Satışta!"
    },
    {
      image: "https://picsum.photos/200/200?random=3",
      message: "Ücretsiz Kargo Fırsatını Kaçırmayın"
    },
    {
      image: "https://picsum.photos/200/200?random=4",
      message: "Özel Fiyatlarla Sınırlı Stok"
    },
    {
      image: "https://picsum.photos/200/200?random=5",
      message: "Yılın En Büyük İndirimi Başladı"
    },
    {
      image: "https://picsum.photos/200/200?random=6",
      message: "Outlet Ürünlerde Extra %20 İndirim"
    },
  ];
    // Sepet işlemleri
    const addToCart = (product) => {
      setCart(prevCart => {
        const existingProduct = prevCart.find(item => item.id === product.id);
        if (existingProduct) {
          return prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    };
  
    const removeFromCart = (productId) => {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };
  
    const updateQuantity = (productId, newQuantity) => {
      if (newQuantity < 1) return;
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    };
  
    const cartTotal = cart.reduce((total, item) => {
      const discountedPrice = item.price * (1 - item.discount / 100);
      return total + discountedPrice * item.quantity;
    }, 0);
  
    // AdSection bileşeni
    const AdSection = ({ side }) => (
      <div style={{
        width: windowWidth > 1200 ? "180px" : "150px",
        backgroundColor: colors.cardBg,
        borderRadius: "12px",
        padding: "15px",
        position: "sticky",
        top: "20px",
        margin: side === "left" ? "0 20px 0 0" : "0 0 0 20px",
        display: showAds ? "flex" : "none",
        flexDirection: "column",
        gap: "15px",
        boxShadow: `0 4px 6px ${colors.shadow}`,
        transition: "all 0.3s ease",
        height: "fit-content"
      }}>
        <h3 style={{ 
          fontSize: windowWidth > 1200 ? "1.1rem" : "1rem", 
          textAlign: "center",
          padding: "8px 15px",
          margin: "0",
          borderRadius: "25px",
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
          color: colors.text.light,
          fontWeight: "600",
          fontFamily: typography.heading.fontFamily,
          boxShadow: `0 2px 4px ${colors.shadow}`
        }}>
          {side === "left" ? "🔥 Günün Fırsatları" : "✨ Özel Teklifler"}
        </h3>
        {adContent.slice(side === "left" ? 0 : 3, side === "left" ? 3 : 6).map((ad, index) => (
          <div
            key={`${side}-ad-${index}`}
            style={{
              width: "100%",
              backgroundColor: colors.cardBg,
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: `0 2px 4px ${colors.shadow}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = `0 5px 15px ${colors.shadow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 2px 4px ${colors.shadow}`;
            }}
          >
            <div style={{
              width: "100%",
              aspectRatio: "1",
              marginBottom: "8px"
            }}>
              <img
                src={ad.image}
                alt="Reklam"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "4px"
                }}
              />
            </div>
            <p style={{
              margin: "0",
              fontSize: windowWidth > 1200 ? "0.9rem" : "0.8rem",
              color: colors.text.primary,
              textAlign: "center",
              lineHeight: "1.4",
              fontWeight: "500",
              fontFamily: typography.fontFamily
            }}>
              {ad.message}
            </p>
          </div>
        ))}
      </div>
    );
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Veri alınırken bir sorun oluştu.");
          }
          return response.json();
        })
        .then((data) => {
          const productsWithDiscount = data.map(product => ({
            ...product,
            discount: Math.floor(Math.random() * 40) + 10
          }));
          setProducts(productsWithDiscount);
          setFilteredProducts(productsWithDiscount);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }, []);
  
    useEffect(() => {
      let filtered = [...products];
  
      if (searchProducts) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(searchProducts.toLowerCase()) ||
          product.description.toLowerCase().includes(searchProducts.toLowerCase())
        );
      }
  
      if (selectedCategory && selectedCategory !== "Tüm Ürünler") {
        filtered = filtered.filter(product => 
          product.category === selectedCategory
        );
      }
  
      switch(sortOption) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          filtered.sort((a, b) => a.id - b.id);
      }
  
      setFilteredProducts(filtered);
    }, [searchProducts, selectedCategory, sortOption, products]);
  
    useEffect(() => {
      setCurrentPage(1);
    }, [searchProducts, selectedCategory, sortOption]);
  
    // Sayfalama hesaplamaları
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
    // Sayfalama bileşeni
    const Pagination = () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        margin: '30px 0',
        fontFamily: typography.fontFamily
      }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '8px 15px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: currentPage === 1 ? colors.text.secondary : colors.primary,
            color: colors.text.light,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          ← Önceki
        </button>
        
        <div style={{
          display: 'flex',
          gap: '5px'
        }}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: currentPage === index + 1 ? colors.primary : colors.cardBg,
                color: currentPage === index + 1 ? colors.text.light : colors.text.primary,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: '500',
                boxShadow: `0 2px 4px ${colors.shadow}`
              }}
              onMouseEnter={(e) => {
                if (currentPage !== index + 1) {
                  e.currentTarget.style.backgroundColor = colors.border;
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== index + 1) {
                  e.currentTarget.style.backgroundColor = colors.cardBg;
                }
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
  
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 15px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: currentPage === totalPages ? colors.text.secondary : colors.primary,
            color: colors.text.light,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          Sonraki →
        </button>
      </div>
    );
      // Sepet bileşeni
  const CartComponent = () => (
    <div style={{
      position: "fixed",
      top: "0",
      right: isCartOpen ? "0" : "-320px",
      width: "320px",
      height: "100vh",
      backgroundColor: colors.cardBg,
      boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
      transition: "right 0.3s ease",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      fontFamily: typography.fontFamily
    }}>
      <div style={{
        padding: "15px",
        borderBottom: `1px solid ${colors.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{
          margin: 0,
          fontFamily: typography.heading.fontFamily,
          fontSize: "1.3rem"
        }}>Sepetim ({cart.length})</h2>
        <button
          onClick={() => setIsCartOpen(false)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.3rem",
            cursor: "pointer",
            padding: "5px"
          }}
        >
          ✕
        </button>
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "15px"
      }}>
        {cart.length === 0 ? (
          <div style={{
            textAlign: "center",
            color: colors.text.secondary,
            padding: "20px"
          }}>
            Sepetiniz boş
          </div>
        ) : (
          cart.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                borderBottom: `1px solid ${colors.border}`,
                gap: "10px"
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain"
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{
                  margin: "0 0 3px 0",
                  fontSize: "0.9rem",
                  fontFamily: typography.heading.fontFamily
                }}>{item.title}</h4>
                <p style={{
                  margin: 0,
                  color: colors.secondary,
                  fontWeight: "600",
                  fontSize: "1rem"
                }}>
                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                </p>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    padding: "3px 8px",
                    border: "none",
                    background: colors.primary,
                    color: colors.text.light,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >-</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    padding: "3px 8px",
                    border: "none",
                    background: colors.primary,
                    color: colors.text.light,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9rem"
                  }}
                >+</button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: "3px 8px",
                    border: "none",
                    background: colors.secondary,
                    color: colors.text.light,
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                    fontSize: "0.9rem"
                  }}
                >Sil</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{
        padding: "15px",
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.background
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          fontSize: "1.1rem",
          fontWeight: "600"
        }}>
          <span>Toplam:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <button style={{
          width: "100%",
          padding: "12px",
          backgroundColor: colors.primary,
          color: colors.text.light,
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.primaryDark;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary;
        }}>
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
    // Sepet butonu
    const CartButton = () => (
      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          position: "fixed",
          top: "40px",
          right: "20px",
          backgroundColor: colors.primary,
          color: colors.text.light,
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          zIndex: 999,
          transition: "transform 0.3s ease, background-color 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.backgroundColor = colors.primaryDark;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = colors.primary;
        }}
      >
        <div style={{ position: "relative" }}>
          <span style={{ fontSize: "1.5rem" }}>🛒</span>
          {cart.length > 0 && (
            <span style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: colors.secondary,
              color: colors.text.light,
              borderRadius: "50%",
              padding: "2px 8px",
              fontSize: "0.8rem",
              fontWeight: "bold"
            }}>
              {cart.length}
            </span>
          )}
        </div>
      </button>
    );
  
    // Overlay bileşeni
    const Overlay = () => (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: isCartOpen ? 1 : 0,
          visibility: isCartOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          zIndex: 998
        }}
        onClick={() => setIsCartOpen(false)}
      />
    );
  
    if (isLoading) return <div style={{ color: colors.text.primary, fontFamily: typography.fontFamily }}>Yükleniyor...</div>;
    if (error) return <div style={{ color: colors.secondary, fontFamily: typography.fontFamily }}>Hata: {error}</div>;
  
    const showAds = windowWidth > 768;
  
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "1600px",
        margin: "0 auto",
        padding: windowWidth > 768 ? "20px" : "10px",
        backgroundColor: colors.background,
        fontFamily: typography.fontFamily
      }}>
        <Overlay />
        <CartButton />
        <CartComponent />
        {showAds && <AdSection side="left" />}
  
        <div style={{ 
          flex: "1",
          maxWidth: showAds ? "1200px" : "100%",
          minWidth: "0"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${windowWidth > 768 ? "250px" : "150px"}, 1fr))`,
            gap: windowWidth > 768 ? "30px" : "15px",
            padding: windowWidth > 768 ? "20px" : "10px",
            gridAutoRows: "1fr"
          }}>
            {currentProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "none",
                  borderRadius: "12px",
                  padding: windowWidth > 768 ? "20px" : "10px",
                  textAlign: "center",
                  backgroundColor: colors.cardBg,
                  boxShadow: `0 4px 6px ${colors.shadow}`,
                  transition: "transform 0.3s ease",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "450px",
                  margin: "0",
                  gap: "10px"
                }}
                onMouseEnter={(e) => {
                  if (windowWidth > 768) {
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (windowWidth > 768) {
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <div style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: colors.secondary,
                  color: colors.text.light,
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: windowWidth > 768 ? "0.9rem" : "0.8rem",
                  fontWeight: "600",
                  fontFamily: typography.fontFamily,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}>
                  -{product.discount}%
                </div>
                <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: windowWidth > 768 ? "200px" : "150px",
                      objectFit: "contain"
                    }}
                  />
                  <h3 style={{
                    fontSize: windowWidth > 768 ? "1.2rem" : "1rem",
                    margin: "15px 0",
                    color: colors.text.primary,
                    fontFamily: typography.heading.fontFamily,
                    fontWeight: "600",
                    lineHeight: "1.4",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    height: "2.8em"
                  }}>
                    {product.title}
                  </h3>
                  <p style={{
                    color: colors.text.secondary,
                    textDecoration: "line-through",
                    fontSize: windowWidth > 768 ? "1.1rem" : "0.9rem",
                    margin: "5px 0",
                    fontFamily: typography.fontFamily,
                    fontWeight: "400"
                  }}>
                    ${product.price.toFixed(2)}
                  </p>
                  <p style={{
                    color: colors.secondary,
                    fontSize: windowWidth > 768 ? "1.6rem" : "1.3rem",
                    fontWeight: "700",
                    margin: "5px 0",
                    fontFamily: typography.fontFamily
                  }}>
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.text.light,
                    border: "none",
                    borderRadius: "5px",
                    padding: windowWidth > 768 ? "12px" : "10px",
                    width: "100%",
                    marginTop: "auto",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    fontSize: windowWidth > 768 ? "1.1rem" : "1rem",
                    fontFamily: typography.fontFamily,
                    fontWeight: "600",
                    letterSpacing: "0.5px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryDark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                  }}
                >
                  Sepete Ekle
                </button>
              </div>
            ))}
          </div>
          <Pagination />
        </div>
  
        {showAds && <AdSection side="right" />}
      </div>
    );
  }
  
  export default MainContent;