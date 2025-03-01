import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from "recoil";

function App() {
  return <>
  
    <Toaster 
    position="top-right"
     toastOptions={{
      success :{
        iconTheme : {
          primary : "indigo",
        }
      }
    }}></Toaster>
   
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  </>
}

export default App;
