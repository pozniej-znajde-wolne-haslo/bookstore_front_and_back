import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Books from './pages/books/Books';
import Genre from './components/GenreBooks';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import NotFound from './pages/notFound/NotFound';
import SearchResult from './components/SearchResult';
import SingleBook from './components/singleBook/SingleBook';
import Selection from './components/BooksSelection';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import ThankYou from './pages/thankyou/Thankyou';
import './App.scss';

function App() {
  return (
    <>
      <Navbar />

      <main key='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books />}>
            <Route path='/books/genre/:genre' element={<Genre />} />
            <Route path='/books' element={<Selection />} />
            <Route path='/books/:title/:id' element={<SingleBook />} />
            <Route path='/books/request/:search' element={<SearchResult />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thankyou' element={<ThankYou />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
