import { Helmet } from "react-helmet";
import { useState } from "react";
import ListPage from "../components/ListPage";
import Warn from "../components/Warn";
import CourseItem from "../components/CourseItem";
import { getCourses } from "../api";
import styles from "./CourseListPage.module.css";
import searchBarStyles from "../components/SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import { useSearchParams } from "react-router-dom";

function CourseListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get("keyword"); // name="keyword"인 input과 동기화
  const [keyword, setKeyword] = useState(initKeyword || ""); // input에 value로 넣어줄 것이므로 빈 값도 문자열로 처리
  const courses = getCourses(initKeyword);

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // setSearchParams: 주소창 쿼리스트링 변경. 파라미터로 객체를 받음: 원하는 쿼리들 프로퍼티로 넣어주기
    setSearchParams(
      keyword
        ? {
            keyword,
          }
        : {}
    ); // keyword 값이 null이나 undefined로 들어갈 경우를 방지하기 위해 삼항연산자 사용 (keyword 값 없으면 빈 객체 보내기)
  };

  return (
    <ListPage
      variant="catalog"
      title="모든 코스"
      description="자체 제작된 코스들로 기초를 쌓으세요."
    >
      <Helmet>
        <title>Codethat - 모든 코스</title>
      </Helmet>
      <form className={searchBarStyles.form} onSubmit={handleSubmit}>
        <input
          name="keyword"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="검색으로 코스 찾기"
        ></input>
        <button type="submit">
          <img src={searchIcon} alt="검색" />
        </button>
      </form>

      <p className={styles.count}>총 {courses.length}개 코스</p>

      {initKeyword && courses.length === 0 ? ( // 검색어가 있을 때만 실행되는 조건이므로, 앞에 'initKeyword &&' 추가
        <Warn
          className={styles.emptyList}
          title="조건에 맞는 코스가 없어요."
          description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
        />
      ) : (
        <div className={styles.courseList}>
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      )}
    </ListPage>
  );
}

export default CourseListPage;
