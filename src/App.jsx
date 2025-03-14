// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/styleCookiesCard.css';
import HomePage from './Pages/HomePage';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponents from './Components/FooterComponents';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Apropos from './Pages/Apropos';
import NosCookies from './Pages/NosCookies';
import NosAssortiments from './Pages/NosAssortiments';
import Contact from './Pages/Contact';
import Profil from './Pages/Profil';
import Panier from './Pages/Panier';
import Paiement from './Pages/Paiement';
import UpdateProfil from './Pages/UpdateProfil';
import Favoris from './Pages/Favoris';
import MesCommandes from './Pages/MesCommandes';
import LoginPage from './Pages/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import DetailsCookie from './Pages/DetailsCookie';
import DetailsCommande from './Pages/PageDetailsCommande';
import { useState } from 'react';
import ClientService from './Services/ClientService';
import AuthProvider from './Contexts/AuthProvider';
import { FavorisProvider } from './Contexts/FavorisProvider';
import PanierProvider from './Contexts/PanierProvider';
// import useAuth from './Contexts/useAuth';

ClientService.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(ClientService.isAuthenticated());
  const [token, setToken] = useState(window.localStorage.getItem('authToken') ? window.localStorage.getItem('authToken') : null);

  // const { isAuthenticated } = useAuth();
  

  return (
    // <AuthProvider value={{ isAuthenticated}}>
    <AuthProvider value={{ isAuthenticated, setIsAuthenticated, token, setToken }}> 
      <PanierProvider>
      <BrowserRouter>
      <FavorisProvider>
        <HeaderComponent />
        <Routes>
          {isAuthenticated && (
            <>
              <Route path='/Paiement' element={<Paiement />} />
              <Route path='/Favoris' element={<Favoris />} />
              <Route path='/UpdateProfil' element={<UpdateProfil />} />
              <Route path='/MesCommandes' element={<MesCommandes />} />
              <Route path='/DetailsCommande/:id' element={<DetailsCommande />} />
              <Route path='/Profil' element={<Profil />} />
            </>
          )}
          {/* {isAuthenticated && isAdmin && (
            <>
              <Route path='/AdminDashboard' element={<AdminDashboard />} />
              <Route path='/AdminSettings' element={<AdminSettings />} />
              <Route path='/Clients' element={<Clients />} />
              <Route path='/Produits' element={<Produits />} />
              <Route path='/Commandes' element={<Commandes />} />
            </>
          )} */}
          <Route path='/' element={<HomePage />} />
          <Route path='/Apropos' element={<Apropos />} />
          <Route path='/NosCookies' element={<NosCookies />} />
          <Route path='/produit/:id' element={<DetailsCookie />} />
          <Route path='/NosAssortiments' element={<NosAssortiments />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Panier' element={<Panier />} />
          <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/*' element={<LoginPage />} />
        </Routes>
        <FooterComponents />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </FavorisProvider>
      </BrowserRouter>
      </PanierProvider>
    </AuthProvider>
  );
}

export default App;
