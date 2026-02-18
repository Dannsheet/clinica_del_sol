
 import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
 import { Suspense, lazy } from 'react'
 import RootLayout from './layouts/RootLayout.jsx'
 import './App.css'

 const HomePage = lazy(() => import('./pages/HomePage.jsx'))
 const NosotrosPage = lazy(() => import('./pages/NosotrosPage.jsx'))
 const ServiciosHospitalariosPage = lazy(() => import('./pages/ServiciosHospitalariosPage.jsx'))
 const StaffMedicoPage = lazy(() => import('./pages/StaffMedicoPage.jsx'))
 const ContactoPage = lazy(() => import('./pages/ContactoPage.jsx'))
 const OtrosServiciosPage = lazy(() => import('./pages/OtrosServiciosPage.jsx'))
 const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

 function App() {
   return (
     <BrowserRouter>
       <Suspense fallback={<div className="app-loading">Cargando…</div>}>
         <Routes>
           <Route element={<RootLayout />}>
             <Route path="/" element={<HomePage />} />
             <Route path="/inicio" element={<Navigate to="/" replace />} />
             <Route path="/nosotros" element={<NosotrosPage />} />
             <Route path="/servicios-hospitalarios" element={<ServiciosHospitalariosPage />} />
             <Route path="/staff-medico" element={<StaffMedicoPage />} />
             <Route path="/contacto" element={<ContactoPage />} />
             <Route path="/otros-servicios" element={<OtrosServiciosPage />} />
             <Route path="*" element={<NotFoundPage />} />
           </Route>
         </Routes>
       </Suspense>
     </BrowserRouter>
   )
 }

 export default App

