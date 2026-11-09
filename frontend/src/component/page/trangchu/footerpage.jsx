import React from "react";
export default function FooterPage() {
  return (
    <>
 <footer

  style={{
     fontFamily:'"Oswald" , sans-serif',
    width: "100%",
    marginTop: "50px",
    background: "linear-gradient(135deg, #B8D8E8, #D9EAF2, #A9CDDF)",
    color: "#222222",
    padding: "40px 10%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    gap: "35px",
    flexWrap: "wrap"
  }}
>
  {/* CỘT 1 */}
  <div
    style={{
      flex: "1 1 300px",
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    }}
  >
    <h2 style={{
      color: "#174D70",
      fontSize: "18px",
      margin: 0
    }}>
      🪷 GIA ĐÌNH PHẬT TỬ MỸ LỢI
    </h2>

    <div style={{
      width: "65px",
      height: "3px",
      backgroundColor: "#397FA5"
    }} />

    <h4 style={{ lineHeight: 1.8, margin: 0 }}>
      Chào mừng quý anh chị em Lam viên ghé thăm
      trang nhà Gia đình Phật tử Mỹ Lợi.
      Nơi lưu giữ những hình ảnh, hoạt động và
      kỷ niệm sinh hoạt của đơn vị.
    </h4>

    <p style={{ color: "#174D70", margin: 0, fontWeight: "500" }}>
      🌿 Sen nở trong tâm – Tình Lam trong tim.
    </p>
  </div>

  {/* ĐƯỜNG PHÂN CÁCH */}
  <div style={{
    width: "1px",
    backgroundColor: "#789FB4"
  }} />

  {/* CỘT 2 */}
  <div
    style={{
      flex: "1 1 300px",
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    }}
  >
    <h2 style={{
      color: "#174D70",
      fontSize: "18px",
      margin: 0
    }}>
      📍 THÔNG TIN SINH HOẠT
    </h2>

    <div style={{
      width: "65px",
      height: "3px",
      backgroundColor: "#397FA5",
      fontFamily:'"Oswald" , sans-serif',
    }} />

    <p style={{ lineHeight: 1.7, margin: 0 }}>
      <strong>Địa điểm:</strong><br />
      Chùa Mỹ Lợi - Niệm Phật Đường Chùa Mỹ Lợi
    </p>

    <p style={{ lineHeight: 1.7, margin: 0 }}>
      <strong>Địa chỉ:</strong><br />
      Thôn Mỹ Lộc - Xã Vinh Lộc - Thành phố Huế
    </p>

    <p style={{ lineHeight: 1.7, margin: 0 }}>
      <strong>Thời gian:</strong><br />
      13:00 - 16:30, Chủ Nhật hàng tuần
    </p>
  </div>

  {/* BẢN QUYỀN */}
  <div style={{
    width: "100%",
    borderTop: "1px solid #789FB4",
    paddingTop: "20px",
    textAlign: "center",
    color: "#222222",
    fontSize: "20px"
  }}>
    🪷 © 2026 Gia Đình Phật Tử Mỹ Lợi
    <br />
    Bi - Trí - Dũng | Tinh thần Gia đình Phật tử Việt Nam
  </div>
</footer>
    </>
  )
}