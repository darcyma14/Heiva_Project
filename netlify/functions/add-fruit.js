const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "POST 요청만 허용됩니다." };
    }

    try {
        const { newFruit } = JSON.parse(event.body);
        if (!newFruit) {
            return { statusCode: 400, body: "과일 이름을 입력하세요." };
        }

        const filePath = path.join(__dirname, "../../data.csv");
        const data = fs.readFileSync(filePath, "utf8");
        let fruits = data.split(",").map(item => item.trim());

        if (fruits.includes(newFruit)) {
            return { statusCode: 400, body: "이미 있는 과일입니다." };
        }

        fruits.push(newFruit);
        fs.writeFileSync(filePath, fruits.join(","));

        return { statusCode: 200, body: "과일 추가 성공!" };
    } catch (error) {
        return { statusCode: 500, body: "파일 저장 오류" };
    }
};
