import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";


describe('Pruebas en el componente <Navbar />', () => {

    //el boton usa el hook 'useHistory', hay q simularlo
    //Generar un mock (farsa) del history que se llama a traves del router
    //para que funcione el boton
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Fernando'
        }
    };
    
    const wrapper = mount(
        
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    //Limpiar mocks
    afterEach( () => {
        jest.clearAllMocks();
    })

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Fernando')
    });

    test('Debe llamar el logout del boton y usar history', () => {

        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');
        
    });

});