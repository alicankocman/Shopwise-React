import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'white',
      padding: '40px 20px',
      marginTop: '50px',
      borderTop: '1px solid #eef2ff',
      fontFamily: "'Poppins', sans-serif",
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.03)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        {/* Hakkımızda Bölümü */}
        <div>
          <h3 style={{
            color: '#2563eb',
            fontSize: '1.2rem',
            marginBottom: '15px',
            fontWeight: '600'
          }}>Hakkımızda</h3>
          <p style={{
            color: '#64748b',
            lineHeight: '1.6',
            fontSize: '0.9rem'
          }}>
            En kaliteli ürünleri en uygun fiyatlarla sizlere sunmak için çalışıyoruz. 
            Müşteri memnuniyeti bizim için her şeyden önemli.
          </p>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h3 style={{
            color: '#2563eb',
            fontSize: '1.2rem',
            marginBottom: '15px',
            fontWeight: '600'
          }}>Hızlı Linkler</h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {['Anasayfa', 'Ürünler', 'Kampanyalar', 'İletişim'].map((item) => (
              <li key={item} style={{
                marginBottom: '10px'
              }}>
                <a href="#" style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h3 style={{
            color: '#2563eb',
            fontSize: '1.2rem',
            marginBottom: '15px',
            fontWeight: '600'
          }}>İletişim</h3>
          <div style={{
            color: '#64748b',
            fontSize: '0.9rem',
            lineHeight: '1.6'
          }}>
            <p>📍 Adres: İstanbul, Türkiye</p>
            <p>📞 Telefon: +90 (555) 123 45 67</p>
            <p>✉️ Email: info@shoppingapp.com</p>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div>
          <h3 style={{
            color: '#2563eb',
            fontSize: '1.2rem',
            marginBottom: '15px',
            fontWeight: '600'
          }}>Bizi Takip Edin</h3>
          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            {['Instagram', 'Facebook', 'Twitter', 'LinkedIn'].map((platform) => (
              <a
                key={platform}
                href="#"
                style={{
                  color: '#64748b',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                onMouseLeave={(e) => e.target.style.color = '#64748b'}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Telif Hakkı */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #eef2ff',
        color: '#64748b',
        fontSize: '0.9rem'
      }}>
        © 2024 Shopping App. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

export default Footer;