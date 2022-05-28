import * as React from 'react';
import { useState } from 'react';
import { SearchIcon } from '../helpers/Icons';
import styles from './SearchBar.module.css';
export interface ISearchBarProps {
    placeholder: string;
    data: any[];
    // in the future, can add a "from where" prop and handle 
    // using if statements in handleFilter
}

export function SearchBar({placeholder, data}: ISearchBarProps) {
    const [wordEntered, setWordEntered] = useState("")
    const[filteredData, setFilteredData] = useState<any>([])
    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((food) => {
            return food.name.toLowerCase().includes(searchWord.toLowerCase)
        })

        if (searchWord === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }

    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered('');
    };

    return (
        <div className={styles.container}>
            <input className={styles.inputBox_container} type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}></input>
            <div className={styles.searchIcon_container}>
                <SearchIcon className = {styles.search_icon}></SearchIcon>
            </div>
        </div>
    );
}
