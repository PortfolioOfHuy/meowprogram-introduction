import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Prism from "prismjs";

const slides = [
  {
    title: "Kiến thức cơ bản",
    contents: [
      "1. Giới thiệu chung",
      "2. Transistor",
      "3. Giới thiệu về lập trình",
      "4. Giới thiệu về mạng máy tính",
      "5. Giới thiệu về bảo mật",
    ],
  },
  {
    title: "Singleton trong môi trường đa luồng",
    contents: [
      {
        type: "text",
        content:
          "Ví dụ về việc sử dụng Singleton Pattern trong môi trường đa luồng:",
      },
      {
        type: "text",
        content:
          "Trong ví dụ này, hai thread cùng truy cập vào Instance của class A. Pattern Singleton đảm bảo rằng cả hai thread sẽ nhận được cùng một instance.",
      },
      {
        type: "code",
        language: "shell",
        content: "npm install",
      },
      {
        type: "text",
        content:
          "Sử dụng double-check locking để đảm bảo thread-safe và hiệu năng tốt.",
      },
    ],
  },
  {
    title: "Sơ lược về máy tính",
    contents: [
      {
        type: "text",
        content:
          "CPU(Central Processing Unit): xử lý tất cả các phép toán và điều khiển các hoạt động của hệ thống.",
      },
      {
        type: "code",
        language: "python",
        content: `# Ví dụ về xử lý CPU đơn giản
def calculate(a, b):
    return a + b

result = calculate(5, 3)
print(f"Kết quả: {result}")`,
      },
      {
        type: "code",
        language: "javascript",
        content: `// Ví dụ về xử lý đa luồng
async function processData(data) {
    const result = await heavyCalculation(data);
    return result;
}

// Xử lý nhiều tác vụ cùng lúc
Promise.all([
    processData(data1),
    processData(data2)
]).then(results => {
    console.log('Kết quả:', results);
});`,
      },
      {
        type: "text",
        content:
          "RAM(Random Access Memory): Là bộ nhớ tạm thời giúp lưu trữ dữ liệu và chương trình đang chạy.",
      },
      {
        type: "image",
        content: "/images/ram.jpg",
        alt: "RAM Structure",
      },
      "Ổ Cứng (Hard Drive / SSD): Lưu trữ dữ liệu lâu dài, bao gồm hệ điều hành, phần mềm, và tập tin cá nhân. SSD (Solid State Drive) nhanh hơn nhưng đắt hơn so với HDD (Hard Disk Drive).",
      "Card Đồ Họa (Graphics Card): Xử lý và hiển thị đồ họa và video. Quan trọng cho các ứng dụng đồ họa nặng và trò chơi.",
      "Bo Mạch Chính (Motherboard): Là bảng mạch chính kết nối tất cả các thành phần của máy tính, bao gồm CPU, RAM, Ổ cứng và các thiết bị ngoại vi.",
    ],
  },
  {
    title: "Transistor",
    contents: [
      "Transistor là gì? Linh kiện điện tử giúp điều khiển và khuếch đại tín hiệu. ",
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
  const [isActive, setIsActive] = useState(false);
  let timeoutId = null;

  useEffect(() => {
    setVisibleCount(initialClick);
  }, [initialClick]);

  useEffect(() => {
    Prism.highlightAll();
  }, [index, visibleCount]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowRight":
          if (visibleCount < slides[index].contents.length) {
            handleNextClick();
          } else {
            goToNextSlide();
          }
          break;
        case "ArrowLeft":
          goToPrevSlide();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, visibleCount]);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsActive(true);

      // Clear timeout cũ nếu có
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set timeout mới để ẩn buttons sau 2 giây không di chuyển
      timeoutId = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleNextClick = () => {
    const newClickCount = visibleCount + 1;
    setVisibleCount(newClickCount);

    if (newClickCount > 0) {
      setSearchParams({ click: newClickCount });
    }
  };

  const goToNextSlide = () => {
    if (index < maxSlides) {
      const nextIndex = index + 1;
      navigate(nextIndex === 0 ? "/0" : `/${nextIndex}?click=0`);
    }
  };

  const goToPrevSlide = () => {
    if (index > 0) {
      const prevIndex = index - 1;
      navigate(prevIndex === 0 ? "/0" : `/${prevIndex}?click=0`);
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
    navigate(targetIndex === 0 ? "/0" : `/${targetIndex}?click=0`);
  };

  const renderContent = (content, i) => {
    if (index === 0) {
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

    if (typeof content === "object") {
      switch (content.type) {
        case "image":
          return (
            <div key={i} className="box image-box">
              <img src={content.content} alt={content.alt} />
            </div>
          );
        case "code":
          return (
            <div
              key={i}
              className="box code-box"
              data-language={content.language}
            >
              <pre>
                <code
                  className={`language-${content.language}`}
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      content.content,
                      Prism.languages[content.language],
                      content.language
                    ),
                  }}
                />
              </pre>
              <button
                className="copy-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(content.content);
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          );
        case "text":
          if (
            content.content.startsWith("Private constructor") ||
            content.content.startsWith("Static field") ||
            content.content.startsWith("Static property")
          ) {
            return (
              <div key={i} className="box bullet">
                {content.content}
              </div>
            );
          }
          return (
            <div key={i} className="box">
              {content.content}
            </div>
          );
        default:
          return null;
      }
    }

    // Nếu content bắt đầu bằng số, render như numbered item
    if (/^\d+\./.test(content)) {
      const number = content.match(/^\d+/)[0];
      return (
        <div key={i} className="box numbered" data-number={`${number}.`}>
          {content.replace(/^\d+\.\s*/, "")}
        </div>
      );
    }

    return (
      <div key={i} className="box">
        {content}
      </div>
    );
  };

  const isMenuSlide = index === 0;
  const contentToShow = visibleCount;

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
      <h1>{slides[index].title}</h1>
      <div
        className="slide"
        data-is-menu={isMenuSlide ? "true" : "false"}
        onClick={handleSlideClick}
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
          {visibleCount < slides[index].contents.length ? (
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
