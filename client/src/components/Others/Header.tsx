import * as React from 'react';
import styles from './Header.module.css';
export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
    return (
        <div className={styles.header}>
            <div className={styles.bar}>
                <div className={styles.title_one}>meal </div>
                <div className={styles.title_two}> prep.</div>
            </div>
            <div className={styles.round_section}></div>

            {/* <div className={styles.image}></div> */}
            {/* <div className={styles.left_container}>
                <div className={styles.left_top_container}></div>
                <div className={styles.left_bottom_container}></div>
            </div>
            <div className={styles.right_container}>
                <div className={styles.right_top_container}></div>
                <div className={styles.right_bottom_container}></div>
            </div> */}
        </div>
    );
}
