import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Prism from "prismjs";

const slides = [
  {
    title: "Kiến thức cơ bản",
    contents: [
      "1. Giới thiệu chung",
      "2. CLI",
      "3. Internet",
      "4. Giới thiệu về mạng máy tính",
      "5. Giới thiệu về bảo mật",
    ],
  },
  {
    title: "Giới thiệu chung",
    contents: [
      {
        type: "text",
        content: `CPU (Central Processing Unit): Được gọi là "bộ não" của máy tính, CPU xử lý tất cả các phép toán và điều khiển hoạt động của hệ thống.`,
      },
      {
        type: "text",
        content: `RAM (Random Access Memory): Là bộ nhớ tạm thời giúp lưu trữ dữ liệu và chương trình đang chạy, cho phép CPU truy cập nhanh chóng để xử lý.`,
      },
      {
        type: "text",
        content: `Ổ Cứng (Hard Drive / SSD): Lưu trữ dữ liệu lâu dài, bao gồm hệ điều hành, phần mềm, và tập tin cá nhân. 
SSD (Solid State Drive) nhanh hơn nhưng đắt hơn so với HDD (Hard Disk Drive).`,
      },
      {
        type: "text",
        content: `Card Đồ Họa (Graphics Card): Xử lý và hiển thị đồ họa và video. Quan trọng cho các ứng dụng đồ họa nặng và trò chơi. `,
      },
      {
        type: "text",
        content: `Bo Mạch Chính (Motherboard): Là bảng mạch chính kết nối tất cả các thành phần của máy tính, bao gồm CPU, RAM, Ổ cứng và các thiết bị ngoại vi.`,
      },
    ],
  },
  {
    title: "Đơn Vị Đo Lường",
    contents: [
      {
        type: "text",
        content: `1. Bit là đơn vị cơ bản nhất trong máy tính. Có thể có giá trị là 0 hoặc 1.`,
      },
      {
        type: "text",
        content: `2. Byte là nhóm gồm 8 bit.
• Một byte có thể lưu trữ một ký tự, ví dụ như chữ cái, số, hoặc ký hiệu (ví dụ: 'A', '1', '#').
• Ví dụ: Ký tự 'A' trong mã ASCII được lưu trữ dưới dạng 01000001 (8 bit).`,
      },
      {
        type: "text",
        content: `3. Các Đơn Vị Khác
• Kilobyte (KB): 1 KB = 1,024 byte
• Megabyte (MB): 1 MB = 1,024 KB
• Gigabyte (GB): 1 GB = 1,024 MB
• Terabyte (TB): 1 TB = 1,024 GB`,
      },
      {
        type: "text",
        content: `4. Tầm Quan Trọng
• Hiểu về bit và byte giúp lập trình viên quản lý và tối ưu hóa bộ nhớ trong chương trình.
• Số lượng bit và byte ảnh hưởng đến kích thước của dữ liệu và tốc độ xử lý của máy tính.`,
      },
    ],
  },
  {
    title: "Internet",
    contents: [
      {
        type: "text",
        content:
          "1. Internet là một mạng lưới toàn cầu kết nối hàng tỷ thiết bị điện tử, cho phép chúng giao tiếp và trao đổi dữ liệu với nhau. ",
      },
      {
        type: "text",
        content: `2. Internet sử dụng các giao thức chuẩn như TCP/IP để truyền thông tin giữa các máy tính và thiết bị. Mọi thứ trên Internet được truy cập thông qua địa chỉ IP và tên miền (DNS).`,
      },
      {
        type: "text",
        content: `3. Ứng Dụng của Internet 
• Truy cập thông tin: Tìm kiếm, học tập trực tuyến, và xem website. 
• Liên lạc: Gửi email, kết nối trên mạng xã hội, gọi điện qua Internet. 
• Giải trí: Xem phim, nghe nhạc, chơi game trực tuyến. 
• Mua sắm: Tham gia thương mại điện tử và thanh toán trực tuyến.`,
      },
      {
        type: "text",
        content: `4. Tầm Quan Trọng của Internet 
• Internet đã thay đổi cách chúng ta sống, làm việc, và giao tiếp. 
• Nó cung cấp một kho tàng thông tin và cơ hội kết nối vô tận.`,
      },
    ],
  },
  {
    title: "Hệ Thập Phân (Decimal)",
    contents: [
      {
        type: "text",
        content: `1. Hệ thập phân sử dụng 10 ký tự để biểu diễn giá trị: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.`,
      },
      {
        type: "text",
        content: `2. Ví dụ: Số 333₁₀ 
• Chữ số 3 cuối cùng (hàng đơn vị) có giá trị là 3.
• Chữ số 3 thứ hai (hàng chục) có giá trị là 30.
• Chữ số 3 đầu tiên (hàng trăm) có giá trị là 300.
• Tổng giá trị của số 333₁₀ là 300 + 30 + 3 = 333.`,
      },
      {
        type: "text",
        content: `Mỗi lần dịch sang trái, giá trị của chữ số tăng lên 10 lần so với vị trí trước đó.`,
      },
    ],
  },
  {
    title: "Biểu Thức Lũy Thừa",
    contents: [
      {
        type: "text",
        content: `1. Lũy thừa là cách viết ngắn gọn khi nhân một số với chính nó nhiều lần. Ví dụ: 23 nghĩa là 2 × 2 × 2.`,
      },
      {
        type: "text",
        content: `2. Cấu trúc: 
• Số được nhân nhiều lần gọi là cơ số (base). 
• Số lần nhân gọi là số mũ (exponent). Ví dụ: Trong 23, số 2 là cơ số, số 3 là số mũ. `,
      },
      {
        type: "text",
        content: `3. Ví dụ: 
• 3² = 3 × 3 = 9 
• 5⁴ = 5 × 5 × 5 × 5 = 625 `,
      },
      {
        type: "text",
        content: `4. Bất kỳ số nào lũy thừa với 0 đều bằng 1. Ví dụ: 
■ 16⁰ = 1 
■ 10⁰ = 1 
■ 2⁰ = 1`,
      },
    ],
  },
  {
    title: "Biểu diễn số thập phân bằng lũy thừa của 10",
    contents: [
      {
        type: "text",
        content: `1. Mỗi chữ số trong một số thập phân có giá trị phụ thuộc vào vị trí của nó. 
• Chữ số bên phải cùng là hàng đơn vị. 
• Các chữ số bên trái tăng dần hàng: hàng chục, hàng trăm, hàng nghìn, v.v. `,
      },
      {
        type: "text",
        content: `2. Chuyển vị trí thành lũy thừa của 10: 
• Hàng đơn vị được biểu diễn bằng 10^0. 
• Hàng chục được biểu diễn bằng 10^1. 
• Hàng trăm được biểu diễn bằng 10^2, ν.ν. `,
      },
      {
        type: "text",
        content: `3. Nhân từng chữ số với lũy thừa tương ứng của 10 Ví dụ: Với số 235₁₀: 
• 2 ở hàng trăm: 2 * 10 ^ 2 = 200 
• 3 ở hàng chục: 3 * 10 ^ 1 = 30 
• 5 ở hàng đơn vị: 5 * 10 ^ 0 = 5 `,
      },
      {
        type: "text",
        content: `4. Cộng tất cả các giá trị lại để ra tổng số: 
• Tổng giá trị của 235 10 = 200 + 30 + 5 = 235`,
      },
      {
        type: "text",
        content: `5. Triển khai biểu thức lũy thừa của các số sau: 2507, 102930, 230493034.`,
      },
    ],
  },
  {
    title: "Triển Khai Biểu Thức Lũy Thừa cho số 2507",
    contents: [
      {
        type: "text",
        content: `1. Xác định vị trí của từng chữ số: 
• 2 ở hàng nghìn – nhân với 10 ^ 3 
• 5 ở hàng trăm – nhân với 10 ^ 2 
• 0 ở hàng chục - nhân với 10 ^ 1 
• 7 ở hàng đơn vị - nhân với 10 ^ 0`,
      },
      {
        type: "text",
        content: `2. Nhân từng chữ số với lũy thừa tương ứng: 
• 2 * 10 ^ 3 = 2000 
• 5 * 10 ^ 2 = 500 
• 0 * 10 ^ 1 = 0 
• 7 * 10 ^ 0 = 7`,
      },
      {
        type: "text",
        content: `3. Tổng giá trị: 
2507₁₀ = 2000 + 500 + 0 + 7 = 2507`,
      },
    ],
  },
  {
    title: "Triển Khai Biểu Thức Lũy Thừa 102930",
    contents: [
      {
        type: "text",
        content: `1. Xác định vị trí của từng chữ số: 
• 1 ở hàng trăm nghìn – nhân với 10 ^ 5 
• 0 ở hàng chục nghìn – nhân với 10 ^ 4 
• 2 ở hàng nghìn – nhân với 10 ^ 3 
• 9 ở hàng trăm – nhân với 10 ^ 2 
• 3 ở hàng chục - nhân với 10 ^ 1 
• 0 ở hàng đơn vị - nhân với 10 ^ 0`,
      },
      {
        type: "text",
        content: `2. Nhân từng chữ số với lũy thừa tương ứng 
• 102930₁₀ = 1 × (10 ^ 5) + 0× (10 ^ 4) + 2 × (10 ^ 3) +9 × (10 ^ 2) +3 × (10 ^ 2) +0 × (10 ^ 0) `,
      },
      {
        type: "text",
        content: `3. Tổng giá trị 
• Kết quả: 100000 + 0 + 2000 + 900 + 30 + 0 = 102930`,
      },
    ],
  },
  {
    title: "Triển Khai Biểu Thức Lũy Thừa 230,493,034",
    contents: [
      {
        type: "text",
        content: `Xác định vị trí của từng chữ số:
• 2 ở hàng trăm triệu → nhân với 10⁸
• 3 ở hàng chục triệu → nhân với 10⁷
• 0 ở hàng triệu → nhân với 10⁶
• 4 ở hàng trăm nghìn → nhân với 10⁵
• 9 ở hàng chục nghìn → nhân với 10⁴
• 3 ở hàng nghìn → nhân với 10³
• 0 ở hàng trăm → nhân với 10²
• 3 ở hàng chục → nhân với 10¹
• 4 ở hàng đơn vị → nhân với 10⁰`,
      },
      {
        type: "text",
        content: `Triển khai:
230493034₁₀ = 2 × (10⁸) + 3 × (10⁷) + 0 × (10⁶) + 4 × (10⁵) + 9 × (10⁴) + 3 × (10³) + 0 × (10²) + 3 × (10¹) + 4 × (10⁰)`,
      },
    ],
  },
  {
    title: "Hệ Nhị Phân (Binary)",
    contents: [
      {
        type: "text",
        content: `1. Hệ nhị phân sử dụng 2 ký tự để biểu diễn giá trị: 0 và 1.`,
      },
      {
        type: "text",
        content: `2. Cách đếm trong hệ nhị phân. Bắt đầu từ 0 và tiếp tục với các bit để biểu diễn các số tiếp theo. Ví dụ:
• 0₂ = 0 (trong hệ thập phân)
• 1₂ = 1 (trong hệ thập phân)
• 10₂ = 2 (trong hệ thập phân)
• 11₂ = 3 (trong hệ thập phân)
• 100₂ = 4 (trong hệ thập phân)
• 101₂ = 5 (trong hệ thập phân)
• 110₂ = 6 (trong hệ thập phân)`,
      },
      {
        type: "text",
        content: `3. Nguyên tắc đếm:
• Khi số nhị phân đạt đến 11₂ (tương đương với 3 trong hệ thập phân), ta thêm một bit mới:
  - Ghi lại bit 1 ở vị trí mới và đặt lại tất cả các bit bên phải thành 0.
  - Ví dụ: Từ 11₂ (3) ta chuyển sang 100₂ (4).`,
      },
    ],
  },
  {
    title: "Biểu Diễn Số Nhị Phân",
    contents: [
      {
        type: "text",
        content: `1. Mỗi số nhị phân có các vị trí khác nhau, và mỗi vị trí có một giá trị riêng:
• Hàng đơn vị (bit bên phải cùng): giá trị là 2⁰ (bằng 1)
• Hàng 2: giá trị là 2¹ (bằng 2)
• Hàng 4: giá trị là 2² (bằng 4)
• Hàng 8: giá trị là 2³ (bằng 8)
• Hàng 16: giá trị là 2⁴ (bằng 16)
• Lưu ý: Khi di chuyển sang trái, giá trị mỗi vị trí sẽ tăng gấp đôi!`,
      },
      {
        type: "text",
        content: `2. Hãy cùng xem số nhị phân 1101₂ biểu diễn với lũy thừa của 2 từ phải qua trái:
• Bit 1 (bit bên phải cùng): 1 × (2⁰) = 1
• Bit 0 (hàng 2): 0 × (2¹) = 0
• Bit 1 (hàng 4): 1 × (2²) = 4
• Bit 1 (hàng 8): 1 × (2³) = 8
• 1101₂ = 1 × (2³) + 1 × (2²) + 0 × (2¹) + 1 × (2⁰)
• 1101₂ = 8 + 4 + 0 + 1 = 13₁₀`,
      },
    ],
  },
  {
    title: "Biểu Diễn Số Nhị Phân Bằng Lũy Thừa của 2",
    contents: [
      {
        type: "text",
        content: `1. Hãy cùng xem số nhị phân 10101₂ biểu diễn với lũy thừa của 2 từ phải qua trái:
• Bit 1 (bit bên phải cùng): 1 × (2⁰) = 1
• Bit 0 (hàng 2): 0 × (2¹) = 0
• Bit 1 (hàng 4): 1 × (2²) = 4
• Bit 0 (hàng 8): 0 × (2³) = 0
• Bit 1 (hàng 16): 1 × (2⁴) = 16
• 10101₂ = 1 × (2⁴) + 0 × (2³) + 1 × (2²) + 0 × (2¹) + 1 × (2⁰)`,
      },
      {
        type: "text",
        content: `2. Tính tổng giá trị: 10101₂ = 16 + 0 + 4 + 0 + 1 = 21₁₀
• Vậy số nhị phân 10101₂ tương đương với 21 trong hệ thập phân (21₁₀)`,
      },
    ],
  },
  {
    title: "Thực Hành Biểu diễn lũy thừa & thập phân",
    contents: [
      {
        type: "text",
        content: `Hãy chuyển các số nhị phân sau sang hệ thập phân:

1. 1001011₂
2. 1011110₂
3. 11001101₂
4. 11101011₂
5. 10000001₂
6. 11010101₂
7. 11111111₂
8. 10010110₂
9. 11010011₂
10. 111010100₂
11. 101101011₂`,
      },
      {
        type: "text",
        content: `Gợi ý: 
• Xác định vị trí của từng bit từ phải sang trái (2⁰, 2¹, 2², 2³,...)
• Nhân giá trị bit (0 hoặc 1) với lũy thừa tương ứng
• Cộng tất cả các kết quả lại`,
      },
    ],
  },
  {
    title: "Phân Biệt Số Chẵn và Lẻ với Binary",
    contents: [
      {
        type: "text",
        content: `Các số nhị phân và giá trị thập phân tương ứng:
• 0000₂ (tương đương với 0₁₀)
• 0001₂ (tương đương với 1₁₀)
• 0010₂ (tương đương với 2₁₀)
• 0011₂ (tương đương với 3₁₀)
• 0100₂ (tương đương với 4₁₀)
• 0101₂ (tương đương với 5₁₀)
• 0110₂ (tương đương với 6₁₀)
• 0111₂ (tương đương với 7₁₀)
• 1000₂ (tương đương với 8₁₀)`,
      },
      {
        type: "text",
        content: `Quy luật nhận biết số chẵn lẻ:
• Tất cả các bit trước bit cuối cùng đều nhân với các lũy thừa của 2 (như 2¹, 2², 2³, ...), và vì các lũy thừa này đều là số chẵn, nên phần giá trị của chúng là chẵn.

• Bit cuối cùng sẽ nhân với 2⁰ quyết định số lẻ hay chẵn, vì 2⁰ luôn bằng 1.`,
      },
      {
        type: "text",
        content: `Kết luận:
Trong hệ nhị phân, các số lẻ luôn kết thúc bằng chữ số 1 và số chẵn luôn luôn kết thúc là 0`,
      },
    ],
  },
  {
    title: "Nhân Đôi và Chia Đôi với Binary",
    contents: [
      {
        type: "text",
        content: `Các số nhị phân cơ bản:
• 0001₂ (tương đương với 1₁₀)
• 0010₂ (tương đương với 2₁₀)
• 0100₂ (tương đương với 4₁₀)
• 1000₂ (tương đương với 8₁₀)`,
      },
      {
        type: "text",
        content: `Nhân Đôi (Shift Left):
• Khi bạn dịch các bit sang trái một vị trí, giá trị của số đó sẽ được nhân đôi.
• Ví dụ: 011₂ (tương đương với 3₁₀) trở thành 110₂ (tương đương với 6₁₀).
• Nhân đôi nghĩa là thêm một bit 0 vào cuối.`,
      },
      {
        type: "text",
        content: `Chia Đôi (Shift Right):
• Khi bạn dịch các bit sang phải một vị trí, giá trị của số đó sẽ bị chia đôi (loại bỏ bit cuối cùng).
• Ví dụ: 110₂ (tương đương với 6₁₀) trở thành 011₂ (tương đương với 3₁₀).
• Chia đôi bỏ đi bit cuối cùng, nếu bit cuối là 1, phần dư sẽ bị mất (tức là số bị chia sẽ làm tròn xuống). Ví dụ: 111₂ (tương đương với 7₁₀) trở thành 011₂ (tương đương với 3₁₀).`,
      },
    ],
  },
  {
    title: "Chuyển Đổi Thập Phân Sang Hệ Nhị Phân",
    contents: [
      {
        type: "text",
        content: `1. Chia liên tiếp số thập phân cho 2 và ghi lại phần dư.
• Các phần dư thu được từ mỗi phép chia là các bit trong hệ nhị phân, bắt đầu từ bit thấp nhất (bên phải).`,
      },
      {
        type: "text",
        content: `2. Cách thực hiện:
• Chia số thập phân cho 2, ghi lại phần dư.
• Lấy kết quả của phép chia, tiếp tục chia cho 2, ghi lại phần dư.
• Lặp lại quá trình cho đến khi kết quả phép chia là 0.
• Số nhị phân sẽ được đọc ngược từ phần dư cuối cùng lên phần dư đầu tiên.`,
      },
      {
        type: "text",
        content: `3. Ví dụ: Chuyển đổi số 13 trong hệ thập phân sang nhị phân:
• 13 ÷ 2 = 6 dư 1
• 6 ÷ 2 = 3 dư 0
• 3 ÷ 2 = 1 dư 1
• 1 ÷ 2 = 0 dư 1
• Kết quả: Đọc ngược lại các phần dư từ dưới lên: 1101₂`,
      },
    ],
  },
  {
    title: "Chuyển Đổi Số 57 Sang Hệ Nhị Phân",
    contents: [
      {
        type: "text",
        content: `1. Nguyên tắc chuyển đổi:
• Chia liên tiếp số thập phân cho 2, ghi lại phần dư.
• Đọc các phần dư từ dưới lên để được kết quả trong hệ nhị phân.`,
      },
      {
        type: "text",
        content: `2. Cách thực hiện:
• 57 ÷ 2 = 28, dư 1
• 28 ÷ 2 = 14, dư 0
• 14 ÷ 2 = 7, dư 0
• 7 ÷ 2 = 3, dư 1
• 3 ÷ 2 = 1, dư 1
• 1 ÷ 2 = 0, dư 1`,
      },
      {
        type: "text",
        content: `3. Kết quả:
• Các phần dư đọc ngược từ dưới lên: 111001₂
• Vậy số thập phân 57 tương đương với số nhị phân 111001₂.`,
      },
    ],
  },
  {
    title: "Chuyển Đổi Số 245 Sang Hệ Nhị Phân",
    contents: [
      {
        type: "text",
        content: `1. Nguyên tắc chuyển đổi:
• Chia liên tiếp số thập phân cho 2, ghi lại phần dư.
• Đọc các phần dư từ dưới lên để được kết quả trong hệ nhị phân.`,
      },
      {
        type: "text",
        content: `2. Cách thực hiện:
• 245 ÷ 2 = 122, dư 1
• 122 ÷ 2 = 61, dư 0
• 61 ÷ 2 = 30, dư 1
• 30 ÷ 2 = 15, dư 0
• 15 ÷ 2 = 7, dư 1
• 7 ÷ 2 = 3, dư 1
• 3 ÷ 2 = 1, dư 1
• 1 ÷ 2 = 0, dư 1`,
      },
      {
        type: "text",
        content: `3. Kết quả:
• Các phần dư đọc ngược từ dưới lên: 11110101₂
• Vậy số thập phân 245 tương đương với số nhị phân 11110101₂.`,
      },
    ],
  },
  {
    title: "Bài Tập Chuyển Đổi Thập Phân Sang Nhị Phân",
    contents: [
      {
        type: "text",
        content: `Hãy chuyển các số sau từ hệ thập phân sang hệ nhị phân:

1. 75₁₀
2. 128₁₀
3. 255₁₀
4. 99₁₀
5. 512₁₀
6. 1024₁₀
7. 63₁₀
8. 31₁₀`,
      },
      {
        type: "text",
        content: `Hướng dẫn:
• Chia liên tiếp cho 2 và ghi lại phần dư
• Đọc các phần dư từ dưới lên trên
• Kiểm tra lại kết quả bằng cách chuyển ngược về hệ thập phân`,
      },
      {
        type: "text",
        content: `Ví dụ mẫu với số 13₁₀:
• 13 ÷ 2 = 6 dư 1
• 6 ÷ 2 = 3 dư 0
• 3 ÷ 2 = 1 dư 1
• 1 ÷ 2 = 0 dư 1
→ Kết quả: 1101₂`,
      },
    ],
  },
  {
    title: "Chuyển Đổi Giữa Hệ Nhị Phân và Thập Phân",
    contents: [
      {
        type: "text",
        content: `1. Chuyển Đổi Từ Thập Phân Sang Nhị Phân:
• Phương pháp chia liên tục cho 2: Chia số thập phân liên tiếp cho 2 và ghi lại phần dư.
• Kết quả: Đọc các phần dư từ dưới lên để thu được số nhị phân tương ứng.`,
      },
      {
        type: "text",
        content: `2. Chuyển Đổi Từ Nhị Phân Sang Thập Phân:
• Sử dụng lũy thừa của 2: Nhân mỗi chữ số nhị phân với lũy thừa của 2, tùy theo vị trí.
• Tính tổng: Cộng tất cả các giá trị lại để có kết quả trong hệ thập phân.`,
      },
      {
        type: "text",
        content: `3. Kết luận:
• Việc chuyển đổi giữa hai hệ đếm giúp chúng ta dễ dàng làm việc với dữ liệu trong các hệ thống số khác nhau.
• Hệ nhị phân rất quan trọng trong công nghệ máy tính, vì máy tính chỉ hiểu hai trạng thái: 0 và 1.`,
      },
    ],
  },
  {
    title: "Ứng Dụng Của Hệ Nhị Phân",
    contents: [
      {
        type: "text",
        content: `1. Xử Lý Dữ Liệu Trong Máy Tính:
• Mọi dữ liệu như số, ký tự, hình ảnh, âm thanh đều được chuyển đổi thành các dãy số nhị phân (0 và 1) để máy tính có thể xử lý và lưu trữ.
• Ví dụ: Chữ cái 'A' được biểu diễn bằng 01000001 trong mã ASCII.`,
      },
      {
        type: "text",
        content: `2. Thiết Kế Mạch Điện Tử và Vi Xử Lý:
• Hệ nhị phân là cơ sở cho hoạt động của các mạch điện tử, dùng trạng thái 0 và 1 để bật tắt các cổng logic.
• Các phép toán số học và logic đều được thực hiện thông qua các cổng logic cơ bản (AND, OR, NOT).`,
      },
      {
        type: "text",
        content: `3. Lập Trình và Ngôn Ngữ Máy:
• Mọi ngôn ngữ lập trình bậc cao (Python, Java, C++) đều được biên dịch thành mã máy nhị phân.
• CPU chỉ có thể hiểu và thực thi các lệnh dưới dạng chuỗi bit 0 và 1.`,
      },
      {
        type: "text",
        content: `4. Lưu Trữ Dữ Liệu:
• Tất cả các thiết bị lưu trữ (ổ cứng, RAM, USB) đều sử dụng hệ nhị phân.
• Mỗi bit được lưu trữ bằng các phương pháp vật lý khác nhau (điện tích, từ tính).`,
      },
      {
        type: "text",
        content: `5. Kết Luận:
• Hệ nhị phân là nền tảng của toàn bộ công nghệ số hiện đại.
• Việc hiểu về hệ nhị phân giúp chúng ta:
  - Nắm được cách máy tính xử lý thông tin
  - Tối ưu hóa việc lưu trữ và xử lý dữ liệu
  - Hiểu rõ hơn về bảo mật và mã hóa dữ liệu`,
      },
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
