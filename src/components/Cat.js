import { SET_CAT_FAVOURITE, SHOW_PARTICULAR_CAT } from "../reducer/constants";

const Cat = ({ url, dispatch, id, isFavourite, source }) => {

    // Хэндлер лайка
    const heartIconClickHandler = (e,id) => {
        e.stopPropagation();
        dispatch({ type: SET_CAT_FAVOURITE, payload: id })
    }

    return ( /* Отображаем конкретного котика галереи */
        <div className={ isFavourite ? "card favourite" : "card" } onClick={ () => dispatch({ type: SHOW_PARTICULAR_CAT, payload: id, source }) } data-testid="cat-card">
            <img src={ url } alt=""></img>
            <div className="heart" onClick={ (e) => heartIconClickHandler(e,id) }>
                <svg data-testid='svg'>
                    <use xlinkHref="#heart-icon"></use>
                </svg>
            </div>
        </div>
    );
}

export default Cat;