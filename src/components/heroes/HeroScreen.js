import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroesById } from '../../selectors/getHeoreById';

// import batman from '../../assets/heroes/dc-batman.jpg'; recurso estático
const heroImages = require.context('../../assets/heroes', true); //true para q busque en subdirectorios

export const HeroScreen = ({history}) => {

    const {heroeId} = useParams();
    
    
    const heroe = useMemo(() => getHeroesById(heroeId), [heroeId]);

    // const heroe = getHeroesById(heroeId);

    if( !heroe ){
        return <Redirect to="/" />
    };

    const handleReturn = () => {

        if(history.length <= 2){
            history.push('/');
        }else{
            history.goBack();
        }

    };

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = heroe;


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                // src={`../assets/heroes/${heroeId}.jpg`} desde public/assets 
                // src={batman} cuando hay import
                src={ heroImages( `./${heroeId}.jpg` ).default }
                className="img-thumbnail animate__animated animate__fadeInLeft"
                alt={ superhero }
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn" >
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush" >
                    <li className="list-group-item"> <b> Alter-ego:</b> {alter_ego} </li>
                    <li className="list-group-item"> <b> Publisher:</b> {publisher} </li>
                    <li className="list-group-item"> <b> First appearance:</b> {first_appearance} </li>
                </ul>

                <h5> Characters </h5>
                    <p> {characters} </p>
                
                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >

                    Return
                </button>
            </div>
            
            
        </div>
    )
}
