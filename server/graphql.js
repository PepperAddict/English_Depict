const { GraphQLServer } = require("graphql-yoga");
const {jwt} = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-core");

const typeDefs = `type Query { hello(name: String): String! }`;

const resolvers = {
    Query: {
        hello: (_, { name }, ctx) => {
    if (ctx.claims !== "read-posts") {
        return new AuthenticationError("not authorized");
    }
    return `Hello ${name || "World"}`;
}
}
};

const authenticate = async (resolve, root, args, context, info) => {
    let token;
    try {
        token = jwt.verify(context.request.get("Authorization"), "secret");
    } catch (e) {
        return new AuthenticationError("Not authorised");
    }
    context.claims = token.claims;
    const result = await resolve(root, args, context, info);
    return result;
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: req => ({ ...req }),
    middlewares: [authenticate]
});

server.start(() => console.log("Server is running on http://localhost:4000"));