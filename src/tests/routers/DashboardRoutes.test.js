import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";



describe('Pruebas en el componente <DashboardRoutes/>', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Daniela'
        }
    }

    const wrapper = mount(
        <MemoryRouter>
            <AuthContext.Provider value={contextValue}>
                <DashboardRoutes/>
            </AuthContext.Provider>
        </MemoryRouter>
    )

    
    
    test('Debe mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').exists()).toBe(true);
        expect(wrapper.find('.text-info').text().trim()).toBe('Daniela');
    });
});