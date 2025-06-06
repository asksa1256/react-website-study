import { useParams, Navigate, useNavigate } from "react-router-dom";
import { addWishlist, getCourseBySlug } from "../api";
import Button from "../components/Button";
import Container from "../components/Container";
import Card from "../components/Card";
import CourseIcon from "../components/CourseIcon";
import getCourseColor from "../utils/getCourseColor";
import styles from "./CoursePage.module.css";

function CoursePage() {
  const { courseSlug } = useParams();
  const course = getCourseBySlug(courseSlug);
  const courseColor = getCourseColor(course?.code);
  const navigate = useNavigate();

  if (!course) return <Navigate to="/courses" />; // 잘못된 courseSlug 받으면 /courses로 리다이렉트

  const headerStyle = {
    borderTopColor: courseColor,
  };

  const handleAddWishlistClick = () => {
    addWishlist(course?.slug);
    navigate("/wishlist");
  };

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course.photoUrl} />
          <h1 className={styles.title}>{course.title}</h1>
          <Button variant="round" onClick={handleAddWishlistClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course.topics.map(({ topic }) => (
          <Card className={styles.topic} key={topic.slug}>
            <h3 className={styles.title}>{topic.title}</h3>
            <p className={styles.summary}>{topic.summary}</p>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default CoursePage;
