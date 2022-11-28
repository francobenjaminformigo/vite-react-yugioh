import React, { useState } from 'react';
import styles from './SearchResults.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { default as Axios } from 'axios';
import { CircularProgress } from '@mui/material';

let axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
});

const SearchResults = () => {

    const dispatch = useDispatch();
    const [isLoadingMoreCards, setLoadingMoreCards] = useState(false);

    const [modalCard, setModalCard] = useState([])
    const [modalToggle, setModalToggle] = useState(false)

    const changeModalCard = (card) => {
        setModalCard([card])
        setModalToggle(!modalToggle)
    }    

    let isLoading = useSelector(state => state.isLoading);
    let results_cards = useSelector(state => state.results);
    let nextPageToLoad = useSelector(state => state.nextPageToLoad);
    let hasMoreCardsToLoad = useSelector(state => state.hasMoreCardsToLoad);

    const loadMoreCards = async () => {
        dispatch({type: 'SET_HAS_MORE_CARDS_TO_LOAD', payload: false})
        setLoadingMoreCards(true)
        try {
            let response = await axios.get(nextPageToLoad)
            console.log(response)
            if(response.data.meta.pages_remaining !== 0){
                dispatch({type: 'SET_HAS_MORE_CARDS_TO_LOAD', payload: true})
                dispatch({type: 'SET_NEXT_PAGE_TO_LOAD', payload: response.data.meta.next_page})
            }else{
                dispatch({type: 'SET_HAS_MORE_CARDS_TO_LOAD', payload: false})
            }
            dispatch({type: 'UPDATE_RESULTS_CARDS', payload: response.data.data})
        } catch (error) {
            alert(err)
            dispatch({type: 'SET_IS_LOADING', payload: false})
        }
        setLoadingMoreCards(false)
    }

    if(!isLoading){
        return (
            <>
                <div className={styles.cardList}>
                    {results_cards.map(card => (
                    <div className={styles.card} key={card.id} onClick={() => changeModalCard(card)}>
                        <img src={card.card_images[0].image_url} alt={card.name} />
                    </div>
                    ))}
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: '0', justifyContent: 'center', alignItems: 'center'}}>
                        {isLoadingMoreCards ? <CircularProgress color='primary'/> : <></>}
                        {hasMoreCardsToLoad?<button onClick={(card) => loadMoreCards()}>Load More</button> : <></>}
                    </div>
                </div>
                {modalToggle&&<div className={styles.pop_up_container} onClick={changeModalCard}>
                        <div className={styles.pop_up_body} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.pop_up_content}>
                                {modalCard.map((card) => {
                                    return (
                                        <>
                                            <div className={styles.pop_up_img_container}>
                                                <img src={card.card_images[0].image_url} alt={card.name} />
                                            </div>
                                            <div className={styles.pop_up_card_info}>
                                                <h3>{card.name}</h3>
                                                {card.level ? <p><b>Level:</b> {card.level}</p> : <></>}
                                                <p><b>Type:</b> {card.type}</p>
                                                <p><b>Race:</b> {card.race}</p>
                                                {card.attribute ? <p><b>Attribute:</b> {card.attribute}</p> : <></>}
                                                {card.archetype ? <p><b>Archetype:</b> {card.archetype}</p> : <></>}
                                                {card.type.toLowerCase().match(/monster/) ? <p><b>Atk:</b> {card.atk}</p> : <></>}
                                                {card.type.toLowerCase().match(/monster/) && card.def ? <p><b>Def:</b> {card.def}</p> : <></>}                                                
                                                <p><b>Desc:</b> {card.desc}</p>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                            <div className={styles.pop_up_footer}>
                                <button onClick={changeModalCard}>Close</button>
                            </div>
                        </div>
                </div>}
            </>
        )
    }else{
        return <div className={styles.cardList} style={{justifyContent: 'center', alignContent: 'center'}}><CircularProgress color='primary'/></div>
    }
}

export default SearchResults;
