import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import personIcon from "../assets/person.png";
import styles from "./UserMenu.module.css";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        <img src={personIcon} alt="유저 메뉴" />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          <li>
            <Link to="/wishlist">위시리스트</Link>
          </li>
          <li className={styles.disabled}>회원가입</li>
          <li className={styles.disabled}>로그인</li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
