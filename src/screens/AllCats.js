import { useEffect, useRef, useState } from "react";
import { getCats } from '../API/api';
import { GET_CATS, SET_FETCHING_ERROR_TRUE } from "../reducer/constants";

// Components
import Cat from "../components/Cat";

const AllCats = ({ cats, dispatch, favouriteCats, page, error }) => {
    const isPaginate = useRef(true);
    const [fetching, setFetching]  = useState(true);
  
    useEffect(() => {
        if(fetching) {
            getCats(page)
                .then(response => {
                    dispatch({
                        type: GET_CATS,
                        payload: response.data
                    });
                    // Здесь определяем, можем ли делать запрос или коты на сервере уже закончились 
                    //  (доступное количестов котов для загрузки определяем по 'pagination-count' в заголовке ответа)
                    cats.length > parseInt(response.headers['pagination-count'], 10) ? isPaginate.current = false : isPaginate.current = true;
                    setFetching(false)
                })
                .catch(e => {
                    console.log('Ошибка загрузки: ' + e);
                    dispatch({ type: SET_FETCHING_ERROR_TRUE })
                })              
        };
    }, [fetching, cats, isPaginate.current, dispatch, page])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, [])

    // определеяем момент подгрузки по скроллу
    const scrollHandler = e => {
        if(((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)) < 100) && isPaginate.current) {
            setFetching(true)
        }; 
    }

    return (
        <main>
            {/* Галлерея котов */}
            <div className="gallery">{
                !!cats.length && cats.map(({ url, id }) => ( 
                    <Cat 
                        url={ url } 
                        key={ id.toString() + '_1' }  
                        dispatch={ dispatch } 
                        id={ id } 
                        isFavourite={ favouriteCats.some(cat => cat.id === id) ? true : false  }
                        source='cats'
                    /> 
                ))
            }</div>
            { /* Блок с сообщениями */
                error 
                    ? (
                        <div className="add-more">
                            <span>Ошибка сети<br></br><br></br>Проверьте подключение и попробуйте перезагрузить страницу</span>
                        </div> )
                    : isPaginate.current 
                        ? page === 0 
                            ? (
                                <div className="add-more">
                                    <span>... загружаем котиков ...</span>
                                </div> )
                            : (
                            <div className="add-more">
                                <span>... загружаем ещё котиков ...</span>
                            </div> )
                        : null
            }
        </main>
    );
}

export default AllCats;