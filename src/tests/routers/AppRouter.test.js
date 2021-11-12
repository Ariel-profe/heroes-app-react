import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";


describe('Pruebas en el <AppRouter/>', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    
    test('Debe mostrar el login si no está autenticado', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />  
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot()

        
    });

    test('Debe mostrar el componente marvel si está autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Ariel'
            }
        }
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />  
            </AuthContext.Provider>
        );

        expect(wrapper.find('.navbar').exists()).toBe(true) //la clase navbar

    });


});