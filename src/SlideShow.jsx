import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const slides = [
  { title: "Slide 1", contents: ["A", "B", "C"] },
  { title: "Slide 2", contents: ["D", "E"] },
  { title: "Slide 3", contents: ["F", "G", "H", "I"] },
];

const SlideShow = () => {
  const { slideIndex } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const index = Number(slideIndex) || 0;
  const maxSlides = slides.length - 1;
  const initialClick = Number(searchParams.get("click")) || 0;
  const [visibleCount, setVisibleCount] = useState(initialClick);

  useEffect(() => {
    setVisibleCount(initialClick);
  }, [initialClick]);

  const handleNextClick = () => {
    const newClickCount = visibleCount + 1;
    setVisibleCount(newClickCount);

    if (newClickCount > 0) {
      setSearchParams({ click: newClickCount });
    }
  };

  const goToNextSlide = () => {
    if (index < maxSlides) {
      navigate(`/${index + 1}`);
    }
  };

  const goToPrevSlide = () => {
    if (index > 0) {
      navigate(`/${index - 1}`);
    }
  };

  const handleSlideClick = () => {
    if (visibleCount < slides[index].contents.length) {
      handleNextClick();
    } else {
      goToNextSlide();
    }
  };

  return (
    <div className="container">
      <h1>{slides[index].title}</h1>
      <div className="slide" onClick={handleSlideClick}>
        {slides[index].contents.slice(0, visibleCount).map((content, i) => (
          <div key={i} className="box">
            {content}
          </div>
        ))}
      </div>
      <div className="buttons">
        {visibleCount < slides[index].contents.length ? (
          <button onClick={handleNextClick} className="btn btn-click">
            Click ({visibleCount}/{slides[index].contents.length})
          </button>
        ) : (
          <button
            onClick={goToNextSlide}
            className={`btn btn-next ${index >= maxSlides ? "disabled" : ""}`}
            disabled={index >= maxSlides}
          >
            Next Slide
          </button>
        )}
        <button
          onClick={goToPrevSlide}
          className={`btn btn-prev ${index === 0 ? "disabled" : ""}`}
          disabled={index === 0}
        >
          Previous Slide
        </button>
      </div>
    </div>
  );
};

export default SlideShow;
