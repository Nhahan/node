const book = {
    title: "Good Book",
    author: "Kim",
};

const bookJSON = JSON.stringify(book);
console.log(bookJSON, bookJSON.author);

const parsedData = JSON.parse(bookJSON);
console.log(parsedData, parsedData.author);
