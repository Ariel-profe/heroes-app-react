import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { SearchScreen } from "../../../components/search/SearchScreen";


describe('Pruebas en el <SearchScreen />', () => {

    const wrapper = mount(
        <MemoryRouter initialEntries={ ['/search'] }>
            <Route path={'/search'} component={ SearchScreen } />
        </MemoryRouter>
    );

    test('Debe mostrarse correctamente con valores por defecto', () => {

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').exists()).toBe(true);
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
        
    });

    test('Debe mostrar a Batman e input con el valor del queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <Route path={'/search'} component={ SearchScreen } />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();

    });

    test('Debe mostrar un error si no se encuentra el heroe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <Route path={'/search'} component={ SearchScreen } />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').exists()).toBe(true)
        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with batman123');
    });

    test('Debe llamar el push del history', () => {
        
        const historyMock = {
            push: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <Route 
                    path={'/search'} 
                    component={ () => <SearchScreen history={historyMock} /> } 
                />
            </MemoryRouter>
        );

        //Hacemos el cambio de la caja de texto
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        //Hacemos el submit del formulario
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(historyMock.push).toHaveBeenCalledWith(`?q=batman`)

    });

});