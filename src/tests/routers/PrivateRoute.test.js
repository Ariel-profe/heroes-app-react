import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { PrivateRoute } from "../../routers/PrivateRoute";



describe('Pruebas en <PrivateRoute/>', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    };

    Storage.prototype.setItem = jest.fn(); //Simular con jest un storage
    
    test('Debe mostrar el componente si está autenticado y guardar en localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
            <PrivateRoute 
                isAuthenticated={true}
                component={ () => <span>Listo!</span>}
                {...props}
            />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')

    });

    test('Debe de bloquear el componente si no está autenticado', () => {
        
        const wrapper = mount(
            <MemoryRouter>
            <PrivateRoute 
                isAuthenticated={false}
                component={() => <span>Hola</span>}
                {...props}
            />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBe(false)


    });


});