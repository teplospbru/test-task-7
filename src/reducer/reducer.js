import { 
    GET_CATS, 
    GET_FAVOURITE_CATS, 
    HIDE_PARTICULAR_CAT, 
    SET_CAT_FAVOURITE,  
    SET_FAVOURITE_CAT_FAVOURITE,
    SET_FETCHING_ERROR_FALSE, 
    SET_FETCHING_ERROR_TRUE, 
    SHOW_PARTICULAR_CAT
} from "./constants"

export const initialState = {
    page: 0, // текущая страница пагинации всех котиков
    favouritePage: 0, // текущая страница пагинации любимых котиков
    error: false, // ошибка сети
    modal: false, // показ модального окна
    particularCat: null, // сюда попадёт id котика для подробного просмотра в модальном окне
    particularCatArr: [], // сюда записываем все свойства кота из модального окна
    source: null, // Страница, с которой перешли для подробного просмотра котика в модальном окне
    cats: [], // все котики загружаются сюда
    // любимы котики попадают сюда (при инициализации из localStorage)
    favouriteCats: localStorage.getItem('favouriteCats') ? JSON.parse(localStorage.getItem('favouriteCats')) : []
}

export const reducer = (state, action) => {
    switch(action.type) {
        case GET_CATS:
            return {
                ...state,
                page: state.page + 1,
                paginationCount: parseInt(action.count),
                cats: [...new Set([...state.cats, ...action.payload])],
            }
        case SET_FETCHING_ERROR_TRUE:
            return {
                ...state,
                error: true
            }
        case SET_FETCHING_ERROR_FALSE:
            return {
                ...state,
                error: false
            }
        case SET_CAT_FAVOURITE:
            const value = state.favouriteCats.some(cat => cat.id === action.payload)
                ? state.favouriteCats.filter(cat => cat.id !== action.payload)
                : [...state.favouriteCats, ...state.cats.filter(cat => cat.id === action.payload)];
                localStorage.setItem('favouriteCats', JSON.stringify(value));
                console.log(action.payload,value.length,state.cats.length,state.favouriteCats.some(cat => cat.id === action.payload), state.cats.filter(cat => cat.id === action.payload),state.cats)
            return {
                ...state,
                favouriteCats: value
            }
            case SET_FAVOURITE_CAT_FAVOURITE:
                const value2 = state.favouriteCats.some(cat => cat.id === action.payload)
                    ? state.favouriteCats.filter(cat => cat.id !== action.payload)
                    : [...state.favouriteCats, ...state.particularCatArr];
                    localStorage.setItem('favouriteCats', JSON.stringify(value2));
                    console.log(action.payload,value2.length,state.favouriteCats.length,state.favouriteCats.some(cat => cat.id === action.payload), state.favouriteCats.filter(cat => cat.id === action.payload),state.favouriteCats)
                return {
                    ...state,
                    favouriteCats: value2
                }
        case GET_FAVOURITE_CATS:
            return {
                ...state,
                favouritePage: state.favouritePage + 1
            }
        case SHOW_PARTICULAR_CAT:
            return {
                ...state,
                modal: true,
                particularCat: action.payload,
                particularCatArr: state.favouriteCats.filter(cat => cat.id === action.payload),
                source: action.source
            }
        case HIDE_PARTICULAR_CAT:
            return {
                ...state,
                modal: false
            }
        default: return state
    }
}