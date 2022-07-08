import { HIDE_PARTICULAR_CAT, SET_CAT_FAVOURITE, SET_FAVOURITE_CAT_FAVOURITE, SET_FETCHING_ERROR_TRUE } from "../reducer/constants";
import { useEffect, useState } from "react";
import { getParticularCat } from '../API/api';

const ParticularCat = ({ dispatch, modal, particularCat, favouriteCats, source }) => {
    const [url, setUrl] = useState(null);
    const [preloader, setPreloader] = useState(true)

    useEffect(() => {
        if(modal) {
            getParticularCat(particularCat)
                .then(response => {
                    setUrl(() => response.data.url );
                    setPreloader(false);
                })
                .catch(e => {
                    console.log('Ошибка загрузки: ' + e);
                    dispatch({ type: SET_FETCHING_ERROR_TRUE })
                })              
        };
    }, [modal, url])

    // Хэндлер лайка
    const heartIconClickHandler = (e,id) => {
        e.stopPropagation();
        if(source === 'cats') {
            console.log('1')
            dispatch({ type: SET_CAT_FAVOURITE, payload: id })
            
        } else {
            console.log('2')
            dispatch({ type: SET_FAVOURITE_CAT_FAVOURITE, payload: id })
            
        }
    }

    // Определяем, лайкнутый ли котик
    const isFavourite = favouriteCats.some(cat => cat.id == particularCat) ? true : false;

    return ( 
        // Окно просмотра конкретного котика
        <div className="modal" onClick={ () => dispatch({ type: HIDE_PARTICULAR_CAT })  }>
            
            {
                preloader 
                    ? (
                        <div className="preloader">
                            ... загружаем ...
                        </div>
                    )
                    : (
                        <div className={ isFavourite ? "modal__window favourite" : "modal__window" } onClick={ e => e.stopPropagation() }>
                        <span className="modal__close" onClick={ () => dispatch({ type: HIDE_PARTICULAR_CAT }) } >&times;</span>
                        <div 
                            className="heart" 
                            style={ preloader ? { display: 'none' } : { display: 'block' } } 
                            onClick={ e => heartIconClickHandler(e,particularCat) 
                        }>
                            <svg>
                                <use xlinkHref="#heart-icon"></use>
                            </svg>
                        </div> 
                        <img src={ url } alt="Изображение в окне" />
                    </div> 
                    )
            } 
            
        </div>
    )
}

export default ParticularCat;