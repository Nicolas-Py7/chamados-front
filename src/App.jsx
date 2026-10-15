
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from "./pages/PaginaInicial";
import DetalheChamado from "./pages/DetalheChamado";
import FormularioChamado from "./pages/FormularioChamado";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route
                    path="/chamado/:id"
                    element={<DetalheChamado />}
                />
                <Route 
                    path="/novo"
                    element={<FormularioChamado />} 
                />
                <Route 
                    path="/editar/:id"
                    element={<FormularioChamado />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
