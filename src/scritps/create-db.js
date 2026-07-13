const users = JSON.parse(fs.readFileSync("./MOCK_DATA.json", "utf8"));

console.log(users.length);

const database = {
  users: users,
};

fs.writeFileSync("./mock-api/db.json", JSON.stringify(database, null, 2));

console.log("db.json created!");
