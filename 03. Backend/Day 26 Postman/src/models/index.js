import Header from "./header";
import Request from "./request";
import User from "./user";

User.hasMany(Request);
Request.belongsto(User);

User.hasMany(Header);
Request.belongsto(Request);

await Promise.all([
    User.sync({ alter: true }),
    Request.sync({ alter: true }),
    Header.sync({ alter: true })
]);

export {
    User,
    Request,
    Header
}