import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { HeroScreen } from "../../../components/heroes/HeroScreen";



describe('Pruebas en el componente <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    test('Debe mostrar el componente redirect si no hay args en el url', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen 
            
                history={ historyMock }
            />
            </MemoryRouter>
        )
        expect(wrapper.find('Redirect').exists()).toBe(true);

    });

    test('Debe mostrar un heroe si el params existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);

    });

    test('Debe regresar a la pantalla anterior con PUSH', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ historyMock} /> }
            />
            </MemoryRouter>
        );

            wrapper.find('button').prop('onClick')();

            expect( historyMock.push).toHaveBeenCalledWith('/');
            expect( historyMock.goBack).not.toHaveBeenCalled();

    });

    test('Debe regresar a la pantalla anterior con GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ historyMock} /> }
            />
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();

        expect(historyMock.goBack).toHaveBeenCalled();
        expect( historyMock.push).toHaveBeenCalledTimes(0);

    });

    test('Debe llamar el Redirect si el heroe no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123231321']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ historyMock} /> }
            />
            </MemoryRouter>
        );
        
        expect(wrapper.text()).toBe('');
    });


});