// 獲取已挑選的項目 (模擬資料，實際應從 LocalStorage 獲取)
const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

// 顯示已挑選的菜品
const selectedItemsDiv = document.getElementById("selectedItems");
if (selectedItemsDiv) {
    selectedItemsDiv.innerHTML = selectedItems.length > 0 
        ? selectedItems.join("<br>") 
        : "尚未挑選任何菜品";
}

// 生成 QR Code
const generateQRButton = document.getElementById("generateQR");
if (generateQRButton) {
    generateQRButton.addEventListener("click", () => {
        if (selectedItems.length === 0) {
            alert("尚未挑選任何菜品，無法生成 QR Code！");
            return;
        }

        const message = encodeURIComponent(`您好，我已完成點餐：\n${selectedItems.join("\n")}`);
        const lineURL = `https://line.me/R/msg/text/?${message}`;

        const qrCodeContainer = document.getElementById("qrcode");
        qrCodeContainer.innerHTML = ""; // 清空現有 QR Code
        QRCode.toCanvas(lineURL, { width: 256, height: 256 }, (error, canvas) => {
            if (error) console.error(error);
            qrCodeContainer.appendChild(canvas);
        });
    });
}
