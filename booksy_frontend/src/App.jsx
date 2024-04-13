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
            <Route path='/books/selection' element={<Selection />} />
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

// before deployment

/* 
VITE_REGISTER = https://booksy-store.onrender.com/api/user/register
VITE_LOGIN = https://booksy-store.onrender.com/api/user/login
VITE_VERIFY_TOKEN = https://booksy-store.onrender.com/api/user/verifytoken
VITE_UPLOAD_BOOK = https://booksy-store.onrender.com/api/books/new
VITE_GENRES = https://booksy-store.onrender.com/api/genres
VITE_BOOKS_ONE_GENRE = https://booksy-store.onrender.com/api/books/genre
VITE_BOOK_SEARCH = https://booksy-store.onrender.com/api/books/search
VITE_FETCH_ALL_BOOKS = https://booksy-store.onrender.com/api/books/all
VITE_USER_UPDATE = https://booksy-store.onrender.com/api/user/update
VITE_REVIEWS_SINGLE_BOOK = https://booksy-store.onrender.com/api/reviews/one_book
VITE_BOOK_BY_ID = https://booksy-store.onrender.com/api/books
VITE_DELETE_USER = https://booksy-store.onrender.com/api/user/delete
VITE_PLACE_ORDER = https://booksy-store.onrender.com/api/orders/create
VITE_USER_ORDERS = https://booksy-store.onrender.com/api/orders/user
VITE_ADD_REVIEW = https://booksy-store.onrender.com/api/reviews/new
VITE_REVIEWS_BY_USER_ID = https://booksy-store.onrender.com/api/reviews/one_user
VITE_EDIT_REVIEW = https://booksy-store.onrender.com/api/reviews/edit
VITE_DELETE_BOOK = https://booksy-store.onrender.com/api/books/delete
VITE_UPDATE_BOOK = https://booksy-store.onrender.com/api/books/update
VITE_DELETE_ORDER = https://booksy-store.onrender.com/api/orders/del/order
VITE_DELETE_ITEM_FROM_ORDER = https://booksy-store.onrender.com/api/orders/delete/item
VITE_UPDATE_ITEM = https://booksy-store.onrender.com/api/orders/update
*/

/* 
VITE_REGISTER = http://localhost:8000/api/user/register
VITE_LOGIN = http://localhost:8000/api/user/login
VITE_VERIFY_TOKEN = http://localhost:8000/api/user/verifytoken
VITE_UPLOAD_BOOK = http://localhost:8000/api/books/new
VITE_GENRES = http://localhost:8000/api/genres
VITE_BOOKS_ONE_GENRE = http://localhost:8000/api/books/genre
VITE_BOOK_SEARCH = http://localhost:8000/api/books/search
VITE_FETCH_ALL_BOOKS = http://localhost:8000/api/books/all
VITE_USER_UPDATE = http://localhost:8000/api/user/update
VITE_REVIEWS_SINGLE_BOOK = http://localhost:8000/api/reviews/one_book
VITE_BOOK_BY_ID = http://localhost:8000/api/books
VITE_DELETE_USER = http://localhost:8000/api/user/delete
VITE_PLACE_ORDER = http://localhost:8000/api/orders/create
VITE_USER_ORDERS = http://localhost:8000/api/orders/user
VITE_ADD_REVIEW = http://localhost:8000/api/reviews/new
VITE_REVIEWS_BY_USER_ID = http://localhost:8000/api/reviews/one_user
VITE_EDIT_REVIEW = http://localhost:8000/api/reviews/edit
VITE_DELETE_BOOK = http://localhost:8000/api/books/delete
VITE_UPDATE_BOOK = http://localhost:8000/api/books/update
VITE_DELETE_ORDER = http://localhost:8000/api/orders/del/order
VITE_DELETE_ITEM_FROM_ORDER = http://localhost:8000/api/orders/delete/item
VITE_UPDATE_ITEM = http://localhost:8000/api/orders/update 
*/

// backend before deployment
/* 
PORT = 8000
HOST = http://localhost:5173    
BOOK_IMAGE = http://localhost:8000/api/books/image/   
JWT_SECRET = sthJ4ko0s  
MONGO_URI = mongodb+srv://ania123:ania123@bookstorecluster.xt96gth.mongodb.net/booksy
PROFILE_IMAGE = http://localhost:8000/api/user/image/ 
*/

/* 
PORT=8000
HOST=http://localhost:5173    
BOOK_IMAGE=https://booksy-store.onrender.com/api/books/image/   
JWT_SECRET=sthJ4ko0s  
MONGO_URI=mongodb+srv://ania123:ania123@bookstorecluster.xt96gth.mongodb.net/booksy
PROFILE_IMAGE=https://booksy-store.onrender.com/api/user/image/
*/
