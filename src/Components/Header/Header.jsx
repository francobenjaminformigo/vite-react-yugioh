import React from 'react';
import logo from '../../assets/img/Yugioh_anime_logo.webp';
import styles from './Header.module.css';

export default function Header () {
    return (
        <div className={styles.app_header}>
            <div className={styles.yugi_logo}>
                <a href="https://francobenjaminformigo.github.io/vite-react-yugioh/"><img src={logo} alt="Yu-Gi-Oh! Logo" className={styles.logo_img} /></a>
            </div>
        </div>
    );
}
