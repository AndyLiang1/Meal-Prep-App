import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './CustomErrorMessage.module.css';

type ErrorCollection = {
    errorPaths: string[];
    errorMessages: string[];
};
export interface ICustomErrorMessageProps {
    errorMessage?: string;
    displayFixedMessage?: boolean;

    errorCollection?: ErrorCollection;
    name?: string;
}

export function CustomErrorMessage({ errorMessage, displayFixedMessage, errorCollection, name }: ICustomErrorMessageProps) {
    const [errIndex, setErrIndex] = useState<any>(null)

    useEffect(() => {
        for (let i = 0; i < errorCollection?.errorPaths?.length!; i++) {
            if (errorCollection?.errorPaths[i] === name) {
                setErrIndex(i);
                return 
            }
        }
        setErrIndex(null) // need to reset the errIndex 
    }, [errorCollection]);

    return (
        <div className={styles.container}>
            {displayFixedMessage && <div className={styles.error_message}>**{errorMessage}**</div>}
            {typeof errIndex === 'number' && <div className={styles.error_message}>{errorCollection?.errorMessages[errIndex!]}</div>}
        </div>
    );
    // return {
    //     errorObject?.inputWithError === 'hi' && <div>hi</div>
    // };
}
