import React from 'react';
import styles from './Search.module.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { default as Axios } from 'axios';


let axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
});

export default function Search () {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [type, setType] = useState('');
    const [race, setRace] = useState('');
    const [attribute, setAttribute] = useState('');
    const [sort, setSort] = useState('');

    const apiCall = async () => {
        dispatch({type: 'SET_IS_LOADING', payload: true})
        try {
            let response = await axios.get(buildQuery())
            if(response.data.meta.pages_remaining !== 0){
                dispatch({type: 'SET_HAS_MORE_CARDS_TO_LOAD', payload: true})
                dispatch({type: 'SET_NEXT_PAGE_TO_LOAD', payload: response.data.meta.next_page})
            }else{
                dispatch({type: 'SET_HAS_MORE_CARDS_TO_LOAD', payload: false})
            }
            dispatch({type: 'UPDATE_RESULTS', payload: response.data.data})
            dispatch({type: 'SET_IS_LOADING', payload: false})
        } catch (error) {
            alert(`Something went wrong \n Try again`)
            dispatch({type: 'SET_IS_LOADING', payload: false})
        }
    };

    const selectType = (
        <select style={{cursor: "pointer"}} onChange={({target: {value}}) => setType(value.toLowerCase() === 'type'?'':`&type=${value}`)}>
            <option>Type</option>
            <optgroup label="Main Deck">
                <option>Effect Monster</option>
                <option>Flip Effect Monster</option>
                <option>Flip Tuner Effect Monster</option>
                <option>Gemini Monster</option>
                <option>Normal Monster</option>
                <option>Normal Tuner Monster</option>
                <option>Pendulum Effect Monster</option>
                <option>Pendulum Flip Effect Monster</option>
                <option>Pendulum Normal Monster</option>
                <option>Pendulum Tuner Effect Monster</option>
                <option>Ritual Effect Monster</option>
                <option>Ritual Monster</option>
                <option>Skill Card</option>
                <option>Spell Card</option>
                <option>Spirit Monster</option>
                <option>Toon Monster</option>
                <option>Trap Card</option>
                <option>Tuner Monster</option>
                <option>Union Effect Monster</option>
            </optgroup>
            <optgroup label="Extra Deck">
                <option>Fusion Monster</option>
                <option>Link Monster</option>
                <option>Pendulum Effect Fusion Monster</option>
                <option>Synchro Monster</option>
                <option>Synchro Pendulum Effect Monster</option>
                <option>Synchro Tuner Monster</option>
                <option>XYZ Monster</option>
                <option>XYZ Pendulum Effect Monster</option>
            </optgroup>
        </select>
    )

    const selectRace = (
        <select style={{cursor: "pointer"}} onChange={({target: {value}}) => setRace(value.toLowerCase() === 'race'?'':`&race=${value}`)}>
            <option>Race</option>
            <optgroup label="Monster Cards">
                <option>Aqua</option>
                <option>Beast</option>
                <option>Beast-Warrior</option>
                <option>Cyberse</option>
                <option>Dinosaur</option>
                <option>Divine-Beast</option>
                <option>Dragon</option>
                <option>Fairy</option>
                <option>Fiend</option>
                <option>Fish</option>
                <option>Insect</option>
                <option>Machine</option>
                <option>Plant</option>
                <option>Psychic</option>
                <option>Pyro</option>
                <option>Reptile</option>
                <option>Rock</option>
                <option>Sea Serpent</option>
                <option>Spellcaster</option>
                <option>Thunder</option>
                <option>Warrior</option>
                <option>Winged Beast</option>
                <option>Wyrm</option>
                <option>Zombie</option>
            </optgroup>
            <optgroup label="Spell Cards">
                <option>Normal</option>
                <option>Field</option>
                <option>Equip</option>
                <option>Continuous</option>
                <option>Quick-Play</option>
                <option>Ritual</option>
            </optgroup>
            <optgroup label="Trap Cards">
                <option>Normal</option>
                <option>Continuous</option>
                <option>Counter</option>
            </optgroup> 
        </select>
    )

    const selectAttribute = (
        <select style={{cursor: "pointer"}} onChange={({target: {value}}) => setAttribute(value.toLowerCase() === 'attribute'?'':`&attribute=${value}`)}>
                <option>Attribute</option>
                <option>Dark</option>
                <option>Divine</option>
                <option>Earth</option>
                <option>Fire</option>
                <option>Light</option>
                <option>Water</option>
                <option>and</option>
                <option>Wind</option>
        </select>
    )

    const selectLevel = (
        <select style={{cursor: "pointer"}} onChange={({target: {value}}) => setLevel(value.toLowerCase() === 'level'?'':`&level=${+value}`)}>
            <option defaultChecked={true}>Level</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
        </select>
    )

    const selectSort = (
        <select style={{cursor: "pointer"}} onChange={({target: {value}}) => setSort(value.toLowerCase() === 'sort by'?'':`&sort=${value}`)}>
            <option defaultChecked={true}>Sort By</option>
            <option value={'ATK'}>Attack</option>
            <option value={'DEF'}>Defense</option>
            <option value={'Name'}>Name</option>
            <option value={'Type'}>Type</option>
            <option value={'Level'}>Level</option>
            <option value={'New'}>New</option>
        </select>
    )

    const buildQuery = () => {
        return `cardinfo.php?num=30&offset=0`+name+type+level+race+attribute+sort;
    };

    useEffect(() => {
        apiCall()
    }, []);

    return (
        <>
            <div className={styles.search_container}>
                <input autoComplete='off' onKeyPress={(e) => {
                    if(e.key === 'Enter'){
                        apiCall()
                    }
                }} onChange={({target: {value}}) => setName(`&fname=${value}`)} type="search" name="search" id="search" className={styles.search_bar} placeholder='Card name...'/>
                <button onClick={() => {apiCall()}} className={styles.search_btn}>Search</button>
            </div>
            <div className={styles.search_filters}>
                {selectLevel}
                {selectType}
                {selectRace}
                {selectAttribute}
                {selectSort}
            </div>
        </>
    );
}