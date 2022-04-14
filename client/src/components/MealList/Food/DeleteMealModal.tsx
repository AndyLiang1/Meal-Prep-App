import * as React from 'react';
import styles from './DeleteMealModal.module.css';
export interface IDeleteMealModalProps {
    setDeletingMealModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteMealModal({ setDeletingMealModal }: IDeleteMealModalProps) {
    
    return (
        <div className = {styles.container}>
            <div className={styles.btn_container}></div>
            <button>Yes</button>
            <button onClick={() => setDeletingMealModal(false)}>Cancel</button>
        </div>
    );
}
