import { useEffect, useRef, useState } from "react";
import { GET_FAVOURITE_CATS } from "../reducer/constants";

// Components
import Cat from "../components/Cat";

const FavouriteCats = ({ dispatch, favouriteCats, page, error }) => {
    const isPaginate = useRef(true);
    const [fetching, setFetching]  = useState(true);

    // Будем постепенно заполнять массив, выводимый на страницу, на основании состоянии пагинации (переменной page)
    const paginatedCats = [];
    for(let i = 1; i <= (favouriteCats.length > page * 20 ? page * 20 : favouriteCats.length); i++) {
        paginatedCats.push(favouriteCats[i - 1])
    }

    // Имитируем задержку, как-будто ждем ответ сервера
    let delay = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("result");
        }, 1500); 
    })
  
    useEffect(() => {
        if(fetching) {
            async function getFavouriteCats() {
                await delay
                    .then(() => {
                        dispatch({ type: GET_FAVOURITE_CATS }); 
                    })
                    .finally(setFetching(false))
            }
            getFavouriteCats()    
        };
        favouriteCats.length > page * 20 ? isPaginate.current = true : isPaginate.current = false;
    }, [fetching]) // Больше зависимостей сюда не добавляем, чтобы не вызывать дополнительные перерендеры

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, [])

    const scrollHandler = e => {
        if(((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)) < 100) && isPaginate.current) {
            setFetching(true);
        }; 
    }

    return (
        <main>
            {/* Галлерея любимых котов */}
            <div className="gallery">{
                !!paginatedCats.length && paginatedCats.map(({ url, id }) => ( 
                    <Cat 
                        url={ url } 
                        key={ id.toString() + '_1' }  
                        dispatch={ dispatch } id={ id } 
                        isFavourite={ favouriteCats.some(cat => cat.id === id) ? true : false  }
                        source='favouriteCats'
                    /> 
                ))
            }</div>
            { /* Блок с сообщениями */
                error 
                    ? (
                        <div className="add-more">
                            <span>Ошибка сети<br></br><br></br>Проверьте подключение и попробуйте перезагрузить страницу</span>
                        </div> )
                    : isPaginate.current && !!paginatedCats.length && paginatedCats.length < favouriteCats.length
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

export default FavouriteCats;