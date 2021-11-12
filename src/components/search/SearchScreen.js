import React, { useMemo } from 'react'
import queryString from 'query-string';

import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    
    const { q = '' } = queryString.parse( location.search )
    
    const [values, handleInputChange] = useForm({
        searchText: q
    });
    
    const { searchText } = values;
    
    const heroesFilter = useMemo(() => getHeroesByName( q ), [q])
    

    const handleSearch = (e) => {
        e.preventDefault()

        history.push(`?q=${searchText}`);
    };

    return (
        <div>
            <h1> Search screen</h1>
            <hr/>

            <div className="row">

                <div className="col-5 ">
                   <h4> Search form</h4> 
                   <hr/>

                   <form className="d-grid gap-2 " onSubmit={ handleSearch }>
                       <input
                        type="text"
                        placeholder="Find your hero"
                        autoComplete="off"
                        className="form-control d-grid gap-2"
                        name="searchText"
                        value={searchText}
                        onChange={ handleInputChange }
                       />
                       
                       <button
                            type="submit"
                            className="btn m-2 btn-outline-primary"
                       >
                            Seach...
                       </button>
                   </form>
                </div>
                
                <div className="col-7">
                    <h4> Results </h4>
                    <hr/>

                   { 
                        (q === '' ) 
                            && <div className="alert alert-info">
                        Search a hero
                                </div>
                    }

                    { 
                        (q !== '' && heroesFilter.length === 0) 
                            && <div className="alert alert-danger">
                        There is no a hero with { q }
                                </div>
                    }

                    {
                        heroesFilter.map(hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>

                    


            </div>


        </div>
    )
}
