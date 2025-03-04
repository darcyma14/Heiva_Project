const fs = require("fs");
const path = require("path");

exports.handler = async () => {
    try {
        const filePath = path.join(__dirname, "../../data.csv");
        const data = fs.readFileSync(filePath, "utf8");
        const fruits = data.split(",").map(item => item.trim());

        return {
            statusCode: 200,
            body: JSON.stringify(fruits)
        };
    } catch (error) {
        return { statusCode: 500, body: "파일 읽기 오류" };
    }
};
