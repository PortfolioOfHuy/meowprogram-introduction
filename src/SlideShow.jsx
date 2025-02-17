import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Nội dung chính",
    contents: [
      "1. Giới thiệu về phần cứng máy tính",
      "2. Giới thiệu về phần mềm",
      "3. Giới thiệu về lập trình",
      "4. Giới thiệu về mạng máy tính",
      "5. Giới thiệu về bảo mật",
    ],
  },
  {
    title: "Phần cứng máy tính",
    contents: [
      "CPU(Central Processing Unit): xử lý tất cả các phép toán và điều khiển các hoạt động của hệ thống.",
      "RAM(Random Access Memory): Là bộ nhớ tạm thời giúp lưu trữ dữ liệu và chương trình đang chạy, cho phép CPU truy cập nhanh chóng để xử lý.",
      "Ổ Cứng (Hard Drive / SSD): Lưu trữ dữ liệu lâu dài, bao gồm hệ điều hành, phần mềm, và tập tin cá nhân. SSD (Solid State Drive) nhanh hơn nhưng đắt hơn so với HDD (Hard Disk Drive).",
      "Card Đồ Họa (Graphics Card): Xử lý và hiển thị đồ họa và video. Quan trọng cho các ứng dụng đồ họa nặng và trò chơi.",
      "Bo Mạch Chính (Motherboard): Là bảng mạch chính kết nối tất cả các thành phần của máy tính, bao gồm CPU, RAM, Ổ cứng và các thiết bị ngoại vi.",
    ],
  },
  {
    title: "Phần mềm",
    contents: [
      "Hệ điều hành (Operating System)",
      "Phần mềm ứng dụng (Application Software)",
      "Trình duyệt web (Web Browsers)",
      "Công cụ phát triển (Development Tools)",
    ],
  },
  {
    title: "Lập trình",
    contents: [
      "Ngôn ngữ lập trình (Programming Languages)",
      "Cấu trúc dữ liệu và giải thuật",
      "Cơ sở dữ liệu",
      "Phát triển web",
    ],
  },
  {
    title: "Mạng máy tính",
    contents: [
      "Giao thức mạng (Network Protocols)",
      "Mô hình OSI",
      "TCP/IP",
      "Bảo mật mạng",
    ],
  },
  {
    title: "Bảo mật",
    contents: [
      "Mã hóa dữ liệu",
      "Bảo mật ứng dụng",
      "Phòng chống tấn công mạng",
      "Quản lý quyền truy cập",
    ],
  },
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

  const handleMenuClick = (e, targetIndex) => {
    e.stopPropagation();
    navigate(`/${targetIndex}?click=0`);
  };

  const renderContent = (content, i) => {
    if (index === 0) {
      // Lấy số từ đầu chuỗi và trừ đi 1 để khớp với index của mảng
      const slideNumber = parseInt(content.match(/^\d+/)[0]);
      return (
        <div
          key={i}
          className="box menu-item"
          onClick={(e) => handleMenuClick(e, slideNumber)}
        >
          {content}
        </div>
      );
    }

    return (
      <div key={i} className="box">
        {content}
      </div>
    );
  };

  // Thêm hàm để kiểm tra có phải slide menu không
  const isMenuSlide = index === 0;

  // Điều chỉnh số lượng nội dung hiển thị dựa vào loại slide
  const contentToShow = isMenuSlide
    ? slides[index].contents.length // Hiển thị tất cả nếu là menu
    : visibleCount; // Hiển thị từng phần nếu là slide nội dung

  return (
    <div className="container">
      <h1>{slides[index].title}</h1>
      <div
        className="slide"
        onClick={handleSlideClick}
        data-is-menu={isMenuSlide ? "true" : "false"}
      >
        <div className="content-wrapper">
          {slides[index].contents
            .slice(0, contentToShow)
            .map((content, i) => renderContent(content, i))}
        </div>
      </div>
      <div className="buttons">
        <div className="navigation-group">
          <button
            onClick={goToPrevSlide}
            className={`btn ${index === 0 ? "disabled" : ""}`}
            disabled={index === 0}
          >
            ←
          </button>
          <span className="slide-count">
            {index + 1} / {slides.length}
          </span>
          {!isMenuSlide && visibleCount < slides[index].contents.length ? (
            <button onClick={handleNextClick} className="btn">
              →
            </button>
          ) : (
            <button
              onClick={goToNextSlide}
              className={`btn ${index >= maxSlides ? "disabled" : ""}`}
              disabled={index >= maxSlides}
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
